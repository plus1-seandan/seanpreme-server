const express = require("express");
const categoryRouter = require("./collections");
const userRouter = require("./user");
const googleRouter = require("./auth");
const paymentsRouter = require("./payments");

const router = express.Router();

//test api
//routes. need to move these
router.get("/", function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

router.use("/collections", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", googleRouter);
router.use("/payments", paymentsRouter);

module.exports = router;
