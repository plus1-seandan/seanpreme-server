const express = require("express");
const mongoose = require("mongoose");
const Collection = require("./models/category");
const categoryRouter = require("./routes/category");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("dotenv").config();
const passportSetup = require("./config/passport");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1 day
    keys: [process.env.SESSION_KEY],
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

const authCheck = (req, res, next) => {
  if (!req.user) {
    return false;
  }
  return true;
};

try {
  mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected MongoDB database")
  );
} catch (error) {
  console.log("could not connect to mongo");
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

//callback route for google to redirect to -> this time we have code for our profile info
app.get("/google/callback", passport.authenticate("google"), (req, res) => {
  console.log({ req });
  res.send(req.user);
});

app.use("/categories", categoryRouter);

app.listen(5000);
