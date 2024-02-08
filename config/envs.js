require('dotenv').config();

//calling .env settings
module.exports = {
  NAME: "tmdb_users",
  PORT: 3001,
  DB_HOST: "tmdb_users",
  SECRET: process.env.SECRET,
  TMDB_API_KEY: process.env.API_KEY,
  TMDB_API_TOKEN: process.env.API_TOKEN,
};
