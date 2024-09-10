/** @format */

import React from "react";
import Card from "./card";
import '../stylesheets/AllCards.css'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AllCards = ({ name, object,to }) => {
  return (
    <div className="container">
      <h1>{name}</h1>
      <div className="card-container">
        {object.length==0 && object.map((element) => (
          <Card
          key={element.url}
            url={element.url}
            name={element.name}
            year={element.year}
            price={element.price}
            location={element.location}
          />
        ))}
        <div className="card">
          <Link to={to}>more <FaArrowUpRightFromSquare size={30}/></Link>
        </div>
      </div>
    </div>
  );
};

export default AllCards;
