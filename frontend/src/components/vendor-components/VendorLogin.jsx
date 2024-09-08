import React, { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const VendorLogin = ({ changeLoged, handleSetToken }) => {
    const email = useRef();
    const password = useRef();
    const handleLogin = (e) => {
      
      e.preventDefault();
      fetch("http://localhost:8080/api/v1/car-rental/vendor/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current.value,
          password: password.current.value,
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
          localStorage.setItem("vendorName",data.vendor.name)
          handleSetToken(data.token);
          toast.success("Login successfully", {
            position: "top-center",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          changeLoged(false);
          toast.error("Vendor not found", {
            position: "top-center",
            autoClose: 5000,
          });
        });
    };
  return (
    <div className="form" onSubmit={handleLogin}>
      <ToastContainer />
      <div className="main_div">
        <div className="title">Vendor Login</div>
        <form action="#">
          <div className="input_box">
            <input type="text" placeholder="Email" ref={email} required />
            <div className="icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="input_box">
            <input
              type="password"
              placeholder="Password"
              ref={password}
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

export default VendorLogin