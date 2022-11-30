import React from "react";

const RestaurantList = () => {
  return (
    <div className='list-group'>
      <table className='table table-hover table-striped'>
        <thead className='thead-dark'>
          <tr className='bg-success'>
            <th class='col'>Restaurant</th>
            <th class='col'>Location</th>
            <th class='col'>Price Range</th>
            <th class='col'>Ratings</th>
            <th class='col'>Edit</th>
            <th class='col'>Delete</th>
          </tr>
        </thead>

        <tbody className='table-dark'>
          <tr>
            <td>mcdonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <div className='btn btn-warning'>Edit</div>
            </td>
            <td>
              <div className='btn btn-warning'>Delete</div>
            </td>
          </tr>
          <tr>
            <td>mcdonalds</td>
            <td>New York</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <div className='btn btn-warning'>Edit</div>
            </td>
            <td>
              <div className='btn btn-warning'>Delete</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
