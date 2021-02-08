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

  app.set("proxy", 1);
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || "localhost",
  });

  app.use(
    cors({
      // origin: process.env.CORS_ORIGIN,
      origin: "http://truculent-sister.surge.sh",
      credentials: true,
    })
  );
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(
    session({
      name: "seanscookie",
      store: new RedisStore({
        client: redisClient,
      }),
      secret: "somesecretkey",
      resave: false,
      saveUninitialized: true,
      proxy: true,
      cookie: {
        domain: "http://truculent-sister.surge.sh",
        secure: true,
      },
    })
  );

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
