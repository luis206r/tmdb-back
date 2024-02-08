const db = require("../index");
const S = require("sequelize");

class Favorites extends S.Model { }

Favorites.init(
  {
    type: {
      type: S.DataTypes.STRING,
      allowNull: false
    },
    type_id: {
      type: S.DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    poster_path: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: S.DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "favorites" }
);


module.exports = Favorites;
