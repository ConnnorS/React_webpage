import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header";
import Footer from "./components/footer";

// pages
import Home from "./pages/home";
import Movies from "./pages/Movies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MoreInfo from "./pages/MoreInfo";
import Actor from "./pages/Actor";

// render the entire app in a <BrowserRouter> component for page navigation
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/moreInfo" element={<MoreInfo />} />
          <Route path="/actor" element={<Actor />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
