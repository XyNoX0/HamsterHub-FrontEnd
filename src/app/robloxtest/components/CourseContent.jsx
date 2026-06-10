import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/RB-1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-5.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/RB-5.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/videos/RB-6.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized />
      <Image src="https://nj.dekhub.com/public/videos/RB-6.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized />
      <Image src="https://nj.dekhub.com/public/videos/RB-7.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized />
      <Image src="https://nj.dekhub.com/public/videos/RB-7.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized />
    </div>
  );
}

export default CourseContent;
