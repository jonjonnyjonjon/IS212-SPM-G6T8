const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
	let sql = "SELECT * from courses"

	db.query(sql, (err, rows) => {
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

router.post('/createCourse', (req, res) => {
	let sql = `INSERT INTO courses VALUES ("${req.body.courseName}", "${req.body.class}", ${req.body.size}, "${req.body.startDate}", "${req.body.endDate}")`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log("1 record inserted to courses table")
		}
	})
})

module.exports = router