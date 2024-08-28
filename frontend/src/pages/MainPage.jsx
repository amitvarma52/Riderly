/** @format */

import React from "react";
import AllCards from "../components/AllCards.jsx";
import { useSelector } from "react-redux";
const MainPage = () => {
  const allCards = useSelector((state) => state.object);
  console.log(allCards);
  return (
    <>
      <AllCards name="All" object={allCards} to={"/all"}/>
    </>
  );
};

export default MainPage;
