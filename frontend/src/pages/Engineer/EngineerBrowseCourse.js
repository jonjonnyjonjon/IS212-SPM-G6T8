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
    const { url } = useRouteMatch()
    let history = useHistory()

    const [eligibleCourses, getEligibleCourses] = useState([]);
    const [ineligibleCourses, getIneligibleCourses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/retrieveEligible")
            .then(res => {
                getEligibleCourses(res.data)
            })

        axios.get("http://127.0.0.1:5000/courses/retrieveIneligible")
        .then(res => {
            getIneligibleCourses(res.data)
        })

    }, [])

    console.log(url);

    return (
        <Container>
            <h1>Browse Courses</h1><br/>

            {eligibleCourses.map(course =>
                <Card border='dark' style={{ width: '60rem' }} className='mb-3' key={course.courseName + course.class}>
                    <Row>
                        <Col md={2}>
                            <Card.Img src="holder.js/100px180" />
                        </Col>

                        <Col md={8}>
                            <Card.Body>
                                <Card.Title> {course.courseName} </Card.Title>
                                <Card.Subtitle> {course.courseID} </Card.Subtitle>
                                <Card.Text> {course.courseSummary} </Card.Text><br/>
                                <Card.Subtitle>Classes available:</Card.Subtitle>
                                <Card.Text>C1, C2</Card.Text>
                            </Card.Body>
                        </Col>
                        
                        <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                            <Link to={`${url}/viewCourse/${course.courseID}`}> 
                                <Button className="stretched-link me-2" variant="primary">
                                            Find out more
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            )}

            {ineligibleCourses.map(course =>
                <Card border='danger' style={{ width: '60rem' }} className='text-muted mb-3' key={course.courseName + course.class}>
                    <Row>
                        <Col md={2}>
                            <Card.Img src="holder.js/100px180" />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                <Card.Title> {course.courseName} </Card.Title>
                                <Card.Subtitle> {course.courseID} </Card.Subtitle>
                                <Card.Text> {course.courseSummary} </Card.Text><br/>
                                <Card.Subtitle> Pre-requisites not fulfilled: </Card.Subtitle>
                                <Card.Text> {course.prereqCourseID} </Card.Text>
                            </Card.Body>
                        </Col>
                        <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                            <Button className="stretched-link me-2" variant="danger" disabled>
                                Find out more
                            </Button>
                            
                        </Col>
                    </Row>
                </Card>
            )}

        </Container>
    );
}

export default EngineerBrowseCourse