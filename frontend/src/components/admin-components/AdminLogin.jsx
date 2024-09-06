/** @format */

import React, { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = ({ changeLoged, handleSetToken }) => {
  const adminName = useRef();
  const adminPass = useRef();
  const handleLogin = (e) => {
    if (localStorage.getItem("admin-token")) {
      changeLoged(true);
    }
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/car-rental/admin/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminName: adminName.current.value,
        adminPass: adminPass.current.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("login failed");
        }
      })
      .then((data) => {
        changeLoged(true);
        handleSetToken(data);
        toast.success("Login successfully", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        changeLoged(false);
        toast.error("Invalid  Name or Password", {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };

  return (
    <div className="form" onSubmit={handleLogin}>
      <ToastContainer />
      <div className="main_div">
        <div className="title">Admin Login</div>
        <form action="#">
          <div className="input_box">
            <input type="text" placeholder="Name" ref={adminName} required />
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Password"
              ref={adminPass}
              required
            />
            <div className="icon">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <div className="input_box button">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
