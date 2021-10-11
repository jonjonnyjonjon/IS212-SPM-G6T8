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
    const [courses, getCourses] = useState([]);
    const [key, setKey] = useState("ongoing");


    // To change to retrieveOngoing once endpoint is completed
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/retrieveCompleted")
            .then(res => {
                getCourses(res.data)
            })
    }, [])

    const renderTab = (k) => {
        setKey(k)

        let apiEndpoint = "http://127.0.0.1:5000/courses/retrieve";

        if (k === "completed" ) {
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
                    <Card style={{ width: '60rem' }} className='mb-3'>
                        <Row key={course.courseName + course.courseID}>
                            <Col md={2}>
                                <Card.Img src="holder.js/100px180" />
                            </Col>
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title> {course.courseName} </Card.Title>
                                    <Card.Subtitle> {course.courseID} </Card.Subtitle>
                                    <Card.Text> {course.completedDate} </Card.Text><br/>
                                    <Card.Subtitle>Course Trainer: {course.trainer} </Card.Subtitle>
                                </Card.Body>
                            </Col>
                            <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                <Button className="stretched-link" variant="primary">Go somewhere</Button>
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