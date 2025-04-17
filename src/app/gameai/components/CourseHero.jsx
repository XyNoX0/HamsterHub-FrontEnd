import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame_DT.png" className="img-desktop" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame_MB.png" className="img-mobile" width={1920} height={1080} priority />
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p>16 เม.ย. - 9 พ.ค. 68 (พุธ, ศุกร์)</p>
          <p>เรียนเวลา 19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            <span className="discount-line">2990฿</span> 1990฿
          </h3>
          <Link href="/apply/820/">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>16 เม.ย. - 9 พ.ค. 68 (พุธ, ศุกร์)</p>
            <p>เรียนเวลา 19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            <span className="discount-line">2990฿</span> 1990฿
          </h3>
          <Link href="/apply/820/">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
