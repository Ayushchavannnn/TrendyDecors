// App.js or your component file
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import {toast} from "react-toastify";
import './Signup.css'; // Make sure to adjust the path accordingly

const Signup = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);

  const toggleMode = () => {
    setSignUpMode((prevMode) => !prevMode);
  
  };
  const [user,setUser] = useState({
    username:"",
    email:"",
    phone:"",
    password:""
})
const navigate = useNavigate();
const {storeTokenInLS} = useAuth();
const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    setUser({
        ...user,
        [name]:value,
    })

}

const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();

      console.log("response data : ", responseData.extraDetails);

      if (response.ok) {
        storeTokenInLS(responseData.token)
        toast.success("Registration Successful");
        
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/")
      } else {
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
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
          <form  onSubmit={handleSubmit} className={`sign-in-form ${isSignUpMode ? '' : 'active-form'}`}>
            
            <h2 className="title" style={{display: 'block', textAlign: 'center'}}>CUSTOMER <br></br>Sign Up</h2>
            <p>Join us and decor your rooms like never before</p>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="username" 
                 />
            </div>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input  type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="email" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input  type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}/>
            </div>

            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input   type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="password" />
            </div>
            <input type="submit" value="Sign up" className="btn solid" />
            <p>Already have an account? <a href='#'>Login Now!</a></p> 
          </form>

          {/* Vendor */}
          <form action="" className={`sign-up-form ${isSignUpMode ? 'active-form' : ''}`}>
            <h2 className="title" style={{display: 'block', textAlign: 'center'}}>BUISNESS <br></br>Sign Up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="phone" placeholder="Phone Number" />
            </div>

            <div>
                  {/* Aadhar card */}
            </div>

            <div>
                  {/* Profile photo */}
            </div>

            <div>
                  {/* Profession */}
            </div>


            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
            <p>Already have an account? <a href='#'>Login Now!</a></p> 
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h1>For Buisnesses</h1>
            <h3>Wanna work with us?</h3>
            <p>To boost your buisness <br></br> Click the button below </p>
            <button className="btn transparent" onClick={toggleMode}>Join Us</button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h1>For customers</h1>
            <p>Sign up here and decor your rooms <br></br>  like never before</p>
            <button className="btn transparent" onClick={toggleMode}>Sign up</button>
          </div>
          <img src="./img/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;