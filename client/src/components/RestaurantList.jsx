import React, { useEffect } from "react";
import { useContext } from "react";
import base from "../api/base";
import { Link, useNavigate } from "react-router-dom";
import RestaurantContext from "../context/RestaurantContext";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const result = await base.get("/restaurants");
        setRestaurants(result.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await base.delete(`/restaurants/${id}`);
      console.log(result);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='list-group'>
      <table className='table table-hover table-striped'>
        <thead className='thead-dark'>
          <tr className='bg-success'>
            <th className='col'>Restaurant</th>
            <th className='col'>Location</th>
            <th className='col'>Price Range</th>
            <th className='col'>Ratings</th>
            <th className='col'>Edit</th>
            <th className='col'>Delete</th>
          </tr>
        </thead>

        <tbody className='table-dark'>
          {restaurants.map((restaurant) => {
            return (
              <tr key={restaurant.id} onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>Rating</td>

                <td>
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/restaurants/${restaurant.id}/update`}
                    className='btn btn-warning'
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(restaurant.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
