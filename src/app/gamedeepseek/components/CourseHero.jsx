import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <video
          src="https://nj.dekhub.com/public/videos/GDSDesktop.mov"
          muted
          autoPlay
          className="img-desktop"
        ></video>
        <video
          src="https://nj.dekhub.com/public/videos/GDSMobile.mov"
          muted
          autoPlay
          className="img-mobile"
        ></video>
        <div className="course-header">
          <p>ใส่โค้ด &quot;xy25&quot; ได้ราคาพิเศษ 490฿ ภายในวันที่ 9 มีนาคม </p>
        </div>
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p>Hamster Cup x ROV 10-14 มี.ค.</p>
          <p>เรียนเวลา 19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            <span className="discount-line">1290฿</span> 490฿
          </h3>
          <Link href="/apply/121/">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>10-14 มี.ค.</p>
            <p>เรียนเวลา 19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            <span className="discount-line">1290฿</span> 490฿
          </h3>
          <Link href="/apply/121/">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
