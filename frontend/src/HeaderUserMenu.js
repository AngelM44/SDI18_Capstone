import React, { useState } from 'react';
import { EuiHeaderSectionItemButton, EuiIcon, EuiPopover, EuiContextMenuPanel, EuiContextMenuItem } from '@elastic/eui';

import HeaderUserButton from './HeaderUserButton';

function HeaderUserMenu() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const userMenuItems = [
        {
            label: 'Profile',
            onClick: () => {

                closePopover();
            },
        },
        {
            label: 'Settings',
            onClick: () => {

                closePopover();
            },
        },
        {
            label: 'Logout',
            onClick: () => {

                closePopover();
            },
        },
    ];

    return (
        <div>
            <HeaderUserButton onClick={togglePopover} />
            {isPopoverOpen && (
                <EuiPopover
                    id="userMenuPopover"
                    button={null}
                    isOpen={isPopoverOpen}
                    closePopover={closePopover}
                    panelPaddingSize="none"
                >
                    <EuiContextMenuPanel items={userMenuItems.map(item => (
                        <EuiContextMenuItem key={item.label} onClick={item.onClick}>
                            {item.label}
                        </EuiContextMenuItem>
                    ))} />
                </EuiPopover>
            )}
        </div>
    );
}

export default HeaderUserMenu;
