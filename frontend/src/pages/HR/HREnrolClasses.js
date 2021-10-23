import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Form,
    Button,
    Dropdown,
    DropdownButton
 } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

const HREnrolClasses = () => {
    const { courseID, courseName, hasPrereq } = useParams()
    const [classes, setClasses] = useState([])
    const [eligibleEngineers, setEligibleEngineers] = useState([])
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedEngineers, setSelectedEngineers] = useState([])


    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/classes/courseID?courseID=${courseID}`)
            .then(res => {
                setClasses(res.data)
                setSelectedClass(res.data[0].class_id)
            })
    }, [courseID])


    // get eligible engineers when page loads
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/engineers/eligibleEngineers?courseID=${courseID}&hasPrereq=${hasPrereq}`)
            .then(res => {
                setEligibleEngineers(res.data)
            })
    }, [courseID, hasPrereq])

    const addOrRemoveEngineer = e => {
        const checked = e.target.checked
        const selectedEmail = e.target.id

        if (checked) {
            setSelectedEngineers(prev => [...prev, selectedEmail])
        } else {
            setSelectedEngineers(emails => emails.filter(email => email !== selectedEmail))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post("http://127.0.0.1:5000/enrolled", {
            "courseID": courseID,
            "classID": selectedClass,
            "engineers": selectedEngineers
        }) 
        alert("enrolled engineers")
        window.location.reload()
    }

    return(
        <Container>
            <h1>Enrolment</h1>
            <h3>{courseID} | {courseName}</h3>

                <Form.Group className="mb-3">
                    <Form.Label>Choose a class:</Form.Label>
                    <DropdownButton title={selectedClass}>                        
                        {classes.map(a_class =>
                            <Dropdown.Item 
                                key={a_class.class_id}
                                onClick={() => setSelectedClass(a_class.class_id)}
                            > 
                                {a_class.class_id}
                            </Dropdown.Item>    
                        )}
                    </DropdownButton>
                </Form.Group>

                <div className="mt-3">
                {eligibleEngineers.map(engineer => 
                    <Form.Check 
                        type="checkbox"
                        key={engineer.email}
                        id={engineer.email}
                        label={engineer.email}
                        onClick={(e) => addOrRemoveEngineer(e)}
                    />
                )}
                </div>
                <Button className="mt-3" onClick={(e) => handleSubmit(e)}>Enrol</Button>
            
        </Container>
    )
}

export default HREnrolClasses