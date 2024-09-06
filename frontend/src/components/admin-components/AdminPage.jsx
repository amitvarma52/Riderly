/** @format */

import React, { useState } from "react";
import "../../stylesheets/adminPage.css";
import { ToastContainer, toast } from "react-toastify";
import Vendor from "./Vendor";
import "../../stylesheets/vendor.css";
const AdminPage = ({ changeLoged, adminToken, handleSetToken }) => {
  const [vendors, setVendors] = useState([]);
  if (adminToken) {
    console.log("Bearer " + adminToken);
    fetch("http://localhost:8080/api/v1/car-rental/admin/allVendor", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        localStorage.removeItem("admin-token");
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  }
  const handleLogout = () => {
    changeLoged(false);
    handleSetToken(null);
  };
  return (
    <>
      <ToastContainer />
      <div className="admin-header">
        <button>+</button>
        <h1>Admin Page</h1>
        <button onClick={handleLogout}>Log-out</button>
      </div>
        <h1 className="vendors-list"> VENDORS LIST</h1>
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
        <Vendor name={"amit"} email={"amiv2529@gmail.com"} location={"thane"} phone={9293853}/>
      </table>
    </>
  );
};

export default AdminPage;
