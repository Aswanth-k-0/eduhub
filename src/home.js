import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';


const home=() => {
    return (
        <div>
        <header id="header" className="fixed-top">
      <div className="container d-flex align-items-start">
        <a href="#" className="logo"><img src="/assets/img/logo.png" alt="" className="img-fluid" /></a>

        <h1 className="logoText"><a href="#">Edu-hub</a></h1>
        
        <nav id="navbar" className="navbar ">
          <ul>
          <li className="nav-item">
              <a className="nav-link" ><Link to="/">Home</Link></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Scholarships</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">Notifications</a>
            </li>
            <li className="nav-item">
              <a className="nav-link"><Link to="/LoginPage">Logout</Link></a>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
<br/>
<br/>
    <div className="container">
    <div className="main-body">
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                      <div className="row">
                    <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">View Full Profile</a>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Events</h3>
              </div>
            </div>
            <div className="col-md-8">
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
    </div>
    
        );
    };

   
export default home;

