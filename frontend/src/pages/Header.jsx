/** @format */

import React, { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { objectActions, userActions } from "../store/Store";
import "../stylesheets/user.css";
const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbar = useRef();
  const [hamburger, setHamburger] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false); // State to show/hide user info

  function onMenuClick() {
    var responsive_className_name = "responsive";
    navbar.current.classList.toggle(responsive_className_name);
    setHamburger(!hamburger);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("rental-user");
    localStorage.removeItem("rental-token");
    dispatch(userActions.delete());
    dispatch(objectActions.delete());
    navigate("login");
  };

  return (
    <div className="page-header">
      <div className="logo">
        <p>Logo</p>
      </div>
      <a id="menu-icon" className="menu-icon" onClick={onMenuClick}>
        {hamburger ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
      </a>

      <div id="navigation-bar" className="nav-bar" ref={navbar}>
        <Link to="/">Home</Link>
        <Link to="all">All</Link>
        <a href="#">Trending</a>
        <Link to="/about">About</Link>
        <a href="#">Contact</a>
      </div>

      <div
        className="header-right"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {user ? (
          <>
            {/* Move user photo above the logout button */}
            <img
              src={
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              } // Assuming `user.photo` exists
              alt="User"
              className="user-photo"
              onClick={() => setShowUserInfo(true)} // Show user info on click
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "50px",
                marginBottom: "10px",
              }} // Adjusted margin
            />
            <Link
              className="login-btn"
              style={{ backgroundColor: "maroon" }}
              onClick={handleLogout}
              to="/login"
            >
              Log out
            </Link>

            {/* User Info Modal */}
            {showUserInfo && (
              <div className="user-info-modal">
                <div className="user-info-content">
                  <img
                    src={
                      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    } // Display the user's photo
                    alt={user.name}
                    style={{ width: "100px", borderRadius: "50%" }}
                  />
                  <h3>{user.name}</h3>
                  <p>Location: {user.location}</p>
                  <p>Email: {user.email}</p>
                  <button
                    onClick={() => setShowUserInfo(false)} // Hide user info on click
                    className="close-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Link className="login-btn" to="/register">
            Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
