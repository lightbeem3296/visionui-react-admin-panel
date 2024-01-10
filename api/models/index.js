const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    dialectOptions: {
        options: {
            encrypt: false,
            enableArithAbort: false,
        },
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_creedians = require("./user_creedian.js")(sequelize, Sequelize);

module.exports = db;