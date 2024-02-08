import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/log.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import myimg from "./assets/img/login.png";

const LoginPage = () => {
  const navigate = useNavigate();

  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      // Make a POST request to your backend API endpoint
      const response = await axios.post('http://localhost:8888/login', {
        username,
        password
      });
      console.log(response);
      // If login successful, navigate to the home page
      navigate('/home');
    } catch (error) {
      // If login failed, display an error message
      setError('Incorrect username or password');
    }
  };
    // You can add your login logic here (e.g., sending data to a server)

  return (
    <div>
      <Header />
      <section class="inner-page">
      <div class="container">
        <br></br>
        <br></br>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={myimg} className="img-fluid" alt="Sample image" />
          </div>

          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <br />
              <label className="form-label" for="form3Example3">
                  Username
                </label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                   required
                />
                
              </div>
              <label className="form-label" for="form3Example4">
                  Password
                </label>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    value=""
                    id="form2Example3"
                  />
                  <label className="form-check-label" for="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="/psw-reset" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start d-flex justify-content-between align-items-center mt-4 pt-2">
               <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', width:'200px'}}
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <Link to={'/Signup'}>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ marginLeft:'10px', paddingLeft: '2.5rem', paddingRight: '2.5rem', backgroundColor:'#55ab55' }}
                >
                  Create Account
                </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;