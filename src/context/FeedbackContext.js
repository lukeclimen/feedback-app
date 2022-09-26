import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
	// State for inidividual feedback components
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: `This is num 1`,
			rating: 3,
		},
		{
			id: 2,
			text: `This is num 2`,
			rating: 7,
		},
		{
			id: 3,
			text: `This is num 3`,
			rating: 8,
		},
	]);

	//State for editting a feedback item component
	const [itemToEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	});

	// Delete a feedback item from the feedback list
	const deleteFeedback = (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			setFeedback(feedback.filter((item) => item.id !== id));
		}
	};

	// Add a new feedback item to the feedback list
	const addFeedback = (newFeedback) => {
		newFeedback.id = uuidv4();
		setFeedback([newFeedback, ...feedback]);
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
