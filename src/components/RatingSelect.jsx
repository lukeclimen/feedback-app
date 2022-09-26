import {useState} from 'react';

function RatingSelect({select}) {
    const [selected, setSelected] = useState(10);
    const handleChange = (event) => {
        setSelected(+event.currentTarget.value);
        select(+event.currentTarget.value);
    }

    return (
        <ul className='rating'>
            {Array.from({length: 10}, (_, i) => (
                <li key={`num-${i+1}`}>
                    <input
                        type='radio'
                        id={`rating-${i+1}`}
                        name='rating'
                        value={i+1}
                        onChange={handleChange}
                        checked={selected === i+1}
                    />
                    <label htmlFor={`rating-${i+1}`}>{i+1}</label>
                </li>
            ))}
        </ul>
    )
}

export default RatingSelect