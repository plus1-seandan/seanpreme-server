const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt_decode = require("jwt-decode");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const User = require("./models/user");
const session = require("express-session");
const categoryRouter = require("./routes/category");
const router = require("./routes");

//start server
const app = express();

//add middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
      httpOnly: true,
      sameSite: "lax",
      secure: false, //cookie only works in https
    },
    saveUninitialized: false,
    secret: "somesecretkey",
    resave: false,
  })
);

//connect to mongo db
try {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected MongoDB database")
  );
} catch (error) {
  console.log("could not connect to mongo");
}

app.use(router);

app.listen(5000);
