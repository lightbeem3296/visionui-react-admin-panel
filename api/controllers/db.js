const mssql = require('mssql');

const DB_CONFIG = {
  server: "192.168.48.128",
  port: 1433,
  user: "sa",
  password: "Password!23",
  options: {
    encrypt: false,
  },
  dialect: "mssql",
};

exports.DbPool = new mssql.ConnectionPool(DB_CONFIG);
