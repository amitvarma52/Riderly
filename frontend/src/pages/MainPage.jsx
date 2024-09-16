/** @format */
import React, { useEffect, useState } from "react";
import AllCards from "../components/AllCards.jsx";
import { useDispatch, useSelector } from "react-redux";
import Courosal from "../components/Courasal.jsx";
import { useNavigate } from "react-router-dom";
import { objectActions, userActions } from "../store/Store.jsx";
import axios, { all } from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../stylesheets/message.css";
import Testimonials from "../components/Testimonials.jsx";
import RentBikeScooter from "../components/RentBike.jsx";
import Customer from "../components/Customer.jsx";
const MainPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const objects = useSelector((state) => state.object);
  const allObjects = objects.slice(0, 3);
  const locationObjects = objects
    .filter((element) => element.location === user.location)
    .slice(0, 3);
  const newObjects = objects
    .filter((element) => element.Date == new Date().getFullYear())
    .slice(0, 3);
  const dispatch = useDispatch();
  const [message, setMessage] = useState([]);
  const [showMessages, setShowMessages] = useState(false); // Toggle message visibility
  const handleUserMessage = () => {
    if (user) {
      axios
        .post(
          "http://localhost:8080/api/v1/car-rental/user/userMessage",
          {
            user: user.name,
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
          setMessage(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    handleUserMessage();
  }, [user, localStorage.getItem("rental-token")]);

  const getObject = (token) => {
    axios
      .get("http://localhost:8080/api/v1/car-rental/user/userAllVehicles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        timeout: 10000,
      })
      .then((response) => {
        dispatch(objectActions.initial(response.data));
        toast.success(response, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        dispatch(userActions.delete());
        localStorage.removeItem("rental-user");
        localStorage.removeItem("rental-token");
        navigate("/login");
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    if (
      localStorage.getItem("rental-user") &&
      localStorage.getItem("rental-token")
    ) {
      dispatch(
        userActions.initial(JSON.parse(localStorage.getItem("rental-user")))
      );
      getObject(localStorage.getItem("rental-token"));
    } else {
      navigate("/login");
      localStorage.removeItem("rental-user");
      localStorage.removeItem("rental-token");
      dispatch(userActions.delete());
    }
  }, [dispatch, navigate]);

  const handleShowMessages = () => {
    setShowMessages((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer />
      <RentBikeScooter/>
      <Courosal />
      <Customer/>
      <AllCards name="All" object={allObjects} to={"/all"} />
      <AllCards name="From This Year " object={newObjects} to={"/all"} />
      <AllCards
        name="From Your Location"
        object={locationObjects}
        to={"/all"}
      />
      {message.length > 0 && (
        <>
          <button className="message-btn" onClick={handleShowMessages}>
            {showMessages ? "Hide Bookings" : "Show Bookings"}
          </button>
          {showMessages && (
            <div className="message-table-container">
              <h4>User Messages</h4>
              <table className="message-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    {/* <th>User</th> */}
                    {/* <th>Email</th> */}
                    <th>Location</th>
                    <th>Vehicle</th>
                    <th>Vendor</th>
                  </tr>
                </thead>
                <tbody>
                  {message.map((msg, index) => (
                    <tr key={index}>
                      <td>{new Date(msg.date).toLocaleDateString()}</td>
                      {/* <td>{msg.user}</td> */}
                      {/* <td>{msg.email}</td> */}
                      <td>{msg.location}</td>
                      <td>{msg.vehicleName}</td>
                      <td>{msg.vendor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      <Testimonials/>
    </>
  );
};

export default MainPage;
