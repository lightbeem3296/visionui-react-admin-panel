const express = require('express');
const router = express.Router();
const sql = require("mssql");
const { isAuthenticated } = require("../../controllers/auth.js");
const { isValid } = require('../../utils/basic.js');
const { onError, onSuccess } = require('../../utils/net.js');
const { DbPool } = require('../../controllers/db.js');

const CREEDIAN_DB_NAME = '[CREEDIAN]';

router.post("/creedians", isAuthenticated, async (req, resp) => {
  try {
    await DbPool.connect();

    var query = ``;

    const filters = req.query.filters;
    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
      query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
    }

    var result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians]
        ${query}`)
    const totalCount = result.recordset[0][''];

    const queryOrder = req.query.order;
    const queryField = req.query.field;
    if (isValid(queryOrder)) {
      if (queryOrder === "ascend") {
        query += ` ORDER BY [${queryField}] ASC`;
      } else if (queryOrder === "descend") {
        query += ` ORDER BY [${queryField}] DESC`;
      }
    } else {
      query += ` ORDER BY [user_id] ASC`;
    }

    const pagination = req.query.pagination;
    const queryOffset = (pagination.current - 1) * pagination.pageSize;
    const querySize = pagination.pageSize;
    query += ` OFFSET ${queryOffset} ROWS FETCH NEXT ${querySize} ROWS ONLY`;

    result = await DbPool.request()
      .query(`
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians]
        ${query}`)
    const rows = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
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
    await DbPool.connect()

    var query = ``;

    const filters = req.query.filters;
    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
      query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
      query += ` AND [character_name] LIKE '%${filters.character_name}%'`;
      query += ` AND [character_no] LIKE '%${filters.character_no}%'`;
      query += ` AND [charge_type] LIKE '%${filters.charge_type}%'`;
      query += ` AND [map] LIKE '%${filters.map}%'`;
      query += ` AND [x] LIKE '%${filters.x}%'`;
      query += ` AND [y] LIKE '%${filters.y}%'`;
    }

    var result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_charge_log]
        ${query}`)
    const totalCount = result.recordset[0][''];

    const queryOrder = req.query.order;
    const queryField = req.query.field;
    if (queryOrder) {
      if (queryOrder === "ascend") {
        query += ` ORDER BY [${queryField}] ASC`;
      } else if (queryOrder === "descend") {
        query += ` ORDER BY [${queryField}] DESC`;
      }
    } else {
      query += ` ORDER BY [user_id] ASC`;
    }

    const pagination = req.query.pagination;
    const queryOffset = (pagination.current - 1) * pagination.pageSize;
    const querySize = pagination.pageSize;
    query += ` OFFSET ${queryOffset} ROWS FETCH NEXT ${querySize} ROWS ONLY`;

    result = await DbPool.request()
      .query(`
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_charge_log]
        ${query}`)
    const data = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
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
    await DbPool.connect();

    var query = ``;

    const filters = req.query.filters;
    if (isValid(filters)) {
      query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
      query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
      query += ` AND [use_type] LIKE '%${filters.use_type}%'`;
    }

    var result = await DbPool.request()
      .query(`
        SELECT  COUNT(*)
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_use_log]
        ${query}`)
    const totalCount = result.recordset[0][''];

    const queryOrder = req.query.order;
    const queryField = req.query.field;
    if (isValid(queryOrder)) {
      if (queryOrder === "ascend") {
        query += ` ORDER BY [${queryField}] ASC`;
      } else if (queryOrder === "descend") {
        query += ` ORDER BY [${queryField}] DESC`;
      }
    } else {
      query += ` ORDER BY [user_id] ASC`;
    }

    const pagination = req.query.pagination;
    const queryOffset = (pagination.current - 1) * pagination.pageSize;
    const querySize = pagination.pageSize;
    query += ` OFFSET ${queryOffset} ROWS FETCH NEXT ${querySize} ROWS ONLY`;

    result = await DbPool.request()
      .query(`
        SELECT  *
        FROM    ${CREEDIAN_DB_NAME}.[dbo].[user_creedians_use_log]
        ${query}`)
    const data = result.recordset.map((item, index) => {
      return {
        key: index,
        ...item,
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
