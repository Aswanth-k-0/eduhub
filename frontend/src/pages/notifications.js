import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './css/header.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/notifications.css';

const Notifications = () => {
  const [expandedText, setExpandedText] = useState([]);

  // Function to toggle expanded state of summarized text for a specific item
  const toggleExpandText = (index) => {
    const updatedExpandedText = [...expandedText];
    updatedExpandedText[index] = !updatedExpandedText[index];
    setExpandedText(updatedExpandedText);
  };

  // Function to render summarized text based on expanded state
  const renderSummarizedText = (summarizedText, index) => {
    if (expandedText[index]) {
      return summarizedText;
    } else {
      // Truncate summarized text to two lines
      const lines = summarizedText.split('\n');
      return lines.slice(0, 2).join('\n');
    }
  };

  const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(['']);

    const options = ['Subject', 'Date', 'Summarized Text', 'College', 'View Document'];
    const token = localStorage.getItem('token');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (index, value) => {
        const newValues = [...selectedValues];
        newValues[index] = value;
        setSelectedValues(newValues);
    };

    const handleAddDropdown = () => {
      if (selectedValues.some(value => value.trim() === '')) {
        alert('Please initialize all dropdowns before adding a new one.');  
        return;  
      }
      
      setSelectedValues([...selectedValues, '']); // Add a new dropdown if all dropdowns are initialized
    };

    const handleRemoveDropdown = (index) => {
        const newValues = [...selectedValues];
        newValues.splice(index, 1);
        setSelectedValues(newValues);
    };

    const handleChange = (index, event) => {
        const newValues = [...selectedValues];
        newValues[index] = event.target.value;
        setSelectedValues(newValues);
    };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 5;

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8888/notifications?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  
const handleSave = async () => {
  try {
    const selectedDropdownValues = selectedValues.filter(value => value.trim() !== ''); // Filter out empty values
    // Send the selected values to the backend
    const response =await axios.post('http://localhost:8888/saveFormat', {
      dropdownValues: selectedDropdownValues,
    }, {
      headers: {
        Authorization: `${token}`,
      },
    });
    
    if (response.status === 201) {
      // Success notification
      toast.success('Format updated successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        toastId: 'format-update-success', // Optional: unique ID for manual closing
      });

      // Optionally, clear selected values after saving
      setSelectedValues(['']);
    } else {
      console.error('Unexpected response from server:', response);
      // Handle unsuccessful response (e.g., display a more specific error message)
    }

    // Optionally, you can clear the selected values after saving
    setSelectedValues(['']);
  } catch (error) {
    console.error('Error saving dropdown values:', error);
  }
};

  const handleSearch = async () => {

    try {
      const response = await axios.get('http://localhost:8888/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtered = response.data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.college.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };
  
  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      setFilteredData([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <ToastContainer/>
      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-start">
          <a href="#" className="logo">
            <img src="/assets/img/logo.png" alt="" className="img-fluid" />
          </a>
          <h1 className="logoText">
            <a href="#">Edu-hub</a>
          </h1>
          <nav id="navbar" className="navbar ">
            <ul>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to="/Home">Home</Link>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Scholarship">
                  Scholarships
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Jobs">
                  Jobs
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Notifications">
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to="/LoginPage" onClick={handleLogout}>
                    Logout
                  </Link>
                </a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>

      <br />
      <br />
      <br />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-8">
              {(searchTerm ? filteredData : data)
                .slice(0, notificationsPerPage)
                .map((item, index) => (
                  <div className="car" key={item._id}>
                    <div className="car-body" style={{ height: '30px', overflowY: 'auto' }}>
                      <h5>{item.title}</h5>
                      <h5>College: {item.college}</h5>
                      <p>Date: {item.date}</p>
                      {item.summarized_text && (
          <div>
            <p>
              Summarized: {renderSummarizedText(item.summarized_text, index)}
              {/* Render "Show more" link if text is truncated */}
              {item.summarized_text.split('\n').length > 2 && (
                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => toggleExpandText(index)}>
                  {expandedText[index] ? ' <<show less' : ' show more>>'}
                </span>
              )}
            </p>
          </div>
        )}
                      {item.document_link ? (
                        <a href={item.document_link} target="_blank" rel="noopener noreferrer">
                          View Document
                        </a>
                      ) : null}
                      <br/>
                      {item.page_link ? (
                        <a href={item.page_link} target="_blank" rel="noopener noreferrer">
                          View Page
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              <br />
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ paddingY: '.25rem', paddingX: '.5rem', fontSize: '.75rem', marginRight: '10px' }}
              >
                Previous
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={(searchTerm ? filteredData.length : data.length) < notificationsPerPage}
                style={{ paddingY: '.25rem', paddingX: '.5rem', fontSize: '.75rem', marginLeft: '10px' }}
              >
                Next
              </button>
            </div>
            <div className="col-md-4">
              <div style={{ width: '30px', margin: '0px 0' }}>
                <input
                  type="text"
                  id="searchInput1"
                  placeholder="Search..."
                  className="form-control form-control-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={handleSearch}
                ></i>
              </div>
              <br />
              <div className="car mb-3">
            <div className="car-body1">
                <h3 onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                    Format
                    <span className="float-end" style={{ marginRight: '20px' }}>{isOpen ? '-' : '+'}</span>
                </h3>
                {isOpen && (
                    <div style={{marginRight:'30px'}}>
                        {selectedValues.map((value, index) => (
                            <div key={index} className="dropdown mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ flex: '1' }}>
                                <input
                                    list={`options-${index}`}
                                    value={value}
                                    onChange={(event) => handleChange(index, event)}
                                    className="form-control"
                                />
                                <datalist id={`options-${index}`}>
                                    {options.map((option, idx) => (
                                        <option key={idx} value={option} />
                                    ))}
                                </datalist>
                            </div>
                            <span onClick={() => handleRemoveDropdown(index)} style={{ cursor: 'pointer', fontSize: '30px', marginLeft: '10px' }}>×</span>
                        </div>
                        ))}
                       <span> <button className="btn btn-primary" style={{width:'150px'}} onClick={handleAddDropdown}>Add Dropdown</button>
                <button className="btn btn-success" style={{width:'150px',marginLeft:'20px'}} onClick={handleSave}>Save</button> </span>
                    </div>
                )}
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