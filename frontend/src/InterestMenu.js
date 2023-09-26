

import { useUser } from './components/UserContext';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    EuiCollapsibleNav,
    EuiPopover,
    EuiButton,
    EuiPanel,
    EuiDragDropContext,
    EuiDraggable,
    EuiDroppable,
    euiDragDropReorder,
    htmlIdGenerator,
    EuiIcon,
    EuiHeaderSectionItemButton,
} from '@elastic/eui';


const makeId = htmlIdGenerator();

const hoverStyle = {
    transform: "scale(1.05)",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out"
};


export default function InterestMenu() {
    const [interests, setInterests] = useState([]);
    const [navIsOpen, setNavIsOpen] = useState(false);



    useEffect(() => {
        fetch("http://localhost:8080/interests")
            .then(response => response.json())
            .then(data => setInterests(data))
            .catch(error => console.error("Error fetching interests:", error));
    }, []);



    const { user, isAuthenticated } = useUser();

    let newNavbar = [
        {
            label: 'cardio',
            path: '/cardio'
        },
        {
            label: 'strength',
            path: '/strength'
        },
        {
            label: 'profile',
            path: user ? `/profile/${user.id}` : '#'
        },
        {
            label: 'posts',
            path: '/posts'
        },
        {
            label: 'home',
            path: '/home'
        },
    ];



    const interestsList = newNavbar.map(interest => ({
        ...interest,
        draggableId: makeId(),
    }));

    return (
        isAuthenticated ? (
            <div style={{ marginLeft: '20px' }}>
                <EuiHeaderSectionItemButton onClick={() => setNavIsOpen(!navIsOpen)}>
                    <EuiIcon type="menu" size="m" aria-label="Toggle Interests Nav" />
                </EuiHeaderSectionItemButton>

                <EuiCollapsibleNav isOpen={navIsOpen} onClose={() => setNavIsOpen(false)}>
                    <EuiDragDropContext
                        onDragEnd={({ source, destination }) => {
                            if (source && destination) {
                                const reorderedItems = euiDragDropReorder(
                                    interestsList,
                                    source.index,
                                    destination.index
                                );
                                setInterests(reorderedItems);
                            }
                        }}
                    >
                        <EuiDroppable droppableId="droppableInterests" spacing="m">
                            {interestsList.map(({ label, path, draggableId }, idx) => (
                                <EuiDraggable spacing="m" key={draggableId} index={idx} draggableId={draggableId}>
                                    {(provided, state) => (
                                        <Link
                                            to={path}
                                            style={{ textDecoration: 'none', color: 'black' }}>
                                            <EuiPanel
                                                hasShadow={state.isDragging}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = hoverStyle.transform;
                                                    e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                                                    e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                    e.currentTarget.style.backgroundColor = '';
                                                    e.currentTarget.style.boxShadow = '';
                                                }}
                                                style={{ transition: hoverStyle.transition }}
                                            >
                                                # {label}
                                            </EuiPanel>
                                        </Link>
                                    )}
                                </EuiDraggable>
                            ))}
                        </EuiDroppable>

                    </EuiDragDropContext>
                </EuiCollapsibleNav>
            </div>
        ) : null
    );
}