const express = require("express");
const categoryRouter = require("./collections");
const userRouter = require("./user");
const googleRouter = require("./auth");
const paymentsRouter = require("./payments");
const models = require("../models");
const images = require("../data");
const productsRouter = require("./products");
const { default: axios } = require("axios");

const router = express.Router();

router.use("/collections", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", googleRouter);
router.use("/payments", paymentsRouter);
router.use("/products", productsRouter);

//test api
//routes. need to move these

router.get("/caps", async (req, res) => {
  const { data: results } = await axios.get(
    "https://api.unsplash.com/search/photos?query=caps-hats&client_id=zs-D5ntCczDVzsYHZD8xke9-Yl3yDdhRNVSm7k27xr8&per_page=100"
  );
  // console.log({ data: data });
  const capsData = await models.Item.findAll({ where: { collectionId: 1 } });
  idx = 0;
  for (let i = 0; i < capsData.length; i++) {
    if (idx >= results.results.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: results.results[idx].urls.regular },
      {
        where: {
          id: capsData[i].id,
        },
      }
    );
    idx += 1;
  }
  res.send("success");
});

router.get("/jackets", async (req, res) => {
  const { data: results } = await axios.get(
    "https://api.unsplash.com/search/photos?query=fashion-jacket&client_id=zs-D5ntCczDVzsYHZD8xke9-Yl3yDdhRNVSm7k27xr8&per_page=100"
  );
  // console.log({ data: data });
  const capsData = await models.Item.findAll({ where: { collectionId: 3 } });
  idx = 0;
  for (let i = 0; i < capsData.length; i++) {
    if (idx >= results.results.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: results.results[idx].urls.regular },
      {
        where: {
          id: capsData[i].id,
        },
      }
    );
    idx += 1;
  }
  res.send("success");
});
router.get("/tops", async (req, res) => {
  const { data: results } = await axios.get(
    "https://api.unsplash.com/search/photos?query=t-shirt&client_id=zs-D5ntCczDVzsYHZD8xke9-Yl3yDdhRNVSm7k27xr8&per_page=100"
  );
  // console.log({ data: data });
  const capsData = await models.Item.findAll({ where: { collectionId: 4 } });
  idx = 0;
  for (let i = 0; i < capsData.length; i++) {
    if (idx >= results.results.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: results.results[idx].urls.regular },
      {
        where: {
          id: capsData[i].id,
        },
      }
    );
    idx += 1;
  }
  res.send("success");
});

router.get("/", async function (req, res) {
  const tops = await models.Item.findAll({ where: { collectionId: 4 } });
  idx = 0;
  for (let i = 0; i < tops.length; i++) {
    if (idx >= images.tops.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: images.tops[idx] },
      {
        where: {
          id: tops[i].id,
        },
      }
    );
    idx += 1;
  }

  const hats = await models.Item.findAll({ where: { collectionId: 1 } });
  idx = 0;
  for (let i = 0; i < hats.length; i++) {
    if (idx >= images.hats.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: images.hats[idx] },
      {
        where: {
          id: hats[i].id,
        },
      }
    );
    idx += 1;
  }
  const shoes = await models.Item.findAll({ where: { collectionId: 2 } });
  idx = 0;
  for (let i = 0; i < shoes.length; i++) {
    if (idx >= images.shoes.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: images.shoes[idx] },
      {
        where: {
          id: shoes[i].id,
        },
      }
    );
    idx += 1;
  }
  const jackets = await models.Item.findAll({ where: { collectionId: 3 } });
  idx = 0;
  for (let i = 0; i < jackets.length; i++) {
    if (idx >= images.jackets.length) {
      idx = 0;
    }
    // update the permission where the ID matches and the permission does not
    const update = await models.Item.update(
      { imageUrl: images.jackets[idx] },
      {
        where: {
          id: jackets[i].id,
        },
      }
    );
    idx += 1;
  }
  res.send("success");
});

router.get("/shoes", async function (req, res) {
  const { data } = await axios.get(
    "http://api.thesneakerdatabase.com/v1/sneakers?limit=100"
  );

  data.results.map(async (shoe) => {
    await models.Item.create({
      collectionId: 2,
      imageUrl: shoe.media.imageUrl,
      itemName: shoe.name,
      price: shoe.retailPrice,
      description: shoe.title,
    });
  });
  res.send("success");
});

router.get("/supreme", async function (req, res) {
  supreme.find("sled", "all", (item, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(item);
    }
  });
  res.send("success");
});

module.exports = router;
