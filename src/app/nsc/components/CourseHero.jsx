import React from "react";
import "./CourseHero.css";
import Image from "next/image";

function CourseHero({ courseData }) {
  const { cover_desktop, cover_mobile, name, description, price, discount, date,promotion, definition, book_link } = courseData; 

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src={cover_desktop} alt={name} width={1920} height={1080} priority className="cover-desktop"/>
        <Image src={cover_mobile} alt={name} width={1920} height={1080} priority className="cover-mobile" />
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
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>{date}</p>
          <h3><span className="discount-line">฿{price}</span> ฿{discount}</h3>
        </div>
        <hr />
        <div className="course-links">
          <p>
            {definition}
          </p>
          <a href={book_link}>Book</a>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <p>
            {definition}
          </p>
          <hr />

          <div className="course-price-mobile-wrapper">
            <p>{date}</p>
         
          </div>
        </div>

        <div className="course-links">
          <h3><span className="discount-line">฿{price}</span> ฿{discount}</h3>
          <h3></h3>
          <a href={book_link}>Book</a>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
