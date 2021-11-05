import { 
    Button,
    Table
 } from 'react-bootstrap'

import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { BASE_API_URL } from "../utils/constants"

const ClassesContainer = (props) => {
    const { url } = useRouteMatch()
    const classes = props.classes
    const filter = props.filter
    
    const publishClass = (courseID, classID) => {
        axios.post(`${BASE_API_URL}/classes/publishClass`, {
            "courseID": courseID,
            "classID": classID
        })

        alert("Course has been published!")
        window.location.reload()
    }

    return( 
        <div className="mt-3">
            {classes.length === 0 ? <h1>No classes here.</h1> 
            :
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Capacity</th>
                        <th>Trainer</th>
                        <th>Enrolment Period</th>
                        <th>Course Duration</th>
                        
                        {filter === "pending" ? <th>Materials Uploaded?</th> : null}
                        <th>Edit</th>
                        {filter === "ready" ? <th>Publish Course</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {classes.map(a_class =>
                        <tr key={a_class.course_id + a_class.class_id}>
                            <td>{a_class.class_id}</td>
                            <td>{a_class.current_enrolled} / {a_class.size}</td>
                            <td>{a_class.trainer_email}</td>
                            <td>{a_class.enrolment_start} - {a_class.enrolment_end}</td>
                            <td>{a_class.class_start} - {a_class.class_end}</td>
                            {filter === "pending" ? <td>{a_class.material_status === 0 ? "No" : "Yes"}</td> : null}
                            <td>
                                <Link to={`${url}/editClass/${a_class.class_id}`}>
                                    <Button variant="warning">Edit</Button>
                                </Link>
                            </td>
                            {filter === "ready" ?  
                                <td>
                                    <Button 
                                        variant="warning" 
                                        onClick={() => publishClass(a_class.course_id, a_class.class_id)}>
                                        Publish class
                                    </Button> 
                                </td>
                                : null
                            }
                        </tr>    
                    )}
                </tbody>
            </Table>
            }
        </div>
    )
}

export default ClassesContainer