import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Tesseract from 'tesseract.js';
// import "./Aadhar.css"

const Portfolio = () => {

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
  fetch("http://localhost:80/Api").then((y)=>{
    return y.json()
  })
  .then((x)=>{
setUploadedProducts(x);
console.log(uploadedProducts);
  })

  
}, [])

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
    <div>
      {/* <SellerNavbar /> */}

      <div className=" flex flex-col w-[100%] ">
        

        <form onSubmit={handleSubmit} className="  w-full p-4 h-[auto]">
            <h1 className="text-4xl font-extrabold drop-shadow-sm text-center">Product Upload</h1>
          
        
         
      
          <div className="mb-4 w-1/2 mx-5">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 text-center">
              Your Profession:
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-md focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="flex flex-col w-[100%]">
        <div className="containeradhaaar" style={{ height: '100vh' }}>
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
        <div class="flex justify-center w-auto h-auto">
  <div class="mb-4 items-center h-auto">
    <label htmlFor="productImage" class="block text-lg font-medium text-gray-700 w-[100%]">
      Work Image:
    </label>
    <input
  type="file"
  id="workImage"
  name="workImage"
  onChange={(e) => handleChange(e)}
  accept="image/*"
  className="w-[100%] h-auto items-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
  required
/>
  </div>
</div>
<div className="mb-4 w-1/2 mx-5">
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 text-center">
              Your Description:
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg shadow-md focus:outline-none focus:border-blue-400"
              required
            />
          </div>
      
         
          <div class="flex justify-center w-auto h-auto">
  <div class="mb-4 items-center h-auto">
    <label htmlFor="productImage" class="block text-lg font-medium text-gray-700 w-[100%]">
      Your Image:
    </label>
    <input
  type="file"
  id="userImage"
  name="userImage"
  onChange={(e) => handleChange(e)}
  accept="image/*"
  className="w-[100%] h-auto items-center px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
  required
/>
  </div>
</div>


<div className="mb-4 flex justify-center">
  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
  >
    Upload Product
  </button>
</div>

        </form>
       
      </div>
    </div>
  );
};

export default Portfolio;

