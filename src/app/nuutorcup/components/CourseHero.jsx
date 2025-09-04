import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";


function CourseHero() {

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/NTC_DT.png" className="img-desktop" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/NTC_MB.png" className="img-mobile" width={1920} height={1080} priority />
      </div>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>29-31 สิงหาคม</p>
          <p>19:00-19:00 (48 ชั่วโมง)</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/136">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
        <div className="course-price-mobile-wrapper">
            <p>29-31 สิงหาคม</p>
            <p>19:00-19:00 (48 ชั่วโมง)</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿</h3>
          <Link href="/apply/136">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
