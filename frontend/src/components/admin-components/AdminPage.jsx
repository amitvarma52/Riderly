/** @format */

import React, { useEffect, useState } from "react";
import "../../stylesheets/adminPage.css";
import { ToastContainer, toast } from "react-toastify";
import Vendor from "./Vendor";
import "../../stylesheets/vendor.css";
import Loader from "../Loader";
const AdminPage = ({ changeLoged, adminToken, handleSetToken }) => {
  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(false);
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
          console.log(data)
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
  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    changeLoged(false);
    handleSetToken(null);
    setVendors([]);
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
    </>
  );
};

export default AdminPage;
