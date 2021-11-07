const express = require("express")
const router = express.Router()
const db = require("../db")

// Create new enrolled engineers
router.post("/", (req, res) => {
    let engineers = req.body.engineers
    let insertValues = ""
    for (let engineer of engineers) {
        insertValues += `("${engineer}", "${req.body.courseID}", "${req.body.classID}"),`
    }
    insertValues = insertValues.slice(0, -1)
	let sql = `INSERT INTO enrolled VALUES ${insertValues};`

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