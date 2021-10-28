import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerChapter from "../../components/TrainerChapter";
import { Container, Button, Modal, Form } from 'react-bootstrap'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styled from "styled-components";
import axios from 'axios';

const Header = styled.h1`
  margin: 40px 0px;
  font-weight: 700;
`;

const ChapterDiv = styled.div`
    margin-bottom: 20px;
`

const ExistingChapterDiv = styled.div`
    margin-bottom: 20px;
`

const TrainerManageCourse = () => {
    const { courseID, classID } = useParams()
    const [chapters, setChapters] = useState([])
    const [allChaps, setAllChaps] = useState([])
    const [chapNum, setChapNum] = useState(0)

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/chapters/getAllChapters?course_id=${courseID}&class_id=${classID}`)
            .then(res => {
                setChapters(res.data)
                setChapNum(res.data.length+1)
            })
    }, [courseID, classID])

    const addChapter = e => {
        setAllChaps( allChaps => [...allChaps, <TrainerChapter key={chapNum} count={chapNum} class_id={classID} course_id={courseID} />])
        setChapNum(chapNum + 1)
        // e.preventDefault()
        console.log(chapNum)
        axios.post("http://127.0.0.1:5000/chapters/addChapter", {
            "courseID": courseID, 
            "classID": classID, 
            "chapterID": chapNum, 
            "content": "",
        })
    }
    console.log(chapters)

    return (
        <Container>
            <Header>Course: {courseID}</Header>
            <Button onClick={addChapter}> Add Chapter </Button>
            <ExistingChapterDiv>
                {chapters.map(chapter => 
                    <TrainerChapter key={chapter.chapter_id} count={chapter.chapter_id} class_id={classID} course_id={courseID} /> 
                    )}
                </ExistingChapterDiv>
            <ChapterDiv className="allChaps">
                {allChaps.map((a, i) => (a))}
            </ChapterDiv>
        </Container>
    )
}

export default TrainerManageCourse