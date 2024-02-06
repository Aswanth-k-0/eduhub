import React from 'react';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/notifications.css';


const notifications=() => {
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
            <div className="col-md-8" >
              <div className="car">
                <div className="car-body">
                  
                </div>
              </div>
              <div className="car">
          <div className="car-body">
            {/* Content for the second card */}
          </div>
        </div>
        <div className="car">
          <div className="car-body">
            {/* Content for the second card */}
          </div>
        </div>
        <div className="car">
          <div className="car-body">
            {/* Content for the second card */}
          </div>
        </div>
        <div className="car">
          <div className="car-body">
            {/* Content for the second card */}
          </div>
        </div>
            </div>
            
            
            <div className="col-md-4">
            <div style={{ width: '300px', margin: '0px 0' }}>
            <input
                type="text"
                id="searchInput1"
                placeholder="Search..."
                className="form-control form-control-sm"
            />
            <i
                className="fa fa-search"
                id="icon"
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '170px',
                    marginLeft: '500px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
            ></i>
            </div>
          
          
            <br></br>


              <div className="car mb-3">
              <div className="car-body1">
                <h3>Set Alert</h3>
              </div>
              </div>
              
              <div className="car mb-3">
                <div className="car-body1">
                <h3>Alerts</h3>
                </div>
              </div>

              
              </div>



            </div>
          </div>

        </div>
    </div>
    
        );
    };

   
export default notifications;

