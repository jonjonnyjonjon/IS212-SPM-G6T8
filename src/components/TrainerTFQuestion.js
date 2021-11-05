import {
    Form
} from "react-bootstrap"

function TrainerTFQuestion(props) {

    return (
        <div className="tf">
            
            <Form.Label>
                <b>Question Type: T/F</b>
            </Form.Label>

            <Form.Control 
                type="text" 
                placeholder="Enter Question Here: Eg: What do you need to do before you turn on a printer?" 
            />
            <div className={`question` + props.qnNum + `Options`}>
                <Form.Check
                    type="radio"
                    label="True"
                    name={`question` + props.qnNum}
                    id="optiontrue"
                    value='true'
                    />
                <Form.Check
                    type="radio"
                    label="False"
                    name={`question` + props.qnNum}
                    id="optionfalse"
                    value="false"
                />
            </div>
         
        </div>
    )
}

export default TrainerTFQuestion