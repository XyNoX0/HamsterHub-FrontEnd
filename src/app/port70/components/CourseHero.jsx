import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/port70/port70_DT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/port70/port70_MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p><span style={{textDecoration: "line-through"}}>รอบที่ 1 : 13-15 ต.ค. (จันทร์ - พุธ)</span><br />รอบที่ 2 : 20-22 ต.ค. (จันทร์ - พุธ)</p>
            <p>19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/141">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>13-15 ต.ค. (จันทร์ - พุธ)</p>
            <p>19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/141">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
