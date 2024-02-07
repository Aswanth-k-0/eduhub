
import './css/header.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
  name: '',
  mobileNumber: '',
  occupation: '',
  email: '',
  state: '',
  district: '',
  photo: null,
  username: '',
  password: '',
});

const [files, setFiles] = useState(null);

const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'photo') {
    setFiles(e.target.files); // Set the files state with the uploaded files
    setFormData({ ...formData, photo: e.target.files[0] }); // Set the photo in formData
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

const handleSubmit = async (e) => {

  e.preventDefault();
  if (formData.password !== formData['re-password']) {
    alert("Passwords do not match. Please make sure the passwords match.");
    return; // Prevent form submission
  }

  try {
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }
    await axios.post('http://localhost:8888/saveUser', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Redirect to home page or show success message
    navigate('/preference'); 

  } catch (error) {
    console.error('Error:', error);
    // Handle error (e.g., display error message)
  }
};

return (

    <div>
    <header id="header" className="fixed-top">
  <div className="container d-flex align-items-start">
    <a href="#" className="logo"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></a>

    <h1 className="logoText"><a href="#">Edu-hub</a></h1>
    
    <nav id="navbar" className="navbar ">
      <ul>
        <li className="nav-item">
          <a className="nav-link" href="/LoginPage">Back</a>
        </li>
      </ul>
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>
  </div>
</header>

<br/><br/>
<br/>
<div className="form" style={{ margin: '10px' }}>
      <form onSubmit={handleSubmit} >
        <div className="form row">
          <div className="form-group col-md-4">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="text" id="mobileNumber" name="mobileNumber" className="form-control" value={formData.mobileNumber} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="occupation">Occupation</label>
            <input type="text" id="occupation" name="occupation" className="form-control" value={formData.occupation} onChange={handleChange} />
          </div>
        </div>

        <div className="form row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" className="form-control" value={formData.state} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="photo" className="form-label">Photo</label>
            <input className="form-control form-control-sm" style={{height:'35px', paddingTop:'8px'}} type="file" id="photo" name="photo" onChange={handleChange} />
          </div>
        </div>

        <div className="form row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="district">District</label>
            <input type="text" id="district" name="district" className="form-control" value={formData.district} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
          </div>
        </div>

        <div className="form row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="re-password">Re-Enter Password</label>
            <input type="password" id="re-password" name="re-password" className="form-control" value={formData.repassword} onChange={handleChange} />
          </div>
        </div>

        <div style={{marginTop:'20px', marginLeft:'50px'}}>
          Do you want to save?
          <div className="form-check form-check-inline">
            <input type="radio" id="yes" name="saveOption" className="form-check-input" value="yes" />
            <label htmlFor="yes" className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input type="radio" id="no" name="saveOption" className="form-check-input" value="no" />
            <label htmlFor="no" className="form-check-label">No</label>
          </div>
        </div>

        <br/>
        <center>
          <button type="submit" style={{ width: '200px' }} className="btn btn-primary" onClick={handleSubmit}>Save and continue</button>
          <button type="clear" style={{ width: '200px', marginLeft: '10px' }} className="btn btn-primary">Clear</button>
        </center>
      </form>
    </div>
    </div>
  );
};

export default SignupPage;

