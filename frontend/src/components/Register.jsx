/** @format */

import React from "react";
import "../stylesheets/register.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="form">
      <div class="main_div">
        <div class="title">Register</div>
        <form action="#">
          <div class="input_box">
            <input type="text" placeholder="Name" required />
            <div class="icon">
              <i class="fas fa-user"></i>
            </div>
          </div>
          <div class="input_box">
            <input type="text" placeholder="Email" required />
            <div class="icon">
              <i class="fas fa-envelope"></i>
            </div>
          </div>
          <div class="input_box">
            <input type="password" placeholder="Password" required />
            <div class="icon">
              <i class="fas fa-lock"></i>
            </div>
          </div>
          <div class="input_box button">
            <input type="submit" value="Register" />
          </div>
          <div class="sign_up">
            already a member? <Link to='/login'>login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
