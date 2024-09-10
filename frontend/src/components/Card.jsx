import React from 'react'
import '../stylesheets/card.css'
import '../stylesheets/filter.css'
const Card = ({ fromVendor, url, name, year, price, location }) => {
  return (
    <div className="card">
      <img src={url}></img>
      <h3 className="year">{year}</h3>
      <h3>{name}</h3>
      <h3 className="price">{price}</h3>
      <h3 className="location">{location}</h3>
      <button>Rent Now</button>
    </div>
  );
};

export default Card