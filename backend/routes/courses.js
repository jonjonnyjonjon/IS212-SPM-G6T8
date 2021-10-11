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
		DEFAULT, DEFAULT)`

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

/* Retrieve AVAILABLE courses 
Courses WHERE there are either:
1. no pre-requisites OR,
2. courses that I have completed, where I meet those prerequisites BUT have not completed them */
// ASSUMPTIONS NOW: All courses are available to be taught - not considering enrolment period yet
router.get("/retrieveEligible", (req, res) => {
	let sql = ` SELECT * FROM Courses
                WHERE courseID not in (SELECT courseID FROM completed_courses WHERE email ='keithchiang.2019@aio.com') 
                AND hasPrereq = False
                OR (courseID in (SELECT courseID FROM course_prereq
                                WHERE prereqCourseID in (SELECT courseID FROM completed_courses WHERE email='keithchiang.2019@aio.com')
                                AND courseID not in (SELECT courseID FROM completed_courses WHERE email='keithchiang.2019@aio.com'))
                    ); `;

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(rows) 
		}
	})
})

// Retrieve completed courses
router.get("/retrieveCompleted", (req, res) => {
	let sql = `SELECT c.courseID, c.courseName, c.trainer, cc.completedDate
                FROM courses c, completed_courses cc
                WHERE c.courseID = cc.courseID
                AND email = 'keithchiang.2019@aio.com'
                `;

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(rows) 
		}
	})
})

/*  RETRIEVE INELIGIBLE COURSES
    Courses WHERE
    1. there are prerequisites AND
    2. courses that I have not met the prerequisites for AND have not completed
*/
router.get("/retrieveIneligible", (req, res) => {
	let sql = ` SELECT  c.courseID, c.courseName, c.class, c.size, c.trainer, c.startDate, c.endDate, p.prereqCourseID
                FROM courses c, course_prereq p
                WHERE c.courseID = p.courseID
                AND c.hasPrereq = True
                AND c.courseID in (SELECT courseID FROM course_prereq
                WHERE prereqCourseID not in (SELECT courseID FROM completed_courses WHERE email='keithchiang.2019@aio.com'));
                
                `;

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(rows) 
		}
	})
})

module.exports = router