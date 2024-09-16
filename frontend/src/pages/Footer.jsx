/** @format */

import React from "react";
import "../stylesheets/footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top-section">
        <h2 className="footer-main-title">Bike Rental In Mumbai</h2>
        <p className="footer-description">
          Mumbai is a bustling city with a population of over 20 million. As one
          of India's most populous and vibrant cities, it's no surprise that
          people are always on the move. For those who don't own a car or don't
          want to use public transport, bike rental services have become
          increasingly popular.
          <a href="#" className="footer-read-more">
            Read More
          </a>
        </p>
      </div>

      <div className="footer-middle-section">
        <FooterSection title="Our Presence" content={[]} />
        <FooterSection
          title="Our Company"
          content={[
            { text: "Blogs", link: "#" },
            { text: "About Us", link: "#" },
            { text: "Contact Us", link: "#" },
            { text: "Partner with Us", link: "#" },
          ]}
        />
        <FooterSection
          title="Policies"
          content={[
            { text: "Privacy Policy", link: "#" },
            { text: "Terms and Conditions", link: "#" },
            { text: "FAQs", link: "#" },
          ]}
        />
      </div>

      <div className="footer-bottom-section">
        <div className="logo" style={{color:"white"}}>
          <p>Riderly</p>
        </div>
        <p className="footer-tagline">Get Ahead Of The Road</p>
        <SocialIcons />
        <div className="footer-legal">
          <p>
            © 2019 - 2024 Onepoint Bike Services Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, content }) => (
  <div className="footer-section">
    <h3>{title}</h3>
    <ul>
      {content.map((item, index) => (
        <li key={index}>
          <a href={item.link} className="footer-link">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcons = () => (
  <div className="footer-social-icons">
    <a href="#" className="footer-icon">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="#" className="footer-icon">
      <i className="fab fa-linkedin"></i>
    </a>
    <a href="#" className="footer-icon">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="#" className="footer-icon">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
);

export default Footer;
