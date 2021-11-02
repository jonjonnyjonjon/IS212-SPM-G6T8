const request = require("supertest");
const app = require("../app");
const db = require("../db")

// Either to just initialize the database connection from the start = no setup/teardown
// beforeEach(() => {
// 	connect to sql
// 	use fs.readFile to read sql file
// 	use db.query on the file
// 	initializeDatabase()
// })


afterAll(done => {
	db.destroy()
	done()
})

describe("Test the /quiz path", () => {
	test("GET /quiz", done => {
		request(app)
			.get("/quiz")
			.then(response => {
        		expect(response.statusCode).toBe(200)
				done()
      		})
  	})
})



