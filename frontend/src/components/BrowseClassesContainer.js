import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Button,
    Container,
    Card,
    Row,
    Col, Badge
 } from 'react-bootstrap'

import { Link, useRouteMatch } from 'react-router-dom'
import printerImg from "../img/printer.png"

const BrowseClassesContainer = (props) => {
    const { url } = useRouteMatch()
    const classes = props.classes
    const filter = props.filter

    let eligibleFilters = ["eligibleWithPrereq", "eligibleNoPrereq"]
    let ineligibleFilters = ["pendingEnrolment", "ineligibleEnrolled", "ineligiblePrereq", "ineligibleCompleted"]

    // Default styling — for eligible
    let message = "Find out more"
    let borderColour = "dark"

    // Text styling based on filter
    let cardBootstrapClassName = "mb-3"

    if ( ineligibleFilters.includes(filter) ) {
        cardBootstrapClassName = "mb-3 text-muted"
    }

    // Ineligible message + card border colour to be displayed
    if (filter === "ineligibleEnrolled") {
        message = "Currently enrolled in this course";
        borderColour = "warning"

    } else if (filter === "ineligiblePrereq") {
        message = "Have not fulfilled pre-requisite "
        borderColour = "danger"

    } else if (filter === "ineligibleCompleted") {
        message = "Course has been already been completed"
        borderColour = "success"
    } else if (filter === "pendingEnrolment") {
        message = "Pending Enrolment"
        borderColour = "warning"
    }

    return(
        <div>
            {classes.map(thisClass =>
                <Card border={borderColour} style={{ width: '60rem' }} className={cardBootstrapClassName} key={thisClass.course_id + thisClass.class_id}>
                    <Row>
                        <Col md={2}>
                            <img src={ printerImg } alt="printer img" width={200} />
                        </Col>

                        <Col md={8}>
                            <Card.Body>
                                <Card.Title> {thisClass.course_name} </Card.Title>
                                <Card.Subtitle className='mb-3'> {thisClass.course_id} </Card.Subtitle> 
                                <Card.Subtitle>Trainer:</Card.Subtitle> {thisClass.trainer_name} <br/><br/>
                                { filter === "eligibleWithPrereq"
                                    ?   <Card.Subtitle>
                                            Course pre-requisite(s): <br/>
                                            { thisClass.prerequisites !== ""
                                                ? <Badge bg='dark' className='me-2' key={thisClass.prerequisites}> {thisClass.prerequisites} </Badge>
                                                : 'None'
                                            }
                                        </Card.Subtitle>
                                    : ( filter === 'eligibleNoPrereq'
                                        ?   <Card.Subtitle>
                                                Course pre-requisite(s): None <br/>
                                            </Card.Subtitle>
                                        : '')
                                } <br/><br/>
                                <Card.Subtitle>Class:</Card.Subtitle> {thisClass.class_id} <br/><br/>
                            </Card.Body>
                        </Col>
                        
                        <Col md={2} className='my-auto' style={{verticalAlign: 'center'}}>
                            {eligibleFilters.includes(filter) ?
                                <Link to={`${url}/viewCourse/${thisClass.course_id}/${thisClass.class_id}`}> 
                                    <Button className="stretched-link me-2" variant="primary">
                                        Find out more
                                    </Button>
                                </Link>
                            : message}
                            { filter === "ineligiblePrereq" ? thisClass.prereq_course_id : "" }                          
                             <br/>

                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    )
}

export default BrowseClassesContainer