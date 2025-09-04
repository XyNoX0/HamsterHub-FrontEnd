import React from "react";
import "./CourseContent.css";
import Image from "next/image";
import roadmap from "../../../../public/pxp_road_map.svg"
import pxp8 from "../../../../public/pxp-8.svg"
import pxp9 from "../../../../public/pxp-9.svg"

function CourseContent({ }) {
  return (
    <div className="course-content">
      <div className="course-img">
        <Image
          src="https://nj.dekhub.com/public/imgs/bsepPoster.png"
          alt="NSC"
          width={1200}
          height={1200}
          id="content-img-desktop"
          priority
        />
        <Image
          src="https://nj.dekhub.com/public/imgs/bsepPoster.png"
          alt="NSC"
          width={1200}
          height={1200}
          id="content-img-mobile"
          priority
        />
      </div>
    </div>
  );
}

export default CourseContent;
