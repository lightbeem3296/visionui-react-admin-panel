const express = require('express');
const router = express.Router();
const { isAuthenticated } = require("../../controllers/auth.js");
const multer = require('multer');
const fs = require('fs');
const consts = require('../../consts.js');
const { isInvalid, isValid, timeStr } = require('../../utils/basic.js');
const { onError, onSuccess } = require('../../utils/net.js');
const { DbPool } = require('../../controllers/db.js');
const { utc2Local } = require('../../utils/basic.js');
const { LbItemClasses, LbItemRarities, LbItemTypes } = require('./def.js');
const md5 = require('md5');
const upload = multer({ dest: consts.UPLOAD_DIR });

const ITEM_SHOP_TABLE = '[CREEDIAN].[dbo].[item_shop]';

router.post("/fetch", isAuthenticated, async (req, resp) => {
  try {

    const filter = req.body;

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

    await DbPool.connect();
    const result = await DbPool.request().query(`
        SELECT  *
        FROM    ${ITEM_SHOP_TABLE}
        ${query}`)

    return onSuccess(resp, result.recordset);
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

router.post("/add", isAuthenticated, upload.single('file'), async (req, resp) => {
  try {
    if (isInvalid(req.file)) return onError(resp, 'file upload error');

    const details = JSON.parse(req.body.details);

    const imgData = fs.readFileSync(req.file.path);
    fs.rmSync(req.file.path);
    const b64Img = 'data:image/png;base64,' + Buffer.from(imgData).toString('base64');

    await DbPool.connect();
    var result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    ${ITEM_SHOP_TABLE}
        WHERE   [item_index]=${details.item_index}`)
    const totalCount = result.recordset[0][''];

    if (totalCount !== 0) {
      return onError(resp, 'duplicated item index');
    }

    let itemHash = md5(JSON.stringify(details) + (new Date().toISOString()));
    const query = `INSERT INTO
      ${ITEM_SHOP_TABLE} (
        [item_hash],
        [item_index],
        [item_name],
        [item_image],
        [item_price],
        [item_class],
        [item_rarity],
        [item_type],
        [item_limit],
        [item_desc],
        [create_date],
        [modify_date])
      VALUES (
        '${itemHash}',
        ${details.item_index},
        '${details.item_name}',
        '${b64Img}',
        ${details.item_price},
        ${details.item_class},
        ${details.item_rarity},
        ${details.item_type},
        ${details.item_limit},
        '${details.item_desc}',
        getdate(),
        getdate())`;

    // insert into table
    await DbPool.request().query(query)

    return onSuccess(resp);
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

router.post("/update", isAuthenticated, upload.single('file'), async (req, resp) => {
  try {
    const details = JSON.parse(req.body.details);

    var imgTag = null;
    if (isValid(req.file)) {
      try {
        const imgData = fs.readFileSync(req.file.path);
        fs.rmSync(req.file.path);
        const b64Img = 'data:image/png;base64,' + Buffer.from(imgData).toString('base64');
        imgTag = `[item_image] = '${b64Img}',`;
      } catch (ex) {
        console.log(ex);
      }
    }

    await DbPool.connect()
    let result = await DbPool.request().query(`
        SELECT  COUNT(*)
        FROM    ${ITEM_SHOP_TABLE}
        WHERE   [item_hash] = '${details.item_hash}'`)
    let totalCount = result.recordset[0][''];

    if (totalCount === 0) {
      return onError(resp, 'item not found');
    }

    await DbPool.connect();
    result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    ${ITEM_SHOP_TABLE}
        WHERE   [item_index] = ${details.item_index}
        AND     [item_hash] <> '${details.item_hash}'`)
    totalCount = result.recordset[0][''];

    if (totalCount !== 0) {
      return onError(resp, 'duplicated item index');
    }

    const query = `UPDATE ${ITEM_SHOP_TABLE}
      SET
        [item_index] = ${details.item_index},
        [item_name] = '${details.item_name}',
        ${imgTag || ''}
        [item_price] = ${details.item_price},
        [item_class] = ${details.item_class},
        [item_rarity] = ${details.item_rarity},
        [item_type] = ${details.item_type},
        [item_limit] = ${details.item_limit},
        [item_desc] = '${details.item_desc}',
        [modify_date] = getdate()
      WHERE
        [item_hash] = '${details.item_hash}'`;

    // update table
    await DbPool.request().query(query)

    return onSuccess(resp);
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

router.post("/delete", isAuthenticated, async (req, resp) => {
  try {
    const itemHash = req.body.item_hash;
    const query = `DELETE FROM ${ITEM_SHOP_TABLE} WHERE [item_hash]='${itemHash}'`;

    await DbPool.connect()
    await DbPool.request().query(query)

    return onSuccess(resp);
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

router.post('/item-log', isAuthenticated, async (req, resp) => {
  try {
    const { pagination, order, field, filters } = req.body;

    await DbPool.connect()

    var query = ``;

    if (isValid(filters)) {
      query += ` WHERE [user_id] LIKE '%${filters.user_id || ''}%'`;
      query += ` AND [character_name] LIKE '%${filters.character_name || ''}%'`;
      query += ` AND [item_name] LIKE '%${filters.item_name || ''}%'`;
    }

    var result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    [CREEDIAN].[dbo].[item_log]
        ${query}`)
    const totalCount = result.recordset[0][''];

    if (order) {
      if (order === "ascend") {
        query += ` ORDER BY [${field}] ASC`;
      } else if (order === "descend") {
        query += ` ORDER BY [${field}] DESC`;
      }
    } else {
      query += ` ORDER BY [log_date] DESC`;
    }

    const queryOffset = (pagination.current - 1) * pagination.pageSize;
    const querySize = pagination.pageSize;
    query += ` OFFSET ${queryOffset} ROWS FETCH NEXT ${querySize} ROWS ONLY`;

    result = await DbPool.request()
      .query(`
        SELECT  *
        FROM    [CREEDIAN].[dbo].[item_log]
        ${query}`)
    const data = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
        item_class: LbItemClasses[item.item_class],
        item_rarity: LbItemRarities[item.item_rarity],
        item_type: LbItemTypes[item.item_type],
        log_date: timeStr(item.log_date, true),
      }
    });

    return onSuccess(resp, {
      rows: data,
      details: {
        total: totalCount,
      },
    });
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

module.exports = router;
