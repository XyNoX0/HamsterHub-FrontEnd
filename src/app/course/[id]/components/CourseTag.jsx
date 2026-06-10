import React from "react";
import "./CourseTag.css";
import Link from "next/link";

function CourseTag({ courseData }) {
  const { price, date, time, book_link, discount } = courseData;
  return (
    <div className="course-tag">
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>{date}</p>
          <p>เรียนเวลา {time}</p>
        </div>
        <hr />
        {courseData.promotion === "1" ? (
          <div className="course-links">
            <div>
              <h3 style={{ textDecoration: "line-through", display: "inline-block" }}>{price}฿</h3>
              <h3 style={{ display: "inline-block", marginLeft: "20px" }}>{discount}฿</h3>
            </div>
            <a href={book_link}>Book</a>
          </div>
        ) : (
          <div className="course-links">
            <h3>{price}฿</h3>
            <a href={book_link}>Book</a>
          </div>
        )}
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>{date}</p>
            <p>เรียนเวลา {time}</p>
          </div>
          <hr />
        </div>
        {courseData.promotion === "1" ? (
          <div className="course-links">
            <div>
              <h3 style={{ textDecoration: "line-through" }}>{price}฿</h3>
              <h3>{discount}฿</h3>
            </div>
            <a href={book_link}>Book</a>
          </div>
        ) : (
          <div className="course-links">
            <h3>{price}฿</h3>
            <a href={book_link}>Book</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseTag;
