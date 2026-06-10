import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";

function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/PortDT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/PortMB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>

      <div className="course-hero-buttom">
        <div className="course-price">
          <p>รอบที่ 1: 5-7 เม.ย. (เสาร์-จันทร์) <u><b>เต็มแล้ว</b></u></p>
          <p>เรียนเวลา 19:00-21:00</p>
        </div>
        <div className="course-price">
          <p>รอบที่ 2: 19-21 เม.ย. (เสาร์-จันทร์) <u><b>เต็มแล้ว</b></u></p>
        </div>
        <div className="course-price">
          <p>🌟 รอบที่ 3: 3-5 พ.ค. (เสาร์-จันทร์)</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/125/">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>รอบที่ 1: 5-7 เม.ย. (เสาร์-จันทร์) <br /><u><b>เต็มแล้ว</b></u></p>
          </div>
          <div className="course-price-mobile-wrapper">
            <p>รอบที่ 2: 19-21 เม.ย. (เสาร์-จันทร์) <br /><u><b>เต็มแล้ว</b></u></p>
          </div>
          <div className="course-price-mobile-wrapper">
            <p>🌟 รอบที่ 3: 3-5 พ.ค. (เสาร์-จันทร์)</p>
            <p>เรียนเวลา 19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>
            190฿
          </h3>
          <Link href="/apply/125/">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
