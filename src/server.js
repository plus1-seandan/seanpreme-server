const express = require("express");
const mongoose = require("mongoose");
const Collection = require("./models/category");
const categoryRouter = require("./routes/category");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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
app.use("/categories", categoryRouter);

app.listen(5000);
