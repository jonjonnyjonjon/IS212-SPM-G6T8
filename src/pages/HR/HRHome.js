import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Container,
    Row,
    Col
 } from 'react-bootstrap'

// This is the homepage for HR.
// For any subsequent pages you are creating, create them in pages folder (e.g. HRCourses.js, HRPendingEnrolment.js)
// Take note of naming convention, it is camel case, but the first word's first letter is also capitalized, i.e. MyName, not myName

// Any components that you may think is reuseable, create them inside the components folder.
// For import routes, make sure to state your current folder i.e. "./xxx/xxx" instead of "/xxx/xxx".


function HRHome() {
    return (
        <div>
            <Container>
                <Row>
                    <Col bg="dark">
                        <div style={{backgroundColor: "red"}}>
                            <h1>Pending Enrolment</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{backgroundColor: "blue"}}>
                            <h1>Engineers</h1>
                        </div>
                    </Col>
                    <Col>
                        <div style={{backgroundColor: "green"}}>
                            <h1>Courses</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HRHome