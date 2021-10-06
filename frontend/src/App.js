import React from "react"
import {
	Switch, 
	Route,
	Link,
	useLocation
} from "react-router-dom"

import HRRouting from "./pages/HRRouting"
import TrainerRouting from "./pages/TrainerRouting"
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
				<Header>Welcome to Login. Choose your role.</Header> 
					<Nav>
						<NavButton href="/hr">HR</NavButton>
						<NavButton href="/engineer">Engineer</NavButton>
						<NavButton href="/trainer">Trainer</NavButton>
					</Nav>
			</div> 
			: null }
			
			<Switch>
				<Route path="/engineer" />
				<Route path="/trainer" component={TrainerRouting}/>
				<Route path="/hr" component={HRRouting} />
			</Switch>
		</div>
	)	
}

export default App;