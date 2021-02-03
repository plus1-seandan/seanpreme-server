const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.post("/google", async (req, res) => {
  if (req.session.userId) {
    console.log("already logged in");
  }
  const decodedUser = jwt_decode(req.body.token);
  let user = await User.findOne({ email: decodedUser.email });
  if (!user) {
    const _user = new User({
      firstName: decodedUser.given_name,
      lastName: decodedUser.family_name,
      email: decodedUser.email,
    });
    user = await _user.save();
  }
  req.session.userId = user.id;
  res.json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    //email and password matched
    req.session.userId = user.id;
    res.send("success");
  } else {
    res.send("fail");
  }
});

module.exports = router;
