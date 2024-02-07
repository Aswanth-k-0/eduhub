import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import './css/header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/preference.css'; // Updated CSS file name

const Preference = () => {
    const options = ['Geci Events', 'Geci Announcements', 'Scholarships', 'Jobs']; // Sample options
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(location.state.formData ||{
      role: '',
      designation: 'Student', // Default value
      fieldOfInterest: '',
    });

    const handleSelectChange = (e) => {
      const value = e.target.value;
      if (value !== '' && !selectedOptions.includes(value)) {
        setSelectedOptions([...selectedOptions, value]);
        setInputValue(''); // Clear input value after selection
      }
    };
  
    const handleRemoveOption = (option) => {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const postData = new FormData();
        for (const key in formData) {
      postData.append(key, formData[key]);
    }
    const combinedData = { ...location.state.formData, ...formData };
    await axios.post('http://localhost:8888/saveUser', combinedData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/LoginPage'); // Redirect to success page
  }catch (error) {
        console.error('Error:', error);
        // Handle error (e.g., display error message)
      }
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
          <a className="nav-link" href="/LoginPage">Back</a>
        </li>
      </ul>
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>
  </div>
</header>

<br/><br/>
<br/>

<div className="form">
  <form onSubmit={handleSubmit}>
    <div className="row" style={{ marginTop: '20px' }}>
      <div className="form-group col-md-4">
        <label htmlFor="role">Role</label>
        <input type="text" style={{ height: '50px' }} className="form-control" id="role" placeholder="Role" value={formData.role} onChange={handleChange} name="role" />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="designation">Designation</label>
        <select id="designation" name="designation" className="form-control form-control-lg" style={{ height: '50px' }} value={formData.designation} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Placement officer">Placement officer</option>
          <option value="Worker">Worker</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="fieldOfInterest">Field Of Interest</label>
        <input type="text" className="form-control" style={{ height: '50px' }} id="fieldOfInterest" placeholder="Field Of Interest" value={formData.fieldOfInterest} onChange={handleChange} name="fieldOfInterest" />
      </div>
    </div>

    <div className="row" style={{ marginTop: '20px' }}>
      <div className="form-group col-md-4">
        <label htmlFor="updates">Choose Updates</label>
        <select className="form-control" value={inputValue} onChange={handleSelectChange} style={{ height: '50px' }}>
          <option value="">Choose Updates</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="form-group col-md-12" style={{ marginTop: '20px' }}>
      <label>Selected Options:</label>
      <div style={{ backgroundColor: 'white', width: '100%', height: '300px', borderRadius: '15px', padding: '30px' }}>
        {selectedOptions.map((option) => (
          <span key={option} style={{ paddingRight: '50px' }}>
            {option}
            <button onClick={() => handleRemoveOption(option)} style={{ backgroundColor: 'black', width: '35px', height: '35px', textAlign: 'center', alignContent: 'center', marginLeft: '10px', textAlign: 'center' }}>X</button>
            {'  '}
          </span>
        ))}
      </div>
    </div>

    <div style={{ marginTop: '20px' }}>
      <center>
        <button type="submit" style={{ width: '200px' }} className="btn btn-primary">Save and continue</button>
        <button type="clear" style={{ width: '200px', marginLeft: '10px' }} className="btn btn-primary">Clear</button>
      </center>
    </div>
  </form>
</div>
</div>
    );
};

export default Preference;
