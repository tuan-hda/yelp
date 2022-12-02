import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import base from "../api/base";
import AddReview from "../components/AddReview";
import Rating from "../components/Rating";
import Review from "../components/Review";

const RestaurantDetailPage = () => {
  const [info, setInfo] = useState({
    id: "",
    name: "",
    location: "",
    priceRange: "",
  });
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const result = await base.get(`/restaurants/${id}`);
        const { price_range: priceRange, ...rest } = result.data.data.restaurants;
        setInfo({
          ...rest,
          priceRange,
        });
        setReviews(result.data.data.reviews);
        console.log(result.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRestaurant();
  }, []);

  if (!info.name) return;

  return (
    <div className='container'>
      <h1 className='display-1 text-center fw-light'>{info?.name}</h1>
      <div className='text-center'>
        <Rating rating={info.avg} /> &nbsp;(
        {reviews.length})
      </div>
      <div className='mt-3'>
        <Review reviews={reviews} />
      </div>

      <div className='mt-3'>
        <AddReview />
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
