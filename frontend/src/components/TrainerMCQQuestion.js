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
            {/* question title */}
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
            
            {/* option 1
            <Form.Check
                type="radio"
                name="option1"
                id="option1"
                value="1"
                onChange={e => setField("answer", e.target.value)} /> 
            <Form.Control 
                type="text" 
                placeholder="Option 1" 
                onChange={e => setField("option", e.target.value)} />

            option 2
            <Form.Check
                type="radio"
                name="option2"
                id="option2"
                value="2"
                onChange={e => setField("answer", e.target.value)} 
            /> 
            <Form.Control 
                type="text" 
                placeholder="Option 2" 
                onChange={e => setField("option", e.target.value)} />

            option 3
            <Form.Check
                type="radio"
                name="option3"
                id="option3"
                value="3"
                onChange={e => setField("answer", e.target.value)} /> 
            <Form.Control 
                type="text" 
                placeholder="Option 3" 
                onChange={e => setField("options", e.target.value)} />
            
            option 4
            <Form.Check
                type="radio"
                name="option4"
                id="option4"
                value="4"
                onChange={e => setField("answer", e.target.value)} /> 
            <Form.Control 
                type="text"
                placeholder="Option 4" 
                onChange={e => setField("options", e.target.value)} /> */}
             
        </div>
    )
}

export default TrainerMCQQuestion