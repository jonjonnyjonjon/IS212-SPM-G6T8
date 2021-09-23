import React from "react"
import {
	BrowserRouter as Router,
	Switch, 
	Route,
	Link,
	useLocation
} from "react-router-dom"

import HRHome from "./pages/HRHome"
import EngineerHome from "./pages/EngineerHome"
import TrainerHome from "./pages/TrainerHome"
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
				<Route path="/engineer" component={EngineerHome} />
				<Route path="/trainer">
					<TrainerHome />
				</Route>
				<Route path="/hr">
					<HRRouting />
				</Route>
			</Switch>
		</div>
	)	
}

export default App;