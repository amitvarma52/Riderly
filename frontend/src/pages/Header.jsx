/** @format */

import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { objectActions, userActions } from "../store/Store";
const Header = () => {
  const user =useSelector(state=>state.user)
  console.log(user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const navbar = useRef();
  const [hamburger,setHamburger]=useState(false)
  function onMenuClick() {
    var responsive_className_name = "responsive";
    navbar.current.classList.toggle(responsive_className_name);
    setHamburger(!hamburger)
  }
  const handleLogout=(e)=>{
    e.preventDefault()
    localStorage.removeItem("rental-user")
    localStorage.removeItem("rental-token")
    dispatch(userActions.delete())
    dispatch(objectActions.delete())
    navigate('login')
  }
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

      <div className="header-right">
        {user ? (
          <Link className="login-btn" style={{ backgroundColor: "maroon" }} onClick={handleLogout} to='/login'>
            Log out
          </Link>
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
