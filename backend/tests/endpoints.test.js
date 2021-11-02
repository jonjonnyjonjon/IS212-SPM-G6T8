const request = require("supertest");
const app = require("../app");
const db = require("../db")

// Courses & Classes Testing Endpoints – Jonathan

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


// Chapters Testing Endpoints – Huiqi

describe("chapters endpoints", () => {
	
	// Test – Creating a new chapter for a given course
	test("POST /chapters/addChapter will add 1 new record to teaching_materials table", done => {
		const chapter = {
			courseID: "BG1000", 
			classID: "C7",
			chapterID: "300",
			content: "testing"
		}

		request(app)
			.post('/chapters/addChapter')
			.send(chapter)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record inserted to teaching_materials table")
				done()
			})
	})

	// Test – Checking that the new chapter is present in DB for a given course
	test("GET /chapters/getAllChapters returns the correct chapters given course & class", done => {
		const courseID = "BG1000"
		const classID = "C7"

		const chapter = {
			course_id: "BG1000", 
			class_id: "C7",
			chapter_id: "300",
			content: "testing"
		}

		request(app)
			.get(`/chapters/getAllChapters?course_id=${courseID}&class_id=${classID}`)
			.then(res => {
				expect(res.body).toContainEqual(chapter)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	// Test – Deleting that chapter for a given course
	test("POST /chapters/deleteChapter will delete 1 record from teaching_materials table", done => {
		const courseID = "BG1000"
		const classID = "C7"
		const chapterID = "300"

		request(app)
			.post(`/chapters/deleteChapter?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record deleted from teaching_materials table")
				done()
			})
	})
})