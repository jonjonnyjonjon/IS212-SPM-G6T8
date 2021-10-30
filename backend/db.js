// const path = require('path')
// require("dotenv").config({ path: path.join(__dirname, "../.env") })
require("dotenv").config()
const mysql = require("mysql");
// Create a connection to the database
const connection = mysql.createConnection({
    // host: "localhost",
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: "spmg6t8"
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME
})

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
})

module.exports = connection;