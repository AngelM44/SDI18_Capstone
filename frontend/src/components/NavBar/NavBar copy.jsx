import React from "react";
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
} from "@elastic/eui";
import logo from "../logo.png";
import "./NavBar.css"; // Importing the CSS styles

export const NavBar = () => {
  const renderLogo = () => (
    <a href="/home">
      <img src={logo} className="App-logo" alt="logo" />
    </a>
  );

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      { text: "Cardio", href: "#cardio" },
      { text: "Strength", href: "#strength" },
      { text: "Nutrition", href: "#nutrition" },
      { text: "Wellness", href: "#wellness" },
    ];

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />;
  };

  return (
    <EuiHeader theme="dark">
      <EuiHeaderSection>
        <EuiHeaderSectionItem>{renderLogo()}</EuiHeaderSectionItem>
      </EuiHeaderSection>

      {renderBreadcrumbs()}

      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>

        <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

const HeaderUserMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const button = (
    <EuiHeaderSectionItemButton
      aria-label="User menu"
      onClick={() => setIsOpen(!isOpen)}
    >
      <EuiIcon type="user" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downRight"
    >
      <EuiKeyPadMenu>
        <EuiKeyPadMenuItem label="Profile">
          <EuiIcon type="user" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Settings">
          <EuiIcon type="gear" size="l" />
        </EuiKeyPadMenuItem>
        <EuiKeyPadMenuItem label="Log out">
          <EuiIcon type="exit" size="l" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </EuiPopover>
  );
};

const HeaderAppMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const button = (
    <EuiHeaderSectionItemButton
      aria-label="App menu"
      onClick={() => setIsOpen(!isOpen)}
    >
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downRight"
    ></EuiPopover>
  );
};

export default NavBar;
