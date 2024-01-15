var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require("../config/db.js");
var { isAuthenticated } = require("../controllers/AuthController.js");

var config = {
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  server: dbConfig.HOST,
  port: dbConfig.PORT,
  database: dbConfig.DB,
  options: {
    encrypt: false,
  },
};

router.get("/user_creedians", isAuthenticated, function (req, res, next) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var query = ``;

      const filters = req.query.filters;
      if (filters) {
        query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
        query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
      }

      var reqCount = new sql.Request();
      reqCount.query(`SELECT COUNT(*) FROM [user_creedians] ${query}`, function (err, result) {
        if (err) console.log(err);
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

        var reqData = new sql.Request();
        reqData.query(`SELECT * FROM [user_creedians] ${query}`, function (err, result) {
          if (err) console.log(err);

          const data = result.recordset.map((item, index) => {
            return {
              key: index,
              ...item,
            }
          });

          res.send({
            results: data,
            info: {
              total: totalCount,
            },
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/user_creedians_charge_log", isAuthenticated, function (req, res, next) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var query = ``;

      const filters = req.query.filters;
      if (filters) {
        query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
        query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
        query += ` AND [character_name] LIKE '%${filters.character_name}%'`;
        query += ` AND [character_no] LIKE '%${filters.character_no}%'`;
        query += ` AND [charge_type] LIKE '%${filters.charge_type}%'`;
        query += ` AND [map] LIKE '%${filters.map}%'`;
        query += ` AND [x] LIKE '%${filters.x}%'`;
        query += ` AND [y] LIKE '%${filters.y}%'`;
      }
      var reqCount = new sql.Request();
      reqCount.query(`SELECT COUNT(*) FROM [user_creedians_charge_log] ${query}`, function (err, result) {
        if (err) console.log(err);
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

        var reqData = new sql.Request();
        reqData.query(`SELECT * FROM [user_creedians_charge_log] ${query}`, function (err, result) {
          if (err) console.log(err);

          const data = result.recordset.map((item, index) => {
            return {
              key: index,
              ...item,
            }
          });

          res.send({
            results: data,
            info: {
              total: totalCount,
            },
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/user_creedians_use_log", isAuthenticated, function (req, res, next) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);

      var query = ``;

      const filters = req.query.filters;
      if (filters) {
        query += ` WHERE [user_no] LIKE '%${filters.user_no}%'`;
        query += ` AND [user_id] LIKE '%${filters.user_id}%'`;
        query += ` AND [use_type] LIKE '%${filters.use_type}%'`;
      }
      var reqCount = new sql.Request();
      reqCount.query(`SELECT COUNT(*) FROM [user_creedians_use_log] ${query}`, function (err, result) {
        if (err) console.log(err);
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

        var reqData = new sql.Request();
        reqData.query(`SELECT * FROM [user_creedians_use_log] ${query}`, function (err, result) {
          if (err) console.log(err);

          const data = result.recordset.map((item, index) => {
            return {
              key: index,
              ...item,
            }
          });

          res.send({
            results: data,
            info: {
              total: totalCount,
            },
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
