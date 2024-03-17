import './css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/profile.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const Profile = () => {
  const [user, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get('http://localhost:8888/profile', {
          headers: { Authorization:token},
        });
        console.log(response.data.user.userData); 
        const userData = response.data.user.userData;
        console.log('userData:', userData);  
        let status = response.status;
        console.log('response:'+response.status)

        if (status === 200) {
          setUserData((prevUserData) => {
            // prevUserData is the previous state
            console.log("profile-" + prevUserData);
            return response.data.user.userData;
          });
        } else {
          // Handle authentication error
          console.error('Authentication error:', response.data.message);
        }
      } catch (error) {
        // Handle other errors
        console.error('Error fetching profile:', error.message);
      }
    };
    
    fetchProfile();
  }, []);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
       try {
           const response = await axios.get(`http://localhost:8888/notifications`,{
             headers: {
               Authorization: `Bearer ${token}`, // Add the token to the Authorization header
             },
             });
           setNotifications(response.data);
           console.log("hiiiii"+response.data);
       } catch (error) {
           console.error('Error fetching data:', error);
       }
   };
    
    fetchNotifications();
  }, []);
  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.removeItem('token');

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
            <Link to="/LoginPage" onClick={handleLogout}>Logout</Link>
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
                      <img src= {user.photo} alt="Admin" className="rounded-circle" width="150"/>
                      <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">{user.designation}</p>
                        <p className="text-muted font-size-sm">{user.role}</p>
                        {/* Add other components or properties as needed */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Interests</h3>
                {user && (
               <div className='basic' >
              <br />
              {user.updates_required && user.updates_required.split(',').map((item, index) => (
        <div key={index}>{item.trim()} <br /> <br /></div>
      ))}
               
                </div>
                )}
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                
                      <a className="happy1 " href={'/Signup'} target="__blank" >Edit</a>
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
                {user && (
               <div className='basic' >
              <br />
                Phno: {user.mobileNumber}<br /><br />
                Occupation: {user.occupation}<br /><br />
                Email: {user.email}<br /><br />
                State:{user.state}<br /><br />
                District: {user.district}<br /><br />
               
                </div>
                )}
                {user && (
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happ"><Link to={{ pathname: "/Signup", state: { userData: user } }}>Edit</Link></a>
                      
                </div> 
                 )}
                </div>
              </div>
              
              <div className="card mb-3">
                <div className="card-body1">
                <h3>Notifications</h3>
                <ul>
                    {notifications.map((notification, index) => (
                      <li key={index}>{notification.title}</li>
                    ))}
                  </ul>
                <div className="col-sm-12 position-absolute bottom-0 end-0">
                      <a className="happ2 btn btn-info " target="__blank" href="./Notifications">View All</a>
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

