import React, { useState } from "react";
import {
  EuiHeader,
  EuiHeaderLogo,
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

export const NavBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useUser(); // Use the hook to get the authentication status

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const renderLogo = () => (
    <a href="/home">
      <img src={logo} className="App-logo" alt="logo" />
    </a>
  );

  const breadcrumbs = [
    { text: "Cardio", href: "#", onClick: (e) => e.preventDefault() },
    { text: "Strength", href: "#", onClick: (e) => e.preventDefault() },
    { text: "Nutrition", href: "#", onClick: (e) => e.preventDefault() },
    { text: "Wellness", href: "#", onClick: (e) => e.preventDefault() },
  ];

  return (
    <EuiHeader>
      <EuiHeaderSection>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
      </EuiHeaderSection>
      <div
        style={
          {
            // paddingTop: "16px",
            // paddingBottom: 300,
            // paddingRight: "50px",
            // textAlign: "center"
          }
        }
      >
        <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <EuiHeaderSection side="right">
        {isSearchOpen && (
          <EuiFieldSearch
            placeholder="Search..."
            compressed
            onClick={toggleSearch}
          />
        )}
        <EuiHeaderSectionItem style={{ marginRight: "16px" }}>
          <EuiHeaderSectionItemButton
            aria-label="Toggle search"
            onClick={toggleSearch}
          >
            <EuiIcon type="search" size="m" />
          </EuiHeaderSectionItemButton>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <EuiPopover
            button={
              <EuiHeaderSectionItemButton
                aria-label="Apps menu"
                onClick={togglePopover}
              >
                <EuiIcon type="apps" size="m" />
              </EuiHeaderSectionItemButton>
            }
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            anchorPosition="downRight"
          >
            <EuiKeyPadMenu style={{ listStyleType: "none" }}>
              <EuiKeyPadMenuItem label="Register" href="/register">
                <EuiIcon type="notebookApp" size="l" />
              </EuiKeyPadMenuItem>
              <EuiKeyPadMenuItem label="Login" href="/login">
                <EuiIcon type="agentApp" size="l" />
              </EuiKeyPadMenuItem>
            </EuiKeyPadMenu>
          </EuiPopover>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default NavBar;
