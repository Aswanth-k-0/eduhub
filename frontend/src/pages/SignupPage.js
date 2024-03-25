
import './css/header.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import './css/preference.css';

const SignupPage = () => {

  const options = ['Geci Events', 'Geci Announcements', 'Scholarships', 'Jobs', 'Cet Events', 'Gect Announcemeents', 'Nitc Events']; // Sample options
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [list,setList] =useState([]);
   
    useEffect(() => {
      const fetchOptions = async () => {

         try {
             const response = await axios.get(`http://localhost:8888/signUp`);
             setList(response.data);
             console.log("hiiiii"+response.data);
             localStorage.setItem('options',response.data);
         } catch (error) {
             console.error('Error fetching data:', error);
         }
     };
      
      fetchOptions();
    }, []);
    const handleSelectChange = (e) => {
      const value = e.target.value;
      if (value !== '' && !selectedOptions.includes(value)) {
        setSelectedOptions([...selectedOptions, value]);
        setInputValue(''); // Clear input value after selection
      }
    };
  
    const handleRemoveOption = (option) => {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };
  const [formData, setFormData] = useState({
  name: '',
  mobileNumber: '',
  occupation: '',
  email: '',
  state: '',
  district: '',
  photo: '',
  username: '',
  password: '',
  role: '',
  designation : '',
  updates_required: '',
  id_proof: '',
});

const [files, setFiles] = useState(null);

const navigate = useNavigate();


const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === 'photo') {
    setFiles(e.target.files); // Set the files state with the uploaded files
    setFormData({ ...formData, photo: e.target.files[0] }); // Set the photo in formData
  }else if(name === 'id_proof'){
    setFiles(e.target.files); // Set the files state with the uploaded files
    setFormData({ ...formData, id_proof: e.target.files[0] }); // Set the photo in formData
  }
  else {
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
    console.log(postData);

    postData.set('updates_required', selectedOptions.join(', ')); 
    await axios.post('http://localhost:8888/saveUser', postData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      
    });

    navigate('/LoginPage');
  } catch (error) {
    console.error('Error:', error);
    // Handle error (e.g., display error message)
  }
};

const handleClear = () => {
  setSelectedOptions([]);
  setInputValue('');
  setFiles('');
  setFormData({
    name: '',
    mobileNumber: '',
    occupation: '',
    email: '',
    state: '',
    district: '',
    photo: '',
    username: '',
    password: '',
    repassword: '',
    role: '',
    designation: '',
    updates_required: '',
    id_proof: '',
  });
  const fileInput = document.getElementById('photo');
  const fileInput1 = document.getElementById('id_proof');
  if (fileInput) {
    fileInput.value = ''; // Clearing the file input value
  }
  if (fileInput1) {
    fileInput.value = ''; // Clearing the file input value
  }
};

return (

    <div style={{overflowX:'hidden'}}>
    <header id="header" className="fixed-top">
  <div className="container d-flex align-items-start">
    <a href="#" className="logo"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></a>

    <h1 className="logoText"><a href="#">Edu-hub</a></h1>
    
    <nav id="navbar" className="navbar ">
      <ul>
        <li className="nav-item">
          <a className="nav-link" onClick={() => window.history.back()} href="#">Back</a>
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
        <label htmlFor="role">Role</label>
        <input type="text" className="form-control" id="role" placeholder="Role" value={formData.role} onChange={handleChange} name="role" />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="designation" >Designation</label>
        <select id="designation" name="designation" className="form-control form-control-lg" value={formData.designation} onChange={handleChange} >
        <option value="">Designation</option>
          <option value="Student">Student</option>
          <option value="Placement officer">Placement officer</option>
          <option value="Worker">Worker</option>
          <option value="Other">Other</option>
        </select>
      </div>
          
        </div>
        <div className="row" style={{ marginTop: '20px', marginLeft:'40px' }}>
        <div className="form-group col-md-4" title="Upload College ID (if you are a student or palcement officer)">
            <label htmlFor="id_proof" className="form-label">ID</label>
            <input className="form-control form-control-sm"  style={{height:'50px', paddingTop:'8px'}} type="file" id="id_proof" name="id_proof" onChange={handleChange} />
          </div>

      <div className="form-group col-md-4" >
        <label htmlFor="updates">Choose Updates</label>
        <select className="form-control" value={inputValue} onChange={handleSelectChange} style={{ height: '50px',width:'95%' }}>
          <option value="">Choose Updates</option>
          {list.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="form-group col-md-12" style={{ marginTop: '20px', marginLeft:'50px' }} >
      <label>Selected Options:</label>
      <div style={{ backgroundColor: 'white', width: '90%', height: '300px', borderRadius: '15px', padding: '30px' }} >
        {selectedOptions.map((option) => (
          <span key={option} style={{ paddingRight: '50px' }}>
            {option}
            <button onClick={() => handleRemoveOption(option)} style={{ backgroundColor: 'black', width: '35px', height: '35px', textAlign: 'center', alignContent: 'center', marginLeft: '10px', textAlign: 'center' }}>X</button>
            {'  '}
          </span>
        ))}
      </div>
    </div>

        <div className="form row" style={{marginTop:'20px'}}>
        <div className="form-group col-md-4">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" className="form-control" value={formData.username} onChange={handleChange} />
          </div>
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
          <button type="button" style={{ width: '200px', marginLeft: '10px' }} className="btn btn-primary" onClick={handleClear}>Clear</button>
        </center>
      </form>
    </div>
  </div>
  );
};

export default SignupPage;

