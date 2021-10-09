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

    const publishCourse = (id) => {
        axios.post("http://127.0.0.1:5000/courses/publishCourse", {
            "courseID": id
        })

        alert("Course has been published!")
        window.location.reload()
    }

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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Size</th>
                            <th>Trainer</th>
                            <th>Enrolment Start</th>
                            <th>Enrolment End</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Materials Uploaded?</th>
                            <th>Edit</th>
                            <th>Publish Course</th>
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
                                <td>{course.enrolmentStart}</td>
                                <td>{course.enrolmentEnd}</td>
                                <td>{course.startDate}</td>
                                <td>{course.endDate}</td>
                                <td>{course.materialStatus === 0 ? "No" : "Yes"}</td>

                                <td>
                                    <Button variant="warning">
                                        <Link to={`${url}/editCourse/${course.courseID}`}>Edit</Link>
                                    </Button>{' '}
                                </td>

                                <td>
                                    {course.isPublished === 0 ?
                                        <Button 
                                            variant="warning" 
                                            onClick={() => publishCourse(course.courseID)} 
                                            disabled={course.materialStatus === 0 ? "disabled" : null}>
                                            Publish course
                                        </Button> : "Course is published!"}
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