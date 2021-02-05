const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const models = require("../models");

router.post("/google", async (req, res) => {
  try {
    const decodedUser = jwt_decode(req.body.token);
    let user = await models.User.findOne({
      where: { email: decodedUser.email },
    });
    if (!user) {
      user = await models.User.create({
        firstName: decodedUser.given_name,
        lastName: decodedUser.family_name,
        email: decodedUser.email,
        password: "google",
      });
    }
    req.session.userId = user.id;
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send("fail");
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      //email and password matched
      req.session.userId = user.id;
      res.json(user);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("fail");
  }
});

router.get("/logged-in", async (req, res) => {
  if (req.session.userId) {
    res.send("logged in");
  }
  res.send("not logged in");
});

module.exports = router;
