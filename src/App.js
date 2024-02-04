import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { Routes,Route} from "react-router-dom";
import './App.css';
//import Header from './Header';
//import Footer from './Footer';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Home from './home';

function App() {
  return (
    <BrowserRouter>
    <Routes>

          <Route path="/" element={<MainPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<Home/>} />


          </Routes>
          </BrowserRouter>
  );
}

export default App;
