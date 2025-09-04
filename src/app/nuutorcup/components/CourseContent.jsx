import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/NTC1.png" className="img-desktop" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC1.png" className="img-mobile" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC2.png" className="img-desktop" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC2.png" className="img-mobile" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC3.png" className="img-desktop" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC3.png" className="img-mobile" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC4.png" className="img-desktop" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC4.png" className="img-mobile" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC5.png" className="img-desktop" width={1920} height={1080} priority />
      <Image src="https://nj.dekhub.com/public/imgs/NTC5.png" className="img-mobile" width={1920} height={1080} priority />
    </div>
  );
}

export default CourseContent;
