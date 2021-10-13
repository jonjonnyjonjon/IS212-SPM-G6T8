import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Tabs,
    Tab,
    Form,
    Button
 } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

const HREnrolClasses = () => {
    const { courseID, courseName, hasPrereq } = useParams()
    const [classes, setClasses] = useState([])
    const [eligibleEngineers, setEligibleEngineers] = useState([])
    const [selectedEngineers, setSelectedEngineers] = useState([])
    const [key, setKey] = useState("")

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/classes/courseID?courseID=${courseID}`)
            .then(res => {
                setClasses(res.data)
                if (res.data.length !== 0) {
                    setKey(res.data[0].class_id)
                }
            })
    }, [courseID])
    
    // get eligible engineers when page loads
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/engineers/eligibleEngineers?courseID=${courseID}&hasPrereq=${hasPrereq}`)
            .then(res => {
                setEligibleEngineers(res.data)
            })
    }, [courseID, hasPrereq])

    const addOrRemoveEngineer = (e) => {
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
            "classID": key,
            "engineers": selectedEngineers
        }) 
        alert("enrolled engineers")
        window.location.reload()
    }

    return(
        <Container>
            <h1>Enrolment</h1>
            <h3>{courseID} | {courseName}</h3>
            {key === "" ? "No classes created yet." 
                :
                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-3">
                    {classes.map(a_class => 
                        <Tab eventKey={a_class.class_id} title={a_class.class_id} key={courseID + a_class.class_id}>
                            <h4 className="mt-3">Search for engineers to enrol into this class:</h4>
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
                        </Tab>
                    )}
                </Tabs>
            }
        </Container>
    )
}

export default HREnrolClasses