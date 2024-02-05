import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './profile.css';


const profile=() => {
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

    <br/><br/>
<br/>
    <div className="container">
    <div className="main-body">
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3" >
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <p className="text-secondary mb-1">Full Stack Developer</p>
                      <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                      <div className="row">
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Interests</h3>
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happy1 " target="__blank" href="#">Edit</a>
                </div> 
              </div>
              <div className="card1 mt-3">
                <h3>Set Alert</h3>
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
                <div className="card-body1 position-relative">
                <h3>Basic Details</h3>
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happy " target="__blank" href="#">Edit</a>
                </div> 

                </div>
              </div>
              
              <div className="card mb-3">
                <div className="card-body1">
                <h3>Notifications</h3>
                  
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happy2 btn btn-info " target="__blank" href="./profile">View All</a>
                    </div>
                </div>
              </div>

              
              </div>



            </div>
          </div>

        </div>
    </div>
    
        );
    };

   
export default profile;

