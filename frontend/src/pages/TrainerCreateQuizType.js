import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../components/UserNavbar"
import { useState } from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Form
} from "react-bootstrap"
import axios from "axios"
import { Link, useRouteMatch } from 'react-router-dom'



const TrainerCreateQuizType = () => {

    const { url } = useRouteMatch()

    const [form, setForm] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/quiz/createQuiz", form)
            .then(console.log("sent to backend!"))
        alert("quiz form created! directing to create quiz...")
    }

    return (
        <div>
            <UserNavbar />
            <h1>Choose the type of quiz and number of questions!</h1>
            <Container>
                <Form>
                    <Row>
                        <Col></Col>
                        <Col>
                            <center>
                            <Form.Label>
                                Select your quiz type: <br />
                                <select class="form-select" onChange={e => setField("quizType", e.target.value)}>
                                    <option value="graded">Graded Quiz</option>
                                    <option value="ungraded">Ungraded Quiz</option>
                                </select>
                            </Form.Label>
                            </center>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <center>
                        <Col>
                            <label>
                                No. of T/F Questions <br />
                                <Form.Control placeholder="5" type="number" onChange={e => setField("tfquestions", e.target.value)} />
                            </label>
                        </Col>
                        <Col>
                        <Form.Label>
                            No. of MCQ Questions <br />
                            <Form.Control placeholder="5" type="number" onChange={e => setField("mcqquestions", e.target.value)} />
                        </Form.Label>
                        </Col>
                        </center>
                        <Col></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col></Col>
                        <Col>
                            <center>
                            <Button variant="primary" type="submit" onClick={e => handleSubmit(e => handleSubmit(e))}>
                                <Link to={`${url}/createQuiz`} />Create
                            </Button>
                            </center>
                        </Col>
                        <Col></Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default TrainerCreateQuizType