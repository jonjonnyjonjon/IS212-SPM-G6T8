import React from "react"
import {
	BrowserRouter as Router,
	Switch, 
	Route,
	Link
} from "react-router-dom"
import HRHome from "./pages/HRHome"
import EngineerHome from "./pages/EngineerHome"
import TrainerHome from "./pages/TrainerHome"
import TrainerCreateQuizType from "./pages/TrainerCreateQuizType"
import TrainerViewResult from "./pages/TrainerViewResult"
import TrainerCreateQuestion from "./pages/TrainerCreateQuestion"

function App() {
	return (
		
		<Router>
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
				<Switch>
					<Route path="/engineer">
						<EngineerHome />
					</Route>
					<Route path="/trainer">
						<TrainerHome />
						{/* <TrainerCreateQuizType /> */}
						<TrainerCreateQuestion />
						<TrainerViewResult />
					</Route>
					<Route path="/hr">
						<HRHome />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App;