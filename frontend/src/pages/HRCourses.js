import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Table
 } from 'react-bootstrap'

import { useEffect, useState } from "react"
import axios from "axios"

const HRCourses = () => {
    const [courseFilter, setCourseFilter] = useState("")
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/courses")
            .then(res => {
                setCourses(res.data)
            })
    }, [])

    return( 
        <Container className="mt-5">
            {console.log(courses)}
            <h1>Courses</h1>
            <div>
                <Button variant="info">Ready</Button>{' '}
                <Button variant="info">Not ready</Button>{' '}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Course name</th>
                            <th>Class</th>
                            <th>Class size</th>
                            <th>Start date</th>
                            <th>End date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course =>
                            <tr>
                                <td>{course.courseName}</td>
                                <td>{course.class}</td>
                                <td>{course.size}</td>
                                <td>{course.startDate}</td>
                                <td>{course.endDate}</td>
                            </tr>    
                        )}
                    </tbody>
                </Table>
            </div>
            
        </Container>
    )
}

export default HRCourses