const express = require("express");
const categoryRouter = require("./category");
const userRouter = require("./user");
const googleRouter = require("./auth");

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

router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", googleRouter);

module.exports = router;
