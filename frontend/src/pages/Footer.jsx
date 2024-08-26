import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="waves">
        <div className="wave" id="wave1"></div>
      </div>

      <ul className="social-icon">
        <li>
          <a
            className="fab fa-instagram"
            href="https://www.instagram.com/iamjakariya/"
          ></a>
        </li>
        <li>
          <a className="fab fa-youtube" href="https://www.youtube.com/@recklet"></a>
        </li>
        <li>
          <a
            className="fab fa-facebook-f"
            href="https://www.facebook.com/ReckletGaming/"
          ></a>
        </li>
        <li>
          <a
            className="fab fa-telegram"
            href="https://telegram.me/reckletdevelopers"
          ></a>
        </li>
      </ul>

      <ul className="menu">
        <li>
          <a href="/index.html">Home</a>
        </li>
        <li>
          <a href="/details/about-contact-us.html">About Us</a>
        </li>
        <li>
          <a href="/details/privacypolicy.html">Privacy Policy</a>
        </li>
        <li>
          <a href="/details/terms-and-conditions.html">Terms & Conditions</a>
        </li>
      </ul>

      <p>Ⓒ2023 StroZone Developer | All Rights Reserved</p>
    </footer>
  );
}

export default Footer