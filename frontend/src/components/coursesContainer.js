import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Table
 } from 'react-bootstrap'

import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"

const HRCourses = (props) => {
    const { url } = useRouteMatch()
    const courses = props.courses
    const filter = props.filter

    const publishCourse = (id) => {
        axios.post("http://127.0.0.1:5000/courses/publishCourse", {
            "courseID": id
        })

        alert("Course has been published!")
        window.location.reload()
    }

    return( 
        <Container className="mt-5">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Size</th>
                        <th>Trainer</th>
                        <th>Enrolment Period</th>
                        <th>Course Duration</th>
                        <th>Materials Uploaded?</th>
                        <th>Edit</th>
                        {filter === "ready" ? <th>Publish Course</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>
                        <tr key={course.courseName + course.class}>
                            <td>{course.courseName}</td>
                            <td>{course.class}</td>
                            <td>{course.size}</td>
                            <td>{course.trainer}</td>
                            <td>{course.enrolmentStart} - {course.enrolmentEnd}</td>
                            <td>{course.startDate} - {course.endDate}</td>
                            <td>{course.materialStatus === 0 ? "No" : "Yes"}</td>
                            <td>
                                <Link to={`${url}/editCourse/${course.courseID}`}>
                                    <Button variant="warning">Edit</Button>
                                </Link>
                            </td>
                            {filter === "ready" ?  
                                <td>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => publishCourse(course.courseID)}>
                                        Publish course
                                    </Button> 
                                </td>
                                : null
                            }
                        </tr>    
                    )}
                </tbody>
            </Table>
        </Container>
    )
}

export default HRCourses