import React, { useState } from "react";
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
} from "@elastic/eui";
import logo from "../logo.png";
import { useUser } from "./UserContext";
import InterestMenu from "../InterestMenu";
import { useNavigate, Link } from "react-router-dom";

export const NavBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated, logout, user } = useUser();
  const navigate = useNavigate();

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderLogo = () => (
    <a href="/home">
      <img src={logo} className="App-logo" alt="logo" />
    </a>
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
  };

  return (
    <EuiHeader theme="dark">
      <EuiHeaderSection style={{ alignItems: "center" }}>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
        <InterestMenu />
      </EuiHeaderSection>
      <div>
        <EuiHeaderBreadcrumbs max={6} breadcrumbs={breadcrumbs} />
      </div>
      <EuiHeaderSection side="right">
        {isAuthenticated && isSearchOpen && (
          <EuiFieldSearch
            placeholder="Search..."
            compressed
            onClick={toggleSearch}
            style={customStyles.searchInput}
          />
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
                  <EuiKeyPadMenuItem
                    label="Register"
                    href="/register"
                    style={customStyles.menuItem}
                  >
                    <EuiIcon type="notebookApp" size="l" />
                  </EuiKeyPadMenuItem>
                  <EuiKeyPadMenuItem
                    label="Login"
                    href="/login"
                    style={customStyles.menuItem}
                  >
                    <EuiIcon type="agentApp" size="l" />
                  </EuiKeyPadMenuItem>
                </>
              ) : (
                <EuiKeyPadMenuItem
                  label="Logout"
                  onClick={handleLogout}
                  style={customStyles.menuItem}
                >
                  <EuiIcon type="exit" size="l" />
                </EuiKeyPadMenuItem>
              )}
            </EuiKeyPadMenu>
          </EuiPopover>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default NavBar;
