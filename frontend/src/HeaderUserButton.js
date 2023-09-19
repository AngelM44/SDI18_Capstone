// HeaderUserButton.js
import React from 'react';
import { EuiHeaderSectionItemButton, EuiIcon } from '@elastic/eui';

function HeaderUserButton({ onClick }) {
    return (
        <EuiHeaderSectionItemButton aria-label="User" onClick={onClick}>
            <EuiIcon type="user" size="m" />
        </EuiHeaderSectionItemButton>
    );
}

export default HeaderUserButton;
