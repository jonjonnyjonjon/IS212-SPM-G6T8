const express = require("express")
const router = express.Router()
const db = require("../db")

// Post enrolment request by engineer 
router.post("/enrol", (req, res) => {
	let sql = `INSERT INTO enrol_request VALUES (
		"${req.body.engineerEmail}",
		"${req.body.courseID}",
		"${req.body.classID}"
	)`

	db.query(sql, (err) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.status(200).send({
				message: `${req.body.engineerEmail} enrolment into ${req.body.courseID} ${req.body.classID} has been added to enrol_request table.`
			})
		}
	})
})

// Get pending self-enrolment requests + details FOR engineer_email='keithchiang@aio.com'
router.get("/getPendingRequest", (req, res) => {
	let sql = `
	SELECT
		course.course_id, course.course_name, course.course_summary, class.class_id, t.name as trainer_name, class.trainer_email, class.size, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end
	FROM
		enrol_request er INNER JOIN classes class INNER JOIN courses course INNER JOIN trainers t
	ON
		er.course_id = class.course_id AND er.class_id = class.class_id AND class.course_id = course.course_id AND class.trainer_email = t.email
	WHERE
		engineer_email = 'keithchiang@aio.com'
    `

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.json(result)
		}
	})
})

// Delete a specific self-enrolment request
router.delete("/delPendingRequest", (req, res) => {
	let sql = `
	DELETE FROM enrol_request
	WHERE course_id='${req.body.courseID}'
	AND class_id='${req.body.classID}'
	AND engineer_email='${req.body.engineerEmail}'
    `

	db.query(sql, (err) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.status(200).send({
				message: '1 record has been deleted.'
			})		
		}
	})
})


module.exports = router