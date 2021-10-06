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
import ButtonNavbar from '../../components/ButtonNavbar'
import styled from "styled-components";


const CourseTabs = styled(Tabs)`
    margin: 20px 50px;
`;

function EngineerCourses() {
    const [courses, getCourses] = useState([]);
    const [key, setKey] = useState("ongoing");


    useEffect(() => {
        axios.get("http://127.0.0.1:5000/engineers/retrieveEligible")
            .then(res => {
                getCourses(res.data)
            })
    }, [])

    const renderTab = (k) => {
        setKey(k)

        let apiEndpoint = "http://127.0.0.1:5000/engineers/retrieve";

        if (k == "browse") {
            apiEndpoint += "Eligible";
        } else if (k == "completed" ) {
            apiEndpoint += "Completed";
        }

        console.log(apiEndpoint);

        axios.get(apiEndpoint)
        .then(res => {
            getCourses(res.data);
            console.log(res.data);
        })

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

            <Tab eventKey="ongoing" title="Ongoing">
                

            </Tab>

            <Tab eventKey="pending" title="Pending">Pending</Tab>

            <Tab
                eventKey="completed"
                title="Completed"
            >
                {courses.map(course =>
                    <Card style={{ width: '60rem' }}>
                        <Row key={course.courseName + course.courseID}>
                            <Col md={2}>
                                <Card.Img src="holder.js/100px180" />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title> {course.courseName} </Card.Title>
                                    <Card.Subtitle> {course.courseID} </Card.Subtitle>
                                    <Card.Text> {course.completed_date} </Card.Text><br/>
                                    <Card.Subtitle>Course Trainer: {course.trainer} </Card.Subtitle>
                                </Card.Body>
                            </Col>
                            <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                <Button variant="primary">Go somewhere</Button>
                            </Col>
                        </Row>
                    </Card>
                )}
            </Tab>

            <Tab eventKey="browse" title="Browse Courses">
                    {courses.map(course =>
                        <Card style={{ width: '60rem' }}>
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
                                    <Button variant="primary">Go somewhere</Button>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>

            </CourseTabs>
        </Container>
    );
}

export default EngineerCourses