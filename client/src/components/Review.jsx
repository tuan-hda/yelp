import React from "react";
import Rating from "./Rating";

const Review = ({ reviews }) => {
  return (
    <div className='row row-cols-3 g-3'>
      {reviews.map((review) => (
        <div className='col' key={review.id}>
          <div className='card text-white bg-primary rounded-2'>
            <div className='card-header d-flex justify-content-between'>
              <span>{review.name}</span>
              <span>
                <Rating rating={review.rating} />
              </span>
            </div>
            <div className='card-body'>
              <p className='card-text'>{review.review}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
