import React from "react";
import "./CourseTag.css";
import Link from "next/link";


function CourseTag() {
  return (
    <div className="course-tag">
      <div className="course-hero-buttom">
        <div className="course-price">
          <p style={{ textDecoration: "line-through" }}>รอบที่ 1 : 14-16 พ.ย.(ศุกร์-อาทิตย์)</p>
          <p>19:00-21:00</p>
        </div>
        <div className="course-price">
          <p>รอบที่ 2 : 21-23 พ.ย.(ศุกร์-อาทิตย์)</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/143">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p style={{ textDecoration: "line-through" }}>รอบที่ 1 : 14-16 พ.ย.(ศุกร์-อาทิตย์)</p>
            <p>รอบที่ 2 : 21-23 พ.ย.(ศุกร์-อาทิตย์)</p>
          </div>
          <div className="course-price-mobile-wrapper">
            <p>19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/143">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseTag;
