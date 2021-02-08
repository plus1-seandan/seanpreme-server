const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt_decode = require("jwt-decode");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const router = require("./routes");
const db = require("./db");
const { models } = require("./db");

const main = async () => {
  const app = express();
  //add middleware

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  await db.sync({
    models,
    // force: true,
    alter: true,
  }); //force syncs database for development

  app.use(router);

  app.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000/`);
  });
};

main().catch((err) => {
  console.log(err);
});
