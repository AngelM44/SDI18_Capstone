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
    transform: "scale(1.05)", // Scale it up slightly
    backgroundColor: "#f5f5f5", // Change background color
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)", // Add shadow for lift effect
    transition: "all 0.3s ease-in-out" // Smooth transition for all changes
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

    const interestsList = interests.map(interest => ({
        ...interest,
        draggableId: makeId(),
    }));

    return (
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
                        {interestsList.map(({ name, draggableId }, idx) => (
                            <EuiDraggable spacing="m" key={draggableId} index={idx} draggableId={draggableId}>
                                {(provided, state) => (
                                    <Link
                                        to={`/interest/${name}`}
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
                                                e.currentTarget.style.backgroundColor = ''; // reset to default
                                                e.currentTarget.style.boxShadow = ''; // reset to default
                                            }}
                                            style={{ transition: hoverStyle.transition }}
                                        > # {name}</EuiPanel>
                                    </Link>
                                )}
                            </EuiDraggable>
                        ))}
                    </EuiDroppable >

                </EuiDragDropContext>
            </EuiCollapsibleNav>
        </div>
    );
}    