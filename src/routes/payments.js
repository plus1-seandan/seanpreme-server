const express = require("express");
const models = require("../models");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_PUBLIC_KEY);

require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { id, amount, customer } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: `${id} ${customer.firstName} ${customer.lastName} - ${amount}`,
      payment_method: id,
      confirm: true,
    });
    return res.status(200).json({
      confirm: "success",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = router;
