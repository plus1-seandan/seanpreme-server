const express = require("express");
const axios = require("axios");

const models = require("../models");
const { getPagingData, getPagination } = require("../utils/collection");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("hit");
  const { id } = req.query;
  try {
    const product = await models.Item.findOne({
      where: { id: parseInt(id) },
    });
    console.log({ product });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
