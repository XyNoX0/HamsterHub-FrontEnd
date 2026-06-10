import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/DT-1.png" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/DT-2.png" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/DT-3.png" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/DT-4.png" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/MB-1.png" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/MB-2.png" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/MB-3.png" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/AICamp/MB-4.png" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
    </div>
  );
}

export default CourseContent;
