const express = require("express");
const cors = require("cors")
const mysql = require("mysql")
const app = express();

const conn = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "spmg6t8"
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});


// Middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
	res.json({"message": "Hello World!"});
});

app.get("/courses", (req, res) => {
	conn.query("SELECT * from courses", (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(rows) 
		}
	})
})

app.listen(5000, function () {
	console.log('Example app listening on port 5000!');
});