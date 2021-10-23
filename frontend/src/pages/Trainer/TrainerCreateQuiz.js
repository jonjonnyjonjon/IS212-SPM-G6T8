import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerMCQQuestion from '../../components/TrainerMCQQuestion'
import TrainerTFQuestion from '../../components/TrainerTFQuestion'
import {
    Form,
    Container,
    Button
} from "react-bootstrap"
import { useState } from 'react'
import axios from "axios"


const TrainerCreateQuiz = () => {

    const [quizType, setQuizType] = useState("")
    const [quizDuration, setQuizDuration] = useState(0)
    
    const [allQns, setAllQns] = useState([])
    // const [mcqQuestion, setMCQQuestion] = useState([])
    // const [tfQuestion, setTFQuestion] = useState([])

    const [qnNum, setQnNum] = useState(1)

    const addMCQQuestion = () => {
        // setMCQQuestion( mcqquestion => [...mcqquestion, <TrainerMCQQuestion />])
        setAllQns( allQns => [...allQns, <TrainerMCQQuestion key={qnNum} qnNum={qnNum} />])
        setQnNum(qnNum+1)
    }

    const addTFQuestion = () => {
        // setTFQuestion( tfquestion => [...tfquestion, <TrainerTFQuestion />])
        setAllQns( allQns => [...allQns, <TrainerTFQuestion key={qnNum} qnNum={qnNum} />])
        setQnNum(qnNum+1)
    }

    const handleSubmit = e => {
        e.preventDefault()

        // getting all information from each question
        let allQns = document.getElementsByClassName("allQns")[0].children
        let qnsInfo = []
        for (let i = 0; i < allQns.length; i++) {
            let qnInputs = allQns[i].children
            let qnTitle = qnInputs[1].value
            let qnOptions = qnInputs[2].children
            let qnType = allQns[i].className

            let optionValues = []
            let answer = ""
            for (let j = 0; j < qnOptions.length; j++) {
                if (qnType === "mcq") {
                    let optionValue = qnOptions[j].getElementsByClassName("form-control")[0].value
                    let isOptionChecked = qnOptions[j].getElementsByClassName("input-group-text")[0].children[0].checked
                    optionValues.push(optionValue)

                    if (isOptionChecked) {
                        answer = optionValue
                    }
                } else if (qnType === "tf") {
                    optionValues = ["True", "False"]
                    console.log(qnOptions[j].children[0].checked)
                    answer = (qnOptions[j].children[0].checked) ? "True" : answer
                }
            }

            qnsInfo.push({
                "qnTitle": qnTitle,
                "optionValues": optionValues,
                "answer": answer 
            })
        }

        console.log(qnsInfo)

        axios.post("http://127.0.0.1:5000/quiz", {
            // to fill up
            "quizType": quizType,
            "quizDuration": quizDuration,
            "quizInfo": qnsInfo
        })
            .then(console.log("sent to backend!"))
        alert("quiz created! redirecting back to manage course")
        //history.push it back to the 
    }

    return (
        <Container>
            <h1>Chapter 1 Quiz</h1>
            <Form>
                <Form.Label>
                    Select your quiz type: <br />
                    <select className="form-select">
                        <option value="graded" onChange={e => setQuizType("quizType", e.target.value)}>Graded Quiz</option>
                        <option value="ungraded" onChange={e => setQuizType("quizType", e.target.value)}>Ungraded Quiz</option>
                    </select>
                </Form.Label>
                <br />
                <Form.Label>
                    Duration of quiz (in minutes):
                    <Form.Control type="number" placeholder="30" onChange={e => setQuizDuration("time", e.target.value)} />
                </Form.Label>
                {/* <TrainerMCQQuestion /> */}
                {/* <TrainerTFQuestion /> */}
                <br />
                
                {/* <div>
                    {mcqQuestion.map((a, i) => (
                    <div key={i}>{a}</div>
                    ))}
                </div>
                <div>
                    {tfQuestion.map((a, i) => (
                    <div key={i}>{a}</div>
                    ))}
                </div> */}
                <div className="allQns">
                    {allQns.map((a, i) => (
                        a
                    ))}
                </div>
                <br />
                <Button variant="outline-info" size="sm" onClick={addMCQQuestion}>Add MCQ Question</Button>
                <br />
                <Button variant="outline-info" size="sm" onClick={addTFQuestion}>Add True/False Question</Button>
                <br />
                <br />
                <Button type="submit" onClick={e => handleSubmit(e)}>
                    Preview Quiz
                </Button>
            </Form>
        </Container>
    )
}


export default TrainerCreateQuiz