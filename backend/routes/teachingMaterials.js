const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/getChapters", (req, res) => {
	let courseID = req.query.courseID
	let classID = req.query.classID

	let sql = `SELECT * FROM teaching_materials WHERE course_id = "${courseID}" AND class_id = "${classID}"`

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