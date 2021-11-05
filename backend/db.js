require("dotenv/config")
const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.NODE_ENV === "production" ? process.env.RDS_HOSTNAME : process.env.DB_HOST,
    user: process.env.NODE_ENV === "production" ? process.env.RDS_USERNAME : process.env.DB_USER,
    password: process.env.NODE_ENV === "production" ? process.env.RDS_PASSWORD : process.env.DB_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME
})

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
})

module.exports = connection;