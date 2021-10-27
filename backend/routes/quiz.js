const express = require("express")
const router = express.Router()
const db = require("../db")

// Get all quiz questions
router.get("/", (req, res) => {
	let sql = "SELECT * from quiz_questions"

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

// Create a quiz question
router.post('/createQuestion', (req, res) => {
	let sql = `INSERT INTO quiz_questions VALUES ( \
		'${req.body.course_id}', \
		'${req.body.class_id}', \
		'${req.body.chapter_id}', \
		'${req.body.question_id}', \
		'${req.body.question}', \
		'${req.body.type}', \
		'${req.body.duration}', \
		'${req.body.option1}', \
		'${req.body.option2}', \ 
		'${req.body.option3}', \
		'${req.body.option4}', \
		'${req.body.answer}'
	)`
	
	db.query(sql, (err, result) => {
		if (err) {
			res.status(500).send({
				message: err.message || "An error has occured.",
				sql: sql
			})
		} else {
			console.log("1 record inserted to question table")
		}
	})
})

router.get('/getMCQQuestions', (req, res) => {
	
	let sql = "SELECT question_id, question, option1, option2, option3, option4 from quiz_questions WHERE option3 != '' AND option4 != ''"

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

router.get('/getTFQuestions', (req, res) => {
	
	let sql = "SELECT question_id, question, option1, option2, option3, option4 from quiz_questions WHERE option3 = '' AND option4 = ''"

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

router.get('/getQuiz', (req, res) => {
	
	let sql = "SELECT course_id, class_id, chapter_id, duration, type FROM quiz_questions"

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