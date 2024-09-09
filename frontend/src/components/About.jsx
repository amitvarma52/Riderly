/** @format */

import React from "react";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { useState } from "react";
import "../stylesheets/about.css";

const About = () => {
  const [showFAQs, setShowFAQs] = useState(false);

  const toggleFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  return (
    <div className="bike-rental-info">
      <h1>How Our Bike Rental Service Works</h1>

      <section className="steps">
        <h2>Steps to Rent a Bike</h2>
        <ol>
          <li>
            <FaCheckCircle className="icon" />
            <strong>Create an Account:</strong> Sign up using your email address
            and phone number.
          </li>
          <li>
            <FaCheckCircle className="icon" />
            <strong>Locate a Bike:</strong> Use the app to find the nearest
            available bike.
          </li>
          <li>
            <FaCheckCircle className="icon" />
            <strong>Unlock and Ride:</strong> Scan the QR code on the bike to
            unlock it and start your ride.
          </li>
          <li>
            <FaCheckCircle className="icon" />
            <strong>Return the Bike:</strong> Park it at a designated bike rack
            and end your ride via the app.
          </li>
        </ol>
      </section>

      <section className="faqs">
        <h2 onClick={toggleFAQs} className="faq-title">
          Frequently Asked Questions <FaQuestionCircle className="icon" />
        </h2>
        {showFAQs && (
          <ul>
            <li>
              <strong>What is the cost of renting a bike?</strong> <br />
              The rental cost depends on the duration of your ride. Check the
              app for current rates and offers.
            </li>
            <li>
              <strong>Do I need a helmet?</strong> <br />
              For safety reasons, we recommend wearing a helmet. Some locations
              offer helmets for rent.
            </li>
            <li>
              <strong>What if I experience a problem with the bike?</strong>{" "}
              <br />
              Contact our customer support through the app, and we'll assist you
              as quickly as possible.
            </li>
            <li>
              <strong>Can I rent a bike for multiple days?</strong> <br />
              Yes, you can select the rental duration in the app, including
              multi-day options.
            </li>
          </ul>
        )}
      </section>
    </div>
  );
};

export default About;
