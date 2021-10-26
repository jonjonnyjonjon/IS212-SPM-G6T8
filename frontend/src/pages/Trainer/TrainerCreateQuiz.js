import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerMCQQuestion from '../../components/TrainerMCQQuestion'
import TrainerTFQuestion from '../../components/TrainerTFQuestion'
import {
    Form,
    Container,
    Button
} from "react-bootstrap"
import { useState, useEffect } from 'react'
import axios from "axios"
import { Link, useRouteMatch, useParams } from 'react-router-dom'


const TrainerCreateQuiz = () => {
    
    const { url } = useRouteMatch()
    const { courseID, classID, chapNum } = useParams()
    const [quizType, setQuizType] = useState("")
    const [quizDuration, setQuizDuration] = useState(0)
    
    const [allQns, setAllQns] = useState([])


    const [qnNum, setQnNum] = useState(1)

    const addMCQQuestion = () => {
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
                    optionValues = ["True", "False", "", ""]
                    // console.log(qnOptions[j].children[0].checked)
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

        let title = ''
        let options = []
        let qnanswer = ''
        let option1 = ''
        let option2 = ''
        let option3 = ''
        let option4 = ''

        for (let k = 0; k < qnsInfo.length; k++) {
            let qnID = 1

            title = qnsInfo[k].qnTitle
            qnID += k
            qnID = qnID.toString()
            options = qnsInfo[k].optionValues
            qnanswer = qnsInfo[k].answer


            for (let l=0; l < options.length; l++) {
                option1 = options[0]
                option2 = options[1]
                option3 = options[2]
                option4 = options[3]
            }

            axios.post("http://127.0.0.1:5000/quiz/createQuestion", {
                "quiz_id": '1',
                "question_id": qnID,
                "question": title,
                "type": quizType,
                "duration": parseInt(quizDuration),
                "option1": option1,
                "option2": option2,
                "option3": option3,
                "option4": option4,
                "answer": qnanswer
            })
            
        }
        
        console.log("sent to backend!")
        
        alert("quiz created! redirecting back to manage course")
    }

    return (
        <Container>
            <h1>Course: {courseID}</h1>
            <h2>Class: {classID}</h2>
            <h3>Chapter {chapNum} Quiz</h3>
            <Form>
                <Form.Label>
                    Select your quiz type: <br />
                    <select className="form-select" onClick={e => setQuizType(e.target.value)}>
                        <option value="graded">Graded Quiz</option>
                        <option value="ungraded" >Ungraded Quiz</option>
                    </select>
                </Form.Label>
                <br />
                <Form.Label>
                    Duration of quiz (in minutes):
                    <Form.Control type="number" placeholder="30" onChange={e => setQuizDuration(e.target.value)} />
                </Form.Label>

                <br />
                
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