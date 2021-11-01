const express = require("express")
const router = express.Router()
const db = require("../db")

// Get engineers who are eligible to take a specific course
router.get("/eligibleEngineers", (req, res) => {
	// get list of engineers who 
	// 1. have not cleared the course
	// 2. have not been enrolled
	let sql = `SELECT * FROM engineers 
	WHERE email NOT IN ( SELECT engineer_email FROM completed_courses WHERE course_id = "${req.query.courseID}") 
	AND email not in (SELECT engineer_email FROM enrolled WHERE course_id = "${req.query.courseID}");`

	// get list of engineers who have cleared the prereq if any
	let prereqCondition = `SELECT * FROM completed_courses WHERE course_id IN (SELECT prereq_course_id FROM course_prereq WHERE course_id = "${req.query.courseID}");`

	if (req.query.hasPrereq == 1) {
		sql = `SELECT * from (${sql.slice(0, -1)}) as t1, (${prereqCondition.slice(0, -1)}) as t2 WHERE t1.email = t2.engineer_email;`
	}
	
	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.json(rows) 
		}
	})
})

module.exports = router