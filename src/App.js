import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { Routes,Route} from "react-router-dom";
import './App.css';
//import Header from './Header';
//import Footer from './Footer';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/home';
import Profile from './pages/profile';
import Scholarship from './pages/scholarship';
import Jobs from './pages/jobs';
import Notifications from './pages/notifications';

function App() {
  return (
    <BrowserRouter>
    <Routes>

          <Route path="/" element={<MainPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/scholarship" element={<Scholarship/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/notifications" element={<Notifications/>} />
           

          </Routes>
          </BrowserRouter>
  );
}

export default App;
