import axios from "axios"
import { useState, useEffect } from "react"

function App() {
	const [backendInfo, setBackendInfo] = useState("")

	useEffect(() => {
		axios.get("http://localhost:5000")
		.then((res) => { setBackendInfo(res.data) })
	}, "")

	return (
		<div>
			<h1>bye bitches</h1>
			<p>{backendInfo}</p>
		</div>
	);
}

export default App;