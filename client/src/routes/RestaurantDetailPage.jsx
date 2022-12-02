import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import base from "../api/base";
import RestaurantContext from "../context/RestaurantContext";

const RestaurantDetailPage = () => {
  const [info, setInfo] = useState({
    name: "",
    location: "",
    priceRange: "",
  });
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    setSelectedRestaurant(id);

    const fetchRestaurant = async () => {
      try {
        const result = await base.get(`/restaurants/${id}`);
        const { price_range: priceRange, ...rest } = result.data.data.restaurants;
        setInfo({
          ...rest,
          priceRange,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <div>
      <h1 className='display-1 text-center fw-light'>{info?.name}</h1>
    </div>
  );
};

export default RestaurantDetailPage;
