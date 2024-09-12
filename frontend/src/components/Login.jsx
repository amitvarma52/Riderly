/** @format */

import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/Store";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const user = useSelector((state) => state.user);
  const Login = (email, password) => {
    axios
      .post(
        "http://localhost:8080/api/v1/car-rental/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      )
      .then((response) => {
        navigate("/");
        localStorage.setItem("rental-user", JSON.stringify(response.data.user));
        localStorage.setItem("rental-token", response.data.token);
        dispatch(
          userActions.initial(JSON.parse(localStorage.getItem("rental-user")))
        );
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.error(error.response.data, {
          position: "top-center",
          autoClose: 5000,
        });
      });
  };

  useEffect(() => {
    if (
      localStorage.getItem("rental-user") &&
      localStorage.getItem("rental-token")
    ) {
      dispatch(
        userActions.initial(JSON.parse(localStorage.getItem("rental-user")))
      );
      navigate("/"); // This should run only when user is authenticated
    }

    if (user) {
      navigate("/"); // This should only run when the user state is updated
    }
  }, [user, dispatch, navigate]); // Add dependencies to avoid the infinite loop

  const handleLogin = (e) => {
    e.preventDefault();
    Login(email.current.value, password.current.value);
  };
  return (
    <>
      <ToastContainer />
      <div className="form" onSubmit={handleLogin}>
        <div className="main_div">
          <div className="title">Login</div>
          <form action="#">
            <div className="input_box">
              <input type="text" placeholder="Name" ref={email} required />
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
            <div className="sign_up">
              Not a member? <Link to="/register">register</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
