const request = require("supertest");
const app = require("../app");
const db = require("../db")

// Courses & Classes Testing Endpoints – Jonathan

describe("courses endpoints", () => {
	test("GET /courses and returns total number of courses", done => {
		request(app)
			.get("/courses")
			.then(res => {
				expect(res.body.length).toEqual(9)
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
	const courseID = "AB5000"
	request(app)
		.get(`/courses/courseID?courseID=${courseID}`)
		.then(res => {
			expect(res.body.length).toEqual(0)
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
		const filter = "waiting.."

		request(app)
			.get(`/classes/filter?courseID=${courseID}&filter=${filter}`)
			.then(res => {
				expect(res.body.length).toEqual(0)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})
})

// =================================================================================================================================

// Chapters Testing Endpoints – Huiqi

describe("chapters endpoints", () => {
	
	// Test – Creating a new chapter for a given course
	test("POST /chapters/addChapter will add 1 new record to teaching_materials table", done => {
		const chapter = {
			courseID: "BG1000", 
			classID: "C1",
			chapterID: 300,
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
		const classID = "C1"

		const chapter = {
			course_id: "BG1000", 
			class_id: "C1",
			chapter_id: 300,
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
		const classID = "C1"
		const chapterID = 300

		request(app)
			.post(`/chapters/deleteChapter?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record deleted from teaching_materials table")
				done()
			})
	})

	// Invalid Test – Creating a new chapter for a course that's not in the database
	test("POST /chapters/addChapter will result in status code 500", done => {
		const chapter = {
			courseID: "BG8000", 
			classID: "C9",
			chapterID: 300,
			content: "testing"
		}

		request(app)
			.post('/chapters/addChapter')
			.send(chapter)
			.then(res => {
				expect(res.statusCode).toBe(500)
				done()
			})
	})

	// Invalid Test – Creating a chapter for a course that already existed in the database
	test("POST /chapters/addChapter will result in status code 500", done => {
		const chapter = {
			courseID: "BG1001", 
			classID: "C1",
			chapterID: 1,
			content: "testing"
		}

		request(app)
			.post('/chapters/addChapter')
			.send(chapter)
			.then(res => {
				expect(res.statusCode).toBe(500)
				done()
			})
	})
})


// =================================================================================================================================

// Quiz Testing Endpoints – Krysten

describe("quiz endpoints", () => {
	
	// Test – Creating a new MCQ question in a given chapter in a quiz
	test("POST /quiz/createQuestion will add 1 new record to quiz_questions table", done => {
		const question = {
			course_id: "CG2000", 
			class_id: "C2",
			chapter_id: 1,
			question_id: "8",
			question: "testing",
			type: "ungraded",
			duration: 30,
			option1: "test",
			option2: "testt",
			option3: "testtt",
			option4: "testttt",
			answer: "test"
		}

		request(app)
			.post('/quiz/createQuestion')
			.send(question)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record inserted to quiz_questions table")
				done()
			})
	})

	// Test – Checking that the MCQ question is in the question table
	test("GET /quiz/getMCQQuestions returns the correct MCQ question given course & class & chapter", done => {
		const courseID = "CG2000"
		const classID = "C2"
		const chapterID = 1

		const question = {
			course_id: "CG2000", 
			class_id: "C2",
			chapter_id: 1,
			question_id: "8",
			question: "testing",
			option1: "test",
			option2: "testt",
			option3: "testtt",
			option4: "testttt"
		}

		request(app)
			.get(`/quiz/getMCQQuestions?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`)
			.then(res => {
				expect(res.body).toContainEqual(question)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	// Test – Creating a new TF question in a given chapter in a quiz
	test("POST /quiz/createQuestion will add 1 record inserted to quiz_questions table", done => {
		const question = {
			course_id: "CG2000", 
			class_id: "C2",
			chapter_id: 1,
			question_id: "9",
			question: "Is it okay to shout at your customers?",
			type: "ungraded",
			duration: 30,
			option1: "True",
			option2: "False",
			option3: "",
			option4: "",
			answer: "False"
		}

		request(app)
			.post('/quiz/createQuestion')
			.send(question)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record inserted to quiz_questions table")
				done()
			})
	})

	// Test – Checking that the TF question is in the question table
	test("GET /quiz/getTFQuestions returns the correct TF question given course & class & chapter", done => {
		const courseID = "CG2000"
		const classID = "C2"
		const chapterID = 1

		const question = {
			course_id: "CG2000", 
			class_id: "C2",
			chapter_id: 1,
			question_id: "9",
			question: "Is it okay to shout at your customers?",
			option1: "True",
			option2: "False",
			option3: "",
			option4: ""
		}

		request(app)
			.get(`/quiz/getTFQuestions?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`)
			.then(res => {
				expect(res.body).toContainEqual(question)
				expect(res.statusCode).toBe(200)
				done()
			})
  	})

	// Test – Deleting that MCQ questions for a given chapter
	test("POST /quiz/deleteQuestion will delete 1 record from quiz_questions table", done => {
		const courseID = "CG2000"
		const classID = "C2"
		const chapterID = 1
		const questionID = "8"

		request(app)
			.post(`/quiz/deleteQuestion?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}&question_id=${questionID}`)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record deleted from quiz_questions table")
				done()
			})
	})

	// Test – Deleting that TF question for a given chapter
	test("POST /quiz/deleteQuestion will delete 1 record from quiz_questions table", done => {
		const courseID = "CG2000"
		const classID = "C2"
		const chapterID = 1
		const questionID = "9"

		request(app)
			.post(`/quiz/deleteQuestion?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}&question_id=${questionID}`)
			.then(res => {
				expect(res.statusCode).toBe(200)
				expect(res.body.message).toStrictEqual("1 record deleted from quiz_questions table")
				done()
			})
	})

	//Invalid Test - If the question is already in the database
	test("POST /quiz/createQuestion will not add 1 new record to quiz_questions table", done => {
		const question = {
			course_id: "BG1001", 
			class_id: "C1",
			chapter_id: 1,
			question_id: "1",
			question: "testing",
			type: "ungraded",
			duration: 30,
			option1: "test",
			option2: "testt",
			option3: "testtt",
			option4: "testttt",
			answer: "test"
		}

		request(app)
			.post('/quiz/createQuestion')
			.send(question)
			.then(res => {
				expect(res.statusCode).toBe(500)
				done()
			})
	})

})

// =================================================================================================================================
//  Testing Endpoints – Keith
describe("Testing enrolRequest endpoints", () => {
	describe("Checking that there is no prior enrolment requests", () => {
		test("GET /enrolRequest/getPendingRequest SHOULD RETURN nothing", done => {
			request(app)
				.get('/enrolRequest/getPendingRequest')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(0)
					done()
				})
		})
	})

	describe("Adding 1 enrolment request", () => {
		test("POST /enrolRequest/enrol SHOULD ADD 1 new record to enrol_request table", done => {
			const enrol_request = {
				engineerEmail: "keithchiang@aio.com", 
				courseID: "CG3000",
				classID: "C1"
			}
	
			request(app)
				.post('/enrolRequest/enrol')
				.send(enrol_request)
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.message).toEqual(`${enrol_request.engineerEmail} enrolment into ${enrol_request.courseID} ${enrol_request.classID} has been added to enrol_request table.`)
					done()
				})
		})
	})
	
	describe("Checking that enrolment request has been added", () => {
		test("GET /enrolRequest/getPendingRequest SHOULD RECEIVE the recently enrolled record from enrol_request table", done => {
			const enrol_request = {
				courseID: "CG3000",
				classID: "C1"
			}
	
			request(app)
				.get('/enrolRequest/getPendingRequest')
				.send(enrol_request)
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].course_id).toEqual("CG3000")
					expect(res.body[0].class_id).toEqual("C1")
					done()
				})
		})
	})

	describe("Removing enrolment request that has been added", () => {
		test("DELETE /enrolRequest/delPendingRequest SHOULD DELETE the recently enrolled record from enrol_request table", done => {
			const delete_enrol_request = {
				engineerEmail: 'keithchiang@aio.com',
				courseID: "CG3000",
				classID: "C1"
			}
	
			request(app)
				.delete('/enrolRequest/delPendingRequest')
				.send(delete_enrol_request)
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.message).toEqual('1 record has been deleted.')
					done()
				})
		})
	})

	describe("Checking enrolment request has been deleted", () => {
		test("GET /enrolRequest/getPendingRequest SHOULD RETURN nothing", done => {
			request(app)
				.get('/enrolRequest/getPendingRequest')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(0)
					done()
				})
		})
	})
})

describe("Testing courses endpoints", () => {

	describe("Checking retrieval of course pre-requisites", () => {
		test("GET /courses/getPrereq SHOULD RETURN the correct pre-requisite", done => {
			// When course ID = BG1001
			request(app)
				.get('/courses/getPrereq?course_id=BG1001')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].prereq_course_id).toEqual('BG1000')
					done()
				})
	
			// When course ID = BG1002
			request(app)
				.get('/courses/getPrereq?course_id=BG1002')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].prereq_course_id).toStrictEqual('BG1001')
					done()
				})
			// When course ID = CG1001
			request(app)
				.get('/courses/getPrereq?course_id=CG1001')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].prereq_course_id).toStrictEqual('CG1000')
					done()
				})
			
			// When course ID = CG1002
			request(app)
				.get('/courses/getPrereq?course_id=CG1002')
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].prereq_course_id).toStrictEqual('CG1001')
					done()
			})
		})
	})

	describe("Checking retrieval of Eligible classes with prerequisite", () => {
		test("GET /courses/getEligibleWithPrereq SHOULD RETURN 1 class", done => {
			request(app)
				.get("/courses/getEligibleWithPrereq")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					done()
				})
		})
	})

	describe("Checking retrieval of Eligible classes with no prerequisites", () => {
		test("GET /courses/getEligibleNoPrereq SHOULD RETURN 3 classes", done => {
			request(app)
				.get("/courses/getEligibleNoPrereq")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(3)
					done()
				})
		})
	})

	describe("Checking retrieval of Ineligible classes because did not meet pre-requisite", () => {
		test("GET /courses/getIneligibleByPrereq SHOULD RETURN 1 classes", done => {
			request(app)
				.get("/courses/getIneligibleByPrereq")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].course_id).toStrictEqual("BG1002")
					done()
				})
		})
	})

	describe("Checking retrieval of Ineligible classes because currently enrolled", () => {
		test("GET /courses/getIneligibleByEnrolled SHOULD RETURN 1 class", done => {
			request(app)
				.get("/courses/getIneligibleByEnrolled")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(1)
					expect(res.body[0].course_id).toStrictEqual("BG1001")
					done()
				})
		})
	})

	describe("Checking retrieval of Ineligible classes because already completed", () => {
		test("GET /courses/getIneligibleByCompleted SHOULD RETURN 3 classes", done => {
			request(app)
				.get("/courses/getIneligibleByCompleted")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(3)
					done()
				})
		})
	})

	describe("Checking retrieval of COMPLETED classes", () => {
		test("GET /courses/getCompleted SHOULD RETURN 2 classes", done => {
			request(app)
				.get("/courses/getCompleted")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(3)
					done()
				})
		})
	})

	describe("Checking retrieval of ONGOING classes", () => {
		test("GET /courses/getOngoing SHOULD RETURN 2 classes", done => {
			request(app)
				.get("/courses/getOngoing")
				.then(res => {
					expect(res.statusCode).toBe(200)
					expect(res.body.length).toEqual(2)
					done()
				})
		})
	})
})