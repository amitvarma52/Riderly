/** @format */

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader";
import VendorForm from "./VendorForm";
import VehicleCard from "./VehicleCard";
import axios from "axios";

const VendorInformation = ({
  changeLoged,
  vendorToken,
  handleSetToken,
  vendorName,
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState([]);
  const [showMessages, setShowMessages] = useState(false); // Toggle message visibility
  const getMessage=()=>{
if (vendorToken) {
  axios
    .post(
      "http://localhost:8080/api/v1/car-rental/vendor/vendorMessage",
      {
        vendor: localStorage.getItem("vendorName"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + vendorToken,
        },
        timeout: 10000,
      }
    )
    .then((response) => {
      setMessage(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
  }
  useEffect(() => {
    getMessage()
  });
  const handleShowMessages = () => {
    setShowMessages((prevState) => !prevState);
  };

  const fetchData = () => {
    if (vendorToken) {
      setLoader(true);
      fetch("http://localhost:8080/api/v1/car-rental/vendor/getAllVehicle", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + vendorToken,
        },
        body: JSON.stringify({ fromVendor: localStorage.getItem("vendorName") }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          setVehicles(data);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
          });
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    changeLoged(false);
    handleSetToken(null);
    setVehicles([]);
    localStorage.removeItem("vendorName")
  };
  const changeEdit = (value) => {
    setEdit(value);
  };
  return (
    <>
      <ToastContainer />
      <div className="admin-header">
        <button onClick={() => setEdit(true)}>+</button>
        <h1>Vendor Page</h1>
        <button onClick={handleLogout}>Log-out</button>
      </div>
      {edit && (
        <VendorForm
          changeEdit={changeEdit}
          vendorToken={vendorToken}
          fetchData={fetchData}
        />
      )}
      {loader && <Loader />}
      {!vehicles.length == 0 ? (
        <h1 className="vendors-list"> VEHICLEs LIST</h1>
      ) : (
        <h1 className="vendors-list">vehicle's list is empty</h1>
      )}

      <div className="vehicle-container">
        {!loader &&
          vehicles.map((vehicle) => {
            return (
              <VehicleCard
                key={vehicle._id}
                fromVendor={vehicle.fromVendor}
                vehicleName={vehicle.vehicleName}
                image={vehicle.image}
                Date={vehicle.Date}
                price={vehicle.price}
                location={vehicle.location}
                vendorToken={vendorToken}
                fetchData={fetchData}
              />
            );
          })}
      </div>
      {/* Show the button if messages are available */}
      {message.length > 0 && (
        <>
          <button className="message-btn" onClick={handleShowMessages}>
            {showMessages ? "Hide Bookings" : "Show Bookings"}
          </button>

          {/* Conditionally render the message table */}
          {showMessages && (
            <div className="message-table-container">
              <h4>User Messages</h4>
              <table className="message-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>Vehicle</th>
                    {/* <th>Vendor</th> */}
                  </tr>
                </thead>
                <tbody>
                  {message.map((msg, index) => (
                    <tr key={index}>
                      <td>{new Date(msg.date).toLocaleDateString()}</td>
                      <td>{msg.user}</td>
                      <td>{msg.email}</td>
                      <td>{msg.location}</td>
                      <td>{msg.vehicleName}</td>
                      {/* <td>{msg.vendor}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default VendorInformation;
