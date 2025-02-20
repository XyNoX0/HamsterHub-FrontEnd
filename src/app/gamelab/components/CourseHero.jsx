import React from "react";
import "./CourseHero.css";
import Image from "next/image";

function CourseHero({ courseData }) {
  const { cover, name, description, price, date, time, promotion, definition, book_link } = courseData;

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src={cover} alt={name} width={1920} height={1080} priority />
        <div className="course-header">
          <p>
            {promotion}
          </p>
        </div>
        <div className="course-overlay">
          <div className="course-text">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
