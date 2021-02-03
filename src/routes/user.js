const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

//register new user
router.post("/", async (req, res) => {
  try {
    //check if email already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send("user exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const _user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await _user.save();
    res.send("success");
  } catch (e) {
    console.log(e);
    res.send("fail");
  }
  //   try {
  //     const hashedPassword = await bcrypt.hash(req.query.password, 10);
  //     const user = await models.User.create({
  //       ...req.query,
  //       password: hashedPassword,
  //     });
  //     res.send("success");
  //   } catch (error) {
  //     res.status(400).send({
  //       message: error.message,
  //     });
  //   }
});
module.exports = router;
