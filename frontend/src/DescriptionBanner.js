import React from 'react';
import './Banner.css';

function DescriptionBanner() {
    return (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 description-banner">
            <div className="circle-container">
                <div className="circle-text">
                    <h1>Welcome to FitConnect</h1>
                    <p>Your go-to platform to connect with others in your base and stay on track with your fitness goals.</p>
                </div>
            </div>
        </div>
    );
}

export default DescriptionBanner;
