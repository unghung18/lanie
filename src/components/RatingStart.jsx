import React from 'react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa'

const RatingStart = () => {
    const [rating, setRating] = useState(4);
    return (
        <div className='flex'>
            {[...Array(5)].map((star, i) => {
                const currentRating = i + 1;
                return (
                    <label key={i}>
                        <input type="radio" name='rating' value={currentRating} onClick={() => setRating(currentRating)} className='hidden' />
                        <FaStar className='cursor-pointer' color={currentRating <= rating ? "#ffc107" : "#e4e5e9"} />
                    </label>
                )
            })}
        </div>
    )
}

export default RatingStart;