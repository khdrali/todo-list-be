require("dotenv").config();
const jwt = require("jsonwebtoken");

const decodedToken = (authorization) => {
  return jwt.verify(authorization.replace("Bearer ", ""), process.env.JWT_KEY);
};

module.exports = { decodedToken };
