import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Card,
    Row,
    Col, Badge,
 } from 'react-bootstrap'

 import { useEffect, useState } from "react"
 import { Link, useRouteMatch, useHistory } from 'react-router-dom'
 import axios from "axios"

function EngineerBrowseCourse() {
    const { url } = useRouteMatch()
    let history = useHistory()

    const [eligibleCourses, getEligibleCourses] = useState([]);
    const [ineligiblePrereq, getIneligiblePrereq] = useState([]);
    const [ineligibleEnrolled, getIneligibleEnrolled] = useState([]);
    const [ineligibleCompleted, getIneligibleCompleted] = useState([]);
    // const [prereqCourses, getPrereqCourses] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses/getEligible")
            .then(res => {
                getEligibleCourses(res.data)
            })

        axios.get("http://127.0.0.1:5000/courses/getIneligiblePrereq")
        .then(res => {
            getIneligiblePrereq( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleEnrolled")
        .then(res => {
            getIneligibleEnrolled( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleCompleted")
        .then(res => {
            getIneligibleCompleted( res.data )
        })
    }, [])
    
    return (
        <Container>
            <h1>Browse Courses</h1><br/>

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
                                    { course.prerequisites.indexOf(',') != -1
                                        ? course.prerequisites.split(',').map( prereq =>
                                            <Badge bg='dark' className='me-2' key={prereq}> {prereq} </Badge> )
                                        : <Badge bg='dark' className='me-2' key={course.prerequisites}> {course.prerequisites} </Badge>
                                    }
                                </Card.Subtitle> <br/><br/>
                                <Card.Subtitle>Trainer:</Card.Subtitle> {course.trainer_name} <br/><br/>
                                <Card.Subtitle>Class:</Card.Subtitle> {course.class_id} <br/><br/>
                                <Card.Text> {course.course_summary} </Card.Text>
                            </Card.Body>
                        </Col>
                        
                        <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                            <Link to={`${url}/viewCourse/${course.course_id}`}> 
                                <Button className="stretched-link me-2" variant="primary">
                                            Find out more
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            )}

            {ineligiblePrereq.map(course =>
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
                            Not fulfilled: { course.prereq_course_id}
                        </Col>
                    </Row>
                </Card>
            )}

        </Container>
    );
}

export default EngineerBrowseCourse