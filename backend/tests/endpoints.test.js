const request = require("supertest");
const app = require("../app");
const db = require("../db")

describe("courses endpoints", () => {
	test("GET /courses and returns total number of courses", done => {
		request(app)
			.get("/courses")
			.then(res => {
				expect(res.body.length).toEqual(7)
				expect(res.statusCode).toBe(200)
				done()
			})
	})

	test("GET /courses/courseName and returns 1 result given course name", done => {
		const courseName = "Intro to Canon G1000"
		request(app)
			.get(`/courses/courseName?keyword=${courseName}`)
			.then(res => {
				expect(res.body.length).toEqual(1)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	test("GET /courses/courseID and returns the correct course name given course ID", done => {
	const courseID = "CG2000"
	request(app)
		.get(`/courses/courseID?courseID=${courseID}`)
		.then(res => {
			expect(res.body.length).toEqual(1)
			expect(res.body[0].course_name).toBe("Intro to Canon G2000")
			expect(res.statusCode).toBe(200)
			done()
		})
  	})
})

describe("classes endpoints", () => {
	test("GET /classes/class returns the correct trainer given class", done => {
		const courseID = "CG3000"
		const classID = "C2"

		request(app)
			.get(`/classes/class?courseID=${courseID}&classID=${classID}`)
			.then(res => {
				expect(res.body.length).toEqual(1)
				expect(res.body[0].trainer_email).toBe("jacksparrow@aio.com")
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	test("GET /classes/courseID returns the classes under this course ID", done => {
		const courseID = "BG1000"

		request(app)
			.get(`/classes/courseID?courseID=${courseID}`)
			.then(res => {
				expect(res.body.length).toEqual(3)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	test("GET /classes/filter returns the classes that are published", done => {
		const courseID = "XK1000"
		const filter = "published"

		request(app)
			.get(`/classes/filter?courseID=${courseID}&filter=${filter}`)
			.then(res => {
				expect(res.body.length).toEqual(2)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})
})