/** @format */

import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
const Header = () => {
  const navbar = useRef();
  const [hamburger,setHamburger]=useState(false)
  function onMenuClick() {
    var responsive_className_name = "responsive";
    navbar.current.classList.toggle(responsive_className_name);
    setHamburger(!hamburger)
  }
  return (
    <div className="page-header">
      <div className="logo">
        <p>Logo</p>
      </div>
      <a id="menu-icon" className="menu-icon" onClick={onMenuClick}>
        {hamburger ? <GrClose size={30}/> : <GiHamburgerMenu size={30}/>}
      </a>

      <div id="navigation-bar" className="nav-bar" ref={navbar}>
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Services</a>
        <a href="#">Profile</a>
        <a href="#">About</a>
        <a href="#">Contact us</a>
      </div>

      <div className="header-right">
        <button className="login-btn">Sign in</button>
      </div>
    </div>
  );
};

export default Header;
