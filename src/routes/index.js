const express = require("express");
const categoryRouter = require("./collections");
const userRouter = require("./user");
const googleRouter = require("./auth");
const paymentsRouter = require("./payments");
const models = require("../models");
const images = require("../data");

const router = express.Router();

//test api
//routes. need to move these
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

router.use("/collections", categoryRouter);
router.use("/users", userRouter);
router.use("/auth", googleRouter);
router.use("/payments", paymentsRouter);

module.exports = router;
