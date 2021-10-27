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

beforeAll(done => {
    
})

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

describe("Test creating a quiz", () => {
	test("POST /quiz/createQuestion", done => {
		const courseObj = {
            "course_id": "AB1000",
            "class_id": "C1",
            "chapter_id": "1",
            "question_id": "1",
            "question": "How are you feeling?",
            "type": "Graded",
            "duration": 30,
            "option1": "I am okay",
            "option2": "I'm not okay",
            "option3": "Feeling down",
            "option4": "Feeling excited",
            "answer": "Feeling down"
        }
		request(app)
			.post("/quiz/createQuestion").send(courseObj)
			.then(response => {
				expect(response.statusCode).toBe(200)
				done()
			})
  	})
})

