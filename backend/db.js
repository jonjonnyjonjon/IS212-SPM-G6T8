require("dotenv/config")
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "spmg6t8"
})

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
})

module.exports = connection;