import { 
    Container,
    Tabs,
    Tab,
 } from 'react-bootstrap'

 import { useEffect, useState } from "react"
 import BrowseClassesContainer from "../../components/BrowseClassesContainer"
 import axios from "axios"
 import styled from "styled-components";

 const CourseTabs = styled(Tabs)`
     margin: 20px 50px;
 `;

function EngineerBrowseCourse() {
    const [eligibleCoursesWithPrereq, getEligibleCoursesWithPrereq] = useState([]);
    const [eligibleCoursesNoPrereq, getEligibleCoursesNoPrereq] = useState([]);
    const [pendingEnrolment, getPendingEnrolment] = useState([]);
    const [ineligibleByPrereq, getIneligibleByPrereq] = useState([]);
    const [ineligibleByEnrolled, getIneligibleByEnrolled] = useState([]);
    const [ineligibleByCompleted, getIneligibleByCompleted] = useState([]);
    const [key, setKey] = useState("eligible");

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/enrolRequest/getPendingRequest")
        .then(res => {
            getPendingEnrolment(res.data)
        })

        axios.get("http://127.0.0.1:5000/courses/getEligibleWithPrereq")
            .then(res => {
                getEligibleCoursesWithPrereq(res.data)
            })

        axios.get("http://127.0.0.1:5000/courses/getEligibleNoPrereq")
            .then(res => {
                getEligibleCoursesNoPrereq(res.data)
            })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByPrereq")
        .then(res => {
            getIneligibleByPrereq( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByEnrolled")
        .then(res => {

            getIneligibleByEnrolled( res.data )
        })

        axios.get("http://127.0.0.1:5000/courses/getIneligibleByCompleted")
        .then(res => {
            getIneligibleByCompleted( res.data )
        })
    }, [])

    const renderTab = (k) => {
        setKey(k)
    }
    
    return (
        <Container>
            <h1>Browse Courses</h1><br/>
            <CourseTabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={  (k) => renderTab(k) }
                className="mb-3"
            >

                <Tab eventKey="eligible" title="Eligible for Enrolment">
                    {
                        pendingEnrolment.length === 0 ? "" :
                        <BrowseClassesContainer filter="pendingEnrolment" classes={pendingEnrolment}/>
                    }
                    <BrowseClassesContainer filter="eligibleWithPrereq" classes={eligibleCoursesWithPrereq}/>
                    <BrowseClassesContainer filter="eligibleNoPrereq" classes={eligibleCoursesNoPrereq}/>
                </Tab>

                <Tab eventKey="ineligible" title="Ineligible for Enrolment">
                    <BrowseClassesContainer filter="ineligibleEnrolled" classes={ineligibleByEnrolled}/>
                    <BrowseClassesContainer filter="ineligiblePrereq" classes={ineligibleByPrereq}/>
                    <BrowseClassesContainer filter="ineligibleCompleted" classes={ineligibleByCompleted}/>
                </Tab>
                
            </CourseTabs>

        </Container>
    );
}

export default EngineerBrowseCourse