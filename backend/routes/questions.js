const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
	let sql = "SELECT * from questions"

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

router.post('/quiz', (req, res) => {
	let sql = `INSERT INTO questions VALUES ("${req.body.quizType}", "${req.body.time}", "${req.body.question}", ${req.body.answer}, "${req.body.option}"`

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