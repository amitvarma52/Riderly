/** @format */

import React from "react";
import "../stylesheets/testimonial.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Shinde Vishal",
      text: "Price are too low from other bike rental agencies and they have branches all over pune. Best service and bikes are in excellent condition. It made...",
      readMore: "read more",
    },
    {
      id: 2,
      name: "Nohit Thakur",
      text: "Easy bike rental services with least troubles. Friendly staff at job who are always ready to help you with the best they can..!! All the best guys!!...",
      readMore: "read more",
    },
    {
      id: 3,
      name: "Shruna Bhatt",
      text: "It is a very good Bike rental agency. The rates are reasonable. The vehicle are serviced before they are provided to you. In case of some problems...",
      readMore: "read less",
    },
  ];

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">
        Discover the largest and most trusted bike rental company
      </h2>
      <p className="testimonials-subtitle">Testimonials of our customers</p>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-quote">
              <span className="quote-mark">“</span>
              <p>
                {testimonial.text}
                <a href="#" className="read-more">
                  {" "}
                  {testimonial.readMore}
                </a>
              </p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
