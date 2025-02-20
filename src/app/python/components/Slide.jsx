"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "./Slide.css";
import Image from "next/image";

function Slide({ slides }) {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef(null);

    const scrollToSlide = useCallback((index) => {
        const slider = sliderRef.current;
        if (slider) {
            const slideWidth = slider.offsetWidth;
            slider.scrollTo({
                left: slideWidth * index,
                behavior: "smooth",
            });
        }
    }, []);

    // แยก logic การอัพเดท activeIndex ออกมา
    const updateActiveIndex = useCallback(
        (newIndex) => {
            setActiveIndex(newIndex);
            scrollToSlide(newIndex);
        },
        [scrollToSlide]
    );

    const startAutoSlide = useCallback(() => {
        if (intervalRef.current) return; // ป้องกันการสร้าง interval ซ้ำ

        intervalRef.current = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % slides.length;
                scrollToSlide(nextIndex);
                return nextIndex;
            });
        }, 25000);
    }, [slides.length, scrollToSlide]);

    const stopAutoSlide = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // ใช้ useEffect เดียว
    useEffect(() => {
        startAutoSlide();
        return () => {
            stopAutoSlide();
        };
    }, [startAutoSlide, stopAutoSlide]);

    const handleManualSlideChange = useCallback(
        (index) => {
            updateActiveIndex(index);
        },
        [updateActiveIndex]
    );

    return (
        <section className="container">
            <div className="slider-wrapper">
                <div className="slider" ref={sliderRef}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slide">
                            <div className="slide-content">
                                {slide.type === "image" ? (
                                    <Image
                                        src={slide.content}
                                        alt={`Slide ${index + 1}`}
                                        width={1920}
                                        height={1200}
                                        priority
                                    />
                                ) : (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        poster={slide.placeholder}
                                    >
                                        <source src={slide.content} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                            <div className="text-overlay">
                                <h1>{slide.title}</h1>
                                <div className="slide-description">
                                    {slide.description.split("\n").map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>

                                <div className="course-btn">
                                    <a
                                        href={slide.detail_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="more"
                                    >
                                        More Detail
                                    </a>
                                    <a
                                        href={slide.apply_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="book"
                                    >
                                        Book
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider-nav">
                    {slides.map((slide, index) => (
                        <button
                            key={index}
                            className={activeIndex === index ? "active" : ""}
                            onClick={() => handleManualSlideChange(index)}
                        >
                            <Image
                                src={slide.image}
                                width={400}
                                height={400}
                                alt={`Thumbnail ${index + 1}`}
                                onError={(e) => (e.target.src = "/assets/Placeholder.png")}
                                priority
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Slide;