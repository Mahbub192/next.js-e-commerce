import React, { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';

const StarsRating = ({ setStarsRatingValue }) => {
  const [rating, setRating] = useState(0);

  const onChange = (newValue) => {
    setRating(newValue);
    setStarsRatingValue(newValue); // Update the parent component's state
  };

  return <ReactStarsRating className="flex" starGap={3} onChange={onChange} value={rating} />;
};

export default StarsRating;
