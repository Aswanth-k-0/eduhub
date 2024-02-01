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

function App() {
  return (
    <BrowserRouter>
    <Routes>

          <Route path="/" element={<MainPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />


          </Routes>
          </BrowserRouter>
  );
}

export default App;
