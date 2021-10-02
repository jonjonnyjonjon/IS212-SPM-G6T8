import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../components/UserNavbar"
import {
    Container,
    Table,
    Tabs,
    Tab
} from "react-bootstrap"
import {
    BsStopwatch,
    BsFileEarmarkText
} from "react-icons/bs"
import { useState } from 'react'

function TrainerViewResult() {

    const [key, setKey] = useState('all');

    return (
        <div>
            <UserNavbar />
            <h1>Quiz Results</h1>
            <h5>Fundamentals of Xerox Operations 100</h5>
            <br />
            <Container>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    >
                    <Tab eventKey="all" title="Class">
                    </Tab>
                    <Tab eventKey="c1" title="C1">
                    </Tab>
                    <Tab eventKey="c2" title="C2">
                    </Tab>
                </Tabs>
                <br />
                <Table bordered striped hover size="md">
                    <thead style={{backgroundColor: "#9BBFE0"}}> 
                        <tr>
                        <th>Quiz</th>
                        <th colSpan="2">Fundamentals of Xerox Operations 100</th>
                        <th></th>
                        <th><BsFileEarmarkText />30 questions</th>
                        <th><BsStopwatch />  30 mins</th>
                        </tr>
                    </thead>
                    <thead style={{backgroundColor: "#C4DEF6"}}> 
                        <tr>
                        <th colSpan="3">Name</th>
                        <th>Attempts</th>
                        <th>Highest score</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td colSpan="3">Huiqi</td>
                        <td>1</td>
                        <td>30/30</td>
                        <td></td>
                        </tr>
                        <tr>
                        <td colSpan="3">Jon</td>
                        <td>2</td>
                        <td>28/30</td>
                        <td></td>
                        </tr>
                        <tr>
                        <td colSpan="3">Keith</td>
                        <td>3</td>
                        <td>29/30</td>
                        <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default TrainerViewResult