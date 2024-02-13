const Sequelize = require("sequelize");
const config = require("../config/envs");

// const db = new Sequelize(config.NAME, config.USERNAME, config.PASSWORD, {
//   host: config.DB_HOST,
//   dialect: "postgres",
//   //logging: true,
// });

const db = new Sequelize("postgres://tmdb_users_user:UPxvAqzJC7IBc43AD9QSe8AZ5flEVPzs@dpg-cn5tc57sc6pc73c78ss0-a.oregon-postgres.render.com/tmdb_users",
"tmdb_users_user",
"UPxvAqzJC7IBc43AD9QSe8AZ5flEVPzs",
{
  //host:"dpg-cn5tc57sc6pc73c78ss0-a",
  dialect:"postgres",
});

db.authenticate()
.then(()=>{
  console.log("Authentication successful", db.config.database);
})
.catch((err)=>{
  console.error("Failed to authenticate", err);
})
module.exports = db;
