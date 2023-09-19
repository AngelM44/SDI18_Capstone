import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EuiPopover,
    EuiContextMenuPanel,
    EuiContextMenuItem,
    EuiIcon,
    EuiAvatar,
} from '@elastic/eui';
import HeaderUserButton from './HeaderUserButton';

function HeaderUserMenu() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState("/profile_pics/profile-pic3.png");

    // New function:
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // For image preview
        const imageUrl = URL.createObjectURL(file);
        setProfilePicUrl(imageUrl);
    };

    const navigate = useNavigate();

    const togglePopover = () => {
        setIsPopoverOpen(!isPopoverOpen);
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const userMenuItems = [
        {
            label: 'Profile',
            icon: <EuiIcon type="user" size="m" />,
            onClick: () => {
                navigate('/user_profile');
                closePopover();
            },
        },
        // {
        //     label: 'Settings',
        //     icon: <EuiIcon type="gear" size="m" />,
        //     onClick: () => {
        //         navigate('/settings');
        //         closePopover();
        //     },
        // },
        {
            label: 'Login',
            icon: <EuiIcon type="arrowRight" size="m" />,
            onClick: () => {
                navigate('/login');
                closePopover();
            },
            show: !isLoggedIn,
        },
        {
            label: 'Register',
            icon: <EuiIcon type="userPlus" size="m" />,
            onClick: () => {
                navigate('/register');
                closePopover();
            },
            show: !isLoggedIn,
        },
        {
            label: 'Logout',
            icon: <EuiIcon type="exit" size="m" />,
            onClick: closePopover, // Logout logic
        },
    ];

    return (
        <div>
            <EuiPopover
                id="userMenu"
                button={<HeaderUserButton onClick={togglePopover} />}
                isOpen={isPopoverOpen}
                closePopover={closePopover}
                panelPaddingSize="none"
                anchorPosition="downLeft">
                <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} id="profilePicInput" />
                <label htmlFor="profilePicInput" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <EuiAvatar size="s" name="User" imageUrl={profilePicUrl} />
                    <span style={{ marginLeft: '8px' }}>Change Profile Picture</span>
                </label>
                <EuiContextMenuPanel
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 'auto'
                    }}
                    items={userMenuItems.map(item => (
                        <EuiContextMenuItem
                            key={item.label}
                            icon={item.icon}
                            onClick={item.onClick}
                            style={{
                                display: 'block',
                                padding: '8px 16px',
                                textAlign: 'left',
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                cursor: 'pointer'
                            }}
                            className="menu-item-hover">
                            {item.label}
                        </EuiContextMenuItem>
                    ))} />
            </EuiPopover>
            <style>{`
                .menu-item-hover:hover {
                    text-decoration: underline;
                    background-color: rgba(0, 0, 0, 0.05); 
                }
            `}</style>
        </div>
    );
}


export default HeaderUserMenu;
