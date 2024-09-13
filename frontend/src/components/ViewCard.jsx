/** @format */

import React from "react";
import { useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import { Carousel } from "react-responsive-carousel";
import "../stylesheets/viewMore.css"; // Assuming you will style the component
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ViewCard = () => {
  const location = useLocation();
  const user = useSelector((state => state.user));
  const { data } = location.state || {};

  if (!data) {
    return <div>No data available</div>;
  }

  const {
    fromVendor,
    url,
    url2,
    url3,
    name,
    year,
    price,
    milegde,
    location: carLocation,
  } = data;
  const handleRent = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/user/sendMessage",
        {
          vendor: fromVendor,
          user: user.name,
          vehicleName: name,
          email: user.email,
          location: user.location,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("rental-token"),
          },
          timeout: 10000,
        }
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };
  return (
    <>
    <ToastContainer/>
      <div className="view-card-container">
        {/* Carousel section */}
        <div className="view-card-carousel-section">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={true}
          >
            <div>
              <img src={url} alt={`${name} ${year}`} />
            </div>
            <div>
              <img src={url2} alt={`${name} side`} />
            </div>
            <div>
              <img src={url3} alt={`${name} interior`} />
            </div>
          </Carousel>
        </div>

        {/* Car details section below the carousel */}
        <div className="view-card-details-section">
          <h2 className="view-card-title">
            {name} ({year})
          </h2>
          <p className="view-card-vendor">Vendor: {fromVendor}</p>
          <p className="view-card-location">Location: {carLocation}</p>
          <p className="view-card-mileage">Mileage: {milegde} kmpl</p>
          <p className="view-card-price">Price: ${price} / day</p>
          <button className="view-card-rent-now-button" onClick={handleRent}>Rent Now</button>
        </div>
      </div>
    </>
  );
};

export default ViewCard;
