import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from 'next/link';

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/GDSBannerDesktop.png" className="img-desktop" alt="" width={1920} height={1080} priority />
        <Image src="https://nj.dekhub.com/public/imgs/GDSBannerMobile.png" className="img-mobile" alt="" width={1920} height={1080} priority />
      </div>
      <p className="space"></p>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>10-14 มี.ค.</p>
          <p>เรียนเวลา 19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3><span className="discount-line">1290฿</span> 490฿</h3>
          <Link href="/apply/121/">
            Book
          </Link>
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
          <h3><span className="discount-line">1290฿</span> 490฿</h3>
          <Link href="/apply/121/">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
