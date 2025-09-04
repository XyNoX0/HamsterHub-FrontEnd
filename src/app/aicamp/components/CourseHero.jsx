import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/aicampDT.png" className="img-desktop" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/aicampMB.png" className="img-mobile" width={1920} height={1080} priority />
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p>19-20 ก.ค. (เสาร์, อาทิตย์)</p>
          <p>เรียนเวลา 19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/131/">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>28,29 มิ.ย. 5-20 ก.ค. (เสาร์, อาทิตย์)</p>
            <p>เรียนเวลา 19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/131/">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
