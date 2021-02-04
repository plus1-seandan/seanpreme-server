const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const models = require("../models");

const router = express.Router();

//register new user
router.post("/", async (req, res) => {
  try {
    //check if email already exists
    const userExists = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      res.send("user exists");
      return;
    }
    const user = await models.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    res.send("success");
  } catch (e) {
    console.log(e);
    res.send("fail");
  }
});
module.exports = router;
