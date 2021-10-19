import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import { Container, Badge } from 'react-bootstrap'

const EngineerViewCourse = () => {
    const [courseID, setCourseID] = useState(useParams().courseID)
    const [courseInfo, getCourseInfo] = useState("")
    const [coursePrereq, getPrereq] = useState( [] )

    useEffect(()=> {
        axios.get(`http://127.0.0.1:5000/courses/getCourse/?course_id=${courseID}`, )
        .then(res => {
            getCourseInfo(res.data);
        }) .catch(err => console.log(err))

        axios.get(`http://127.0.0.1:5000/courses/getPrerequisite/?course_id=CG1000C1`, )
        .then(res => {
            getPrereq( retrievePrereq(res.data) );           
        }) .catch(err => console.log(err))

    }, [])
    
    const retrievePrereq = (data) => {
        if ( data.length > 1 ){
            let results = []
            data.forEach(
                elem => results.push(elem.prereqCourseID)
            );

            return results
        } else if ( data.length == 1 ) {
            return [data[0].prereqCourseID]
        } else {
            return ['None']
        }

    }

    return (
        <Container>
            <h1 className='mt-4'> {courseInfo.courseName} </h1>
            <h4 className='mt-2'> {courseInfo.courseID} </h4><br />
            <h5>Course Summary:</h5>
            <p>{courseInfo.courseSummary}</p>

            <b>Pre-requisite(s):</b>
            { coursePrereq[0] === 'None' ? 'None' :
            coursePrereq.map( course =>
                <Badge bg='success' key={courseID + course}>{course}</Badge>
            )}
            <br />
            <b>Trainer:</b> {courseInfo.trainer} <br />
        
            <b>Enrolment period:</b>{courseInfo.enrolmentStart} - {courseInfo.enrolmentEnd} <br />

            <b>Course Start Date:</b> {courseInfo.startDate} <br/>
            <b>Course End Date:</b> {courseInfo.endDate} <br/>

            Populate quiz stuff here later

        </Container>
    )
        
}

export default EngineerViewCourse



