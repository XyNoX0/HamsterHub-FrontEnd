import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function AiGameDeatail() {
  return (
    <div className="tech-detail-container">
      {/* <div className="tech-detail-header">
        <div className="header-title">
          <h3><b>เลือกเส้นทางที่ใช่</b></h3>
        </div>
        <div className="header-img">
          <Image src="https://nj.dekhub.com/public/imgs/Tech/2.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Tech/2.png" className="img-mobile" width={400} height={300} priority />
        </div>
      </div> */}
      <br />
      <div className="tech-detail-timeline">
        <div className="timeline-title">
          <h3><b>TIMELINE</b></h3>
        </div>
        <br />
        <div className="timeline-title-python">
          <h3><b>Path of PYTHON</b></h3>
          <Image src="https://nj.dekhub.com/public/imgs/Python-Icon.png" className="img-desktop" width={200} height={200} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Python-Icon.png" className="img-mobile" width={50} height={50} priority />
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/Tech/3.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Tech/3.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 1 Feel & Fire</b></h3>
          <p className="space"></p>
          <p className="text-2">
            🎮 ฝึกเล่นเกมง่ายๆ และเข้าใจ Logic ในการออกแบบ
          </p>
          <p className="text-2">
            👀 หา Inspiration ในการทำโปรเจค
          </p>
          <p className="text-2">
            🧑🏽‍💻 ฝึกพื้นฐานการเขียน Python
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/Tech/4.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Tech/4.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 2 Code & Algo</b></h3>
          <p className="space"></p>
          <p className="text-2">
            💪🏻 ฝึกแก้ปัญหาด้วยตัวเอง
          </p>
          <p className="text-2">
            🧠 ฝึก Algorithm และจัดการตัวแปร
          </p>
          <p className="text-2">
            🖥️ ติดตั้ง Unity สำหรับสร้าง Mini Project
          </p>
        </div>
        <br />
      </div>
      {/* <div className="tech-detail-timeline-2">
        <br />
        <div className="timeline-title-unity">
          <Image src="https://nj.dekhub.com/public/imgs/Unity-Icon.png" className="img-desktop" width={200} height={200} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Unity-Icon.png" className="img-mobile" width={50} height={50} priority />
          <h3><b>Way Of UNITY</b></h3>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/Tech/5.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Tech/5.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 1 Fun & Fast</b></h3>
          <p className="space"></p>
          <p className="text-2">
            🎮 ฝึกเล่นเกมใน Mode ของผู้สร้างเพื่อเข้าใจการออกแบบ
          </p>
          <p className="text-2">
            👀 หา Inspiration ในการทำโปรเจค
          </p>
          <p className="text-2">
            🎨 ดีไซน์โปรเจคของน้องๆ ต่อยอดจาก idea ระดับโลก
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/Tech/6.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Tech/6.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 2 Design & Dev.</b></h3>
          <p className="space"></p>
          <p className="text-2">
            🧑🏽‍💻 ฝึกตกแต่งและควบคุมเกม
          </p>
          <p className="text-2">
            🧑🏽 ให้เพื่อนได้ทดลองเล่น
          </p>
          <p className="text-2">
            🖼️ นำเสนอ Mini Project บน Unity
          </p>
        </div>
        <br />
      </div> */}
    </div>
  );
}
export default AiGameDeatail;
