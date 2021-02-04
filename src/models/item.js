const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

const db = require("../db");

const Item = db.define("item", {
  itemName: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(0, 2),
  },
});

Item.associate = (models) => {
  Item.belongsTo(models.Collection);
};

module.exports = Item;
