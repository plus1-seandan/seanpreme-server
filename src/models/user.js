const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  googleId: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
