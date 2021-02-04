const express = require("express");
const models = require("../models");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);

require("dotenv").config();

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
  try {
    const { items, token, total } = req.body;
    const idempotencyKey = uuidv4();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const response = await stripe.charges.create(
      {
        amount: total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "order for sean",
        shipping: {
          name: token.card.name,
          address: {
            line1: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: "94111",
          },
        },
      },
      { idempotencyKey }
    );
    console.log({ response });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
