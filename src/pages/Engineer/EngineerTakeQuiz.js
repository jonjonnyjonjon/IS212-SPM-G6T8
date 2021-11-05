import { 
    Container,
    Button
 } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"
import EngineerGetMCQ from '../../components/EngineerGetMCQ'
import EngineerGetTF from '../../components/EngineerGetTF'
import { BASE_API_URL } from "../../utils/constants"

const EngineerTakeQuiz = () => {

    const { courseID, classID, chapterID } = useParams()
    const history = useHistory()

    const [timeLeft, setTimeLeft] = useState()
    const [questionType, setQuestionType] = useState()
    
    useEffect(() => {
        axios.get(`${BASE_API_URL}/quiz/getQuiz?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`)
            .then((res) => {
                setTimeLeft(res.data[0].duration*60)
                setQuestionType(res.data[0].type)
            });
      }, [courseID, classID, chapterID]);

    useEffect(() => {
        const timer =
        timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const handleSubmit = e => {
        e.preventDefault()
        alert("Quiz Created! Redirecting you back to manage course page! :)")
        history.push(`/engineer/course/${courseID}/${classID}`)
    }

    return(
        <Container>
            <h1> Course ID: {courseID} </h1>
            <h2> Quiz No: {chapterID} </h2>
            <h6>Type: {questionType} </h6>
            <div>Duration: {timeLeft} seconds</div>
            <br />
            <EngineerGetMCQ/>
            <EngineerGetTF/>

            <Button style={{"background": "#5d5fef"}} type="submit" onClick={e => handleSubmit(e)}>
                Submit
            </Button>

        </Container>
    )
}

export default EngineerTakeQuiz