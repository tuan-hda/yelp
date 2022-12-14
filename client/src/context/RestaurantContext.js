import React, { createContext, useState } from 'react'

const RestaurantContext = createContext()

export const RestaurantContextProvider = props => {
  const [restaurants, setRestaurants] = useState([])

  const addRestaurant = restaurant => setRestaurants(prev => [...prev, restaurant])

  return <RestaurantContext.Provider value={
    { restaurants, setRestaurants, addRestaurant }
  }>
    {props.children}
  </RestaurantContext.Provider>
}

export default RestaurantContext