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
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from [user_creedians]", function (err, result) {
      if (err) console.log(err);
      res.send(result.recordset);
    });
  });
});

router.get("/user_creedians_charge_log", isAuthenticated, function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from [user_creedians_charge_log]", function (err, result) {
      if (err) console.log(err);
      res.send(result.recordset);
    });
  });
});

router.get("/user_creedians_use_log", isAuthenticated, function (req, res, next) {
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("select * from [user_creedians_use_log]", function (err, result) {
      if (err) console.log(err);
      res.send(result.recordset);
    });
  });
});

module.exports = router;
