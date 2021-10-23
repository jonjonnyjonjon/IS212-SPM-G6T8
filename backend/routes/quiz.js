const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
	let sql = "SELECT * from quiz"

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
		} else {
			res.json(rows) 
		}
	})
})

router.post('/quiz', (req, res) => {
	let sql = `INSERT INTO quiz VALUES ("${req.body.quizType}", "${req.body.time}", "${req.body.question}", ${req.body.answer}, "${req.body.options}"`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log("1 record inserted to quiz table")
		}
	})
})

module.exports = router