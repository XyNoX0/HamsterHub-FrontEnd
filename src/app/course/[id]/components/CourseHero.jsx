import React from "react";
import "./CourseHero.css";
import Image from "next/image";

function CourseHero({ courseData }) {
  const { cover, cover_desktop, cover_mobile, name, description, price, date, time, promotion, definition, book_link } = courseData;

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src={cover_desktop} className="img-desktop" alt={name} width={1920} height={1080} priority />
        <Image src={cover_mobile} className="img-mobile" alt={name} width={1920} height={1080} priority />
        <div className="course-header">
          <p>{promotion}</p>
        </div>
        {/* <div className="course-overlay">
          <div className="course-text">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div> */}
      </div>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>{date}</p>
          <p>เรียนเวลา {time}</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>{price}฿</h3>
          <a href={book_link}>Book</a>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
        <div className="course-price-mobile-wrapper">
            <p>{date}</p>
            <p>เรียนเวลา {time}</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>{price}฿</h3>
          <a href={book_link}>Book</a>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
