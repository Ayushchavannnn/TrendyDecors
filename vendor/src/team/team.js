import "./team.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import { FaFacebookF, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Team() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [aadharNumber, setAadharNumber] = React.useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession:'',
    aadhar:'',
    password:'',
    productImage: null,
  });

  useEffect(() => {
    fetch("http://localhost:80/Api")
      .then((y) => y.json())
      .then((x) => {
        setUploadedProducts(x);
        console.log(uploadedProducts);
      });
  }, []);

  const extractAadharNumber = (text) => {
    const aadharRegex = /\b\d{4}\s\d{4}\s\d{4}\b/;
    const match = text.match(aadharRegex);
    return match ? match[0] : 'Aadhar number not found';
  };

  const handleSubmitAdhaar = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        const extractedAadharNumber = extractAadharNumber(result.data.text);
        setAadharNumber(extractedAadharNumber);

        // Update formData state with Aadhar number
        setFormData({
          ...formData,
          aadhar: extractedAadharNumber,
        });

        setIsLoading(false);
      });
  };

  const [uploadedProducts, setUploadedProducts] = useState([]); // New state for storing uploaded products

  const handleChange = async (e) => {
    const { name, value, type } = e.target;

    // Handle file inputs separately
    if (type === 'file') {
      const imageFile = e.target.files[0];

      if (name === 'workImage') {
        await setFormData({ ...formData, workImage: imageFile });
      } else if (name === 'userImage') {
        await setFormData({ ...formData, userImage: imageFile });
      }
    } else {
      await setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form data to send:', formData);

    await axios.post("http://localhost:80/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    fetch('http://localhost:80/Api')
      .then((y) => y.json())
      .then((x) => {
        console.log(x);
      });

    setUploadedProducts([...uploadedProducts, formData]);

    // Clear the form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      profession: '',
      aadhar: '',
      password: '',
      productImage: null,
    });
  };

  return (
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
          // marginTop: "5%",
          marginBottom: "5%",
        }}
      >

        <section className="home" id="home">
          <div id="particles-js"></div>
          <div className="content">
            <h2>Hi There,<br/> I'm  <span>Designer</span></h2>
          </div>
          <div className="image">
            <img draggable="false" className="tilt" src="./assets/images/hero.png" alt=""/>
          </div>
        </section>

        <h2 className="vendor" style={{ marginBottom: "5%",marginTop:"-40px"}}>
          Enter your professional data.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label" placeholder="Project Planner | Interior Designer | 3D art work" style={{fontWeight:"500"}}>
              Enter your Skills
            </label>
            <input className="form-control"  type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange} />
          </div>

          <div className="flex flex-col w-[100%]">
            <div className="containeradhaaar" style={{ height: '25vh' }}>
              <div className="row h-100">
                <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">

                  {isLoading && (
                    <>
                      <progress className="form-control" value={progress} max="100">
                        {progress}%{' '}
                      </progress>{' '}
                      <p className="text-center py-0 my-0">Converting:- {progress} %</p>
                    </>
                  )}
                  {!isLoading && !text && (
                    <>
                      <input
                        type="file"
                        onChange={(e) =>
                          setImage(URL.createObjectURL(e.target.files[0]))
                        }
                        className="form-control mt-5 mb-2"
                      />
                      <input
                        type="button"
                        onClick={handleSubmitAdhaar}
                        className="btn btn-primary mt-5"
                        value="Convert"
                      />
                    </>
                  )}
                  {!isLoading && aadharNumber && (
                    <>
                      <p className="mt-5">Aadhar Number: {aadharNumber}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="previewComponent">
            <input
              type="file"
              id="workImage"
              name="workImage"
              onChange={(e) => handleChange(e)}
              accept="image/*"
            />
            <button
              className="submitButton"
              type="submit"
            >
              Upload Image 1
            </button>
            <b style={{marginLeft:"30px"}}> Upload Past Project</b>
          </div>

          <div className="previewComponent">
            <input
              className="fileInput"
              type="file"
              id="userImage"
              name="userImage"
              onChange={(e) => handleChange(e)}
              accept="image/*"
            />
            <button
              className="submitButton"
              type="submit"
            >
              Upload Image 2
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="skills" className="form-label" placeholder="Project Planner | Interior Designer | 3D art work" style={{fontWeight:"500"}}>
              <p style={{marginLeft:"30px"}}>Describe Your Past Project</p>
            </label>
            <input className="form-control"  type="text"
              id="profession"
              name="profession"
              value={formData.desc}
              onChange={handleChange} />
          </div>
          <button type="button" className="btn " style={{background:"#daa274"}}>Submit</button>
        </form>
      </div>
    </div>
  );
}
