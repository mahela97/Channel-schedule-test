const { createPool } = require("mysql");

const mysql = require("mysql");

const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "tv_test",
  connectionLimit: 10,
  multipleStatements: true,
  ssl: false,
});

module.exports = pool;
