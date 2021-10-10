const express = require("express")
const router = express.Router()
const db = require("../db")

// gets all courses
router.post("/", (req, res) => {
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

// gets courses based on filter
router.post("/filter", (req, res) => {
	let filter = req.body.filter
	let sql;
	if (filter === "Published") {
		sql = "SELECT * from courses WHERE isPublished = True"
	} else if (filter === "Ready") {
		sql = "SELECT * from courses WHERE materialStatus = True AND isPublished = False"
	} else {
		sql = "SELECT * from courses WHERE materialStatus = False"
	}

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

router.post("/courseID", (req, res) => {
	let sql = `SELECT * from courses WHERE courseID="${req.body.courseID}"`

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

router.post("/createCourse", (req, res) => {
	let sql = `INSERT INTO courses VALUES ( \
		"${req.body.courseID}", \
		"${req.body.courseName}", \
		"${req.body.class}", \
		${req.body.size}, \
		"${req.body.trainer}", \
		"${req.body.enrolmentStart}", \
		"${req.body.enrolmentEnd}", \
		"${req.body.startDate}", \
		"${req.body.endDate}", \
		)`

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

router.post("/editCourse", (req, res) => {
	let sql = `UPDATE courses SET \
		courseName = "${req.body.courseName}", \
		class = "${req.body.class}", \
		size = ${req.body.size}, \
		trainer = "${req.body.trainer}", \
		enrolmentStart = "${req.body.enrolmentStart}", \
		enrolmentEnd = "${req.body.enrolmentEnd}", \
		startDate = "${req.body.startDate}", \
		endDate = "${req.body.endDate}"
		WHERE courseID = "${req.body.courseID}"`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log("1 record edited and saved into table")
		}
	})
})

router.post("/publishCourse", (req, res) => {
	let sql = `UPDATE courses SET isPublished = True \
		WHERE courseID = "${req.body.courseID}"`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log(`Course ${req.body.courseID} is published.`)
		}
	})
})

module.exports = router