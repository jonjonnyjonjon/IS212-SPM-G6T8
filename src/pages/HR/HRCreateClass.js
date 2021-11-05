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
import { BASE_API_URL } from "../../utils/constants"

const HRCreateCourse = () => {
    const { courseID } = useParams()
    const [classID, setClassID] = useState("")
    const [chosenTrainer, setChosenTrainer] = useState("")
    const [size, setSize] = useState(0)
    const [enrolmentStart, setEnrolmentStart] = useState("")
    const [enrolmentEnd, setEnrolmentEnd] = useState("")
    const [classStart, setClassStart] = useState("")
    const [classEnd, setClassEnd] = useState("")

    let history = useHistory()
    const [trainers, setTrainers] = useState([])

    useEffect(()=> {
        axios.post(`${BASE_API_URL}/trainers/qualified`, {
            "courseID": courseID
        })
            .then(res => {
                setTrainers(res.data)
                setChosenTrainer(res.data[0].email)
            })
            .catch(err => console.log(err))
    }, [courseID])

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`${BASE_API_URL}/classes/createClass`, {
            "courseID": courseID,
            "classID": classID,
            "size": size,
            "trainerEmail": chosenTrainer,
            "enrolmentStart": enrolmentStart,
            "enrolmentEnd": enrolmentEnd,
            "classStart": classStart,
            "classEnd": classEnd
        })
            .then(console.log("sent to backend!"))
        alert("course created! redirecting back to previous page...")
        history.goBack()
    }

    return( 
        <Container>
            <h1>Create new class</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Class ID</Form.Label>
                    <Form.Control placeholder="Enter class" onChange={e => setClassID(e.target.value)}/>
                </Form.Group>
 
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
                    <Form.Control placeholder="Enter class size" onChange={e => setSize(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enrolment start</Form.Label>
                    <Form.Control placeholder="Enter enrolment start date" onChange={e => setEnrolmentStart(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Enrolment end</Form.Label>
                    <Form.Control placeholder="Enter enrolment end date" onChange={e => setEnrolmentEnd(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control placeholder="Enter start date" onChange={e => setClassStart(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Form.Control placeholder="Enter end date" onChange={e => setClassEnd(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HRCreateCourse