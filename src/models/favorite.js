const { Sequelize } = require("sequelize");

const db = require("../db");

const Favorite = db.define("favorite", {});

// Favorite.associate = (models) => {};

module.exports = Favorite;
