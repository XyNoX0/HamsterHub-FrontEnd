import React from "react";
import "./CourseHero.css";
import Image from "next/image";
import Link from "next/link";


function CourseHero() {
  return (
    <div className="course-hero">
      <div className="course-hero-img">
        <Image src="https://nj.dekhub.com/public/imgs/KMJ/KMJDT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/KMJ/KMJMB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>
    </div>
  );
}

export default CourseHero;
