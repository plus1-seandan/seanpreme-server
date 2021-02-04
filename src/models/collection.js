const { Sequelize } = require("sequelize");

const db = require("../db");

const Collection = db.define("collection", {
  collectionName: {
    type: Sequelize.STRING,
  },
});

Collection.associate = (models) => {
  Collection.hasMany(models.Item);
};
module.exports = Collection;
