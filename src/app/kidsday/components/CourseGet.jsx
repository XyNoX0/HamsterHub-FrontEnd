import React from "react";
import "./CourseGet.css";
import Image from "next/image";

function CourseGet({ get }) {
  const { get_video, get_img } = get;
  return (
    <div className="course-get">
      {
        get_video === "" ?
          <Image src={get_img} width={1920} height={1080} priority alt="" /> :
          <video controls src={get_video}></video>
      }
    </div>
  );
}

export default CourseGet;
