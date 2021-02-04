const express = require("express");
const models = require("../models");
const Category = require("../models/collection");
const router = express.Router();

router.get("/", async (req, res) => {
  const id = parseInt(req.query.id);
  const items = await models.Collection.findAll({
    where: { id },
    include: {
      model: models.Item,
    },
  });
  res.json(items);
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
