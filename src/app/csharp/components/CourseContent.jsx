import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/cs-1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-5.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/cs-5.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/videos/cs-6.gif" className="img-desktop" width={1920} height={1080} priority unoptimized/>
      <Image src="https://nj.dekhub.com/public/videos/cs-6.gif" className="img-mobile" width={1920} height={1080} priority unoptimized/>
    </div>
  );
}

export default CourseContent;
