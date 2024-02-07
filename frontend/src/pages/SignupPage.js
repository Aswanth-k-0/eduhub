import React from 'react';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const SignupPage = () => {
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
    <div className="form"style={{margin:'10px' }}>
        <div className="row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="cname">Name</label>
            <input type="name" className="form-control" id="cname" placeholder="Name"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="phno">Mobile Number</label>
            <input type="name" className="form-control" id="phno" placeholder="Number"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="Occupation">Occupation</label>
            <input type="text" className="form-control" id="Occupation" placeholder="Occupation"/>
          </div>
        </div>

        <div className="row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="state">State</label>
            <input type="text" className="form-control" id="state" placeholder="State"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="image1" className="form-label">Photo</label>
            <input className="form-control form-control-sm" id="image1" type="file" placeholder="Size 1360 X 245"/>
          </div>
        </div>

        <div className="row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="District">District</label>
            <input type="text" className="form-control" id="District" placeholder="District"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="username">Username</label>
            <input type="username" className="form-control" id="username" placeholder="Username"/>
          </div>
        </div>

        <div className="row" style={{marginTop:'20px'}}>
          <div className="form-group col-md-4">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password"/>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="re-password">Re-Enter Password</label>
            <input type="password" className="form-control" id="re-password" placeholder="Password"/>
          </div>
        </div>

        <div style={{marginTop:'20px'}}>
          Do you want to save
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="yes" value="yes"/>
            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
          </div>

          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="no" value="no"/>
            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
          </div>
        </div>

        <br/>
        <center>
        <Link to={'/home'}>
          <button type="submit"  style={{width:'200px'}} className="btn btn-primary">Save and continue</button>
        </Link>
          <button type="clear" style={{width:'200px', marginLeft:'10px'}} className="btn btn-primary">Clear</button>
        </center>
      <br></br>
      <br></br>
    </div>
    </div>
  );
};

export default SignupPage;

