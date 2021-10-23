const express = require("express")
const router = express.Router()
const db = require("../db")

/* Retrieve AVAILABLE courses 
Courses WHERE there are either:
1. no pre-requisites OR,
2. courses that I have completed, where I meet those prerequisites BUT have not completed them */
// ASSUMPTIONS NOW: All courses are available to be taught - not considering enrolment period yet
router.get("/retrieveEligible", (req, res) => {
	let sql = ` SELECT * FROM Courses
                WHERE courseID not in (
					SELECT courseID FROM completed_courses WHERE email ='keithchiang.2019@aio.com') 
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
			res.json(rows) 
		}
	})
})

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