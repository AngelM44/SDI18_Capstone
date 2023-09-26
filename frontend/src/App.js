import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ListComponent from "./ListComponent";
import Home from "./Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Strength from "./Strength";
import Cardio from "./Cardio";
import Posts from "./Posts";
import { UserProvider, useUser } from "./components/UserContext";
import { SearchProvider } from "./components/SearchContext";
import NavBar from "./components/NavBar";
import "./App.css";
function App() {
  const handleSearch = (data) => {
    console.log(data);
  };
  return (
    <UserProvider>
      <SearchProvider>
        <div className="App" style={{ height: "calc(100vh - 82px)" }}>
          <Router>
            <NavBar onSearch={handleSearch} />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/home"
                element={
                  <ProtectedElement>
                    <Home />
                  </ProtectedElement>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <ProtectedElement>
                    <UserProfile />
                  </ProtectedElement>
                }
              />
              <Route path="/cardio" element={<Cardio />} />
              <Route path="/strength" element={<Strength />} />
              <Route
                path="/nutrition"
                element={
                  <ProtectedElement>
                    <ListComponent category="Nutrition" />
                  </ProtectedElement>
                }
              />
              <Route
                path="/wellness"
                element={
                  <ProtectedElement>
                    <ListComponent category="Wellness" />
                  </ProtectedElement>
                }
              />
              <Route path="/posts" element={<Posts />} />
            </Routes>
          </Router>
        </div>
      </SearchProvider>
    </UserProvider>
  );
}

function ProtectedElement({ children }) {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default App;
