const express = require("express")
const router = express.Router()
const db = require("../db")

// get all course materials
router.get("/", (req, res) => {
	let sql = "select * from teaching_materials"

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

// post new chapter to db
router.post("/addChapter", (req, res) => {
	let sql = `INSERT INTO teaching_materials VALUES ( \
		"${req.body.courseID}", \
		"${req.body.classID}", \
		"${req.body.chapterID}", \
        "${req.body.content}"
	)`

	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
            console.log(sql)
		} else {
			res.status(200).send({
				message: "1 record inserted to teaching_materials table"
			})
		}
	})
})

// Get all course materials by course ID and class ID
router.get("/getAllChapters", (req, res) => {
	let courseID = req.query.course_id
	let classID = req.query.class_id

	let sql = `SELECT * from teaching_materials WHERE 
	course_id="${courseID}" and class_id="${classID}"`

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured."
			})
			console.log("hel")
		} else {
			res.json(rows) 
		}
	})
})
module.exports = router