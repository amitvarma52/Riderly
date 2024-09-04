/** @format */

import React from "react";
import AllCards from "../components/AllCards.jsx";
import { useSelector } from "react-redux";
import Courosal from "../components/Courasal.jsx";
const MainPage = () => {
  const allCards = useSelector((state) => state.object);
  return (
    <>
      <Courosal />
      <AllCards name="All" object={allCards} to={"/all"} />
    </>
  );
};

export default MainPage;
