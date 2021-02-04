const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

const db = require("../db");

const User = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "invalid email",
      },
    },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.addHook("beforeValidate", async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});
User.associate = (models) => {};

module.exports = User;
