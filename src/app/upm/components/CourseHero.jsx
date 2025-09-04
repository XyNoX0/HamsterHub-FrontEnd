import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/upm/1.png" className="img-desktop" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/upm/8.png" className="img-mobile" width={1920} height={1080} priority />
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p>1-21 ต.ค.(จันทร์-ศุกร์)</p>
          <p>เรียนเวลา 14:00-17:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            5,990฿ สำหรับ Onsite <br /> 4,990฿ สำหรับ Online
          </h3>
          <Link href="/apply/138/">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>1-21 ต.ค.(จันทร์-ศุกร์)</p>
            <p>เรียนเวลา 14:00-17:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            5,990฿ สำหรับ Onsite <br /> 4,990฿ สำหรับ Online
          </h3>
          <Link href="/apply/138/">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
