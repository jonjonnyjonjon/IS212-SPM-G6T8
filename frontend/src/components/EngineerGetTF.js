import { 
    Container,
    Button,
    Table,
    Form
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"


const EngineerGetMCQ = () => {
    
    const [quiz, setQuiz] = useState([])

    const { url } = useRouteMatch()

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/quiz/getTFQuestions").then((res) => {
          setQuiz(res.data);
        });
      }, []);


    return(
        <Container>
            {quiz.map(quiz =>
                  <Form key={quiz.question_id}>
                    <Form.Label> {quiz.question}
                    <Form.Check type="radio" label={quiz.option1} name="question" />
                    <Form.Check type="radio" label={quiz.option2} name="question"/>
                    <Form.Check type="radio" label={quiz.option3} name="question" />
                    <Form.Check type="radio" label={quiz.option4} name="question"/>
                    </Form.Label>
                  </Form>
            )}
        </Container>
    )
}

export default EngineerGetMCQ