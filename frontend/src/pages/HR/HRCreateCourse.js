import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Container,
    Form,
    Button,
    DropdownButton,
    Dropdown
} from "react-bootstrap"

import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"

const HRCreateCourse = () => {
    const [courseID, setCourseID] = useState("")
    const [courseName, setCourseName] = useState("")
    const [courseClass, setCourseClass] = useState("")
    const [chosenTrainer, setChosenTrainer] = useState("")
    const [size, setSize] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    let history = useHistory()
    const [trainers, setTrainers] = useState([])

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
        axios.post("http://127.0.0.1:5000/courses/createCourse", {
            "courseID": courseID,
            "courseName": courseName,
            "class": courseClass,
            "size": size,
            "trainer": chosenTrainer,
            "startDate": startDate,
            "endDate": endDate
        })
            .then(console.log("sent to backend!"))
        alert("course created! redirecting back to courses page...")
        history.push("/hr/courses")
    }

    return( 
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control placeholder="Enter course ID" onChange={e => setCourseID(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control placeholder="Enter course name" onChange={e => setCourseName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Form.Control placeholder="Enter class" onChange={e => setCourseClass(e.target.value)}/>
                </Form.Group>
 
                <Form.Group className="mb-3">
                    <Form.Label>Trainer</Form.Label>
                    <DropdownButton title={chosenTrainer}>                        
                        {trainers.map(trainer =>
                            <Dropdown.Item 
                                key={trainer.email} 
                                onClick={() => setChosenTrainer(trainer.name)}> 
                                {trainer.name}
                            </Dropdown.Item>    
                        )}
                    </DropdownButton>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Class size</Form.Label>
                    <Form.Control placeholder="Enter class size" onChange={e => setSize(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Start date</Form.Label>
                    <Form.Control placeholder="Enter start date" onChange={e => setStartDate(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Form.Control placeholder="Enter end date" onChange={e => setEndDate(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HRCreateCourse