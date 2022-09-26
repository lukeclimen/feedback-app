import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	// State for inidividual feedback components
	const [feedback, setFeedback] = useState([]);

	//State for editing a feedback item component
	const [itemToEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	useEffect(() => {
		fetchFeedback();
	}, []);

	// Fetch feedback data
	const fetchFeedback = async () => {
		const response = await fetch("/feedback?_sort=id&_order=desc");
		const data = await response.json();

		setFeedback(data);
		setIsLoading(false);
	};

	// Delete a feedback item from the feedback list
	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	// Add a new feedback item to the feedback list
	const addFeedback = async (newFeedback) => {
		const response = await fetch("/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newFeedback),
		});

		const data = await response.json();

		setFeedback([data, ...feedback]);
	};

	// Update feedback item
	const updateFeedback = (id, updatedItem) => {
		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, ...updatedItem } : item
			)
		);
		setFeedbackEdit({
			item: {},
			edit: false,
		});
	};

	// Set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		});
	};

	return (
		<FeedbackContext.Provider
			value={{
				// Variables
				feedback,
				itemToEdit,
				isLoading,
				// Functions
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export default FeedbackContext;
