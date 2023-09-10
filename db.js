require("dotenv").config();
const postgres = require("postgres");

const connect = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  username: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

module.exports = connect;
