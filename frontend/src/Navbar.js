import React, { useState, Fragment } from 'react';
import { EuiIcon, EuiTabs, EuiTab, EuiSpacer } from '@elastic/eui';
import { Link } from 'react-router-dom';
import logo from "./logo.png";


const tabs = [
    {
        id: 'home',

        name: (<img src={logo} className="App-logo" alt="logo"
        />),
        href: '/home',

    },
    {
        id: 'cardio',
        // name: 'Cardio',
        name: (
            <Link to="/cardio">
                Cardio
            </Link>
        ),
        disabled: false,
    },
    {
        id: 'strength',
        name: (
            <Link to="/strength">
                Strength
            </Link>
        ),
        disabled: false,
    },
    {
        id: 'nutrition',
        // name: (
        //     <span>
        //         <EuiIcon type="heatmap" />
        //         &nbsp;Nutrition
        //     </span>
        // ),
        name: (
            <Link to="/nutrition">
                Nutrition
            </Link>
        ),
        disabled: false,
    },
    {
        id: 'wellness',
        name: (
            <Link to="/wellness">
                Wellness
            </Link>
        ),
        disabled: false,
    },
];

const Navbar = () => {
    const [selectedTabId, setSelectedTabId] = useState('home');

    const onSelectedTabChanged = (id) => {
        setSelectedTabId(id);
    };

    const renderTabs = () => {
        return tabs.map((tab, index) => (
            <EuiTab
                {...tab.href && { href: tab.href }}
                onClick={() => onSelectedTabChanged(tab.id)}
                isSelected={tab.id === selectedTabId}
                disabled={tab.disabled}
                key={index}
            >
                {tab.name}
            </EuiTab>
        ));
    };

    return (
        <Fragment>
            <EuiTabs>{renderTabs()}</EuiTabs>
            <EuiSpacer />
        </Fragment>
    );
};

export default Navbar;
