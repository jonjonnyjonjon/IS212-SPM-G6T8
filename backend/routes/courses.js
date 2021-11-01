const express = require("express")
const router = express.Router()
const db = require("../db")

// Get all courses
router.get("/", (req, res) => {
	let sql = "SELECT * from classes left join courses on classes.course_id = courses.course_id where trainer_email = 'johnappleseed@aio.com'"


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

// Get course by its course name
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

// Get course by its course ID
router.get("/courseID", (req, res) => {
	let sql = `SELECT * from courses WHERE course_id="${req.query.courseID}"`

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

// Create a course
router.post("/createCourse", (req, res) => {
	let sql = `INSERT INTO courses VALUES ( \
		"${req.body.courseID}", \
		"${req.body.courseName}", \
		"${req.body.courseSummary}", \
		${req.body.hasPrereq}
	)`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occurred."
			})
		} else {
			res.status(500).send({
				message: `${req.body.courseID} ${req.body.courseName} has been added to courses table.`
			})
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
			res.json(result[0])
		}
	})
    
})

// Get a course's class information (engineer viewing a course)
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
			res.json(result[0])
		}
	})
    
})

// Get a SPECIFIC course's prerequisites
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
			res.json(result)
		}
	})
    
})

// Get completed courses + course details FOR engineer='keithchiang@aio.com'
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
            completed.engineer_email = 'keithchiang@aio.com';
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

// Get ongoing courses + details FOR engineer='keithchiang@aio.com'
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
			res.json(result)
		}
	})
})

/*  Get eligible courses + details FOR engineer='keithchiang@aio.com'
	Eligible means:
	(1) Met prereq AND
	(2) Not currently taking AND
	(3) Have not completed */
router.get("/getEligible", (req, res) => {
	let sql = `
	SELECT
		course.course_id, course.course_name, course.course_summary, class.class_id, t.name as trainer_name, class.trainer_email, class.size, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end,
		GROUP_CONCAT(cpr.prereq_course_id) as prerequisites
	FROM
		courses course, classes class, course_prereq cpr, trainers t
	WHERE
		course.course_id = class.course_id
	AND
		class.is_published = 1
	AND
		class.material_status = 1
	AND
		class.course_id = cpr.course_id
	AND
		t.email = class.trainer_email
	AND
		class.course_id not in (SELECT course_id from completed_courses WHERE engineer_email = 'keithchiang@aio.com')
	AND
		cpr.prereq_course_id in (SELECT course_id from completed_courses WHERE engineer_email = 'keithchiang@aio.com')
	AND
		(class.course_id, class.class_id) not in (SELECT course_id, class_id FROM enrolled WHERE engineer_email = 'keithchiang@aio.com')
	GROUP BY
		course.course_id, class.class_id;
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
	
// Get ineligible courses + details FOR engineer='keithchiang@aio.com'
// Reason: Ineligible BECAUSE prerequisites not met
router.get("/getIneligibleByPrereq", (req, res) => {
	let sql = `
		SELECT
			course.course_id, course.course_name, course.course_summary, class.class_id, t.name, class.trainer_email, class.size, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end, cpr.prereq_course_id
		FROM
			courses course, classes class, course_prereq cpr, trainers t
		WHERE
			course.course_id = class.course_id
		AND
			class.is_published = 1
		AND
			class.material_status = 1
		AND
			class.course_id = cpr.course_id
		AND
			t.email = class.trainer_email
		AND 
			cpr.prereq_course_id not in (SELECT course_id from completed_courses WHERE engineer_email = 'keithchiang@aio.com');
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
	
// Get ineligible courses + details FOR engineer='keithchiang@aio.com'
// Reason: Ineligible BECAUSE already enrolled currently
router.get("/getIneligibleByEnrolled", (req, res) => {
	let sql = `
		SELECT
			course.course_id, course.course_name, course.course_summary, class.class_id, t.name, class.trainer_email, class.size, class.enrolment_start, class.enrolment_end, class.class_start, class.class_end, cpr.prereq_course_id
		FROM
			courses course, classes class, course_prereq cpr, trainers t
		WHERE
			course.course_id = class.course_id
		AND
			class.is_published = 1
		AND
			class.material_status = 1
		AND
			class.course_id = cpr.course_id
		AND
			t.email = class.trainer_email
		AND 
			(class.course_id, class.class_id) in (SELECT course_id, class_id FROM enrolled WHERE engineer_email = 'keithchiang@aio.com');
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

// Get ineligible courses + details FOR engineer='keithchiang@aio.com'
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
            class.course_id in (SELECT course_id from completed_courses WHERE engineer_email = 'keithchiang@aio.com');
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