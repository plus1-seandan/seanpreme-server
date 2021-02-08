const jwt = require("jsonwebtoken");
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

const createTokens = async (user, secret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ["id", "username"]),
    },
    secret,
    {
      expiresIn: "7d",
    }
  );

  return createToken;
};

const parseToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  return jwt_decode(token);
};

module.exports = { createTokens, parseToken };
