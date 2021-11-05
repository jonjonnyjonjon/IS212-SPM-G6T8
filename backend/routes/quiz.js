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
			res.send({
				message: "1 record inserted to quiz_questions table"
			})
		}
	})
})

router.get('/getMCQQuestions', (req, res) => {

	let courseID = req.query.course_id;
	let classID = req.query.class_id;
	let chapterID = req.query.chapter_id;
	
	let sql = `SELECT course_id, class_id, chapter_id, question_id, question, option1, option2, option3, option4 from 
	quiz_questions WHERE option3 != '' AND option4 != '' AND
	course_id="${courseID}" and class_id="${classID}" and chapter_id="${chapterID}"`

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

	let courseID = req.query.course_id;
	let classID = req.query.class_id;
	let chapterID = req.query.chapter_id;
	
	let sql = `SELECT course_id, class_id, chapter_id, question_id, question, option1, option2, option3, option4 from 
	quiz_questions WHERE option3 = '' AND option4 = '' AND
	course_id="${courseID}" and class_id="${classID}" and chapter_id="${chapterID}"`

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

	let courseID = req.query.course_id;
	let classID = req.query.class_id;
	let chapterID = req.query.chapter_id;
	
	let sql = `SELECT course_id, class_id, chapter_id, question_id, duration, type FROM quiz_questions WHERE
	course_id="${courseID}" and class_id="${classID}" and chapter_id="${chapterID}"`

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

// Delete question from DB (for testing purposes)
router.post("/deleteQuestion", (req, res) => {

	let courseID = req.query.course_id
	let classID = req.query.class_id
	let chapterID = req.query.chapter_id
	let questionID = req.query.question_id
  
	let sql = `DELETE FROM quiz_questions WHERE 
	course_id = '${courseID}' and class_id = '${classID}' and chapter_id = ${chapterID} and question_id = ${questionID}`;
  
	db.query(sql, (err, result) => {
	  if (err) {
		res.status(500).send({
		  message: err.message || "An error has occured.",
		  sql: sql,
		});
	  } else {
		res.status(200).send({
		  message: "1 record deleted from quiz_questions table"
		})
	  }
	})
  })

module.exports = router