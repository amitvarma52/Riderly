/** @format */

import React, { useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {
  const adminName = useRef();
  const adminPass = useRef();
  const handleLogin = (e) => {
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
      .then((res) => res.json())
      .then((data) => {
        if (data === "Invalid admin name or password") {
          toast.error("Invalid Admin Name or Password", {
            position: "top-center",
            autoClose: 5000,
          });
        } else {
          toast.success("Admin Login In Succes", {
            position: "top-center",
            autoClose: 5000,
          });
          console.log(data);
        }
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
          {/* <div className="option_div">
            <div className="check_box">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <div className="forget_div">
              <a href="#">Forgot password?</a>
            </div>
          </div> */}
          <div className="input_box button">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
