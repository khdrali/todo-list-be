// require("dotenv").config();
const postgres = require("postgres");

const connect = postgres({
  host: "localhost",
  port: 5432,
  database: "dbtest",
  username: "postgres",
  password: "021098ka",
});

module.exports = connect;
