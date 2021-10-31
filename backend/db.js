require("dotenv/config")
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    port: process.env.RDS_PORT
})

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
})

module.exports = connection;