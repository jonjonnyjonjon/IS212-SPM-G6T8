import { 
    Container,
    Row,
    Col,
    Table
} from 'react-bootstrap'
import styled from "styled-components"

const BadgeBox = styled.div`
    background-color: "#F8F0E3";
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.05) 0px 6px 6px;
    padding: 10px;
    text-align: center;
    width: 25vw;
    height: 8vh;
    border-radius: 5px;
`

function HRHome() {
    return (
        <div>
            <Container>
                <h1>HR Dashboard</h1>
                <Row className="mb-5">
                    <Col bg="dark">
                        <BadgeBox>
                            <b>New enrolments</b>
                            <p>12</p>
                        </BadgeBox>
                    </Col>

                    <Col bg="dark">
                        <BadgeBox>
                            <b>Courses in system</b>
                            <p>7</p>
                        </BadgeBox>
                    </Col>

                    <Col bg="dark">
                        <BadgeBox>
                            <b>Number of trainers</b>
                            <p>9</p>
                        </BadgeBox>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <h3>List of some courses</h3>
                        <Table bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Course Name</th>
                                    <th>Trainer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CG1000</td>
                                    <td>Intro to Canon G1000</td>
                                    <td>John Appleseed</td>
                                </tr>
                                <tr>
                                    <td>CG2000</td>
                                    <td>Intro to Canon G2000</td>
                                    <td>John Appleseed, Jack Sparrow, Jane Doe</td>
                                </tr>
                                <tr>
                                    <td>CG3000</td>
                                    <td>Intro to Canon G3000</td>
                                    <td>Dwight Schrute, Jack Sparrow</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h3>Enrolment Requests</h3>
                        <Table bordered hover variant="warning" >
                            <thead>
                                <tr>
                                    <th>Course ID</th>
                                    <th>Class</th>
                                    <th>Engineer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>CG1000</td>
                                    <td>CG1000</td>
                                    <td>Keith</td>
                                </tr>
                                <tr>
                                    <td>CG2000</td>
                                    <td>C2</td>
                                    <td>Jon</td>
                                </tr>
                                <tr>
                                    <td>CG3000</td>
                                    <td>C1</td>
                                    <td>Krysten</td>
                                </tr>
                                <tr>
                                    <td>BG1000</td>
                                    <td>C1</td>
                                    <td>Huiqi</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HRHome