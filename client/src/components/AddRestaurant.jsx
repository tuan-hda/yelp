import React, { useContext } from "react";
import { useRef } from "react";
import base from "../api/base";
import RestaurantContext from "../context/RestaurantContext";

const AddRestaurant = () => {
  const infoRef = useRef({});
  const { addRestaurant } = useContext(RestaurantContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      current: {
        name: { value: name },
        location: { value: location },
        priceRange: { value: priceRange },
      },
    } = infoRef;

    try {
      const result = await base.post("/restaurants", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(result.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='mb-4'>
      <form className='d-flex flex-row align-items-center flex-wrap g-2' onSubmit={handleSubmit}>
        <div className='col'>
          <input type='text' className='form-control' placeholder='Name' ref={(el) => (infoRef.current.name = el)} />
        </div>
        <div className='col'>
          <input
            type='text'
            className='form-control'
            placeholder='Location'
            ref={(el) => (infoRef.current.location = el)}
          />
        </div>
        <div className='col'>
          <select className='custom-select form-control mr-sm-2' ref={(el) => (infoRef.current.priceRange = el)}>
            <option disabled>Price Range</option>
            <option value='1'>$</option>
            <option value='2'>$$</option>
            <option value='3'>$$$</option>
            <option value='4'>$$$$</option>
            <option value='5'>$$$$$</option>
          </select>
        </div>

        <button className='btn btn-primary'>Add</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
