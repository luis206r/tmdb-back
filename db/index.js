const Sequelize = require("sequelize");
const config = require("../config/envs");

const db = new Sequelize(config.NAME, config.USERNAME, config.PASSWORD, {
  host: config.DB_HOST,
  dialect: "postgres",
  //logging: true,
});

module.exports = db;
