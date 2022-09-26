import {useState} from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm({handleAdd}) {

    const [text, setText] = useState('');
    const [btnDisabled, setbtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);

    const handleTextChange = (event) => {
        if (text === '') {
            setbtnDisabled(true);
            setMessage(null);
        }
        else if(text !== '' && text.trim().length < 10) {
            setbtnDisabled(true);
            setMessage("The review must be min 10 characters");
        }
        else {
            setbtnDisabled(false);
            setMessage(null);
        }

        setText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating,
            }

            handleAdd(newFeedback);
            setText('');
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input 
                        onChange={handleTextChange} 
                        type="text" 
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
                {message && 
                    <div className='message'>
                        {message}
                    </div>
                }
            </form>
        </Card>
    )
}

export default FeedbackForm