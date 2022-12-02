import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { RestaurantContextProvider } from "./context/RestaurantContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RestaurantContextProvider>
      <Router>
        <App />
      </Router>
    </RestaurantContextProvider>
  </React.StrictMode>
);
