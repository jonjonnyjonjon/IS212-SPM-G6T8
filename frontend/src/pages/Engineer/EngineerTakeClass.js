import axios from "axios"
import { useEffect, useState } from "react"
import { Col, Container, Form, Row, Button, Modal } from "react-bootstrap"
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom"
import { Stepper, Step, StepLabel, StepContent, FormGroup } from "@mui/material"

import completionBadge from "../../img/completion-badge.png"

const EngineerTakeClass = () => {
    const { courseID, classID } = useParams()
    const [chapters, setChapters] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [checklist, setChecklist] = useState(0)
    const [modalShow, setModalShow] = useState(false)
    const [doneModalShow, setDoneModalShow] = useState(false)
    const history = useHistory()
    const { url } = useRouteMatch()

    useEffect(async () => {
        const query = `courseID=${courseID}&classID=${classID}`
        axios.get(`http://127.0.0.1:5000/teachingMaterials/getChapters?${query}`)
            .then(res => {
                setChapters(res.data)
            })
    }, [])
    const handleModalClose = () => setModalShow(false)
    const handleDoneModalClose = () => { 
        setDoneModalShow(false)
        history.push("/engineer")
    }
    const handleCheck = e => {
        if (e.target.checked) {
            setChecklist(prevChecklist => prevChecklist + 1)
        } else {
            setChecklist(prevChecklist => prevChecklist - 1)
        }
    }

    const handlePrevChapter = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleNextChapter = () => {
        if (checklist === 2) {
            setActiveStep(prevActiveStep => prevActiveStep + 1)
            setChecklist(0)
            document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false )
        } else {
            setModalShow(true)
        }
    }

    return (
        <Container className="mt-3">
            <Row>
                <div>
                    <h1> {courseID} | {classID} </h1>
                </div>
            </Row>
            <hr />
            <Row>
                <Col md={2} sm={2}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {chapters.map(chapter => 
                            <Step key={chapter.chapter_id}>
                                <StepLabel>Chapter {chapter.chapter_id}</StepLabel>
                            </Step>
                        )}
                    </Stepper>

                    <div className="mt-3">
                        <h4> Checklist for Chapter {activeStep+1}: </h4>
                        <Form.Check label="Video" name={`checklist-chapter${activeStep+1}`} type="checkbox" id="checklist-video" onClick={e => handleCheck(e)} />
                        <Form.Check label="Quiz" name={`checklist-chapter${activeStep+1}`} type="checkbox" id="checklist-quiz" onClick={e => handleCheck(e)} />
                    </div>
                </Col>

                <Col>
                    <div>
                        {chapters.length === 0 ? null :
                        <iframe width="800" height="600" src={chapters[activeStep].content} frameBorder="0" allowFullScreen/>
                        }
                    </div>

                    <Row>
                        <Col>
                            <Link to={`${url}/chapter${activeStep+1}/quiz`}>
                                <Button>Take Quiz!</Button>
                            </Link>
                        </Col>

                        <Col>
                            {activeStep === 0 ? null : <Button onClick={handlePrevChapter}>Previous Chapter</Button>} {' '}
                            {activeStep === chapters.length - 1 ?
                            <Button onClick={() => {setDoneModalShow(true)}}>Done!</Button>
                            : <Button onClick={handleNextChapter}>Next Chapter</Button>}

                            {/* Modal for completing the course */}
                            <Modal size="lg" show={doneModalShow} >
                                <Modal.Body className="mx-auto">
                                    <Modal.Title>Congratuations! You have completed this course.</Modal.Title>
                                    <img src={ completionBadge } alt="Completion Badge IMG" width={200} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleDoneModalClose}>Back to courses</Button>
                                </Modal.Footer>
                            </Modal>
                            
                            {/* Modal for checklist checking */}
                            <Modal show={modalShow} centered>
                                <Modal.Header>
                                    <Modal.Title>You have not cleared your checklist!</Modal.Title>
                                </Modal.Header>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default EngineerTakeClass