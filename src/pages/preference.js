import React, { useState} from 'react';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/preference.css'; // Updated CSS file name

const Preference = () => {
    const options = ['Geci Events', 'Geci Announcements', 'Scholarships', 'Jobs']; // Sample options
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
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

<div className="form">
        <div className="row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="role">Role</label>
            <input type="name" style={{height:'50px'}} className="form-control" id="role" placeholder="Name"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="desg">Designation</label>
            <select id="users" name="users" class="form-control form-control-lg" style={{height:'15px'}}>
                      <option>Student</option>
                      <option>Placement officer</option>
                      <option>Worker</option>
                      <option>Other</option>
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="Occupation">Field Of Interest</label>
            <input type="text" className="form-control" style={{height:'50px'}} id="interest" placeholder="Field Of Interest"/>
          </div>
        </div>
</div>
<br/>
<br/>
<div className="row">
<div className="form form-group col-md-4">
        <select className="form-control" value={inputValue} onChange={handleSelectChange} style={{height:'50px',width:'95%' }}>
          <option value="">Choose Updates</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        </div>
        </div>
        <br />
        <br />
        
        <div className="form form-group col-md-12" >
          <label>Selected Options:</label>
          
          <div style={{backgroundColor:'white', width:'1450px', height:'300px', borderRadius:'15px', padding:'30px'}}>
            {selectedOptions.map((option) => (
              <span key={option} style={{paddingRight:'50px'}}>
                {option}
                <button onClick={() => handleRemoveOption(option)} style={{backgroundColor:'black', width:'35px', height:'35px', textAlign:'center',alignContent:'center', marginLeft:'10px', textAlign:'center'}}>X</button>
                {'  '}
              </span>
            ))}
          </div>
        </div>
        <br/>
        <center>
        <Link to={'/home'}>
          <button type="submit"  style={{width:'200px'}} className="btn btn-primary">Save and continue</button>
        </Link>
          <button type="clear" style={{width:'200px', marginLeft:'10px'}} className="btn btn-primary">Clear</button>
        </center>
      </div>
    );
};

export default Preference;
