import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/PythonHunter-4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
    </div>
  );
}

export default CourseContent;
