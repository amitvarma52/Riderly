/** @format */

import React, { useRef, useState } from "react";
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

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Simple email regex validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 6 characters (you can add more rules)
    return password.length >= 6;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate name
    if (!name.current.value) {
      validationErrors.name = "Name is required.";
    }

    // Validate email
    if (!email.current.value) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(email.current.value)) {
      validationErrors.email = "Invalid email format.";
    }

    // Validate password
    if (!password.current.value) {
      validationErrors.password = "Password is required.";
    } else if (!validatePassword(password.current.value)) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    // Validate location
    if (!location.current.value) {
      validationErrors.location = "Location is required.";
    }

    // If there are errors, set them and do not proceed
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Proceed with registration if no validation errors
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

  return (
    <>
      <ToastContainer />
      <div className="form">
        <div className="main_div">
          <div className="title">Register</div>
          <form action="#" onSubmit={handleRegister}>
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
              {errors.name && <div className="error">{errors.name}</div>}
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
              {errors.email && <div className="error">{errors.email}</div>}
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
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
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
                <i className="fas fa-map-marker-alt"></i>
              </div>
              {errors.location && (
                <div className="error">{errors.location}</div>
              )}
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
