import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Form,
    Container
} from "react-bootstrap"
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"

function TrainerTFQuestion() {

    const [form, setForm] = useState({})
    
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
    }

    return (
        <Container>
            <Form.Group className="mb-3">
                <Form.Label><b>Question Type: T/F</b></Form.Label>
                <Form.Control type="text" placeholder="Enter Question Here: Eg: What do you need to do before you turn on a printer?" onChange={e => setField("question", e.target.value)} />
                <Form.Check
                type="radio"
                label="True"
                name="option"
                id="optiontrue"
                value='true'
                onChange={e => setField("answer", e.target.value)} 
                />
                <Form.Check
                type="radio"
                label="False"
                name="option"
                id="optionfalse"
                value="false"
                onChange={e => setField("answer", e.target.value)} 
                />
            </Form.Group>
        </Container>
    )
}

export default TrainerTFQuestion