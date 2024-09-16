/** @format */

import React from "react";
import "../stylesheets/howWorks.css";

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How it works?</h2>
      <div className="steps">
        <div className="step">
          <img
            src="https://media.istockphoto.com/id/1369522597/photo/calendar-with-clock-and-notification-bell.jpg?s=612x612&w=0&k=20&c=1vhJgW-FJ6gbRtaM_yxB22YDYJ102rTkECi-onNxpKk="
            alt="Select date"
          />
          <p>Choose the year for your bike rental.</p>
        </div>
        <div className="step">
          <img
            src="https://media.istockphoto.com/id/1409320327/vector/red-mapped-pin-pointer-3d-icon-vector-illustration-isolated-object-on-a-transparent.jpg?s=612x612&w=0&k=20&c=XZEYm5rDOGWkqdWnX6RWF_P-Zs91hJKRukozfQcaOk0="
            alt="Select location"
          />
          <p>Choose a convenient location near you for an easy pickup.</p>
        </div>
        <div className="step">
          <img
            src="https://media.istockphoto.com/id/1396825880/vector/3d-yellow-scooter-plasticine-cartoon-style-vector.jpg?s=612x612&w=0&k=20&c=MSH3NH80h4GJPL1OwDS8esGISO5WvlznH1UCHESMzAA="
            alt="Select bike"
          />
          <p>Select a bike that suits your preferences and requirements.</p>
        </div>
        <div className="step">
          <img
            src="https://img.freepik.com/premium-photo/3d-man-riding-scooter-white-background_988987-1607.jpg"
            alt="Ride scooter"
          />
          <p>Get ready to roll and have a nice time tripping!</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
