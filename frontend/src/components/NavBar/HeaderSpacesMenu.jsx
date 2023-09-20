// header_spaces_menu.js
import React, { useState } from "react";
import {
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPopover,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

const HeaderSpacesMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const button = (
    <EuiHeaderSectionItemButton onClick={() => setIsOpen(!isOpen)}>
      <EuiIcon type="spaces" size="m" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      button={button}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
    >
      <EuiListGroup>
        <EuiListGroupItem label="Space 1" />
        <EuiListGroupItem label="Space 2" />
        {/* Add more spaces as needed */}
      </EuiListGroup>
    </EuiPopover>
  );
};

export default HeaderSpacesMenu;
