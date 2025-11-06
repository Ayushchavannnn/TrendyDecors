import React, { useEffect, useState } from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export function ProjectCard(props) {
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
    <div className="op-project">
      {prod.map((project) => (
        <div key={project._id}>
          <div className="op-pro-img">
            <img src={`/imgs/${project.filename}`} alt="project"></img>
          </div>
          <div className="op-pro-detail">
            <div className="op-pro-info">
              <p className="op-prj-title">{project.profession}</p>
              <p className="op-prj-path">{project.desc}</p>
            </div>
            <div className="op-pro-btn">
              <Link to={`/project-details`}>
                <button>
                  <IoIosArrowForward />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
