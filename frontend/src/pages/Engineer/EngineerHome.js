import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Card,
    Row,
    Col,
    Tabs,
    Tab
 } from 'react-bootstrap'

import { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components";

const CourseTabs = styled(Tabs)`
    margin: 20px 50px;
`;

function EngineerHome() {
    const [ongoingCourses, getOngoing] = useState([]);
    const [pendingEnrolment, getPendingEnrolment] = useState([]);
    const [completedCourses, getCompleted] = useState([]);
    const [key, setKey] = useState("ongoing");


    // To change to retrieveOngoing once endpoint is completed
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/getOngoing")
            .then(res => {
                console.log(res.data)
                getOngoing(res.data)
            })
        axios.get("http://127.0.0.1:5000/courses/getCompleted")
            .then(res => {
                getCompleted(res.data)
                })

        axios.get("http://127.0.0.1:5000/enrolRequest/getPendingRequest")
            .then(res => {
                console.log(res.data)
                getPendingEnrolment(res.data)
            })
    }, [])

    const renderTab = (k) => {
        setKey(k)
    }

    return (
        <Container>
            <h1>My Courses</h1><br/>
            <CourseTabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={  (k) => renderTab(k) }
                className="mb-3"
            >

                <Tab eventKey="ongoing" title="Ongoing Courses">
                    {ongoingCourses.map(course =>
                        <Card border='primary' style={{ width: '60rem' }} className='mb-3' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle> {course.course_id} </Card.Subtitle>
                                        <Card.Text> {course.class_id} </Card.Text><br/>
                                        <Card.Text> {course.course_summary} </Card.Text><br/>
                                        <Card.Subtitle>From: </Card.Subtitle> {course.class_start} to {course.class_end} <br/><br/>
                                        <Card.Subtitle>Course Trainer: </Card.Subtitle> {course.trainer_name}
                                    </Card.Body>
                                </Col>
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    <Button className="stretched-link" variant="primary">Course content</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>

                <Tab eventKey="pending" title="Pending Enrolment">
                    {pendingEnrolment.map(course =>
                        <Card border='danger' style={{ width: '60rem' }} className='mb-3' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle> {course.course_id} </Card.Subtitle>
                                        <Card.Text> {course.class_id} </Card.Text><br/>
                                        <Card.Text> {course.course_summary} </Card.Text><br/>
                                        <Card.Subtitle>Course Trainer: </Card.Subtitle> {course.trainer_name}
                                    </Card.Body>
                                </Col>
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    <Button className="stretched-link" variant="danger">Withdraw</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>

                <Tab eventKey="completed" title="Completed Courses">
                    {completedCourses.map(course =>
                        <Card border='success' style={{ width: '60rem' }} className='mb-3' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle> {course.course_id} </Card.Subtitle>
                                        <Card.Text> {course.class_id} </Card.Text><br/>
                                        <Card.Text> {course.course_summary} </Card.Text><br/>
                                        <Card.Subtitle>Completed on:</Card.Subtitle> {course.course_end} <br/><br/>
                                        <Card.Subtitle>Course Trainer: </Card.Subtitle> {course.trainer_name}
                                    </Card.Body>
                                </Col>
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    <Button className="stretched-link" variant="success">Review</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>

            </CourseTabs>
        </Container>
    );
}

export default EngineerHome