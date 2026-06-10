import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp1MB.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp1MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp2MB.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp2MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp3MB.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/Course/RobloxBootCamp/RobloxCamp3MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
    </div>
  );
}

export default CourseContent;
