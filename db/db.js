const mysql = require("mysql");
const prompts = require("../lib/prompts")

const connection = mysql.createConnection({
 host: "localhost",
 port: 8080,
 user: "root",
 password: "password",
 database: "employee-tracker"
});

connection.connect(function(err) {

}

