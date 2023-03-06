const { createPool } = require("mysql");
const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "products_database",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Database connectd");
});

const pool = createPool({
  user: "root",
  host: "localhost",
  password: "password",
  database: "products_database",
});

module.exports = { pool, connection };
