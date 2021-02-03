const express = require("express");
const mongoose = require("mongoose");
const Collection = require("./models/category");
const categoryRouter = require("./routes/category");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt_decode = require("jwt-decode");
require("dotenv").config();
const passportSetup = require("./config/passport");
const User = require("./models/user");
const session = require("express-session");

const app = express();

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

try {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected MongoDB database")
  );
} catch (error) {
  console.log("could not connect to mongo");
}

app.get("/", function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

app.get("/cookie", (req, res) => {
  const options = {
    secure: false,
    httpOnly: false,
    domain: ".your.domain.com",
  };
  return res
    .cookie("cookieName", "cookieValue", options)
    .status(200)
    .send("cookie sent");
});

app.post("/google", async (req, res) => {
  console.log({ session: req.session });
  if (req.session.userId) {
    console.log("already logged in");
  }
  const decodedUser = jwt_decode(req.body.token);
  let user = await User.findOne({ email: decodedUser.email });
  if (user) {
    //user already in db
    console.log("user found ");
    console.log({ user });
  } else {
    console.log(decodedUser);

    const _user = new User({
      firstName: decodedUser.given_name,
      lastName: decodedUser.family_name,
      email: decodedUser.email,
    });
    user = await _user.save();
  }
  req.session.userId = user.id;
  console.log({ session: req.session });
  console.log({ userId: user.id });
  res.json(user);
});

//callback route for google to redirect to -> this time we have code for our profile info
app.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log({ req });
  res.send(req.user);
});

app.use("/categories", categoryRouter);

app.listen(5000);
