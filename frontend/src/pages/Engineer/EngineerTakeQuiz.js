import {
	Container,
	Button
} from 'react-bootstrap'
import { Link, useRouteMatch } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"
import EngineerGetMCQ from '../../components/EngineerGetMCQ'
import EngineerGetTF from '../../components/EngineerGetTF'
import styled from "styled-components";

const ButtonDiv = styled.div`
	font-size: 15px;
	height: 100%;
	margin-bottom: 40px;
`;

const Btn = styled(Button)`
	font-size: 15px;
	font-weight: 600;
	width: 10%;
	height: 30%;
	background-color: #5d5fef;
`;


const EngineerTakeQuiz = () => {

	const [quiz, setQuiz] = useState([])

	const { url } = useRouteMatch()

	const [allQns, setAllQns] = useState([])

	const addMCQQuestion = () => {
		setAllQns(allQns => [...allQns, <EngineerGetMCQ />])
	}

	const addTFQuestion = () => {
		setAllQns(allQns => [...allQns, <EngineerGetTF />])
	}

	useEffect(() => {
		axios.get("http://127.0.0.1:5000/quiz/getQuiz").then((res) => {
			setQuiz(res.data);
		});
	}, []);

	return (
		<Container>
			<h1> Course ID: {quiz[0].course_id} </h1>
			<h1> Quiz No: {quiz[0].chapter_id} </h1>
			<br />
			<EngineerGetMCQ />
			<EngineerGetTF />
			<ButtonDiv>
				<Btn>Submit</Btn>
			</ButtonDiv>
		</Container>
	)
}

export default EngineerTakeQuiz