import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
	const [text, setText] = useState("");
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState("");
	const [rating, setRating] = useState(10);

	const { addFeedback, itemToEdit, updateFeedback } =
		useContext(FeedbackContext);

	// Side effect handled by useEffect, which runs when the event(s) in the
	// array (2nd param) is triggered.
	useEffect(() => {
		if (itemToEdit.edit === true) {
			setBtnDisabled(false);
			setText(itemToEdit.item.text);
			setRating(itemToEdit.item.rating);
		}
	}, [itemToEdit]);

	const handleTextChange = (event) => {
		if (text === "") {
			setBtnDisabled(true);
			setMessage(null);
		} else if (text !== "" && text.trim().length < 10) {
			setBtnDisabled(true);
			setMessage("The review must be min 10 characters");
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}

		setText(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (text.trim().length > 10) {
			const newFeedback = {
				text,
				rating,
			};
			if (itemToEdit.edit === true) {
				updateFeedback(itemToEdit.item.id, newFeedback);
			} else {
				addFeedback(newFeedback);
			}
			setText("");
		}
	};

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					/>
					<Button
						type='submit'
						version='secondary'
						isDisabled={btnDisabled}
					>
						Send
					</Button>
				</div>
				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	);
}

export default FeedbackForm;
