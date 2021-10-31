import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { Container, RadioButton } from 'react-bootstrap'
import axios from "axios"
import { useState } from "react"

const HRCourses = () => {
    const [quiz, setQuiz] = useState([])


    useEffect(() => {
        axios.get("http://127.0.0.1:5000/quiz").then((res) => {
          setQuiz(res.data);
        });
      }, []);

    return(
        <Container>
            <h1>All courses</h1>
            {quiz.map(quiz =>
              <Container key={quiz.question_id}>
                  <h3>{quiz.question}</h3>
                  <h5>{quiz.duration}</h5>
                  <RadioButton>{quiz.option1}</RadioButton>
                  <RadioButton>{quiz.option2}</RadioButton>
              </Container>
            )}
        </Container>
    )
}

export default HRCourses