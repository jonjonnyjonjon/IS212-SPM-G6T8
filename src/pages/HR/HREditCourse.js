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

const HREditCourse = () => {
    const [courseID, setCourseID] = useState(useParams().courseID)
    const [courseName, setCourseName] = useState("")
    const [courseClass, setCourseClass] = useState("")
    const [chosenTrainer, setChosenTrainer] = useState("")
    const [size, setSize] = useState(0)
    const [enrolmentStart, setEnrolmentStart] = useState("")
    const [enrolmentEnd, setEnrolmentEnd] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    let history = useHistory()
    const [trainers, setTrainers] = useState([])

    // Get course information from courseID passed in URL param
    useEffect(()=> {
        axios.post("http://127.0.0.1:5000/courses/courseID", {
            "courseID": courseID
        })
            .then(res => {
                const courseInfo = res.data[0]
                setCourseName(courseInfo.courseName)
                setCourseClass(courseInfo.class)
                setSize(courseInfo.size)
                setChosenTrainer(courseInfo.trainer)
                setEnrolmentStart(courseInfo.enrolmentStart)
                setEnrolmentEnd(courseInfo.enrolmentEnd)
                setStartDate(courseInfo.startDate)
                setEndDate(courseInfo.endDate)
            })
            .catch(err => console.log(err))
    })

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
        axios.post("http://127.0.0.1:5000/courses/editCourse", {
            "courseID": courseID,
            "courseName": courseName,
            "class": courseClass,
            "size": size,
            "trainer": chosenTrainer,
            "enrolmentStart": enrolmentStart,
            "enrolmentEnd": enrolmentEnd,
            "startDate": startDate,
            "endDate": endDate
        })
            .then(console.log("sent to backend!"))
        alert("course edited successfully! redirecting back to courses page...")
        history.push("/hr/courses")
    }

    return (
        <Container>
            <h1>Editing course</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control value={courseID} onChange={e => setCourseID(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course Name</Form.Label>
                    <Form.Control value={courseName} onChange={e => setCourseName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Class</Form.Label>
                    <Form.Control value={courseClass} onChange={e => setCourseClass(e.target.value)}/>
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
                    <Form.Control value={startDate} onChange={e => setStartDate(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>End date</Form.Label>
                    <Form.Control value={endDate} onChange={e => setEndDate(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default HREditCourse