/** @format */

import React, { useRef } from "react";
import "../../stylesheets/vendor.css";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const AdminForm = ({ changeEdit, adminToken, fetchData }) => {
  const Name = useRef();
  const Email = useRef();
  const Location = useRef();
  const Phone = useRef();
  const Password = useRef();
  const handleAddVendor = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/admin/register",
        {
          name: Name.current.value,
          email: Email.current.value,
          location: Location.current.value,
          phone: Phone.current.value,
          password: Password.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + adminToken,
            "Content-Type": "application/json",
          },
          timeout: 10000, // Optional: timeout in milliseconds
        }
      )
      .then((response) => {
        changeEdit(false);
        fetchData();
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };
  return (
    <>
      <form action="" className="edit-form" onSubmit={handleAddVendor}>
        <ToastContainer />
        <h1 style={{ background: "transparent", boxShadow: "none" }}>
          Add Vendor
        </h1>
        <MdCancel color="white" onClick={() => changeEdit(false)} />
        <input ref={Name} name="Name" type="text" placeholder="name" required />
        <input
          ref={Email}
          name="email"
          type="email"
          placeholder="email"
          required
        />
        <input
          ref={Location}
          name="location"
          type="text"
          placeholder="location"
          required
        />
        <input
          ref={Phone}
          name="phone"
          type="number"
          placeholder="phone"
          maxLength="10"
          required
        />
        <input
          ref={Password}
          name="password"
          type="text"
          placeholder="password"
          required
        />
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default AdminForm;
