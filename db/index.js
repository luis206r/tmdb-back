const Sequelize = require("sequelize");
const config = require("../config/envs");

const db = new Sequelize(config.DB_HOST, null, null, {
  host: "localhost",
  dialect: "postgres",
  //logging: true,
});

module.exports = db;
