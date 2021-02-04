const { Sequelize } = require("sequelize");

const db = new Sequelize("ecommerce", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  define: {
    underscored: true,
  },
  logging: true,
});

module.exports = db;
