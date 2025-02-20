import React from "react";
import "./CourseTag.css";
import Link from "next/link";

function CourseTag({ courseData }) {
  const { price, date, time, definition, book_link } = courseData;
  return (
    <div className="course-tag">
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

export default CourseTag;
