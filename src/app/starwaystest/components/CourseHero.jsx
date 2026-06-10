import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";


function CourseHero() {

  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/GJInterDT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starways/STMB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>
      <div className="course-hero-buttom">
        <div className="course-price">
          <p>23-26 ต.ค. (พฤหัส-อาทิตย์)</p>
          <p>19:00-21:00</p>
        </div>
        <hr />
        <div className="course-links">
          <h3>190฿ <br /> 990฿ + Special Training</h3>
          <Link href="/apply/139">Book</Link>
        </div>
      </div>
      <div className="course-hero-buttom-mobile">
        <div className="course-price">
          <div className="course-price-mobile-wrapper">
            <p>23-26 ต.ค. (พฤหัส-อาทิตย์)</p>
            <p>19:00-21:00</p>
          </div>
          <hr />
        </div>
        <div className="course-links">
          <h3>190฿ <br /> 990฿ + Special Training</h3>
          <Link href="/apply/139">Book</Link>
        </div>
      </div>
    </div>
  );
}

export default CourseHero;
