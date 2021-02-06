const express = require("express");
const axios = require("axios");

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

router.get("/search", async (req, res) => {
  try {
    var unirest = require("unirest");
    let response;
    var req = unirest("POST", "https://similar-clothes-ai.p.rapidapi.com/");

    req.headers({
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": "b7ba171c59msh6a6cc506f7587fcp15ad23jsnf63cbcf203d6",
      "x-rapidapi-host": "similar-clothes-ai.p.rapidapi.com",
      useQueryString: true,
    });

    req.form({
      url:
        "https://i.pinimg.com/474x/dd/9d/e9/dd9de9ef19efdea8d8720d0e3f30ec73.jpg",
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      response = res;
    });
    console.log({ response });

    // const response = await axios.post(
    //   "https://similar-clothes-ai.p.rapidapi.com/",
    //   {
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "x-rapidapi-key":
    //         "b7ba171c59msh6a6cc506f7587fcp15ad23jsnf63cbcf203d6",
    //       "x-rapidapi-host": "similar-clothes-ai.p.rapidapi.com",
    //       useQueryString: true,
    //     },
    //   },
    //   {
    //     url:
    //       "https://i.pinimg.com/474x/dd/9d/e9/dd9de9ef19efdea8d8720d0e3f30ec73.jpg",
    //   }
    // );
    // console.log(response);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
