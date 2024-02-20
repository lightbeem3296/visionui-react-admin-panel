const express = require('express');
const router = express.Router();
const sql = require("mssql");
const { isAuthenticated } = require("../../controllers/auth.js");
const { isValid, timeStr } = require('../../utils/basic.js');
const { onError, onSuccess } = require('../../utils/net.js');
const { DbPool, dbQuerySafe } = require('../../controllers/db.js');

const CREEDIAN_DB_NAME = '[CREEDIAN]';

router.post("/creedians", isAuthenticated, async (req, resp) => {
  try {
    const { pagination, order, field, filters } = req.body;

    await DbPool.connect();

    let query = ``;
    let params = [];

    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE @user_no`;
      params.push(['user_no', sql.VarChar(20), `%${filters.user_no || ''}%`]);

      query += ` AND [user_id] LIKE @user_id`;
      params.push(['user_id', sql.VarChar(20), `%${filters.user_id || ''}%`]);
    }

    var result = await dbQuerySafe(DbPool,
      params, `
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians]
        ${query}`)
    const totalCount = result.recordset[0][''];

    if (isValid(order) && [
      'user_id',
      'user_no',
      'creedian',
      'log_date',
    ].includes(field)) {
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

    result = await dbQuerySafe(DbPool,
      params, `
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians]
        ${query}`)
    const rows = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
        log_date: timeStr(item.log_date, true),
      }
    });

    return onSuccess(resp, {
      rows: rows,
      details: {
        total: totalCount,
      },
    });
  } catch (ex) {
    return onError(resp, 'unhandled error', ex);
  }
});

router.post("/charge-log", isAuthenticated, async (req, resp) => {
  try {
    const { pagination, order, field, filters } = req.body;

    await DbPool.connect();

    var query = ``;
    let params = [];

    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE @user_no`;
      params.push(['user_no', sql.VarChar(20), `%${filters.user_no || ''}%`]);

      query += ` AND [user_id] LIKE @user_id`;
      params.push(['user_id', sql.VarChar(20), `%${filters.user_id || ''}%`]);

      query += ` AND [character_name] LIKE @character_name`;
      params.push(['character_name', sql.VarChar(40), `%${filters.character_name || ''}%`]);

      query += ` AND [character_no] LIKE @character_no`;
      params.push(['character_no', sql.VarChar(20), `%${filters.character_no || ''}%`]);

      query += ` AND [charge_type] LIKE @charge_type`;
      params.push(['charge_type', sql.VarChar(40), `%${filters.charge_type || ''}%`]);

      query += ` AND [map] LIKE @map`;
      params.push(['map', sql.VarChar(20), `%${filters.map || ''}%`]);
    }

    var result = await dbQuerySafe(DbPool,
      params, `
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_charge_log]
        ${query}`)
    const totalCount = result.recordset[0][''];

    if (order && [
      'user_id',
      'user_no',
      'amount',
      'character_name',
      'character_no',
      'charge_type',
      'map',
      'item_index',
      'log_date',
    ].includes(field)) {
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

    result = await dbQuerySafe(DbPool,
      params, `
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_charge_log]
        ${query}`);
    const data = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
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

router.post("/use-log", isAuthenticated, async (req, resp) => {
  try {
    const { pagination, order, field, filters } = req.body;

    await DbPool.connect();

    var query = ``;
    let params = [];

    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE @user_no`;
      params.push(['user_no', sql.VarChar(20), `%${filters.user_no || ''}%`]);

      query += ` AND [user_id] LIKE @user_id`;
      params.push(['user_id', sql.VarChar(20), `%${filters.user_id || ''}%`]);

      query += ` AND [use_type] LIKE @use_type`;
      params.push(['use_type', sql.VarChar(20), `%${filters.use_type || ''}%`]);
    }

    var result = await dbQuerySafe(DbPool,
      params, `
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_use_log]
        ${query}`)
    const totalCount = result.recordset[0][''];

    if (isValid(order) && [
      'user_id',
      'user_no',
      'amount',
      'use_type',
      'use_date',
    ].includes(field)) {
      if (order === "ascend") {
        query += ` ORDER BY [${field}] ASC`;
      } else if (order === "descend") {
        query += ` ORDER BY [${field}] DESC`;
      }
    } else {
      query += ` ORDER BY [use_date] DESC`;
    }

    const queryOffset = (pagination.current - 1) * pagination.pageSize;
    const querySize = pagination.pageSize;
    query += ` OFFSET ${queryOffset} ROWS FETCH NEXT ${querySize} ROWS ONLY`;

    result = await dbQuerySafe(DbPool,
      params, `
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_use_log]
        ${query}`)
    const data = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
        use_date: timeStr(item.use_date, true),
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
