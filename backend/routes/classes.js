const express = require("express")
const router = express.Router()
const db = require("../db")

// get exact course + class
router.get("/class", (req, res) => {
    let courseID = req.query.courseID
    let classID = req.query.classID
	let sql = `SELECT * from classes WHERE course_id = "${courseID}" AND class_id = "${classID}"`

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

// gets all classes by course_id
router.get("/courseID", (req, res) => {
    let courseID = req.query.courseID
	let sql = `SELECT * from classes WHERE course_id = "${courseID}"`

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
router.get("/filter", (req, res) => {
	let filter = req.query.filter
    let courseID = req.query.courseID
	let sql;
	if (filter === "published") {
		sql = `SELECT * from classes WHERE course_id = "${courseID}" AND is_published = True`
	} else if (filter === "ready") {
		sql = `SELECT * from classes WHERE course_id = "${courseID}" AND material_status = True AND is_published = False`
	} else {
		sql = `SELECT * from classes WHERE course_id = "${courseID}" AND material_status = False`
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

router.post("/createClass", (req, res) => {
	let sql = `INSERT INTO classes VALUES ( "${req.body.courseID}", "${req.body.classID}", "${req.body.trainerEmail}", "${req.body.size}", 0, "${req.body.enrolmentStart}", "${req.body.enrolmentEnd}", "${req.body.classStart}", "${req.body.classEnd}", 0, 0 )`

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

router.post("/publishClass", (req, res) => {
	let sql = `UPDATE classes SET is_published = True \
		WHERE course_id = "${req.body.courseID}" AND class_id = "${req.body.classID}"`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log(`Course ${req.body.courseID} ${req.body.classID} is published.`)
		}
	})
})

router.post("/editClass", (req, res) => {
	let sql = `UPDATE classes SET \
            trainer_email = "${req.body.trainer}", \
            size = ${req.body.size}, \
            enrolment_start = "${req.body.enrolmentStart}", \
            enrolment_end = "${req.body.enrolmentEnd}", \
            class_start = "${req.body.classStart}", \
            class_end = "${req.body.classEnd}"
            WHERE course_id = "${req.body.courseID}" AND class_id = "${req.body.classID}"`

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

module.exports = router