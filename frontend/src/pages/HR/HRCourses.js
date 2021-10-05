import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Table
 } from 'react-bootstrap'

import { useEffect, useState } from "react"
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"

const HRCourses = () => {
    const { url } = useRouteMatch()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses")
            .then(res => {
                setCourses(res.data)
            })
    }, [])

    return( 
        <Container className="mt-5">
            <h1>Courses</h1>
            <div>
                <Button variant="info">Ready</Button>{' '}
                <Button variant="info">Not ready</Button>{' '}

                <Button variant="info">
                    <Link to={`${url}/createCourse`}>Create course</Link>
                </Button>{' '}

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course name</th>
                            <th>Class</th>
                            <th>Size</th>
                            <th>Trainer</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course =>
                            <tr key={course.courseName + course.class}>
                                <td>{course.courseID}</td>
                                <td>{course.courseName}</td>
                                <td>{course.class}</td>
                                <td>{course.size}</td>
                                <td>{course.trainer}</td>
                                <td>{course.startDate}</td>
                                <td>{course.endDate}</td>
                                <td>
                                    <Button variant="warning">
                                        <Link to={`${url}/editCourse/${course.courseID}`}>Edit</Link>
                                    </Button>{' '}
                                </td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default HRCourses