// import React, { useState, Fragment } from 'react';
// import { EuiIcon, EuiTabs, EuiTab, EuiSpacer } from '@elastic/eui';
// import { Link } from 'react-router-dom';
// import logo from "./logo.png";


// const tabs = [
//     {
//         id: 'home',

//         name: (<img src={logo} className="App-logo" alt="logo"
//         />),
//         href: '/home',

//     },
//     {
//         id: 'cardio',
//         // name: 'Cardio',
//         name: (
//             <Link to="/cardio">
//                 Cardio
//             </Link>
//         ),
//         disabled: false,
//     },
//     {
//         id: 'strength',
//         name: (
//             <Link to="/strength">
//                 Strength
//             </Link>
//         ),
//         disabled: false,
//     },
//     {
//         id: 'nutrition',
//         // name: (
//         //     <span>
//         //         <EuiIcon type="heatmap" />
//         //         &nbsp;Nutrition
//         //     </span>
//         // ),
//         name: (
//             <Link to="/nutrition">
//                 Nutrition
//             </Link>
//         ),
//         disabled: false,
//     },
//     {
//         id: 'wellness',
//         name: (
//             <Link to="/wellness">
//                 Wellness
//             </Link>
//         ),
//         disabled: false,
//     },
// ];

// const Navbar = () => {
//     const [selectedTabId, setSelectedTabId] = useState('home');

//     const onSelectedTabChanged = (id) => {
//         setSelectedTabId(id);
//     };

//     const renderTabs = () => {
//         return tabs.map((tab, index) => (
//             <EuiTab
//                 {...tab.href && { href: tab.href }}
//                 onClick={() => onSelectedTabChanged(tab.id)}
//                 isSelected={tab.id === selectedTabId}
//                 disabled={tab.disabled}
//                 key={index}
//             >
//                 {tab.name}
//             </EuiTab>
//         ));
//     };

//     return (
//         <Fragment>
//             <EuiTabs>{renderTabs()}</EuiTabs>
//             <EuiSpacer />
//         </Fragment>
//     );
// };

// export default Navbar;


import React, { useState, Fragment, useRef, forwardRef, useImperativeHandle } from 'react';
import {
    EuiIcon,
    EuiTabs,
    EuiTab,
    EuiSpacer,
    EuiContextMenu,
    EuiButton,
    EuiPopover,
    EuiSwitch,
    EuiFormRow,
} from '@elastic/eui';
import { Link } from 'react-router-dom';
import logo from "./logo.png";

// Example tabs configuration
const tabs = [

    {
        id: 'home',
        name: (<img src={logo} className="App-logo" alt="logo" />),
        href: '/home',
    },
    {
        id: 'cardio',
        name: 'Cardio',
        disabled: false,
    },
    {
        id: 'strength',
        name: 'Strength',
        disabled: false,
    },
    {
        id: 'nutrition',
        name: 'Nutrition',
        disabled: false,
    },
    {
        id: 'wellness',
        name: 'Wellness',
        disabled: false,
    },
];

// Example flattenPanelTree function
function flattenPanelTree(tree, array = []) {
    array.push(tree);

    if (tree.items) {
        tree.items.forEach(item => {
            if (item.panel) {
                flattenPanelTree(item.panel, array);
                item.panel = item.panel.id;
            }
        });
    }

    return array;
}

const Navbar = forwardRef((props, ref) => {
    const [isPopoverOpen, setPopover] = useState(false);
    const buttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openPopover: () => {
            setPopover(true);
        },
        closePopover: () => {
            setPopover(false);
        },
    }));

    const onButtonClick = () => {
        setPopover(!isPopoverOpen);
    };

    const closePopover = () => {
        setPopover(false);
    };
    const panels = [
        {
            id: 0,
            title: 'This is a context menu',
            items: [
                {
                    name: 'Dropdown Piece 1',
                    onClick: () => {
                        closePopover();
                        window.alert('Dropdown Piece 1 clicked');
                    },
                },
                {
                    name: 'Dropdown Piece 2',
                    onClick: () => {
                        closePopover();
                        window.alert('Dropdown Piece 2 clicked');
                    },
                },
            ],
        },
    ];

    const [selectedTabId, setSelectedTabId] = useState('home');

    const onSelectedTabChanged = (id) => {
        setSelectedTabId(id);
    };

    return (
        <Fragment>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <EuiTabs>
                    {tabs.map((tab, index) => (
                        <EuiTab
                            {...tab.href && { href: tab.href }}
                            onClick={() => onSelectedTabChanged(tab.id)}
                            isSelected={tab.id === selectedTabId}
                            disabled={tab.disabled}
                            key={index}
                        >
                            {tab.name}
                        </EuiTab>
                    ))}
                </EuiTabs>
                <div className="dropdown-container" style={{ marginLeft: '20px' }}>
                    <EuiPopover
                        id="contextMenuExample"
                        button={
                            <EuiButton
                                iconType="arrowDown"
                                iconSide="right"
                                onClick={onButtonClick}
                                ref={buttonRef}
                            >
                                Click me to load a context menu
                            </EuiButton>
                        }
                        isOpen={isPopoverOpen}
                        closePopover={closePopover}
                        panelPaddingSize="none"
                        anchorPosition="downRight"
                    >
                        <EuiContextMenu initialPanelId={0} panels={panels} />
                    </EuiPopover>
                </div>
            </div>
            <EuiSpacer size="s" />
        </Fragment>
    );
});

export default Navbar;

