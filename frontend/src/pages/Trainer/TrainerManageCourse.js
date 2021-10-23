import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerChapter from "../../components/TrainerChapter";
import { Container, Button } from 'react-bootstrap'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { useState } from 'react'
import styled from "styled-components";
import axios from 'axios';

const Header = styled.h1`
  margin: 40px 0px;
  font-weight: 700;
`;

const ChapterDiv = styled.div`
    margin-bottom: 20px;
`

const TrainerManageCourse = () => {
    const { url } = useRouteMatch()
    const { courseID, classID } = useParams()
    const [allChaps, setAllChaps] = useState([])
    const [chapNum, setChapNum] = useState(1)

    const addChapter = e => {
        e.preventDefault()
        let content = 'Replace content here'
        let quizID = "quiz" + chapNum
        axios.post("http://127.0.0.1:5000/chapters/addChapter", {
            "courseID": courseID, 
            "classID": classID, 
            "chapterID": chapNum, 
            "content": content,
            "quiz_id": quizID
        })
        setAllChaps( allChaps => [...allChaps, <TrainerChapter key={chapNum} count={chapNum} />])
        setChapNum(chapNum + 1)
        console.log(chapNum)
    }

    return (
        <Container>
            <Header>Course: {courseID}</Header> 
            <Button onClick={addChapter}> Add Chapter </Button>
            <ChapterDiv className="allChaps">
                {allChaps.map((a, i) => (a))}
            </ChapterDiv>
        </Container>

    )
}

export default TrainerManageCourse