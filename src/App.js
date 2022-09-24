import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import { useState } from "react";
import FeedbackData from "./data/FeedbackData";

function App() {
	const [feedback, setFeedback] = useState(FeedbackData);

	return (
		<>
			<Header />
			<FeedbackList feedback={feedback} />
		</>
	);
}

export default App;
