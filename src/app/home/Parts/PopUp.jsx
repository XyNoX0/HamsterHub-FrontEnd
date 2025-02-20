"use client"
import React, { useState } from 'react';
import './PopUp.css';
import Image from 'next/image';
import imageSrc from "../../../../public/assets/EventPoster.png"

function PopUp() {
    const [isVisible, setIsVisible] = useState(true);  // State to control visibility

    const handleCloseClick = (e) => {
        e.stopPropagation(); // Prevent event propagation to parent overlay
        console.log("Close button clicked");
        setIsVisible(false);  // Hide overlay when close button is clicked
    };

    const handleOverlayClick = () => {
        console.log("Overlay clicked");
        setIsVisible(false);  // Hide overlay when overlay is clicked
    };

    return (
        isVisible && (
            <div className="popup-overlay" onClick={handleOverlayClick}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <button className="popup-close-btn" onClick={handleCloseClick}>
                        &times;
                    </button>
                    <Image className="popup-image" src={imageSrc} alt="Popup" width={800} height={600} />
                </div>
            </div>
        )
    );
}

export default PopUp;