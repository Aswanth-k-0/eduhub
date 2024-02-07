import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/notifications.css';


const Notifications=() => {
  const [data, setData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
      fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
      try {
          const response = await axios.get('http://localhost:5555/notifications');
          setData(response.data);
          console.log("hiiiii"+response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  const toggleShowAll = () => {
    setShowAll(!showAll);
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
            <div className="col-md-8">
              {data.slice(0, showAll ? data.length : 5).map((item) => (
                <div className="car" key={item.id}>
                  <div className="car-body"  style={{     height: '30px' }}>
                    <h5>{item.extracted_title}</h5>
                    <p>Date: {item.date_day} {item.date_month_year}</p>
                    <a href={item.document_link} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </div>
                </div>
              ))}
              {!showAll && data.length > 5 && (
                <button className="btn btn-primary" onClick={toggleShowAll}>
                  Show More
                </button>
              )}
            </div>
            
            
            <div className="col-md-4">
            <div style={{ width: '30px', margin: '0px 0' }}>
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

   
export default Notifications;

