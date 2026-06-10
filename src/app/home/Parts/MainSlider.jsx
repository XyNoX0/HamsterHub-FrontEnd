"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import "./MainSlider.css";
import Image from "next/image";

function MainSlider() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const slides = [
    {
      title: "",
      description: "",
      type: "video",
      content_desktop: "https://nj.dekhub.com/public/videos/KGJamDT.mp4",
      content_mobile: "https://nj.dekhub.com/public/videos/KGJamMB.mp4",
      image: "https://nj.dekhub.com/public/imgs/KGJamIcon.png",
      placeholder: "",
      link: "",
      book: "",
    },
    {
      title: "",
      description: "",
      type: "image",
      content_desktop: "https://nj.dekhub.com/public/imgs/HHMainSlideDT.png",
      content_mobile: "https://nj.dekhub.com/public/imgs/HHMainSlideMB.png",
      image: "https://nj.dekhub.com/public/imgs/Trophy-1.png",
      placeholder: "",
      link: "",
      book: "",
    },
    {
      title: "",
      description: "",
      type: "video",
      content_desktop: "https://nj.dekhub.com/public/videos/LoopL2.mp4",
      content_mobile: "https://nj.dekhub.com/public/videos/SKDemo.mp4",
      image: "https://nj.dekhub.com/public/imgs/IC.png",
      placeholder: "",
      link: "",
      book: "",
    }
  ];

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
                  <>
                    <Image
                      src={slide.content_desktop}
                      alt={`Slide ${index + 1}`}
                      width={1920}
                      height={1200}
                      priority
                      className="main-slide-desktop"
                    />
                    <Image
                      src={slide.content_mobile}
                      alt={`Slide ${index + 1}`}
                      width={1920}
                      height={1200}
                      priority
                      className="main-slide-mobile"
                    />
                  </>
                ) : (
                  <>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={slide.placeholder}
                      className="main-slide-desktop"
                    >
                      <source src={slide.content_desktop} type="video/mp4" />
                    </video>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={slide.placeholder}
                      className="main-slide-mobile"
                    >
                      <source src={slide.content_mobile} type="video/mp4" />
                    </video>
                  </>

                )}
              </div>
              {/* <div className="home-text-overlay">
                <h1>{slide.title}</h1>
                <div className="slide-description">
                  {slide.description.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                {slide.book != "#" ? (
                  <>
                    <a
                      href={slide.link}
                      rel="noopener noreferrer"
                      className="slide-more"
                    >
                      More Detail
                    </a>

                    <a
                      href={slide.book}
                      rel="noopener noreferrer"
                      className="slide-book"
                    >
                      Book
                    </a>
                  </>
                ) : (
                  <a
                      href={slide.link}
                      rel="noopener noreferrer"
                      className="slide-more"
                    >
                      Project Gallery
                    </a>
                )}
              </div> */}
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

export default MainSlider;
