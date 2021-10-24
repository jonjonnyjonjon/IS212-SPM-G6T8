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
            console.log(res.data);
            getCourseInfo(res.data);
        }) .catch(err => console.log(err))

        axios.get(`http://127.0.0.1:5000/courses/getPrereq/?course_id=${courseID}`, )
        .then(res => {
            getPrereq( retrievePrereq(res.data) );           
        }) .catch(err => console.log(err))

    }, [])
    
    const retrievePrereq = (data) => {
        if ( data.length > 1 ){
            let results = []
            data.forEach(
                elem => results.push(elem.prereq_course_id)
            );

            return results
        } else if ( data.length == 1 ) {
            return [data[0].prereq_course_id]
        } else {
            return ['None']
        }
    }

    return (
        <Container>
            <h1 className='mt-4'> {courseInfo.course_name} </h1>
            <h4 className='mt-2'> {courseInfo.course_id} </h4><br />
            <h5>Course Summary:</h5>
            <p>{courseInfo.course_summary}</p>

            <b>Pre-requisite(s): </b>
            { coursePrereq[0] === 'None' ? 'None' :
            coursePrereq.map( course =>
                <Badge className='me-2' bg='success' key={courseID + course}>{course}</Badge>
            )}
            <br />
            <b>Trainer:</b> {courseInfo.trainer_name} <br />
        
            <b>Enrolment period: </b> {courseInfo.enrolment_start} - {courseInfo.enrolment_end} <br />

            <b>Course Start Date:</b> {courseInfo.course_start} <br/>
            <b>Course End Date:</b> {courseInfo.course_end} <br/>

            <br/><br/>
            Populate quiz stuff here later

        </Container>
    )
        
}

export default EngineerViewCourse



