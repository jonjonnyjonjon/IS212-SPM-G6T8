import { 
    Container,
    Form,
    Button
} from "react-bootstrap"

import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"

const HRCreateCourse = () => {
    const [courseID, setCourseID] = useState("")
    const [courseName, setCourseName] = useState("")
    const [courseSummary, setCourseSummary] = useState("")
    const [hasPrereq, setHasPrereq] = useState(false)

    let history = useHistory()


    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/courses/createCourse", {
            "courseID": courseID,
            "courseName": courseName,
            "courseSummary": courseSummary,
            "hasPrereq": hasPrereq
        })
            .then(console.log("sent to backend!"))
        alert("course created! redirecting back to courses page...")
        history.goBack()
    }

    return( 
        <Container>
            <h1>Create new course</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control placeholder="Enter course ID" onChange={e => setCourseID(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control placeholder="Enter course name" onChange={e => setCourseName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course summary</Form.Label>
                    <Form.Control placeholder="Enter class" onChange={e => setCourseSummary(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Does this course have pre-requisites?</Form.Label>
                    <Form.Check
                        type="radio"
                        label="True"
                        name="prereq"
                        id="optionTrue"
                        onClick={() => setHasPrereq(true)}
                    />
                    <Form.Check
                        type="radio"
                        label="False"
                        name="prereq"
                        id="optionFalse"
                        onClick={() =>setHasPrereq(false)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HRCreateCourse