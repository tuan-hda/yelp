import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import base from "../api/base";

const UpdatePage = () => {
  const [info, setInfo] = useState({
    name: "",
    location: "",
    priceRange: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await base.put(`/restaurants/${id}`, {
        ...info,
        price_range: info.priceRange,
      });

      navigate("/");
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='container'>
      <h1 className='text-center'>Update Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input value={info?.name} id='name' type='text' className='form-control' onChange={handleChange} />
        </div>

        <div className='mb-3'>
          <label htmlFor='location' className='form-label'>
            Location
          </label>
          <input value={info?.location} id='location' type='text' className='form-control' onChange={handleChange} />
        </div>

        <div className='mb-3'>
          <label htmlFor='priceRange' className='form-label'>
            Price range
          </label>
          <select
            className='custom-select form-control'
            value={info?.priceRange}
            id='priceRange'
            onChange={handleChange}
          >
            <option disabled>Price Range</option>
            <option value={1}>$</option>
            <option value={2}>$$</option>
            <option value={3}>$$$</option>
            <option value={4}>$$$$</option>
            <option value={5}>$$$$$</option>
          </select>
        </div>

        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default UpdatePage;
