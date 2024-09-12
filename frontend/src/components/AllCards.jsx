/** @format */

import React from "react";
import Card from "./card";
import "../stylesheets/AllCards.css";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AllCards = ({ name, object, to }) => {
  return (
    <div className="container">
      <h1>{name}</h1>
      <div className="card-container">
        {!object.length == 0 &&
          object.map((element) => (
            <Card
              key={element._id}
              fromVendor={element.fromVendor}
              url={element.image}
              name={element.vehicleName}
              year={element.Date}
              price={element.price}
              location={element.location}
            />
          ))}
        <div className="card">
          <Link to={to}>
            more <FaArrowUpRightFromSquare size={30} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllCards;
