import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Form,
    FormControl,
    InputGroup,
} from "react-bootstrap"

function TrainerMCQQuestion(props) {

    return (
        <div className="mcq">

            <Form.Label>
                <b>Question Type: MCQ</b>
            </Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Enter Question Here: Eg: What do you need to do before you turn on a printer?" 
            />
            <div className={`question` + props.qnNum + `Options`}>
                
                <InputGroup className="mb-2">
                    <InputGroup.Radio name={`question` + props.qnNum} id="option1"/>
                    <FormControl/>
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Radio name={`question` + props.qnNum} id="option2"/>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Radio name={`question` + props.qnNum} id="option3"/>
                    <FormControl />
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Radio name={`question` + props.qnNum} id="option4"/>
                    <FormControl />
                </InputGroup>
                
            </div>
            
        </div>
    )
}

export default TrainerMCQQuestion