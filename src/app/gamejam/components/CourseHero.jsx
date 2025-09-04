import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";


function CourseHero() {

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/HGJSP2_DT.png" className="img-desktop" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/HGJSP2_MB.png" className="img-mobile" width={1920} height={1080} priority />
      </div>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>4-6 ก.ค. 2568</p>
          <p>เริ่ม 14:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/727">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
        <div className="course-price-mobile-wrapper">
            <p>4-6 ก.ค. 2568</p>
            <p>เริ่ม 14:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/727">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
