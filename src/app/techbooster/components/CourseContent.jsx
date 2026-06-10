import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {
  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-1MB.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-1MB.gif" className="img-mobile" width={1920} height={1080} priority  alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-3MB.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-3MB.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-2MB.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-2MB.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-4MB.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized/>
      <Image src="https://nj.dekhub.com/public/imgs/TechBooster-4MB.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized/>
    </div>
  );
}

export default CourseContent;

