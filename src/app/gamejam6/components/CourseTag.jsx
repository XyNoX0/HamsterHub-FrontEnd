import React from "react";
import "./CourseTag.css";
import Link from "next/link";


function CourseTag() {
  return (
    <div className="course-tag">
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>21-24 เมษายน</p>
          <p>เริ่ม 14:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿</h3>
            <Link href="/apply/124">Book</Link>
          </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>21-24 เมษายน</p>
            <p>เริ่ม 14:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/124">Book</Link>
          </div>
      </div>
    </div>
  );
}

export default CourseTag;
