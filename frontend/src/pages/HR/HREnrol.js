import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Button,
    Table,
    Form
 } from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

const HREnrol = () => {
    const [courses, setCourses] = useState([])
    const [keyword, setKeyword] = useState("")

    const { url } = useRouteMatch()

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/courses/courseName?keyword=${keyword}`)
            .then(res => {
                setCourses(res.data)
            })
    }, [keyword])

    return(
        <Container>
            <h1>Enrol engineers</h1>

            <Form.Control 
                type="text" 
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search by course name"
                className="mt-3"
            />

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Summary</th>
                        <th>Pre-requisites?</th>
                        <th>View all classes</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>
                        <tr key={course.course_id}>
                            <td>{course.course_id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.course_summary}</td>
                            <td>{course.has_prereq ? "Yes" : "No"}</td>
                            <td>
                                <Link to={`${url}/${course.course_id}/${course.course_name}/${course.has_prereq}`}>
                                    <Button variant="warning">View</Button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    )
}

export default HREnrol



// <Modal show={show} onHide={handleClose}>
//     <Modal.Header closeButton>
//         <Modal.Title>Select engineers to enrol</Modal.Title>
//     </Modal.Header>

//     <Modal.Body>
//         {selectedCourse}
//         <div>
//             {eligibleEngineers.map(engineer => 
//                 <Form.Check 
//                     type="checkbox"
//                     key={engineer.email}
//                     id={engineer.email}
//                     label={engineer.name}
//                     onClick={() => setSelectedEngineers(prev => [...prev, engineer.email])}
//                 />
//             )}
//         </div>
//     </Modal.Body>

//     <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//             Close
//         </Button>
//         <Button variant="primary" onClick={handleSaveChanges}>
//             Save Changes
//         </Button>
//     </Modal.Footer>
// </Modal>
    