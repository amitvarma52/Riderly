/** @format */

import React, { useEffect, useState } from "react";
import "../../stylesheets/adminPage.css";
import { ToastContainer, toast } from "react-toastify";
import Vendor from "./Vendor";
import "../../stylesheets/vendor.css";
import Loader from "../Loader";
import AdminForm from "./AdminForm";
import axios from "axios";
import '../../stylesheets/feedback.css'

const AdminPage = ({ changeLoged, adminToken, handleSetToken }) => {
  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState([]);
  const [showMessages, setShowMessages] = useState(false); // Toggle message visibility
  const [feedback, setFeedback] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false); // Toggle feedback visibility

  // Fetch feedback
  useEffect(() => {
    if (adminToken) {
      axios
        .get("http://localhost:8080/api/v1/car-rental/admin/allFeedback", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
          timeout: 10000,
        })
        .then((response) => {
          const feedbackResponse = response.data;
          setFeedback(feedbackResponse.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [adminToken]);

  const getMessage = () => {
    if (adminToken) {
      axios
        .get("http://localhost:8080/api/v1/car-rental/admin/allMessage", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
          timeout: 10000,
        })
        .then((response) => {
          const data = response.data;
          setMessage(data.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getMessage();
  }, [adminToken]);

  const fetchData = () => {
    if (adminToken) {
      setLoader(true);
      fetch("http://localhost:8080/api/v1/car-rental/admin/allVendor", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          setVendors(data);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
          });
        });
    }
  };

  const handleShowMessages = () => {
    setShowMessages((prevState) => !prevState);
  };

  const handleShowFeedback = () => {
    setShowFeedback((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, [adminToken]);

  const handleLogout = () => {
    changeLoged(false);
    handleSetToken(null);
    setVendors([]);
    setMessage([]);
    setFeedback([]);
  };

  const changeEdit = (value) => {
    setEdit(value);
  };

  return (
    <>
      <ToastContainer />
      <div className="admin-header">
        <button onClick={() => setEdit(true)}>+</button>
        <h1 style={{ background: "transparent", boxShadow: "none" }}>
          Admin Page
        </h1>
        <button onClick={handleLogout}>Log-out</button>
      </div>
      {edit && (
        <AdminForm
          changeEdit={changeEdit}
          adminToken={adminToken}
          fetchData={fetchData}
        />
      )}
      {!showFeedback && (
        <div className="feedback-table-container">
          <h1 className="vendors-list">VENDORS LIST</h1>
          <table className="admin-table">
            <thead>
              <tr className="header-vendor">
                <th>Name </th>
                <th>Email</th>
                <th>Location</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loader && (
                <tr>
                  <td>
                    <Loader />
                  </td>
                </tr>
              )}
              {!loader &&
                vendors.map((ven) => (
                  <Vendor
                    fetchData={fetchData}
                    key={ven._id}
                    name={ven.name}
                    email={ven.email}
                    location={ven.location}
                    phone={ven.phone}
                    adminToken={adminToken}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
      {message.length > 0 && (
        <>
          <button className="message-btn" onClick={handleShowMessages}>
            {showMessages ? "Hide Bookings" : "All Bookings"}
          </button>

          {showMessages && (
            <div className="message-table-container">
              <table className="message-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Vendor</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Vehicle</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {message.map((msg, index) => (
                    <tr key={index}>
                      <td>{new Date(msg.date).toLocaleDateString()}</td>
                      <td>{msg.vendor}</td>
                      <td>{msg.user}</td>
                      <td>{msg.email}</td>
                      <td>{msg.vehicleName}</td>
                      <td>{msg.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {feedback.length > 0 && (
        <>
          <button className="feedback-btn" onClick={handleShowFeedback}>
            {showFeedback ? "Show Vendors" : "Show Feedback"}
          </button>

          {showFeedback && (
            <div className="feedback-table-container">
              <h1 className="vendors-list">USERS FEEDBACK</h1>
              <table className="admin-table">
                <thead>
                  <tr className="header-vendor">
                    <th>Date</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.map((fb, index) => (
                    <tr key={index} className="vendor">
                      <td>{new Date(fb.date).toLocaleDateString()}</td>
                      <td>{fb.user}</td>
                      <td>{fb.email}</td>
                      <td>{fb.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminPage;
