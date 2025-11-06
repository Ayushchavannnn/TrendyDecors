import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import {toast} from "react-toastify";
import './Login.css'; // Make sure to adjust the path accordingly

const Login = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  };
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate  = useNavigate();
  const {storeTokenInLS} = useAuth();

//   const navigate = useNavigate();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    // alert(user);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("response data : ", res_data);
      if (response.ok) {
        
        // console.log("res from server", res_data);
        toast.success("Login Successful");

        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/")
        // console.log(responseData);
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);

      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">

          {/* Client */}
          <form onSubmit={handleSubmit} className={`sign-in-form ${isSignUpMode ? '' : 'active-form'}`}>
            
            <h2 className="title" style={{display: 'block', textAlign: 'center'}}>CUSTOMER <br></br>Login</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email"/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password"/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p>Don't have an account? <a href='#'>Signup Now!</a></p> 
            
          </form>

          {/* Vendor */}
          <form action="" className={`sign-up-form ${isSignUpMode ? 'active-form' : ''}`}>
            <h2 className="title" style={{display: 'block', textAlign: 'center'}}>BUISNESS <br></br>Login</h2>
            
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p>Already have an account? <a href='#'>Signup Now!</a></p> 
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h1>For Buisnesses <br></br>login<br></br></h1>
            
            <button className="btn transparent" onClick={toggleMode}>Login</button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h1>For customers <br></br>login<br></br></h1>
            <button className="btn transparent" onClick={toggleMode}>Login</button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;