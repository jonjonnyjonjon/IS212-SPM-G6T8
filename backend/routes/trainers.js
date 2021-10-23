const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/", (req, res) => {
	let sql = "SELECT * from trainers"

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

router.post("/qualified", (req, res) => {
	const courseID = req.body.courseID.slice(0,6)
	let sql = `SELECT * from trainers WHERE qualified = "${courseID}"`

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