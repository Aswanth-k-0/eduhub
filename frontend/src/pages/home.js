import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/header.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/home.css';


const Home = () => {
  // Extract user data from location state
 
  const token = localStorage.getItem('token');
  let user=null;
  // Decode the token to get user information
  if (token) {
    const decodedToken = decodeToken(token);
    user = decodedToken.userData;
    // Access individual fields within 'userData'
    console.log('User Name:', user.name);
    console.log('User Address:', user.address);
    console.log('User Designation:', user.designation);
    if (decodedToken && decodedToken.userData) {
      // const { userData } = decodedToken.userData;
      console.log('Authenticated user:', user);
    } else {
      // Handle invalid token or missing user data
      console.error('Invalid token or missing user data');
    }
  } else {
    // Handle the case where there's no token in local storage
    console.error('No token found in local storage');
  }

  // console.log('hi',userData.user.name);
  const backendURL = 'http://localhost:8888';
    return (
        <div>
        <header id="header" className="fixed-top">
      <div className="container d-flex align-items-start">
        <a href="#" className="logo"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></a>

        <h1 className="logoText"><a href="#">Edu-hub</a></h1>
        
        <nav id="navbar" className="navbar ">
          <ul>
          <li className="nav-item">
              <a className="nav-link" ><Link to="/Home">Home</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Scholarship">Scholarships</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Jobs">Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Notifications">Notifications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" data-target="#myModal" data-toggle="modal"><Link to="/LoginPage">Logout</Link></a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>

    <br/><br/>
<br/>
    <div className="container">
    <div className="main-body">
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3" >
              <div className="card">
                <div className="card-body">
                {user && (
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={user.photo}  alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">{user.designation}</p>
                      <p className="text-muted font-size-sm">{user.role}</p>
                      <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank"><Link to={{pathname:"/profile",state: {userData: {userData} } }}>View Full Profile</Link></a>
                      <a className="btn btn-info " target="__blank"><Link to={{pathname:"/profile",state: {userData:user} }}>View Full Profile</Link></a>
                    </div>
                  </div>
                  
                    </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Events</h3>
              </div>
            </div>
            
            <div className="col-md-8">
            <div style={{ position: 'relative', width: '500px', margin: '10px 0' }}>
            <input
                type="text"
                id="searchInput"
                placeholder="Search..."
                className="form-control form-control-sm"
            />
            <i
                className="fa fa-search"
                id="icon"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '-320px',
                    marginLeft: '500px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
            ></i>
            </div>
            <br></br>


              <div className="card mb-3">
                <div className="card-body1">
                <h3>Latest</h3>
                  

                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body2">
                <h4>What are you looking for?</h4>
                  
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body1">
                <h3>Suggested for you</h3>
                  

                </div>
              </div>

              
              </div>



            </div>
          </div>

        </div>
        
        <div class="modal fade" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Sign Out</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                Do you want to sign out?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal"onClick={() => window.location.replace('/Loginpage')}>Sign Out</button>
            </div>
        </div>
    </div>
</div>
    </div>


    
        );
    };

   
export default Home;

