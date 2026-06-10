import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";


function CourseHero() {

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/s2uDT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/s2uMB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>13-14 ก.ย. (เสาร์, อาทิตย์)</p>
          <p>19:00-21:00</p>
        </div>
        <div className="course-price">
          <p></p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/137">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>13-14 ก.ย. (เสาร์, อาทิตย์)</p>
            <p>19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/137">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
