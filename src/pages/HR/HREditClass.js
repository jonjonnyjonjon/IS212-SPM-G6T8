import { 
    Container,
    Form,
    Button,
    DropdownButton,
    Dropdown
} from "react-bootstrap"

import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"

const HREditClass = () => {
    const { courseID, classID } = useParams()

    const [chosenTrainer, setChosenTrainer] = useState("")
    const [size, setSize] = useState(0)
    const [enrolmentStart, setEnrolmentStart] = useState("")
    const [enrolmentEnd, setEnrolmentEnd] = useState("")
    const [classStart, setClassStart] = useState("")
    const [classEnd, setClassEnd] = useState("")

    let history = useHistory()
    const [trainers, setTrainers] = useState([])

    // Get course information from courseID passed in URL param
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/classes/class?courseID=${courseID}&classID=${classID}`)
            .then(res => {
                const courseInfo = res.data[0]
                setChosenTrainer(courseInfo.trainer_email)
                setSize(courseInfo.size)
                setEnrolmentStart(courseInfo.enrolment_start)
                setEnrolmentEnd(courseInfo.enrolment_end)
                setClassStart(courseInfo.class_start)
                setClassEnd(courseInfo.class_end)
            })
  
    }, [courseID, classID])

    // Get all qualified trainers to teach this course
    useEffect(()=> {
        axios.post("http://127.0.0.1:5000/trainers/qualified", {
            "courseID": courseID
        })
            .then(res => {
                setTrainers(res.data)
            })
            .catch(err => console.log(err))
    }, [courseID])

    const handleSubmit = e => {
        e.preventDefault()
        axios.post("http://127.0.0.1:5000/classes/editClass", {
            "courseID": courseID,
            "classID": classID,
            "trainer": chosenTrainer,
            "size": size,
            "enrolmentStart": enrolmentStart,
            "enrolmentEnd": enrolmentEnd,
            "classStart": classStart,
            "classEnd": classEnd
        })
            .then(console.log("sent to backend!"))
        alert("course edited successfully! redirecting back to previous page...")
        history.goBack()
    }

    return (
        <Container>
            <h1>Editing course</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Trainer</Form.Label>
                    <DropdownButton title={chosenTrainer}>                        
                        {trainers.map(trainer =>
                            <Dropdown.Item 
                                key={trainer.email} 
                                onClick={() => setChosenTrainer(trainer.email)}> 
                                {trainer.email}
                            </Dropdown.Item>    
                        )}
                    </DropdownButton>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Class size</Form.Label>
                    <Form.Control value={size} onChange={e => setSize(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enrolment start</Form.Label>
                    <Form.Control value={enrolmentStart} onChange={e => setEnrolmentStart(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enrolment end</Form.Label>
                    <Form.Control value={enrolmentEnd} onChange={e => setEnrolmentEnd(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control value={classStart} onChange={e => setClassStart(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Form.Control value={classEnd} onChange={e => setClassEnd(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HREditClass