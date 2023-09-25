import React, { useState } from "react";
import axios from "axios";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiHeaderBreadcrumbs,
  EuiPopover,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiFieldSearch,
  EuiToolTip,
} from "@elastic/eui";
import logo from "../logo.png";
import { useUser } from "./UserContext";
import InterestMenu from "../InterestMenu";
import { useNavigate, Link } from "react-router-dom";
import SearchResults from "./SearchResults";

export const NavBar = (props) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    locations: [],
    users: [],
    interests: [],
  });
  const [isResultsVisible, setIsResultsVisible] = useState(false); // New state variable to control visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, logout, user } = useUser();
  const navigate = useNavigate();

  const styles = {
    searchResultsContainer: {
      position: "absolute",
      top: "100%",
      width: "100%",
      backgroundColor: "white",
      zIndex: 1,
    },
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevIsSearchOpen) => {
      const newIsSearchOpen = !prevIsSearchOpen;
      setIsResultsVisible(newIsSearchOpen); 
      return newIsSearchOpen;
    });
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/search?query=${searchQuery}`
      );
      setSearchResults({
        locations: response.data.locations || [],
        users: response.data.users || [],
        interests: response.data.interests || [],
      });
      setIsResultsVisible(true); 
      props.onSearch(response.data);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("Error performing search:", error);
      setError("Error performing search. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };


  const renderLogo = () => (
    <EuiToolTip position="bottom" content="Home">
      <a href="/home">
        <img src={logo} className="App-logo" alt="logo" />
      </a>
    </EuiToolTip>
  );

  const breadcrumbs = [
    {
      text: (
        <Link
          to="/cardio"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Cardio
        </Link>
      ),
      onClick: (e) => e.preventDefault(),
    },
    {
      text: (
        <Link
          to="/strength"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Strength
        </Link>
      ),
      onClick: (e) => e.preventDefault(),
    },
    {
      text: (
        <Link
          to="/nutrition"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Nutrition
        </Link>
      ),
      onClick: (e) => e.preventDefault(),
    },
    {
      text: (
        <Link
          to="/wellness"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Wellness
        </Link>
      ),
      onClick: (e) => e.preventDefault(),
    },
    {
      text: (
        <Link
          to={isAuthenticated && user ? `/profile/${user.id}` : "#"}
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Profile
        </Link>
      ),
      onClick: (e) => {
        if (!isAuthenticated || !user) {
          e.preventDefault();
        }
      },
    },
    {
      text: (
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          Home
        </Link>
      ),
      onClick: (e) => e.preventDefault(),
    },
  ];

  const customStyles = {
    menuIcon: {
      color: "black",
    },
    searchInput: {
      backgroundColor: "#FFFFFF",
      color: "black",
    },
    menuItem: {
      color: "black",
    },
    logoutItem: {
      color: "black",
      border: "none",
      backgroundColor: "transparent",
    },
  };

  return (
    <EuiHeader theme="dark" style={{ position: "relative" }}>
      <EuiHeaderSection style={{ alignItems: "center" }}>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
        <InterestMenu />
      </EuiHeaderSection>
      <div>
        <EuiHeaderBreadcrumbs max={6} breadcrumbs={breadcrumbs} />
      </div>
      <EuiHeaderSection side="right">
        {isAuthenticated && isSearchOpen && (
          <form onSubmit={handleSearchSubmit}>
            <EuiFieldSearch
              placeholder="Search..."
              compressed
              value={searchQuery}
              onChange={handleSearchChange}
              style={customStyles.searchInput}
            />
          </form>
        )}
        {isAuthenticated && (
          <EuiHeaderSectionItem style={{ marginRight: "16px" }}>
            <EuiHeaderSectionItemButton
              aria-label="Toggle search"
              onClick={toggleSearch}
              style={customStyles.menuIcon}
            >
              <EuiIcon type="search" size="m" />
            </EuiHeaderSectionItemButton>
          </EuiHeaderSectionItem>
        )}
        <EuiHeaderSectionItem>
          <EuiPopover
            button={
              <EuiHeaderSectionItemButton
                aria-label="Apps menu"
                onClick={togglePopover}
                style={customStyles.menuIcon}
              >
                <EuiIcon type="apps" size="m" />
              </EuiHeaderSectionItemButton>
            }
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            anchorPosition="downRight"
          >
            <EuiKeyPadMenu style={{ listStyleType: "none" }}>
              {!isAuthenticated ? (
                <>
                  <EuiToolTip content="Register">
                    <EuiKeyPadMenuItem
                      label="Register"
                      href="/register"
                      style={customStyles.menuItem}
                    >
                      <EuiIcon type="notebookApp" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiToolTip>
                  <EuiToolTip content="Login">
                    <EuiKeyPadMenuItem
                      label="Login"
                      href="/login"
                      style={customStyles.menuItem}
                    >
                      <EuiIcon type="agentApp" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiToolTip>
                </>
              ) : (
                <>
                  <EuiToolTip content="Profile">
                    <EuiKeyPadMenuItem
                      label="Profile"
                      href={user ? `/profile/${user.id}` : "#"}
                      style={customStyles.menuItem}
                    >
                      <EuiIcon type="user" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiToolTip>
                  <EuiToolTip content="Home">
                    <EuiKeyPadMenuItem
                      label="Home"
                      href="/home"
                      style={customStyles.menuItem}
                    >
                      <EuiIcon type="home" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiToolTip>
                  <EuiToolTip content="Logout">
                    <EuiKeyPadMenuItem
                      label="Logout"
                      onClick={handleLogout}
                      style={customStyles.menuItem}
                    >
                      <EuiIcon type="exit" size="l" />
                    </EuiKeyPadMenuItem>
                  </EuiToolTip>
                </>
              )}
            </EuiKeyPadMenu>
          </EuiPopover>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      {isResultsVisible && (
        <div style={styles.searchResultsContainer}>
          <SearchResults results={searchResults} />
        </div>
      )}
    </EuiHeader>
  );
};

export default NavBar;
