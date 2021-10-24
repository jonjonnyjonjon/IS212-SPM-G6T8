const express = require("express")
const router = express.Router()
const db = require("../db")

// gets all courses
router.get("/", (req, res) => {
	let sql = "SELECT * from classes left join courses on classes.course_id = courses.course_id WHERE trainer_email = 'johnappleseed.2021@aio.com'"

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

router.get("/getCourse", (req, res) => {
    
	let sql = `
    SELECT 
		course.course_id, course.course_name, course.course_summary, class.course_id, class.class_id, trainer.name as trainer_name, trainer.email as trainer_email, class.size, class.current_enrolled, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end
    FROM courses course, classes class, trainers trainer
    WHERE course.course_id = class.course_id
    AND trainer.email = class.trainer_email
    AND course.course_id = "${req.query.course_id}"`
	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(result[0])
		}
	})
    
})
router.get("/courseName", (req, res) => {
	let keyword = req.query.keyword
	let sql
	if (keyword) {
		sql =  `SELECT * from courses WHERE course_name LIKE "%${keyword}%"`
	} else {
		sql = "SELECT * from courses"
	}

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

router.get("/courseID", (req, res) => {
	let sql = `SELECT * from courses WHERE course_id="${req.body.courseID}"`


// Retrieve a course's class information (engineer viewing a course)
router.get("/getClassInfo", (req, res) => {
	let sql = `
        SELECT
            course.course_id, course.course_name, course.course_summary, class.class_id, t.name, t.email, class.size, class.current_enrolled, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end
        FROM
            courses course, classes class, trainers t
        WHERE
            course.course_id = class.course_id
        AND
            t.email = class.trainer_email
        AND
            class.course_id="${req.query.course_id}"
        AND
            class.class_id="${req.query.class_id}"
    `
	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(result[0])
		}
	})
    
})

// Retrieve a SPECIFIC course's prerequisites
router.get("/getPrereq", (req, res) => {
	let sql = `
        SELECT
            prereq_course_id
        FROM
            courses c, course_prereq cpr
        WHERE
            c.course_id = cpr.course_id
        AND
            c.course_id='${req.query.course_id}';
    `

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			// array of rows are already in the format of "data": []
			res.json(result)
		}
	})
    
})
router.post("/createCourse", (req, res) => {
	let sql = `INSERT INTO courses VALUES ( \
		"${req.body.courseID}", \
		"${req.body.courseName}", \
		"${req.body.courseSummary}", \
		${req.body.hasPrereq}
	)`

// Retrieve completed courses + course details FOR engineer='keithchiang.2019@aio.com'
router.get("/getCompleted", (req, res) => {
	let sql = `
        SELECT
            course.course_id, course.course_name, course.course_summary, class.class_id, t.name as trainer_name, t.email as trainer_email, class.size, class.class_start, class.class_end
        FROM
            courses course, classes class, completed_courses completed, trainers t
        WHERE
            course.course_id = class.course_id
        AND
            class.course_id = completed.course_id
        AND
            class.class_id = completed.class_id
        AND
            t.email = class.trainer_email
        AND
            completed.engineer_email = 'keithchiang.2019@aio.com';
    `
	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.status(200).send({
				message: `${req.body.courseID} ${req.body.courseName} inserted to courses table`
			})
		}
	})
})

// Retrieve ongoing courses + details FOR engineer='keithchiang.2019@aio.com'
router.get("/getOngoing", (req, res) => {
	let sql = `
    SELECT
        course.course_id, course.course_name, course.course_summary, class.class_id, t.name as trainer_name, class.trainer_email, class.size, class.class_start, class.class_end
    FROM
        courses course, classes class, enrolled enroll, trainers t
    WHERE
        course.course_id = enroll.course_id
    AND
        class.class_id = enroll.class_id
    AND
        t.email = class.trainer_email
    AND
        class.course_id = enroll.course_id;
    `

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.status(200).send({
				message: `${req.body.courseID} ${req.body.courseName} edited.`
			})
		}
	})
})

// Retrieve ineligible courses + details FOR engineer='keithchiang.2019@aio.com'
// Reason: Ineligible BECAUSE has completed it
router.get("/getIneligibleByCompleted", (req, res) => {
	let sql = `
        SELECT
            course.course_id, course.course_name, course.course_summary, class.class_id, t.name, class.trainer_email, class.size, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end
        FROM
            courses course, classes class, trainers t
        WHERE
            course.course_id = class.course_id
        AND
            class.is_published = 1
        AND
            class.material_status = 1
        AND
            t.email = class.trainer_email
        AND 
            class.course_id in (SELECT course_id from completed_courses WHERE engineer_email = 'keithchiang.2019@aio.com');
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



module.exports = router