const mysql2 = require("mysql2");
require("dotenv").config();

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

if (db) {
  console.log("database connect");
}

module.exports = db