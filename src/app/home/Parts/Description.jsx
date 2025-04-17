import React from "react";

import "./Description.css";
import CourseList from "./CourseList";

import Image from "next/image";
import Link from "next/link";

function Description() {
  return (
    <div className="description">
      {/* <div className="panel">
        <Image src="/assets/HWR.png" alt="panel" width={1200} height={1200} priority />
      </div> */}
      <div className="panel">
        <div className="des-text-wrap">
          <CourseList />
          {/* <h2>Who we are?</h2>

          <p>พวกเราจะได้ฝึกจากสิ่งที่ดีที่สุดในโลก</p>
          <p>
            {" "}
            มีพี่ๆ ใจดีคอยสนับสนุน ดึงศักยภาพแต่ละคนมาพัฒนา สร้างความมั่นใจ
            และพบเพื่อนใหม่กับภารกิจที่ท้าทายไปด้วยกัน{" "}
          </p>
          <p>Anyone can do anything</p>
          <Link href="/gallery">
            Project Showcase
          </Link> */}
          {/* <h2>
            <hr />
            <p><br /></p>
            กิจกรรมพิเศษ <Link className="event-btn" href="https://hamsterhub.co/gamedeepseek">สมัคร game Deep SeeK</Link>
          </h2> */}
          <div>
            <video
              controls
              playsInline
              className="nsc-video-desktop"
            >
              <source src="https://nj.dekhub.com/public/videos/PXS69.mp4" type="video/mp4" />
            </video>
            <video
              controls
              playsInline
              className="nsc-video-mobile"
            >
              <source src="https://nj.dekhub.com/public/videos/PXS69.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
