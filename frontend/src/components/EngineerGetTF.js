import { 
    Container,
    Form
 } from 'react-bootstrap'
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'


const EngineerGetTF = () => {

    const { courseID, classID, chapterID } = useParams()
    
    const [quiz, setQuiz] = useState([])

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/quiz/getTFQuestions?course_id=${courseID}&class_id=${classID}&chapter_id=${chapterID}`).then((res) => {
          setQuiz(res.data);
        });
      }, []);


    return(
        <Container>
            {quiz.map(quiz =>
                  <Form key={quiz.question_id}>
                    <Form.Label> 
                    <b>Question: {quiz.question}</b>
                    <Form.Check type="radio" label={quiz.option1} name="question" />
                    <Form.Check type="radio" label={quiz.option2} name="question"/>
                    </Form.Label>
                  </Form>
            )}
        </Container>
    )
}

export default EngineerGetTF