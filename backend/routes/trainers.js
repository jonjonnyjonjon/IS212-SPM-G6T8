const express = require("express")
const router = express.Router()
const db = require("../db")

// Get all trainers
router.get("/", (req, res) => {
	let sql = "SELECT * from trainers"

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

// Get trainers who are qualified to teach a specific course
router.post("/qualified", (req, res) => {
	const courseID = req.body.courseID.slice(0,6)
	let sql = `SELECT * from trainers WHERE qualified = "${courseID}"`

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

// Get all courses under trainer_email = johnappleseed@aio.com
router.get("/getTrainerCourses", (req, res) => {
	let sql = `SELECT * from classes left join courses on 
	courses.course_id = classes.course_id where trainer_email = 'jacksparrow@aio.com'`

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

module.exports = router