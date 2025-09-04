import React from "react";
import "./CourseTag.css";
import Link from "next/link";


function CourseTag() {
  return (
    <div className="course-tag">
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>30 ส.ค. - 21 ก.ย. (เสาร์, อาทิตย์)</p>
          <p>18:00-20:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>1990฿</h3>
          <Link href="/apply/134">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>30 ส.ค. - 21 ก.ย. (เสาร์, อาทิตย์)</p>
            <p>18:00-20:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>1990฿</h3>
          <Link href="/apply/134">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseTag;
