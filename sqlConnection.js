const mysql = require("mysql");
require('dotenv').config()


var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_Login,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_Name
});

connection.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});

module.exports = connection;
