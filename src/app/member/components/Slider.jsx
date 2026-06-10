import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Image from "next/image";
import "./Slider.css";

export default function Slider({ data, courseData }) {
  // console.log("data",data)
  // console.log("courseData",courseData)
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = data.length;

  const nextSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const currentSlideData = data[currentSlide];
  const currentCourseData = courseData[currentSlide];

  const handleRedirect = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <>
      <div className="app-container">
        <div className="slider-card">
          <div>
            <div className="relative overflow-hidden">
              <div className="slide-image-container">
                <img
                  src={currentCourseData.cover_mobile}
                  alt={currentCourseData.name}
                  className="slide-image"
                />
              </div>

              <div className="slide-details">
                <h2 className="slide-title">
                  {currentCourseData.name}
                </h2>
              </div>
            </div>
            <div className="detail-footer">
              <button
                onClick={() => handleRedirect(`https://hamsterhub.co/course/${currentCourseData.id}`)}
                className="detail-button-detail"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Detail
              </button>
              <button
                onClick={() => handleRedirect(`${currentSlideData.project.url}`)}
                className="detail-button-project"
              >
                <Image src={`https://nj.dekhub.com/public/imgs/Member/computer.png`} width={200} height={200} alt="" priority />
                Project
              </button>
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="nav-button nav-button-left"
            aria-label="Previous slide"
          >
            <ChevronLeft size={56} />
          </button>
          <button
            onClick={nextSlide}
            className="nav-button nav-button-right"
            aria-label="Next slide"
          >
            <ChevronRight size={56} />
          </button>
        </div>
      </div>
    </>
  );
}