import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { 
    Container,
    Form,
    Button
} from "react-bootstrap"
import axios from "axios"

const HRCreateCourse = () => {
    const [form, setForm] = useState({})
    let history = useHistory()

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/courses/createCourse", form)
            .then(console.log("sent to backend!"))
        alert("course created! redirecting back to courses page...")
        history.push("/hr/courses")
    }

    return( 
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control placeholder="Enter course name" onChange={e => setField("courseName", e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Class</Form.Label>
                    <Form.Control placeholder="Enter class" onChange={e => setField("class", e.target.value)}/>
                </Form.Group>
 
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Class size</Form.Label>
                    <Form.Control placeholder="Enter class size" onChange={e => setField("size", e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control placeholder="Enter start date" onChange={e => setField("startDate", e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>End date</Form.Label>
                    <Form.Control placeholder="Enter end date" onChange={e => setField("endDate", e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HRCreateCourse