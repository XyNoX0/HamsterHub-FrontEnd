import React from "react";
import "./CourseTag.css";
import Link from "next/link";


function CourseTag({courseData}) {
  return (
    <div className="course-tag">
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>{courseData.date}</p>
          <p>{courseData.time}</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>{courseData.price}฿</h3>
          <Link href={courseData.book_link}>Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>{courseData.date}</p>
            <p>{courseData.time}</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>{courseData.price}฿</h3>
          <Link href={courseData.book_link}>Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseTag;
