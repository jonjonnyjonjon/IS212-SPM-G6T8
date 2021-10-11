import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Card,
    Row,
    Col,
 } from 'react-bootstrap'

import { useEffect, useState } from "react"
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import axios from "axios"

function EngineerBrowseCourse() {
    const [courses, getCourses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/retrieveEligible")
            .then(res => {
                getCourses(res.data)
            })
    }, [])

    return (
        <Container>
            <h1>Browse Courses</h1><br/>

                    {courses.map(course =>
                        <Card style={{ width: '60rem' }} className='mb-3'>
                            <Row key={course.courseName + course.class}>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.courseName} </Card.Title>
                                        <Card.Subtitle> {course.courseID} </Card.Subtitle>
                                        <Card.Text> {course.courseSummary} </Card.Text><br/>
                                        <Card.Subtitle>Sections available: G1, G2, G3</Card.Subtitle>
                                    </Card.Body>
                                </Col>
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    <Button className="stretched-link" variant="primary">Go somewhere</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}

        </Container>
    );
}

export default EngineerBrowseCourse