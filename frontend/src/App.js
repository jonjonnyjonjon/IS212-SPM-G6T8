import React from "react"
import {
	Switch, 
	Route,
	Link,
	useLocation
} from "react-router-dom"

import HRRouting from "./pages/HRRouting"

function App() {
	const location = useLocation();
	return (
		<div className="App">
			{location.pathname === "/" ?
			<div>
				<h1>Welcome to Login. Choose your role.</h1> 
					<nav>
						<ul>
						<li>
							<Link to="/hr">HR</Link>
						</li>
						<li>
							<Link to="/engineer">Engineer</Link>
						</li>
						<li>
							<Link to="/trainer">Trainer</Link>
						</li>
						</ul>
					</nav>
			</div> 
			: null }
			
			<Switch>
				<Route path="/engineer" />
				<Route path="/trainer" />
				<Route path="/hr" component={HRRouting} />

			</Switch>
		</div>
	)	
}

export default App;