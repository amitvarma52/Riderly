/** @format */

import React, { useRef } from "react";
import "../stylesheets/rentBike.css";

const RentBikeScooter = () => {
  const locationRef = useRef(null);
  const yearRef = useRef(null);
  const vehicleTypeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = locationRef.current.value;
    const year = yearRef.current.value;
    const vehicleType = vehicleTypeRef.current.value;

    console.log("Location:", location);
    console.log("Year:", year);
    console.log("Vehicle Type:", vehicleType);
  };

  return (
    <div className="rent-bike-scooter">
      <div className="bike-info-container">
        <div className="left-section">
          <h1>Rent Bike & Scooty</h1>
          <p className="subtitle">
            Now In <span className="city-name">MUMBAI</span>
          </p>
          <p className="rating-info">
            10k+ | 4.6 Rating <span className="rating-stars">⭐⭐⭐⭐⭐</span>
          </p>
        </div>

        <div className="bike-image-container">
          <img
            src="https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/2/1-honda-activa-scooter-smart-aviation.jpg?&targetx=-25&targety=0&imagewidth=750&imageheight=500&modelwidth=700&modelheight=500&backgroundcolor=D2D2D2&orientation=0"
            alt="Scooty"
            className="bike-image"
          />
          <div className="price-bubbles">
            <span className="price-tag hourly">
              Hourly Bike Rental <br /> Starts @ ₹39*
            </span>
            <span className="price-tag daily">
              Daily Bike Rental <br /> Starts @ ₹349*
            </span>
            <span className="price-tag monthly">
              Monthly Bike Rental <br /> Starts @ ₹3999*
            </span>
          </div>
        </div>
      </div>

      <form className="rent-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            ref={locationRef}
            placeholder="Enter location"
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            id="year"
            type="number"
            ref={yearRef}
            placeholder="Enter year"
          />
        </div>
        <div className="form-group">
          <label htmlFor="vehicleType">Bike/Scooter</label>
          <select id="vehicleType" ref={vehicleTypeRef}>
            <option value="bike">Bike</option>
            <option value="scooter">Scooter</option>
          </select>
        </div>
        <button type="submit" className="rent-btn">
          Rent now
        </button>
      </form>
    </div>
  );
};

export default RentBikeScooter;
