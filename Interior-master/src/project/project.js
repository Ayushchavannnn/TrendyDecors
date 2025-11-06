
import "./project.css";
import React, { useEffect, useState } from "react";

import { Link } from 'react-router-dom';
import VideoButton from '../components/VideoButton';


export function Project() {

  const [prod, setProd] = useState([]);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(1);
      } else {
        setScroll(0);
      }
    };

    fetch('http://localhost:80/Api')
      .then((y) => y.json())
      .then((x) => {
        setProd(x);
        console.log(x);
      });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <div className="project">
        <div className="project-header">
          <h1>Our Projects<p>Home / Project</p></h1>
        </div>
        <div className="project-categories">
          <ul>
            <li>Bedroom</li>
            <li>Bathroom</li>
            <li>Kitchen</li>
            <li>Living Area</li>
          </ul>
        </div>
      </div>
      <VideoButton />
      <div className="team">
        <div className="team-header">
          <h1>
            Our Professional<p>Home / Team</p>
          </h1>
        </div>

        <div
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "5%",
          }}
        >
          <section className="home" id="home">
            <div id="particles-js"></div>
          
            <div className="image">
              <img draggable="false" className="tilt" src="./assets/images/hero.png" alt=""/>
            </div>
          </section>
          <div>
  

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-10 mt-8 justify-center" style={{ marginTop: "-550px" }}>
    {prod.map((e) => (
      <div key={e._id}>
        <div className="max-w-sm rounded-2xl overflow-hidden text-white card">
          <img
            className="w-full border-white border-2"
            src={`/imgs/${e.filename}`} // Update this path if needed
            alt="User Image"
            style={{height:"250px"}}
          />
          <div className="px-6 py-4 text-center">
            <h1>{e.profession}</h1>
            {/* <p className="text-white text-base">{e.aadhar}</p> */}
            <h1>{e.desc}</h1>
          </div>
          <div className="px-6 pt-4 pb-2"></div>
        </div>
      </div>
    ))}
  </div>

  <div id="app" className="">
    <card data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
      {/* <h1 slot="header">Canyons</h1>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
    </card>
    <card data-image="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
      {/* <h1 slot="header">Beaches</h1>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
    </card>
    <card data-image="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
      {/* <h1 slot="header">Trees</h1>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
    </card>
    <card data-image="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
      {/* <h1 slot="header">Lakes</h1>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p> */}
    </card>
  </div>
</div>

        </div>
      </div>
    </>

     
    
  
  );
}
