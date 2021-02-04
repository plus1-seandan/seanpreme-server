const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const { models } = require("../db");

router.post("/google", async (req, res) => {
  if (req.session.userId) {
    console.log("already logged in");
  }
  const decodedUser = jwt_decode(req.body.token);
  let user = await models.User.findOne({ where: { email: decodedUser.email } });
  if (!user) {
    user = await models.User.create({
      firstName: decodedUser.given_name,
      lastName: decodedUser.family_name,
      email: decodedUser.email,
    });
  }
  req.session.userId = user.id;
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await models.User.findOne({ where: { email: req.body.email } });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    //email and password matched
    req.session.userId = user.id;
  }
  res.json(user);
});

module.exports = router;
