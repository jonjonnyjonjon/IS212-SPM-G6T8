import { 
    Container,
    Button,
    Table,
    Form
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"
import EngineerGetMCQ from '../../components/EngineerGetMCQ'


const EngineerTakeQuiz = () => {

    const [quiz, setQuiz] = useState([])

    const { url } = useRouteMatch()

    const [allQns, setAllQns] = useState([])

    const addMCQQuestion = () => {
        setAllQns( allQns => [...allQns, <EngineerGetMCQ/>])
    }


    return(
        <Container>
            <h1>Quiz</h1>
            <EngineerGetMCQ/>
        </Container>
    )
}

export default EngineerTakeQuiz