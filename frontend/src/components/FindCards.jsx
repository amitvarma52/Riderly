/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "./card";

const FindCards = () => {
  const fields = useLocation();
  const object = useSelector((state) => state.object);
  const { data } = fields.state || {};
  const { location, year, type } = data || {};

  // Filtering the object array based on location, year, and type
  const filteredObjects = object.filter((element) => {
    const locationMatch = location
      ? element.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const yearMatch = year ? String(element.Date).includes(year) : true;
    const typeMatch = type
      ? element.type.toLowerCase() === type.toLowerCase()
      : true;

    return locationMatch && yearMatch && typeMatch;
  });

  return (
    <div className="vehicle-container">
      {filteredObjects.length === 0 ? (
        <h1 style={{color:"white"}}>No Data</h1>
      ) : (
        filteredObjects.map((element) => (
          <Card
            key={element._id}
            fromVendor={element.fromVendor}
            url={element.image}
            url2={element.image2}
            url3={element.image3}
            name={element.vehicleName}
            year={element.Date}
            price={element.price}
            milegde={element.milegde}
            location={element.location}
            type={element.type}
          />
        ))
      )}
    </div>
  );
};

export default FindCards;
