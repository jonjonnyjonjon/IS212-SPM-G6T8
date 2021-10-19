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
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import axios from "axios"
import styled from "styled-components";


const CourseTabs = styled(Tabs)`
    margin: 20px 50px;
`;

function EngineerHome() {
    const [ongoingCourses, getOngoing] = useState([]);
    const [completedCourses, getCompleted] = useState([]);
    const [key, setKey] = useState("ongoing");


    // To change to retrieveOngoing once endpoint is completed
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/getOngoing")
            .then(res => {
                getOngoing(res.data)
            })
        axios.get("http://127.0.0.1:5000/courses/getCompleted")
            .then(res => {
                getCompleted(res.data)
                })
    }, [])

    const renderTab = (k) => {
        setKey(k)
    }

    console.log(completedCourses);

    return (
        <Container>
            <h1>My Courses</h1><br/>
            <CourseTabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={  (k) => renderTab(k) }
                className="mb-3"
            >

            <Tab eventKey="ongoing" title="Ongoing">
            {ongoingCourses.map(course =>
                    <Card border='warning' style={{ width: '60rem' }} className='mb-3'>
                        <Row key={course.course_id + course.class_id}>
                            <Col md={2}>
                                <Card.Img src="holder.js/100px180" />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title> {course.course_name} </Card.Title>
                                    <Card.Subtitle> {course.course_id} </Card.Subtitle>
                                    <Card.Text>C1</Card.Text><br/>
                                    <Card.Text> {course.course_summary} </Card.Text><br/>
                                    <Card.Subtitle>From: </Card.Subtitle> {course.course_start} to {course.course_end} <br/><br/>
                                    <Card.Subtitle>Course Trainer: </Card.Subtitle> {course.trainer_name}
                                </Card.Body>
                            </Col>
                            <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                <Button className="stretched-link" variant="warning">Course content</Button>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Tab>

            <Tab eventKey="pending" title="Pending">Pending</Tab>

            <Tab eventKey="completed" title="Completed">
                {completedCourses.map(course =>
                    <Card border='success' style={{ width: '60rem' }} className='mb-3'>
                        <Row key={course.course_id + course.class_id}>
                            <Col md={2}>
                                <Card.Img src="holder.js/100px180" />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title> {course.course_name} </Card.Title>
                                    <Card.Subtitle> {course.course_id} </Card.Subtitle><br/>
                                    <Card.Text> {course.course_summary} </Card.Text><br/>
                                    <Card.Subtitle> Completed on:</Card.Subtitle> {course.course_end} <br/><br/>
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