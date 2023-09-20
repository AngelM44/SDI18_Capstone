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

export const NavBar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <EuiHeaderBreadcrumbs
        breadcrumbs={breadcrumbs}
        style={{ alignItems: "center", padding: "8px 0" }}
      />
      <EuiHeaderSection side="right">
        {isSearchOpen && (
          <EuiFieldSearch
            placeholder="Search..."
            compressed
            onClick={toggleSearch}
          />
        )}
        <EuiHeaderSectionItem>
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
