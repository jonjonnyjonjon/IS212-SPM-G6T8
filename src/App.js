import 'bootstrap/dist/css/bootstrap.min.css'

import React from "react"
import {
	Switch, 
	Route,
	useLocation
} from "react-router-dom"

import HRRouting from "./pages/HR/HRRouting"
import TrainerRouting from "./pages/Trainer/TrainerRouting"
import EngineerRouting from "./pages/Engineer/EngineerRouting"
import styled from "styled-components";
import {Button} from "react-bootstrap"

const Header = styled.h2 `
	margin: 50px 20px;
	font-weight: 800;
	text-align: center;	
`

const NavButton = styled(Button) `
	width: 200px;
	height: 40px;
	background-color: #5D5FEF;
`
const Nav = styled.nav `
	display: flex;
	justify-content: space-evenly;
`
function App() {
	const location = useLocation();
	return (
		<div className="App">
			{location.pathname === "/" ?
			<div>
				<Header>Welcome to All-in-one's Learning Management System!</Header>
				<Header>Please choose a user to login as.</Header> 
					<Nav style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
						<NavButton className="mb-3" href="/hr">HR Mary</NavButton>
						<NavButton className="mb-3" href="/engineer">Engineer Keith</NavButton>
						<NavButton href="/trainer">Trainer Jack</NavButton>
					</Nav>
			</div> 
			: null }
			
			<Switch>
				<Route path="/engineer" component={EngineerRouting} />
				<Route path="/trainer" component={TrainerRouting}/>
				<Route path="/hr" component={HRRouting} />
			</Switch>
		</div>
	)	
}

export default App;