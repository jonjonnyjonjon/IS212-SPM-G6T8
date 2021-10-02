const mysql = require("mysql");
const config = require("./dbconfig");

// Create a connection to the database
const connection = mysql.createConnection(config)

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
})

module.exports = connection;