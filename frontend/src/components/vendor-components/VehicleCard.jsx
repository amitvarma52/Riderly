/** @format */

import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
const VehicleCard = ({
  _id,
  fromVendor,
  vehicleName,
  image,
  Date,
  price,
  location,
  vendorToken,fetchData 
}) => {
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/vendor/deleteVehicle",
        {
          fromVendor: fromVendor,
          vehicleName: vehicleName,
        },
        {
          headers: {
            Authorization: "Bearer " + vendorToken,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      )
      .then((response) => {
        fetchData();
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
  return (<>
  <ToastContainer/>
    <div className="card">
      <img src={image}></img>
      <h3 className="year">{Date}</h3>
      <h3>{vehicleName}</h3>
      <h3 className="price">{price}</h3>
      <h3 className="location">{location}</h3>
      <button style={{ background: "red" }} onClick={handleDelete}>Remove</button>
    </div>
  </>
  );
};

export default VehicleCard;
