module.exports = {
  HOST: "192.168.48.128",
  PORT: 1433,
  USER: "sa",
  PASSWORD: "Password!23",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
