import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Button,
    Tabs,
    Tab,
    Row,
    Col
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

import CoursesContainer from "../../components/coursesContainer"

const HRCourses = () => {
    const { url } = useRouteMatch()
    const [courses, setCourses] = useState([])
    const [key, setKey] = useState("Published")

    useEffect(() => {
        axios.post("http://127.0.0.1:5000/courses/filter", {
            "filter": key
        })
            .then(res => {
                setCourses(res.data)
            })
    }, [key])

    return(
        <Container>
            <Row>
                <Col><h1>Courses</h1></Col>
                <Col>
                    <Link to={`${url}/createCourse`}>
                        <Button variant="info">Create course</Button>
                    </Link>
                </Col>
            </Row>

            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="Published" title="Published">
                    <CoursesContainer filter="published" courses={courses}/>
                </Tab>
                <Tab eventKey="Ready" title="Ready">
                    <CoursesContainer filter="ready" courses={courses}/>
                </Tab>
                <Tab eventKey="Pending" title="Pending">
                    <CoursesContainer filter="pending" courses={courses}/>
                </Tab>
            </Tabs>
        </Container>
    )
}

export default HRCourses