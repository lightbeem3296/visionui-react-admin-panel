const express = require('express');
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../../config/db.js");
const { isAuthenticated } = require("../../controllers/AuthController.js");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const consts = require('../../consts.js');
const { isInvalid, isValid } = require('../../utils/basic');
const { onError, onSuccess } = require('../../utils/resp.js');
const upload = multer({ dest: consts.UPLOAD_DIR });

const ITEM_IMAGE_DIR = path.join(consts.PUBLIC_DIR, 'images', 'items');
const ITEM_SHOP_TABLE = '[CREEDIAN].[dbo].[item_shop]';

function getImagePath(item_index) {
  return path.join(ITEM_IMAGE_DIR, item_index + '.png');
}

router.post("/fetch", isAuthenticated, function (req, resp) {
  try {
    sql.connect(dbConfig.CONFIG, function (err) {
      if (isValid(err)) return onError(resp, 'db connection error', err);

      const filter = req.body;

      console.log(filter);

      const nameFilter = filter.item_name;
      const classFilter = filter.item_class;
      const rarityFilter = filter.item_rarity;
      const typeFilter = filter.item_type;
      const orderByFilter = filter.order_by;
      const orderDirectionFilter = filter.order_dir;

      var query = ``;
      if (isValid(nameFilter)) {
        query += ` [item_name] LIKE '%${nameFilter}%'`;
      }
      if (isValid(classFilter)) {
        query += ` AND [item_class]=${classFilter}`;
      }
      if (isValid(rarityFilter)) {
        query += ` AND [item_rarity]=${rarityFilter}`;
      }
      if (isValid(typeFilter)) {
        query += ` AND [item_type]=${typeFilter}`;
      }
      if (isValid(orderByFilter)) {
        query += ` ORDER BY [${orderByFilter}]`;
        if (isValid(orderDirectionFilter)) {
          query += ` ${orderDirectionFilter}`;
        }
      }
      if (query.length > 0) {
        query = ` WHERE` + query;
      }

      const sqlReq = new sql.Request();
      sqlReq.query(`SELECT * FROM ${ITEM_SHOP_TABLE} ${query}`, function (err, result) {
        if (isValid(err)) return onError(resp, 'db query error', err);

        return onSuccess(resp, result.recordset);
      });
    });
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
});

router.post("/add", isAuthenticated, upload.single('file'), async (req, resp) => {
  try {
    sql.connect(dbConfig.CONFIG, (err) => {
      if (isValid(err)) return onError(resp, 'db connection error', err);

      const details = JSON.parse(req.body.details);

      const sqlReq = new sql.Request();
      sqlReq.query(`SELECT COUNT(*)
        FROM ${ITEM_SHOP_TABLE}
        WHERE
          [item_index]=${details.item_index}`,
        function (err, result) {
          if (isValid(err)) return onError(resp, 'db query error', err);

          const totalCount = result.recordset[0][''];

          if (totalCount === 0) {
            const query = `INSERT INTO
            ${ITEM_SHOP_TABLE} (
              [item_index],
              [item_name],
              [item_price],
              [item_class],
              [item_rarity],
              [item_type],
              [item_limit],
              [create_date],
              [modify_date])
            VALUES (
              ${details.item_index},
              '${details.item_name}',
              ${details.item_price},
              ${details.item_class},
              ${details.item_rarity},
              ${details.item_type},
              ${details.item_limit},
              getutcdate(),
              getutcdate())`;

            // insert into table
            const sqlReq = new sql.Request();
            sqlReq.query(query, (err, res) => {
              if (isValid(err)) return onError(resp, 'db query error', err);
              if (isInvalid(req.file)) return onError(resp, 'file upload error');

              let tmpPath = req.file.path;
              let dstPath = getImagePath(details.item_index);

              fs.mkdirSync(ITEM_IMAGE_DIR, { recursive: true });
              if (fs.existsSync(tmpPath)) {
                fs.renameSync(tmpPath, dstPath);
              }
              return onSuccess(resp);
            });
          } else {
            onError(resp, 'item index must be unique');
          }
        });
    });
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
});

router.post("/update", isAuthenticated, upload.single('file'), function (req, resp) {
  try {
    sql.connect(dbConfig.CONFIG, (err) => {
      if (isValid(err)) return onError(resp, "db connection error", err);

      const details = JSON.parse(req.body.details);

      const sqlReq = new sql.Request();
      sqlReq.query(`SELECT COUNT(*)
        FROM ${ITEM_SHOP_TABLE}
        WHERE
          [item_index]=${details.item_index}`,
        function (err, result) {
          if (isValid(err)) return onError(resp, 'db query error', err);

          const totalCount = result.recordset[0][''];

          if (details.item_index === details.old_index || totalCount === 0) {
            const query = `UPDATE ${ITEM_SHOP_TABLE}
              SET
                [item_index]=${details.item_index},
                [item_name]='${details.item_name}',
                [item_price]=${details.item_price},
                [item_class]=${details.item_class},
                [item_rarity]=${details.item_rarity},
                [item_type]=${details.item_type},
                [item_limit]=${details.item_limit},
                [modify_date]=getutcdate()
              WHERE
                [item_index]=${details.old_index}`;

            // update table
            sqlReq.query(query, (err, res) => {
              if (isValid(err)) return onError(resp, 'db query error', err);

              let oldImgPath = getImagePath(details.old_index);
              let imgPath = getImagePath(details.item_index);

              if (fs.existsSync(oldImgPath)) {
                fs.renameSync(oldImgPath, imgPath);
              }

              if (isValid(req.file)) {
                let tmpPath = req.file.path;
                fs.mkdirSync(ITEM_IMAGE_DIR, { recursive: true });
                if (fs.existsSync(tmpPath)) {
                  fs.renameSync(tmpPath, imgPath);
                }
              }
              return onSuccess(resp);
            });
          } else {
            onError(resp, 'item index must be unique');
          }
        });
    });
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
});

router.post("/delete", isAuthenticated, function (req, resp) {
  try {
    sql.connect(dbConfig.CONFIG, function (err) {
      if (isValid(err)) return onError(resp, 'db connection error', err);

      const itemIndex = req.body.item_index;
      const query = `DELETE FROM ${ITEM_SHOP_TABLE} WHERE [item_index]=${itemIndex}`;
      const sqlReq = new sql.Request();
      sqlReq.query(query, (err, res) => {
        if (isValid(err)) return onError(resp, 'db query error', err);
        let imgPath = getImagePath(itemIndex);
        if (fs.existsSync(imgPath)) {
          fs.rmSync(imgPath);
        }
        return onSuccess(resp);
      });
    });
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
});

module.exports = router;
