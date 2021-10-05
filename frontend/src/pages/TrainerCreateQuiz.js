import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../components/UserNavbar"
import TrainerMCQQuestion from '../components/TrainerMCQQuestion'
import TrainerTFQuestion from '../components/TrainerTFQuestion'
import {
    Form,
    Container,
    Button
} from "react-bootstrap"
import { useState } from 'react'
import axios from "axios"


const TrainerCreateQuiz = () => {

    const [form, setForm] = useState({})
    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    const [mcqquestion, setMCQQuestion] = useState([])

    const addMCQQuestion = () => {
        setMCQQuestion( mcqquestion => [...mcqquestion, <TrainerMCQQuestion />])
    }

    const [tfquestion, setTFQuestion] = useState([])

    const addTFQuestion = () => {
        setTFQuestion( tfquestion => [...tfquestion, <TrainerTFQuestion />])
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/quiz", form)
            .then(console.log("sent to backend!"))
        alert("quiz created! redirecting back to manage course")
        //history.push it back to the 
    }

    return (
        <div>
            <UserNavbar />
            <h1>Chapter 1 Quiz</h1>
            <Container>
                <Form>
                    <Form.Label>
                        Select your quiz type: <br />
                        <select class="form-select">
                            <option value="graded" onChange={e => setField("quizType", e.target.value)}>Graded Quiz</option>
                            <option value="ungraded" onChange={e => setField("quizType", e.target.value)}>Ungraded Quiz</option>
                        </select>
                    </Form.Label>
                    <br />
                    <Form.Label>
                        Duration of quiz (in minutes):
                        <Form.Control type="number" placeholder="30" onChange={e => setField("time", e.target.value)} />
                    </Form.Label>
                    <TrainerMCQQuestion />
                    <div>
                        {mcqquestion.map((a, i) => (
                        <div key={i}>{a}</div>
                        ))}
                    </div>
                    <Button variant="outline-info" size="sm" onClick={addMCQQuestion}>Add Question</Button>
                    <TrainerTFQuestion />
                    <div>
                        {tfquestion.map((a, i) => (
                        <div key={i}>{a}</div>
                        ))}
                    </div>
                    <Button variant="outline-info" size="sm" onClick={addTFQuestion}>Add Question</Button>
                    <br />
                    <br />
                    <Button type="submit" onClick={e => handleSubmit(e)}>
                        Preview Quiz
                    </Button>
                </Form>
            </Container>
        </div>
    )
}


export default TrainerCreateQuiz