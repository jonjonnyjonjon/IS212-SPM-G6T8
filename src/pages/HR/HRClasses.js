import { useEffect } from 'react'
import { 
    Container,
    Button,
    Tabs,
    Tab
 } from 'react-bootstrap'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

import ClassesContainer from "../../components/ClassesContainer"

const HRCourses = () => {
    const { url } = useRouteMatch()
    const { courseID, courseName } = useParams()
    const [classes, setClasses] = useState([])
    const [key, setKey] = useState("published")

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/classes/filter?courseID=${courseID}&filter=${key}`)
            .then(res => {
                setClasses(res.data)
            })
    }, [courseID, key])

    return(
        <Container>
             <h1>{courseID} | {courseName}</h1>
            <Link to={`${url}/create`} className="mt-3">
                <Button variant="info">Create class</Button>
            </Link>

            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-3">
                <Tab eventKey="published" title="Published">
                    <ClassesContainer filter="published" classes={classes}/>
                </Tab>
                <Tab eventKey="ready" title="Ready">
                    <ClassesContainer filter="ready" classes={classes}/>
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <ClassesContainer filter="pending" classes={classes}/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default HRCourses