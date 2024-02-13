const mssql = require('mssql');

const DB_CONFIG = {
  server: process.env.DB_SERVER,
  port: +process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: false,
  },
  dialect: "mssql",
};

exports.DbPool = new mssql.ConnectionPool(DB_CONFIG);
