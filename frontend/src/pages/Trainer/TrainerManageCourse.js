import 'bootstrap/dist/css/bootstrap.min.css'
import TrainerChapter from "../../components/TrainerChapter";
import { Container, Button } from 'react-bootstrap'
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
    // const { url } = useRouteMatch()
    const { courseID, classID } = useParams()
    const [chapters, setChapters] = useState([])
    const [allChaps, setAllChaps] = useState([])
    const [chapNum, setChapNum] = useState(0)

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/chapters/getAllChapters?course_id=${courseID}&class_id=${classID}`)
            .then(res => {
                setChapters(res.data)
                setChapNum(res.data.length)
            })
    }, [courseID, classID])

    // console.log(Object.entries(chapters))
    
    // console.log(allChaps)
    console.log(allChaps)
    console.log(chapters.length)

    // // only if there's no chapters at all
    // const [allChaps, setAllChaps] = useState([])
    // const [chapNum, setChapNum] = useState(1)

    const addChapter = e => {
        // console.log(chapters.length)
        // console.log(chapNum)
        // setChapNum(chapNum + chapters.length)
        setAllChaps( allChaps => [...allChaps, <TrainerChapter key={chapNum} count={chapNum} />])
        setChapNum(chapNum + 1)
        e.preventDefault()
        console.log(chapNum)
        axios.post("http://127.0.0.1:5000/chapters/addChapter", {
            "courseID": courseID, 
            "classID": classID, 
            "chapterID": chapNum, 
            "content": "",
        })
    }

    return (
        <Container>
            {chapNum}
            <Header>Course: {courseID}</Header>
            <Button onClick={addChapter}> Add Chapter </Button>
            <ExistingChapterDiv><h1> Hi </h1></ExistingChapterDiv>
            <ChapterDiv className="allChaps">
                {allChaps.map((a, i) => (a))}
            </ChapterDiv>
        </Container>
    )
}

export default TrainerManageCourse