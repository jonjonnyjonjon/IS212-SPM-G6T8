import { 
    Container,
    Button
 } from 'react-bootstrap'
import { useRouteMatch, useParams, useHistory } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"
import EngineerGetMCQ from '../../components/EngineerGetMCQ'
import EngineerGetTF from '../../components/EngineerGetTF'
import styled from "styled-components";

const ButtonDiv = styled.div`
	font-size: 15px;
	height: 100%;
	margin-bottom: 40px;
`;

const Btn = styled(Button)`
	font-size: 15px;
	font-weight: 600;
	width: 10%;
	height: 30%;
	background-color: #5d5fef;
`;


const EngineerTakeQuiz = () => {

    const { courseID, classID, chapterID } = useParams()

    const history = useHistory()

    const [quiz, getQuiz] = useState([])

    const { url } = useRouteMatch()

    const [allQns, getAllQns] = useState([])

    const getMCQQuestion = () => {
        getAllQns( allQns => [...allQns, <EngineerGetMCQ/>])
    }

    const getTFQuestion = () => {
        getAllQns( allQns => [...allQns, <EngineerGetTF/>])
    }
    const [timeLeft, setTimeLeft] = useState()

    const [questionType, setQuestionType] = useState()

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/quiz/getQuiz?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`).then((res) => {
          getQuiz(res.data);
          setTimeLeft(res.data[0].duration*60)
          setQuestionType(res.data[0].type)
        });
      }, []);

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
            <ButtonDiv>
                <Btn type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Btn>
            </ButtonDiv>
        </Container>
    )
}

export default EngineerTakeQuiz