import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { 
    Container,
    Tabs,
    Tab,
    Form
 } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useState } from "react"

const HREnrolClasses = () => {
    const { courseID, courseName } = useParams()
    const [classes, setClasses] = useState([])
    const [eligibleEngineers, setEligibleEngineers] = useState([])
    const [selectedEngineers, setSelectedEngineers] = useState([])
    // const [searchKeyword, setSearchKeyword] = useState("")
    const [key, setKey] = useState("")

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/classes/courseID?courseID=${courseID}`)
            .then(res => {
                setClasses(res.data)
                setKey(res.data[0].class_id)
            })
    }, [courseID])

    // get eligible engineers when
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/engineers/eligibleEngineers?courseID=${courseID}`)
            .then(res => {
                setEligibleEngineers(res.data)
            })
    }, [courseID])

    return(
        <Container>
            <h1>Enrolment</h1>
            <h3>{courseID} | {courseName}</h3>
{/* 
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-3">
                <Tab eventKey="published" title="Published">
                    <ClassesContainer filter="published" classes={classes}/>
                </Tab>
                <Tab eventKey="ready" title="Ready">
                    <ClassesContainer filter="ready" classes={classes}/>
                </Tab>
                <Tab eventKey="pending" title="Pending">
                    <ClassesContainer filter="pending" classes={classes}/>
                </Tab>
            </Tabs> */}
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mt-3">
                {classes.map(a_class => 
                    <Tab eventKey={a_class.class_id} title={a_class.class_id} key={courseID + a_class.class_id}>
                        <Form.Control 
                            type="text" 
                            // onChange={e => setKeyword(e.target.value)}
                            placeholder="Search engineers"
                            className="mt-3"
                        />
                        <div>
                            {eligibleEngineers.map(engineer => 
                                <Form.Check 
                                    type="checkbox"
                                    key={engineer.email}
                                    id={engineer.email}
                                    label={engineer.email}
                                    onClick={() => setSelectedEngineers(prev => [...prev, engineer.email])}
                                />
                            )}
                        </div>
                    </Tab>
                )}
            </Tabs>
        </Container>
    )
}

export default HREnrolClasses