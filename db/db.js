const mysql = require("mysql");
const prompts = require("../lib/prompts")

const connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: "root",
 password: "password",
 database: "employee_trackerDB"
});


module.exports = connection;

