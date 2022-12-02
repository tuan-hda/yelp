import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import base from "../api/base";

const AddReview = () => {
  const [info, setInfo] = useState({
    name: "",
    rating: "",
    review: "",
  });

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, rating, review } = info;
      const result = await base.post(`/restaurants/${id}/add-review`, {
        name,
        review,
        rating,
      });
      console.log(result);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <div className='col-8'>
            <label htmlFor='name'>Name</label>
            <input value={info.name} className='form-control' type='text' id='name' onChange={handleChange} />
          </div>
          <div className='col-4'>
            <label htmlFor='rating'>Rating</label>
            <select value={info.rating} id='rating' className='form-control custom-select' onChange={handleChange}>
              <option disabled value=''>
                Rating
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='review'>Review</label>
          <input value={info.review} className='form-control' type='text' id='review' onChange={handleChange} />
        </div>

        <button className='btn btn-primary mt-3'>Submit</button>
      </form>
    </>
  );
};

export default AddReview;
