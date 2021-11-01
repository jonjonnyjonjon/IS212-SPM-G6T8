import { 
    Container,
    Form
 } from 'react-bootstrap'
import axios from "axios"
import { useState, useEffect } from "react"


const EngineerGetMCQ = () => {
    
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/quiz/getMCQQuestions").then((res) => {
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