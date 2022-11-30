import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import "./assets/main.css";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/restaurants/:id' element={<RestaurantDetailPage />} />
      <Route path='/restaurants/:id/update' element={<UpdatePage />} />
    </Routes>
  );
};

export default App;
