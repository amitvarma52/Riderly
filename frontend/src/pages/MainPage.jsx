/** @format */

import React, { useEffect } from "react";
import AllCards from "../components/AllCards.jsx";
import { useSelector } from "react-redux";
import Courosal from "../components/Courasal.jsx";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const navigate = useNavigate();
  const allCards = useSelector((state) => state.object);

  useEffect(() => {
    if (
      localStorage.getItem("rental-user") &&
      localStorage.getItem("rental-token")
    ) {
      console.log(localStorage.getItem("rental-user"));
      console.log(localStorage.getItem("rental-token"));
    } else {
      navigate("/login");
    }
  });
  return (
    <>
      <Courosal />
      <AllCards name="All" object={allCards} to={"/all"} />
    </>
  );
};

export default MainPage;
