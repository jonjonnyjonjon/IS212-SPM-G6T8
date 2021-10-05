import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Form,
    Container
} from "react-bootstrap"
import { useState } from 'react'


function TrainerMCQQuestion() {

    const [form, setForm] = useState({})
    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    return (
        <Container>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><b>Question Type: MCQ</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter Question Here: Eg: What do you need to do before you turn on a printer?" onChange={e => setField("question", e.target.value)} />
                    <Form.Check
                    type="radio"
                    name="option1"
                    id="option1"
                    value="1"
                    onChange={e => setField("answer", e.target.value)} 
                    /> <Form.Control type="text" placeholder="Option 1" onChange={e => setField("option", e.target.value)} />
                    <Form.Check
                    type="radio"
                    name="option2"
                    id="option2"
                    value="2"
                    onChange={e => setField("answer", e.target.value)} 
                    /> <Form.Control type="text" placeholder="Option 2" onChange={e => setField("option", e.target.value)} />
                    <Form.Check
                    type="radio"
                    name="option3"
                    id="option3"
                    value="3"
                    onChange={e => setField("answer", e.target.value)} 
                    /> <Form.Control type="text" placeholder="Option 3" onChange={e => setField("options", e.target.value)} />
                    <Form.Check
                    type="radio"
                    name="option4"
                    id="option4"
                    value="4"
                    onChange={e => setField("answer", e.target.value)} 
                    /> <Form.Control type="text" placeholder="Option 4" onChange={e => setField("options", e.target.value)} />
                </Form.Group>

        </Container>
    )
}

export default TrainerMCQQuestion