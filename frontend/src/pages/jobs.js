import React from 'react';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/jobs.css';

const jobs=() => {
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
            <div className="col-md-4 mb-3" >
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4>John Doe</h4>
                      <div className="row">
                      <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank" href="./profile">View Full Profile</a>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Choices</h3>
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happy1 " target="__blank" href="#">Edit</a>
                </div> 
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

            <h3>Recommended For You</h3>
            <div class="row">
            <div class="col-md-4">
              <div class="card2">
                <div class="card-body">
                  Card 1 Content
                </div>
              </div>
             </div>
              <div class="col-md-4">
                <div class="card2">
                  <div class="card-body">
                    Card 2 Content
                  </div> 
                </div>
              </div>
              <div class="col-md-4">
                <div class="card2">
                  <div class="card-body">
                    Card 3 Content
                  </div>
                </div>
                <br/>
                <br/>
                <a className="happy " target="__blank" href="#">More{'>'}{'>'}</a> 
              </div>
              
            </div>
              
              <h3>Other</h3>
              <div class="row">
            <div class="col-md-4">
              <div class="card2">
                <div class="card-body">
                  Card 1 Content
                </div>
              </div>
             </div>
              <div class="col-md-4">
                <div class="card2">
                  <div class="card-body">
                    Card 2 Content
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card2">
                  <div class="card-body">
                    Card 3 Content
                  </div>
                </div>
                <br/>
              <br/>
              <a className="happy" target="__blank" href="#">More{'>'}{'>'}</a> 
              </div>
              
              
              </div>

              
              </div>


                  
            </div>
            
          </div>
                  
        </div>
    </div>
    
        );
    };

   
export default jobs;
