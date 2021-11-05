import {Form, Modal, Button} from "react-bootstrap";
import styled from "styled-components";
import { useState } from 'react'
import axios from "axios";
import { BASE_API_URL } from "../utils/constants"

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
        axios.post(`${BASE_API_URL}/chapters/uploadContent`, {
            "courseID": props.course_id, 
            "classID": props.class_id, 
            "chapterID": props.chapter_id, 
            "content": content
        })

        axios.post(`${BASE_API_URL}/teachingMaterials/updateMaterialStatus`, {
          "courseID": props.course_id, 
          "classID": props.class_id, 
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
