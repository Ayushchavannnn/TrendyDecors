// import "./team.css";
// // import m0 from "../images/team/member1.png";
// // import m1 from "../images/team/member2.jpg";
// // import m2 from "../images/team/member3.png";
// // import m3 from "../images/team/member4.png";
// // import m4 from "../images/team/member5.png";
// // import m5 from "../images/team/member6.png";
// // import m6 from "../images/team/member7.png";
// // import m7 from "../images/team/member8.png";
// import data from "./team_members.json";
// import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export function Team() {
//   return (
//     <div className="team">
//       <div className="team-header">
//         <h1>
//           Our Professional<p>Home / Team</p>
//         </h1>
//       </div>
//       <div className="team-members">
//         {data.members
//           .filter((m, ind) => ind < 8)
//           .map((mbr, i) => {
//             return (
//               <Link to={`/team-single`}>
//               <div className="member" key={i}>
//                 <div className="member-photo">
//                   <img src={m5} alt="member"></img>
//                 </div>
//                 <div className="member-info">
//                   <p className="fullname">{mbr.fullname}</p>
//                   <p className="m-detail">
//                     {mbr.job},{mbr.country}
//                   </p>
//                   <ul>
//                     <li>
//                       <a href="https://www.facebook.com/">
//                         <FaFacebookF />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="https://www.linkedin.com/">
//                         <FaLinkedin />
//                       </a>
//                     </li>
//                     <li>
//                       <a href="https://www.twitter.com/">
//                         <FaTwitter />
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               </Link>
//             );
//           })}
//       </div>
//     </div>
//   );
// }import React, { useEffect, useState } from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VideoButton from '../components/VideoButton';

function Team() {
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
    <VideoButton/>
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-10 mt-8">
        {prod.map((e) => (
          <div key={e._id}>
            <div className="max-w-sm rounded-2xl overflow-hidden text-white card">
              <img
                className="w-full border-white border-2"
                src={`/imgs/${e.filename}`} // Update this path if needed
                alt="User Image"
              />
              <img
                className="w-full border-white border-2"
                src={`/imgs/${e.work}`} // Update this path if needed
                alt="Work Image"
              />

              <div className="px-6 py-4 text-center">
                <h1>{e.profession}</h1>
                <p className="text-white text-base">{e.aadhar}</p>
                <h1>Rs.{e.desc}</h1>
              </div>
              <div className="px-6 pt-4 pb-2"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Team;