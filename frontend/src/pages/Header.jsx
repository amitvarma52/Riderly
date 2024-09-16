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
        <p>Riderly</p>
      </div>
      <a id="menu-icon" className="menu-icon" onClick={onMenuClick}>
        {hamburger ? <GrClose size={30} /> : <GiHamburgerMenu size={30} />}
      </a>

      <div id="navigation-bar" className="nav-bar" ref={navbar}>
        <Link to="/">HOME</Link>
        <Link to="all">All</Link>
        {/* <a href="#">Trending</a> */}
        <Link to="/about">ABOUT</Link>
        <Link to="feedback">FEEDBACK</Link>
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
                "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-account-man-person-people-interface-pack-icons-6581822.png?f=webp"
              } // Assuming `user.photo` exists
              alt="User"
              className="user-photo"
              onClick={() => setShowUserInfo(true)} // Show user info on click
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                width: "60px",
                marginBottom: "5px",
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
                      "https://cdn3d.iconscout.com/3d/premium/thumb/profile-3d-icon-download-in-png-blend-fbx-gltf-file-formats--user-account-man-person-people-interface-pack-icons-6581822.png?f=webp"
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
