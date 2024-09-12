/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../stylesheets/feedbackForm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const FeedbackForm = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/car-rental/user/sendFeedback",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("rental-token"),
          },
        }
      );
      toast.success("Thank you for your feedback", {
        position: "top-center",
        autoClose: 5000,
      });
      setFormData({
        user: "",
        email: "",
        message: "",
      });
    //   setSubmitted(true);
    } catch (error) {
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 5000,
      });
    //   setError("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="form-container">
        {submitted ? (
          <div className="success-message">
            <h2>Thank you for your feedback!</h2>
          </div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <h2>Feedback Form</h2>

            {error && <p className="error-message">{error}</p>}

            <label htmlFor="user">Name</label>
            <input
              type="text"
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;
