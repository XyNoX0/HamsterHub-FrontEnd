import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero({ courseData }) {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame_DT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame_MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>

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

export default CourseHero;
