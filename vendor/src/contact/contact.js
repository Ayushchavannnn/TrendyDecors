import "./contact.css";
import { GiWorld } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { useAuth } from '../store/auth';
import { BsTelephone, BsArrowRight } from "react-icons/bs";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useState } from "react";

const Contact=() =>{
  
  const defaultContactFormData = {
    username: '',
    email: '',
    message: '',
  };

  const [contact, setContact] = useState(defaultContactFormData);

    const [data, setData] = useState(defaultContactFormData);
    
      // lets tackle our handleInput
      const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setContact({
          ...contact,
          [name]: value,
        });
      };
    

      

      const {user} = useAuth();
      const [userData, setUserData] = useState(true);
      if (userData && user) {
        setContact({
          username: user.username,
          email: user.email,
          message: "",
        });
        setUserData(false);
      }

      // handle fomr getFormSubmissionInfo
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8080/api/form/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact), // Fix: Use 'contact' instead of 'data'
          });
    
          console.log('response: ', response);
    
          if (response.ok) {
            setContact(defaultContactFormData); // Fix: Use 'setContact' instead of 'setData'
            const responseData = await response.json();
            alert(responseData);
            console.log(responseData);
          } else {
            // Handle API error here
            console.error('API Error:', response.status, response.statusText);
          }
        } catch (error) {
          
          console.error(error);
        }
      }
  return (
    <div className="contact">
      <div className="contact-header">
        <h1>
          Contact Us<p>Home / Contact</p>
        </h1>
      </div>
      <div className="contact-content">
        <h2>We love meeting new people and helping them.</h2>
        <div className="contact-form">
          <div className="contact-form-info">
            <div className="icons">
              <p>
                <span className="icon">
                  <HiOutlineMail />
                </span>
                <a href="mailto: info@yourdomain.com">info@yourdomain.com</a>
              </p>
              <p>
                <span className="icon">
                  <BsTelephone />
                </span>
                +1 (378) 400-1234
              </p>
              <p>
                <span className="icon">
                  <GiWorld />
                </span>
                <a href="www.yourdomain.com">www.yourdomain.com</a>
              </p>
            </div>
            <div className="contact-smedias">
              <ul>
                <li>
                  <a href="https://www.facebook.com/">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/">
                    <FaLinkedin />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="contact-form-fill">
            <div className="nameEmail">
              <input name="username" placeholder="Name"  id="username"
                autoComplete="off"
                value={contact.username}
                onChange={handleInput}
                required/>
              <input type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={contact.email}
                onChange={handleInput}
                required 
                placeholder="Email" />
            </div>
           
            <div className="interested">
              <textarea name="message"
                id="message"
                autoComplete="off"
                value={contact.message}
                onChange={handleInput}
                required
                cols="30"
                rows="6"
                 placeholder="Hello, I am interested in.." />
            </div>
            <div className="send">
              <button  type="submit">
                Send Now
                <BsArrowRight style={{ marginLeft: "5px" }} color="#CDA274" />
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97236.62360572393!2d49.78474799369314!3d40.394571267599446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku!5e0!3m2!1sen!2saz!4v1677357758009!5m2!1sen!2saz"
          title="map"
          style={{
            frameborder: "0",
            allowfullscreen: "",
            ariaHidden: "false",
            tabindex: "0",
            width: "800px",
            height: "350px",
          }}
        ></iframe>
      </div>
    </div>
  );
}
export default Contact