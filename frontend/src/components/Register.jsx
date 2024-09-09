/** @format */

import React, { useRef } from "react";
import "../stylesheets/register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const location = useRef();
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/user/register",
        {
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          location: location.current.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // Optional: timeout in milliseconds
        }
      )
      .then((response) => {
        navigate("/login");
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };
  return (<>
  <ToastContainer/>
    <div className="form" onSubmit={handleRegister}>
      <div className="main_div">
        <div className="title">Register</div>
        <form action="#">
          <div className="input_box">
            <input
              type="text"
              placeholder="Name"
              ref={name}
              name="name"
              required
            />
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="email"
              placeholder="Email"
              ref={email}
              name="email"
              required
            />
            <div className="icon">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Password"
              ref={password}
              name="password"
              required
            />
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="text"
              placeholder="Location"
              ref={location}
              name="location"
              required
            />
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          

          <div className="input_box button">
            <input type="submit" value="Register" />
          </div>
          <div className="sign_up">
            already a member? <Link to="/login">login</Link>
          </div>
        </form>
      </div>
    </div>
  </>
  );
};

export default Register;
