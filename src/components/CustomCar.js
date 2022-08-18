import React from "react";
import carImage from "../assets/images/shopping-cart.png";

const CustomCar = ({totalProducts}) => {
  return (
    <div id="car-zone" className="car-container">
      <img className="img" alt="car-shopping" src={carImage}></img>
      <div className="text-car">
        <span>{totalProducts}</span>
      </div>
    </div>
  );
};

export default CustomCar;
