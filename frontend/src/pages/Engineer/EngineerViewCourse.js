import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import { Container, Table } from 'react-bootstrap'

const EngineerViewCourse = () => {
    const [courseID, setCourseID] = useState(useParams().courseID)
    const [courseInfo, getCourseInfo] = useState("")

    useEffect(()=> {
        axios.get(`http://127.0.0.1:5000/courses/getCourse/?courseID=${courseID}`, )
        .then(res => {
            getCourseInfo(res.data);
        }) .catch(err => console.log(err))
    }, [])

    console.log(courseInfo);

    return (
        <Container>
            <h1 className='mt-4'> {courseInfo.courseName} </h1>
            <h4 className='mt-2'> {courseInfo.courseID} </h4><br />
            <h5>Course Summary:</h5>
            <p>{courseInfo.courseSummary}</p>


            <b>Trainer:</b> {courseInfo.trainer} <br />
        
            <b>Enrolment period:</b>{courseInfo.enrolmentStart} - {courseInfo.enrolmentEnd} <br />

            <b>Course Start Date:</b> {courseInfo.startDate} <br/>
            <b>Course End Date:</b> {courseInfo.endDate} <br/>

            Populate quiz stuff here later

        </Container>
    )
        
}

export default EngineerViewCourse



