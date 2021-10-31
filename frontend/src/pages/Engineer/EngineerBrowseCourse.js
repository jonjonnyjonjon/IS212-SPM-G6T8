import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Card,
    Row,
    Tabs,
    Tab,
    Col, Badge
 } from 'react-bootstrap'

 import { useEffect, useState } from "react"
 import { Link, useRouteMatch, useHistory } from 'react-router-dom'
 import axios from "axios"
 import styled from "styled-components";

 const CourseTabs = styled(Tabs)`
     margin: 20px 50px;
 `;

function EngineerBrowseCourse() {
    const [eligibleCourses, getEligibleCourses] = useState([]);
    const [pendingEnrolment, getPendingEnrolment] = useState([]);
    const [ineligibleByPrereq, getIneligibleByPrereq] = useState([]);
    const [ineligibleByEnrolled, getIneligibleByEnrolled] = useState([]);
    const [ineligibleByCompleted, getIneligibleByCompleted] = useState([]);
    const [key, setKey] = useState("eligible");

    const { url } = useRouteMatch()

    let history = useHistory()

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/enrolRequest/getPendingRequest")
        .then(res => {
            console.log(res.data)
            getPendingEnrolment(res.data)
        })

        axios.get("http://127.0.0.1:5000/courses/getEligible")
            .then(res => {
                getEligibleCourses(res.data)
            })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByPrereq")
        .then(res => {
            getIneligibleByPrereq( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByEnrolled")
        .then(res => {
            getIneligibleByEnrolled( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByCompleted")
        .then(res => {
            getIneligibleByCompleted( res.data )
        })
    }, [])

    const renderTab = (k) => {
        setKey(k)
    }
    
    return (
        <Container>
            <h1>Browse Courses</h1><br/>
            <CourseTabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={  (k) => renderTab(k) }
                className="mb-3"
            >

                <Tab eventKey="eligible" title="Eligible for Enrolment">
                    {
                        pendingEnrolment.length === 0 ? "" :

                        pendingEnrolment.map(course =>
                            <Card border='warning' style={{ width: '60rem' }} className='mb-3 text-muted' key={course.course_id + course.class_id}>
                                <Row>
                                    <Col md={2}>
                                        <Card.Img src="holder.js/100px180" />
                                    </Col>
    
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title> {course.course_name} </Card.Title>
                                            <Card.Subtitle className='mb-3'> {course.course_id} </Card.Subtitle> 
                                            <Card.Subtitle>Trainer:</Card.Subtitle> {course.trainer_name} <br/><br/>
                                            <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                            <Card.Subtitle>Course summary: </Card.Subtitle>
                                            <Card.Text> {course.course_summary} </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    
                                    <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                        Pending<br/>
                                        Enrolment
                                    </Col>
                                </Row>
                            </Card>
                        )

                    }
                    {eligibleCourses.map(course =>
                        <Card border='dark' style={{ width: '60rem' }} className='mb-3' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>

                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle className='mb-3'> {course.course_id} </Card.Subtitle> 
                                        <Card.Subtitle>
                                            Course pre-requisite(s): <br/>
                                            { course.prerequisites.indexOf(',') != -1
                                                ? course.prerequisites.split(',').map( prereq =>
                                                    <Badge bg='dark' className='me-2' key={prereq}> {prereq} </Badge> )
                                                : <Badge bg='dark' className='me-2' key={course.prerequisites}> {course.prerequisites} </Badge>
                                            }
                                        </Card.Subtitle> <br/><br/>
                                        <Card.Subtitle>Trainer:</Card.Subtitle> {course.trainer_name} <br/><br/>
                                        <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                        <Card.Subtitle>Course summary: </Card.Subtitle>
                                        <Card.Text> {course.course_summary} </Card.Text>
                                    </Card.Body>
                                </Col>
                                
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    <Link to={`${url}/viewCourse/${course.course_id}/${course.class_id}`}> 
                                        <Button className="stretched-link me-2" variant="primary">
                                                    Find out more
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>

                <Tab eventKey="ineligible" title="Ineligible classes">
                    {ineligibleByEnrolled.map(course =>
                        <Card border='warning' style={{ width: '60rem' }} className='mb-3 text-muted' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>

                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle className='mb-3'> {course.course_id} </Card.Subtitle> 

                                        <Card.Subtitle>Trainer:</Card.Subtitle> {course.name} <br/><br/>
                                        <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                        <Card.Text> {course.course_summary} </Card.Text>
                                    </Card.Body>
                                </Col>
                                
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    Currently enrolled in this course
                                </Col>
                            </Row>
                        </Card>
                    )}

                    {ineligibleByPrereq.map(course =>
                        <Card border='danger' style={{ width: '60rem' }} className='mb-3 text-muted' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>

                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle className='mb-3'> {course.course_id} </Card.Subtitle> 

                                        <Card.Subtitle>Trainer:</Card.Subtitle> {course.name} <br/><br/>
                                        <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                        <Card.Text> {course.course_summary} </Card.Text>
                                    </Card.Body>
                                </Col>
                                
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    Have not fulfilled pre-requisite { course.prereq_course_id}
                                </Col>
                            </Row>
                        </Card>
                    )}
                    
                    {ineligibleByCompleted.map(course =>
                        <Card border='success' style={{ width: '60rem' }} className='mb-3 text-muted' key={course.course_id + course.class_id}>
                            <Row>
                                <Col md={2}>
                                    <Card.Img src="holder.js/100px180" />
                                </Col>

                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title> {course.course_name} </Card.Title>
                                        <Card.Subtitle className='mb-3'> {course.course_id} </Card.Subtitle> 

                                        <Card.Subtitle>Trainer:</Card.Subtitle> {course.name} <br/><br/>
                                        <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                        <Card.Text> {course.course_summary} </Card.Text>
                                    </Card.Body>
                                </Col>
                                
                                <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                                    Already completed
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Tab>
            </CourseTabs>

        </Container>
    );
}

export default EngineerBrowseCourse