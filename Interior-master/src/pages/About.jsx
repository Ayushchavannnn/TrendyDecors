import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth';

const About = () => {
  // const [about, setAbout] = useState({
  //   username: "User"
  // });
  const {user} = useAuth();
  // const [userData, setUserData] = useState(true);
  // if (userData && user) {
  //   setAbout({
  //     username: user.username
  //   });
  //   setUserData(false);
  // }
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}
              <p>Hello {user ? ` ${user.username} to the site` : `to our site`}</p>
              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Our team consists of experienced IT professionals who
                are passionate about staying up-to-date with the latest industry
                trends.
              </p>
              <p>
                Customization: We understand that every business is unique.
                Thats why we create solutions that are tailored to your specific
                needs and goals.
              </p>
              <p>
                Customer-Centric Approach: We prioritize your satisfaction and
                provide top-notch support to address your IT concerns.
              </p>
              <p>
                Affordability: We offer competitive pricing without compromising
                on the quality of our services.
              </p>
              <p>
                Reliability: Count on us to be there when you need us. We're
                committed to ensuring your IT environment is reliable and
                available 24/7.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <button className="btn secondary-btn">learn more</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <section className='section-analytics'>
        <div className='container grid grid-four-cols'>
        <div className='div1'>
            <h2>50+</h2>
            <p>Registered companies</p>
        </div>
        <div className='div1'>
            <h2>10000+</h2>
            <p>Happy clients</p>
        </div>
        <div className='div1'>
            <h2>500+</h2>
            <p> Well knnown developers</p>
        </div>
        <div className='div1'>
            <h2>24/7</h2>
            <p>services</p>
        </div>
        </div>
      </section>
    </>
  )
}

export default About