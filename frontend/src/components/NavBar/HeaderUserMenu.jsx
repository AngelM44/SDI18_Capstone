// header_user_menu.js
import React, { useState } from "react";
import {
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

const HeaderUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const button = (
    <EuiHeaderSectionItemButton onClick={() => setIsOpen(!isOpen)}>
      <EuiIcon type="user" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
    >
      <EuiListGroup>
        <EuiListGroupItem label="Profile" />
        <EuiListGroupItem label="Settings" />
        <EuiListGroupItem label="Logout" />
      </EuiListGroup>
    </EuiPopover>
  );
};

export default HeaderUserMenu;
