import React from 'react';
import { NavLink } from "react-router-dom";
// import "./Navbar.css";
import { useAuth } from '../store/auth';
import logo from "../images/logo.png";
import "./header.css";

 const Navbar=()=> {
  const { isLoggedIn } = useAuth();
  console.log("login or not ", isLoggedIn);
  return (
    <div className="header">
      <div className="header-logo-text">
        <NavLink style={{display:"flex"}} to="/">
          <div className="header-logo">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="header-text">
            <p>Trendy Decors</p>
          </div>
        </NavLink>
      </div>
      <div className="header-pages">
        <ul>
            <li><NavLink className={'hover-underline-animation'} to={`/`}>Home</NavLink></li>
            <li><NavLink className={'hover-underline-animation'} to={`/projects`}>Professionals</NavLink></li>
            <li><NavLink className={'hover-underline-animation'}  to={`/services`}>Services</NavLink></li>
            <li><NavLink className={'hover-underline-animation'} to={`/design`}> Design</NavLink></li>
            <li><NavLink className={'hover-underline-animation'} to={`/blog`}>Blog</NavLink></li>
            <li><NavLink className={'hover-underline-animation'} to={`/contact`}>Contact</NavLink></li>
            {isLoggedIn ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/signup"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
        </ul>
        
      </div>
    </div>
  );
}
export default Navbar
