import { 
    Container,
    Button
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
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

    const [quiz, getQuiz] = useState([])

    const { url } = useRouteMatch()

    const [allQns, getAllQns] = useState([])

    // const [timeLeft, setTimeLeft] = useState(quiz[0].duration)


    const getMCQQuestion = () => {
        getAllQns( allQns => [...allQns, <EngineerGetMCQ/>])
    }

    const getTFQuestion = () => {
        getAllQns( allQns => [...allQns, <EngineerGetTF/>])
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/quiz/getQuiz").then((res) => {
          getQuiz(res.data);
        });
      }, []);
    
    // let time = parseInt(quiz[0].duration)
    // console.log(time)
    const [timeLeft, setTimeLeft] = useState(120)

    useEffect(() => {
        const timer =
        timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        return () => clearInterval(timer)
      }, [timeLeft])

    return(
        <Container>
            {/* <h1> Course ID: {quiz[0].course_id} </h1>
            <h2> Quiz No: {quiz[0].chapter_id} </h2>
            <h6>Type: {quiz[0].type}</h6> */}
            <div>Duration: {timeLeft} seconds</div>
            <br />
            <EngineerGetMCQ/>
            <EngineerGetTF/>
            <ButtonDiv>
                <Btn>Submit</Btn>
            </ButtonDiv>
        </Container>
    )
}

export default EngineerTakeQuiz