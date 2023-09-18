
import React from "react";
import logo from "./logo.png";
import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cardio from "./ListComponent";
import Home from "./Home";

function App() {
  return (
    <div className="App">

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
        // className="App-link"
        // href="/"
        // target="_blank"
        // rel="noopener noreferrer"
        >
          Our App
        </a>
      </header> */}

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={<Home />} />
          <Route path="/cardio" element={<Cardio />} />
          {/* <Route path="/strength" element={<Strength />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/wellness" element={<Wellness />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

