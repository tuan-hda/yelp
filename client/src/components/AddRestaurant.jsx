import React from "react";

const AddRestaurant = () => {
  return (
    <div className='mb-4'>
      <form className='d-flex flex-row align-items-center flex-wrap g-2 me-sm-2'>
        <div className='col'>
          <input type='text' className='form-control' placeholder='Name' />
        </div>
        <div className='col'>
          <input type='text' className='form-control' placeholder='location' />
        </div>
        <div className='col'>
          <select className='custom-select form-control mr-sm-2'>
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
