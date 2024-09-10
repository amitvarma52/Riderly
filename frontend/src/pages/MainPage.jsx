/** @format */

import React, { useEffect } from "react";
import AllCards from "../components/AllCards.jsx";
import { useDispatch, useSelector } from "react-redux";
import Courosal from "../components/Courasal.jsx";
import { useNavigate } from "react-router-dom";
import { objectActions, userActions } from "../store/Store.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const MainPage = () => {
  const navigate = useNavigate();
  const user=useSelector(state=>state.user)
  const objects = useSelector((state) => state.object);
  const allObjects = objects.slice(0, 3);
  const locationObjects=objects.filter(element=>element.location==user.location).slice(0,3)
  const dispatch = useDispatch();
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
        console.log(response.data);
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
    }
  }, []);
  return (
    <>
      <ToastContainer />
      <Courosal />
      <AllCards name="All" object={allObjects} to={"/all"} />
      <AllCards name="From Your Location" object={locationObjects} to={"/all"} />
    </>
  );
};

export default MainPage;
