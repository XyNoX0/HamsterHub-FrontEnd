import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function AiGameDeatail() {
  return (
    <div className="aigame-detail-container">
      {/* <div className="aigame-video">
        <video
          controls
          playsInline
          className="aigame-video-desktop"
        >
          <source src="https://nj.dekhub.com/public/videos/AIClip.mp4" type="video/mp4" />
        </video>
        <video
          controls
          playsInline
          className="aigame-video-mobile"
        >
          <source src="https://nj.dekhub.com/public/videos/AIClip.mp4" type="video/mp4" />
        </video>
      </div> */}
      <br />
      <div className="aigame-detail-timeline">
        <div className="timeline-title">
          <h3><b>TIMELINE</b></h3>
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/aicamp1.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/aicamp1.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 1</b></h3>
          <p className="text-1">
            🤖 Introduction - Generative Ai คืออะไร? ทำอะไรได้บ้าง
          </p>
          <p className="text-1">
            🧠 แนะนำ Gemini มีกี่โมเดล (Standard , Pro , Imagegeneration , VEO2 )
          </p>
          <p className="text-1">
            🧑🏽‍💻 แนะนำเข้าใช้เว็บ Gemini กับ Google Ai Studio
          </p>
          <p className="text-1">
            😎สอนเปลี่ยนโมเดล Ai
          </p>
          <br />
          <h3><b>Workshop</b></h3>
          <p className="text-1">
            🌈 ให้ลองเจนภาพที่ต้องการด้วย Ai
          </p>
          <p className="text-1">
            🔥 Prompt Engineer Basic
          </p>
          <p className="text-1">
            📢 หลักการ Prompt Ai โดยพื้นฐานว่ามีอะไรบ้าง ต้องพิมพ์ยังไงถึงจะได้งานที่ต้องการ
          </p>
          <p className="text-1">
            🥳 ออกแบบ Prompt Ai ตามหลักของ Prompt Engineer โดยต้องการสร้าง AI วางแผนไปเที่ยวขึ้นมา
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/aicamp2.png" className="img-desktop" width={2000} height={1000} priority />
          <Image src="https://nj.dekhub.com/public/imgs/aicamp2.png" className="img-mobile" width={400} height={300} priority />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 2</b></h3>
          <p className="text-1">
            🎨 กิจกรรม Story By AI
          </p>
          <p className="text-1">
            🔥 สอนเทคนิค Chain of Thought และ FewShot Prompting
          </p>
          <p className="text-1">
            😎 ใช้ FewShot เพื่อสร้าง Ai ที่ทำงานเฉพาะทางที่ตัวเองต้องการขึ้นมา
          </p>
          <p className="text-1">
            🎵 แนะนำให้ทุกคนรู้จัก Gemini Api
          </p>
          <p className="text-1">
            🌈 สอนดึง Api จาก Gemini มาใช้ใน Python บน Colab
          </p>
          <p className="text-1">
            🧠 ให้ทุกคนสร้าง API ของตัวเอง
          </p>
          <br />
          <h3><b>Workshop</b></h3>
          <p className="text-1">
            🤖 Mini Project สร้างโปรแกรมที่รันผ่าน Colab และเป็น Ai เฉพาะทางที่ User จะสามารถพิมพ์ถาม และจะได้คำตอบมาจากตัวโปรแกรม
          </p>
        </div>
        <br />
      </div>
    </div>
  );
}
export default AiGameDeatail;
