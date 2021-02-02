const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("In category");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const category = new Category({
    name: req.body.name,
  });
  try {
    const response = await category.save();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

module.exports = router;
