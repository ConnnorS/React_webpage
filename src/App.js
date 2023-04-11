import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Header from './components/header';
import Footer from './components/footer';

// pages
import Home from './pages/home';
import Movies from './pages/Movies';
import Register from './pages/Register';
import Login from './pages/Login';





export default function App() {
  return (
    <BrowserRouter>
    <div className="App">

      <Header/>

      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/movies" element = {<Movies/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element = {<Login/>}/>
      </Routes>

      <Footer/>

    </div>
    </BrowserRouter>
  );
}
