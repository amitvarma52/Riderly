/** @format */

import React from "react";
import "../stylesheets/customer.css"

const Customer = () => {
  return (
    <section className="boongg-at-glance">
      <h2>RIDERLY HAVE</h2>
      <div className="glance-items">
        <div className="glance-item">
          <img
            src="https://static.vecteezy.com/system/resources/previews/030/750/807/original/user-icon-in-trendy-outline-style-isolated-on-white-background-user-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            alt="Happy Customers"
          />
          <h3>200k+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="glance-item">
          <img
            src="https://i.pinimg.com/736x/f9/25/e9/f925e957eccbce7c498f14eb916d643a.jpg"
            alt="Top Notch Bikes"
          />
          <h3>1500+</h3>
          <p>Top Notch Bikes</p>
        </div>
        <div className="glance-item">
          <img
            src="https://img.freepik.com/premium-vector/minimal-motorcycle-riders-vector-silhouette-black-color-white-background-11_554682-7896.jpg"
            alt="Number of Rides"
          />
          <h3>1M+</h3>
          <p>Number Of Rides</p>
        </div>
      </div>
    </section>
  );
};

export default Customer;
