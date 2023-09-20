// header_app_menu.js
import React, { useState } from "react";
import {
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
  EuiListGroup,
} from "@elastic/eui";

const HeaderAppMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const button = (
    <EuiHeaderSectionItemButton onClick={() => setIsOpen(!isOpen)}>
      <EuiIcon type="apps" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
    >
      <EuiListGroup>{/* Add your app links here */}</EuiListGroup>
    </EuiPopover>
  );
};

export default HeaderAppMenu;
