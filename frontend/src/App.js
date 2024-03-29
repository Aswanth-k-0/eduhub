import {React} from 'react';

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
import Edit from './pages/edit';


function App() {
  return (
    <BrowserRouter>
    <Routes>

          <Route path="/" element={<MainPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile/>} component={Profile} />
          <Route path="/scholarship" element={<Scholarship/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/Edit" element={<Edit/>} />
          </Routes>
          </BrowserRouter>
  );
}

export default App;
