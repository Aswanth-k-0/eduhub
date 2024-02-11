import './css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/profile.css';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const Profile = () => {
  const [user, setUser] = useState( );
  // const location = useLocation();

  // Access the state object and userData if it exists
  // const userData = location.state ? location.state.userData : null;

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get('http://localhost:8888/profile');
      console.log(response);
      const data = await response.json();
      setUser(data);
    }  
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
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
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">{user.designation}</p>
                      <p className="text-muted font-size-sm">{user.role}</p>
                      <div className="row">
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Interests</h3>
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                {user.interst}
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
                      <a className="happ" target="__blank" href="#">Edit</a>
                </div> 

                </div>
              </div>
              
              <div className="card mb-3">
                <div className="card-body1">
                <h3>Notifications</h3>
                  
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happ2 btn btn-info " target="__blank" href="./profile">View All</a>
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

   
export default Profile;

