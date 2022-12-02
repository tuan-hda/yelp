import React from "react";

const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < Math.floor(rating); i++) stars.push(<i key={i} className='fa-solid fa-star text-warning'></i>);
  if (rating - stars.length > 0)
    stars.push(<i key={stars.length} className='fa-solid fa-star-half-stroke text-warning'></i>);
  const rest = 5 - stars.length;
  for (let i = 0; i < rest; i++) stars.push(<i key={i + stars.length} className='fa-regular fa-star text-warning'></i>);

  return <>{stars}</>;
};

export default Rating;
