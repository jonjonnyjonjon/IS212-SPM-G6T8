import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Table
 } from 'react-bootstrap'

import { useState } from "react"

const HRCourses = () => {
    const [courseFilter, setCourseFilter] = useState("")

    return(
        <Container className="mt-5">
            <h1>Courses</h1>
            <div>
                <Button variant="info">Ready</Button>{' '}
                <Button variant="info">Not ready</Button>{' '}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            
        </Container>
    )
}

export default HRCourses