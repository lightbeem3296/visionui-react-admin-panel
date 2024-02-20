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

exports.dbQuerySafe = async (dbPool, inputs, query) => {
  let req = dbPool.request();
  for (let i in inputs) {
    let input = inputs[i];
    req = req.input(...input);
  }
  return await req.query(query);
}

exports.dbExecSP = async (dbPool, inputs, outputs, spName) => {
  let req = dbPool.request();
  for (let i in inputs) {
    let input = inputs[i];
    req = req.input(...input);
  }
  for (let i in outputs) {
    let output = outputs[i];
    req = req.output(...output);
  }
  return await req.execute(spName);
}
