import {Form, Modal, Button} from "react-bootstrap";
import styled from "styled-components";
import { useState } from 'react'
import axios from "axios";

const Title = styled.h5`
    margin: 20px 20px 0px 20px;
`

const Btn = styled(Button)`
  font-size: 15px;
  font-weight: 600;
  width: 40%;
  height: 30%;
  background-color: #5d5fef;
`;

function TrainerModalForm(props) {

    const [content, setContent] = useState("")
    const [show, setShow] = useState(props.isOpen);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/chapters/uploadContent`, {
            "courseID": props.course_id, 
            "classID": props.class_id, 
            "chapterID": props.chapter_id, 
            "content": content
        })
        handleClose()
    };

  return (
    <Modal show={show} onHide={handleClose}>
        <Title>Hyperlink to Course Lecture:</Title>
      <Modal.Body>
          <Form.Control
            type="text"
            onChange={e => setContent(e.target.value)}
            placeholder="Enter YouTube URL here!"
          />
      </Modal.Body>
      <Modal.Footer>
        <Btn type="submit" onClick={(e) => handleSubmit(e)}>
          Upload Material
        </Btn>
      </Modal.Footer>
    </Modal>
  );
};
    
export default TrainerModalForm;
