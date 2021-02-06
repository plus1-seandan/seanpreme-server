const express = require("express");
const axios = require("axios");

const models = require("../models");
const {
  getPagingData,
  getPagination,
  getSort,
} = require("../utils/collection");
const router = express.Router();

router.get("/", async (req, res) => {
  const { _page, _limit, _collectionId, _sort } = req.query;

  const { limit, offset } = getPagination(_page, _limit);
  try {
    const collection = await models.Collection.findOne({
      where: { id: _collectionId },
    });
    const _items = await models.Item.findAndCountAll({
      where: { collectionId: _collectionId },
      order: [getSort(_sort)],
      limit,
      offset,
    });
    const items = getPagingData(_items, _page, limit);
    return res.status(200).json({ collection, items });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
