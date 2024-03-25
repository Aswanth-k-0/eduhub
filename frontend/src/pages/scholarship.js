import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/scholarship.css';
import { decodeToken } from 'react-jwt';

const Scholarships=() => {
  
  const token = localStorage.getItem('token');
  const [data,setData]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let user=null;
  // Decode the token to get user information
  if (token) {
    const decodedToken = decodeToken(token);
    user = decodedToken.userData;
    // Access individual fields within 'userData'
  } else {
    // Handle the case where there's no token in local storage
    console.error('No token found in local storage');
  }
  useEffect(() => {
    fetchScholarships();
  }, [currentPage]);

  const fetchScholarships = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8888/getScholarship?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      console.log(response.data);
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
    return (
        <div>
        <header id="header" className="fixed-top">
      <div className="container d-flex align-items-start">
        

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
                {user && (
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src= {user.photo}  alt="Admin" className="rounded-circle" width="150"/>
                    <div className="mt-3">
                      <h4 className='name'>{user.name}</h4>
                      <div className="row">
                      <div className="col-sm-12">
                      <a className="btn btn-info " target="__blank"><Link to={{pathname:"/profile",state: {userData:user} }}>View Full Profile</Link></a>
                    </div>
                  </div>
                 
                    </div>
                  </div>
                   )}
                </div>
              </div>
              <div className="card1 mt-3">
                <h3>Preferences</h3>
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
            <div className="row">
                {data.map((item, index) => (
                  <div className="col-md-4" key={item._id}>
                    <div className="card2">
                      <div className="card-body">
                        <h5>{item.title}</h5>
                        <p><strong>Award:</strong> {item.award}</p>
                        <p><strong>Eligibility:</strong> {item.eligibility}</p>
                        <a className="happy" target="_blank" href={item.view_link}>More &gt;&gt;</a>
                      </div>
                    </div>
                  </div>
                ))}
                {data.length > 0 && ((data.length % 10 === 0 && data.length !== 0) && (
                  <div className="col-md-4" key={`seeMore-${data.length}`}>
                    <div className="card2">
                      <div className="card-body">
                        <a className="happy" target="_blank" href="#">See More &gt;&gt;</a>
                      </div>
                    </div>
                  </div>
                ))}
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
              <a className="happy" target="__blank" href="#">View Scholarship{'>'}{'>'}</a> 
              </div>
              
              
              </div>

              
              </div>


                  
            </div>
            
          </div>
                  
        </div>
    </div>
    
        );
    };

   
export default  Scholarships;

