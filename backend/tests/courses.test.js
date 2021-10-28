const request = require("supertest");
const app = require("../app");
const db = require("../db")

describe("Test the /courses path", () => {
	test("GET /courses", done => {
		request(app)
			.get("/courses")
			.then(response => {
        		expect(response.statusCode).toBe(200)
				done()
      		})
  	})
})

describe("Test creating a course", () => {
	test("POST /courses/createCourse", done => {
		const courseObj = {
            "courseID": "AB1000",
            "courseName": "Intro to ABC 1000",
            "courseSummary": "This is beginner class.",
            "hasPrereq": true
        }
		request(app)
			.post("/courses/createCourse").send(courseObj)
			.then(response => {
				expect(response.statusCode).toBe(200)
				done()
			})
  	})
})

describe("Test getting course by course name", () => {
	test("GET /courses/courseName", done => {
		request(app)
			.get("/courses/courseName?keyword=Intro to ABC 1000")
			.then(response => {
				expect(response.body.length).toEqual(1)
				expect(response.body[0].course_name).toBe('Intro to ABC 1000')
				done()
			})
  	})
})

