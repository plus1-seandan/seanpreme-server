const express = require("express");
const models = require("../models");
const { getPagingData, getPagination } = require("../utils/collection");
const router = express.Router();

router.get("/", async (req, res) => {
  const { _page, _limit, _collectionId } = req.query;
  //setting up number of items to be fetched
  const { limit, offset } = getPagination(_page, _limit);
  try {
    const collection = await models.Collection.findOne({
      where: { id: _collectionId },
    });
    const _items = await models.Item.findAndCountAll({
      where: { collectionId: _collectionId },
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
