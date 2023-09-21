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
import { EuiThemeProvider } from "@elastic/eui";
import InterestMenu from './InterestMenu';
// import InterestPage from './InterestPage';

function App() {
  return (
    // <EuiThemeProvider colorMode="dark">
    <UserProvider>
      <div className="App">

        <Router>
          <NavBar />
          {/* <InterestMenu /> */}

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
            {/* <Route path="/interest/:interestName" component={InterestPage} /> */}
          </Routes>
        </Router>
      </div>
    </UserProvider>
    // </EuiThemeProvider>
  );
}

export default App;
