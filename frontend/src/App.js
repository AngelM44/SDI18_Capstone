import React from "react";
import logo from "./logo.png";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListComponent from "./ListComponent";
import Home from "./Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import { UserProvider } from "./components/UserContext";
import { SearchProvider } from "./components/SearchContext";
import { EuiThemeProvider } from "@elastic/eui";
import InterestMenu from './InterestMenu';
// import InterestPage from './InterestPage';

function App() {
  return (
    // <EuiThemeProvider colorMode="dark">
      <UserProvider>
        <SearchProvider>
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
              <NavBar />
              {/* <UserProfile /> */}
              <Routes>
                <Route path="/home" exact element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route
                  path="/cardio"
                  element={<ListComponent category="Cardio" />}
                />
                <Route
                  path="/strength"
                  element={<ListComponent category="Strength" />}
                />
                <Route
                  path="/nutrition"
                  element={<ListComponent category="Nutrition" />}
                />
                <Route
                  path="/wellness"
                  element={<ListComponent category="Wellness" />}
                />
              </Routes>
            </Router>
          </div>
        </SearchProvider>
      </UserProvider>
    // </EuiThemeProvider>
  );
}

export default App;
