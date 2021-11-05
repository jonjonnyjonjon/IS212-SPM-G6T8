import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import { Container, Badge, Button } from 'react-bootstrap'
import { BASE_API_URL } from "../../utils/constants"

const EngineerViewCourse = () => {
    const [courseID] = useState(useParams().courseID)
    const [classID] = useState(useParams().classID)
    const [courseInfo, getCourseInfo] = useState("")
    const [coursePrereq, getPrereq] = useState( [] )

    useEffect(()=> {
        axios.get(`${BASE_API_URL}/courses/getClassInfo/?course_id=${courseID}&class_id=${classID}`, )
        .then(res => {
            getCourseInfo(res.data);
        }).catch(err => console.log(err))

        axios.get(`${BASE_API_URL}/courses/getPrereq/?course_id=${courseID}`, )
        .then(res => {
            getPrereq( retrievePrereq(res.data) );           
        }).catch(err => console.log(err))

    }, [courseID, classID])

    let history = useHistory()

    const retrievePrereq = (data) => {
        if ( data.length > 1 ){
            let results = []
            data.forEach(
                elem => results.push(elem.prereq_course_id)
            );

            return results
        } else if ( data.length === 1 ) {
            return [data[0].prereq_course_id]
        } else {
            return ['None']
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`${BASE_API_URL}/enrolRequest/enrol`, {
            "engineerEmail": 'keithchiang@aio.com',
            "courseID": courseInfo.course_id,
            "classID": courseInfo.class_id
        })
        alert("Enrolment has been requested! Now redirecting back to previous page...")
        history.goBack()
    }

    return (
        <Container>
            <h1 className='mt-4'> {courseInfo.course_name} </h1>
            <h4 className='mt-2'> {courseInfo.course_id} </h4><br />
            <h5>Course Summary:</h5>
            <p> {courseInfo.course_summary} </p>

            <b>Course pre-requisite(s): </b>
            { coursePrereq[0] === 'None' ? 'None' :
            coursePrereq.map( course =>
                <Badge className='me-2' bg='success' key={courseID + course}>{course}</Badge>
            )}
            <br />
            <b>Trainer:</b> {courseInfo.trainer_name} <br />
        
            <b>Enrolment period: </b> {courseInfo.enrolment_start} - {courseInfo.enrolment_end} <br />

            <b>Course Start Date:</b> {courseInfo.class_start} <br/>
            <b>Course End Date:</b> {courseInfo.class_end} <br/>

            <Button className="mt-3" variant="primary" type="submit" onClick={ e => handleSubmit(e) }>
                Enrol into course
            </Button>

        </Container>
    )
        
}

export default EngineerViewCourse