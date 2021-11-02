const express = require("express")
const router = express.Router()
const db = require("../db")

// Get all chapters given course and class ID
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

// Update material status given course ID and class ID
router.post("/updateMaterialStatus", (req, res) => {

	let sql = `UPDATE classes
				  SET material_status = 1
				  WHERE course_id="${req.body.courseID}" and class_id="${req.body.classID}"`;

	db.query(sql, (err, result) => {
	  if (err) {
		res.status(500).send({
		  message: err.message || "An error has occured.",
		  sql: sql,
		});
	  } else {
		res.status(200).send({
		  message: "1 record updated in classes table",
		});
	  }
	});
  });

module.exports = router