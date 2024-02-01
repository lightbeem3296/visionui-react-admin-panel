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


router.post("/fetch", isAuthenticated, function (req, resp) {
  try {
    sql.connect(dbConfig.CONFIG, function (err) {
      if (isValid(err)) return onError(resp, 'db connection error', err);

      const filter = req.body;

      const nameFilter = filter.name;
      const classFilter = filter.class;
      const rarityFilter = filter.rarity;
      const typeFilter = filter.type;
      const orderByFilter = filter.orderBy;

      var query = ``;
      if (isValid(nameFilter)) {
        query += ` [name] LIKE '%${nameFilter}%'`;
      }
      if (isValid(classFilter)) {
        query += ` AND [class] IS ${classFilter}`;
      }
      if (isValid(rarityFilter)) {
        query += ` AND [rarity] IS ${rarityFilter}`;
      }
      if (isValid(typeFilter)) {
        query += ` AND [type] IS ${typeFilter}`;
      }
      if (isValid(orderByFilter)) {
        query += ` ORDER BY ${orderByFilter}`;
      }
      if (query.length > 0) {
        query = ` WHERE` + query;
      }

      const sql_req = new sql.Request();
      sql_req.query(`SELECT * FROM ${ITEM_SHOP_TABLE} ${query}`, function (err, result) {
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

      const sql_req = new sql.Request();

      const details = JSON.parse(req.body.details);
      const query = `INSERT INTO ${ITEM_SHOP_TABLE} VALUES (${details.item_index}, '${details.item_name}', ${details.item_price}, ${details.item_class}, ${details.item_rarity}, ${details.item_type}, ${details.item_limit}, getdate(), getutcdate())`;

      // insert into table
      sql_req.query(query, (err, res) => {
        if (isValid(err)) return onError(resp, 'db query error', err);
        if (isInvalid(req.file)) return onError(resp, 'file upload error');

        let tmpPath = req.file.path;
        let dstPath = path.join(ITEM_IMAGE_DIR, details.index + '.png');

        fs.mkdir(ITEM_IMAGE_DIR, { recursive: true }, (err) => {
          if (isValid(err)) return onError(resp, 'mkdir failed', err);

          fs.rename(tmpPath, dstPath, (err) => {
            if (isValid(err)) return onError(resp, 'rename failed', err);

            if (fs.existsSync(tmpPath)) {
              fs.rm(tmpPath, (err) => {
                console.log(err);
              });
            }
            return onSuccess(resp);
          });
        });
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

      const sql_req = new sql.Request();

      const details = JSON.parse(req.body.details);
      const query = `INSERT INTO ${ITEM_SHOP_TABLE} VALUES (${details.item_index}, '${details.item_name}', ${details.item_price}, ${details.item_class}, ${details.item_rarity}, ${details.item_type}, ${details.item_limit}, getdate(), getutcdate())`;

      // update table
      sql_req.query(query, (err, res) => {
        if (isValid(err)) return onError(resp, 'db query error', err);
        if (isInvalid(req.file)) return onError(resp, 'file upload error');

        let tmpPath = req.file.path;
        let dstPath = path.join(ITEM_IMAGE_DIR, details.index + '.png');

        fs.mkdir(ITEM_IMAGE_DIR, { recursive: true }, (err) => {
          if (isValid(err)) return onError(resp, 'mkdir failed', err);

          fs.rename(tmpPath, dstPath, (err) => {
            if (isValid(err)) return onError(resp, 'rename failed', err);

            if (fs.existsSync(tmpPath)) {
              fs.rm(tmpPath, (err) => {
                console.log(err);
              });
            }
            return onSuccess(resp);
          });
        });
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
      console.log("item.delete: " + itemIndex);

      return onSuccess(resp);
    });
  } catch (err) {
    return onError(resp, 'unhandled error', err);
  }
});

module.exports = router;
