const Sequelize = require("sequelize");

const Collection = require("./collection");
const User = require("./user");
const Item = require("./item");
const Favorite = require("./favorite");

const db = require("../db");

const models = {
  User,
  Collection,
  Item,
  Favorite,
};

//if a model has associate attribute, create the associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;
