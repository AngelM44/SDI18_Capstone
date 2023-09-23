import React, { useEffect, useState } from 'react';
import './Banner.css';
import { EuiIcon } from "@elastic/eui";

function Banner() {
    const [arrowPosition, setArrowPosition] = useState('10px');

    useEffect(() => {
        const bounceArrow = () => {
            setArrowPosition('0px');
            setTimeout(() => {
                setArrowPosition('10px');
            }, 1000);
        };

        const interval = setInterval(bounceArrow, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner">
            <p className="quote">Empower Your Fitness Journey, One Clique at a Time.</p>
            <EuiIcon
                type="arrowDown"
                size="xl"
                className="arrow"
                style={{ transform: `translateY(${arrowPosition})` }}
            />
        </div>
    );
}

export default Banner;
