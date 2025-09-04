"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Slider2.css";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

function Slider({ items }) {
  const sliderRef = useRef(null);
  const slideRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = (index) => {
    const slider = sliderRef.current;
    const slideWidth = slideRef.current ? slideRef.current.offsetWidth : 0;
    const slideOffset = slideWidth * index;
    if (slider) {
      slider.scrollTo({
        left: slideOffset,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  const handleNavigation = (direction) => {
    const newIndex =
      direction === "prev"
        ? (activeIndex - 1 + items.length) % items.length
        : (activeIndex + 1) % items.length;
    scrollToSlide(newIndex);
  };

  const handleMouseEnter = (index) => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];
      try {
        video.play();
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }
  };

  const handleMouseLeave = (index) => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="sliderComponent2">
      <div className="slider2" ref={sliderRef}>
        {items.map((item, index) => (
          <div
            key={index}
            className="slide2"
            ref={index === 0 ? slideRef : null}
          >
            <Image
              src={item.image}
              alt="Hamster Hub"
              width={1900}
              height={700}
              priority
            />
          </div>
        ))}
        <button
          id="left-prevSlide-button"
          aria-label="Previous Slide"
          onClick={() => handleNavigation("prev")}
        >
          &#10094;
        </button>
        <button
          id="right-nextSlide-button"
          aria-label="Next Slide"
          onClick={() => handleNavigation("next")}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Slider;
