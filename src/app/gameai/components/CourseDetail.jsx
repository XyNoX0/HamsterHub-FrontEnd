import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function AiGameDeatail() {
  return (
    <div className="aigame-detail-container">
      <div className="aigame-video">
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
      </div>
      <br />
      <div className="aigame-detail-timeline">
        <div className="timeline-title">
          <h3><b>TIMELINE</b></h3>
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-1.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-1.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 1 AI 101 & Simple Unity</b></h3>
          <p className="text-1">
            แนะนำให้น้องๆรู้จักการใช้ AI ในการทำงานในแต่ละด้าน
          </p>
          <p className="text-2">
            🎮 เรียนรู้พื้นฐานการใช้ Unity
          </p>
          <p className="text-2">
            🤖 เข้าใจถึงการใช้ AI ในแต่ละสาย
          </p>
          <p className="text-2">
            🧠 ค้นหา Concept เกมในฝันของน้องๆ
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-2.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-2.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 2 Graphics with Ai จะเอาอะไรอีก?</b></h3>
          <p className="text-1">
            เรียนรู้วิธีตกแต่ง.. จัดแต่งฉากให้แจ๋ว
          </p>
          <p className="text-2">
            🖼️ สร้างฉากหลังสุดเท่ในเกมโดยใช้ AI
          </p>
          <p className="text-2">
            🤖 เรียนรู้วิธีบอก Ai ยังไงให้ได้ฉากถูกใจ
          </p>
          <p className="text-2">
            🎨 เรียนรู้วิธีการตกแต่งฉากให้สวยงาม
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-3.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-3.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 3 C# Basic</b></h3>
          <p className="text-1">
            สอนน้องๆ ให้เข้าใจพื้นฐานภาษา C#
          </p>
          <p className="text-2">
            🧑🏽‍💻 เรียนรู้พื้นฐานการเขียนโปรแกรมภาษา C#
          </p>
          <p className="text-2">
            🧠 มาอ่าน code C# แบบง่ายๆ กัน
          </p>
          <p className="text-2">
            🔥 ได้ฝึกเขียน และ นำไปใช้กับโปรแกรม Unity
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-4.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-4.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 4 Character Movement</b></h3>
          <p className="text-1">
            เริ่มสร้างระบบสร้างตัวละครและทำให้ตัวละครของน้องๆสามารถเดินได้
          </p>
          <p className="text-2">
            🎨 ดีไซน์ตัวละครสุดเท่ของตัวเองขึ้นมาและนำไปให้ AI สร้างให้
          </p>
          <p className="text-2">
            🧑🏽‍💻 เขียนโค้ดทำให้ตัวละครสามารถขยับได้ด้วยภาษา C#
          </p>
          <p className="text-2">
            🌈 สร้าง Animation เพิ่มความสดใสให้เกมของเรา
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-5.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-5.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 5 Enemy System</b></h3>
          <p className="text-1">
            สร้างระบบ Enemy ขึ้นมาเพื่อทำให้เกมของเราสนุกและท้าทายมากยิ่งขึ้น
          </p>
          <p className="text-2">
            🎨 ดีไซน์ตัวละครสุดเท่ของตัวเองขึ้นมาและนำไปให้ AI สร้างให้
          </p>
          <p className="text-2">
            🧑🏽‍💻 ทำให้ Enemy สามารถขยับและโจมตีผู้เล่นได้
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-6.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-6.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 6 Basic UI</b></h3>
          <p className="text-1">
            สอนพื้นฐานการสร้าง UI ในเกมทำให้เกมของน้องๆสมบูรณ์มากยิ่งขึ้น
          </p>
          <p className="text-2">
            🏫 เรียนรู้พื้นฐานการทำ UI เบื้องต้น
          </p>
          <p className="text-2">
            🎨 นำภาพที่ได้จาก AI มาประกอบเป็นหน้า Menu ในเกม
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-7.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-7.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Day 7 Sound by AI</b></h3>
          <p className="text-1">
            สร้างระบบเสียงเพิ่มชีวิตชีวาให้เกมของน้องๆ ด้วยเสียงจาก AI
          </p>
          <p className="text-2">
            😎 สร้างเพลงเอฟเฟค และ เพลงสุดเท่ให้เกมของน้องๆ ด้วย AI
          </p>
          <p className="text-2">
            🎵 นำเพลงเข้ามาสร้างสีสันให้กับเกมของน้องๆ บน Unity
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-8.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/AIGame/AIGame-8.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-detail">
          <h3><b>Day 8 Showcase & Build</b></h3>
          <p className="text-1">
            น้องๆ จะได้นำเสนอผลงานเกมของตัวเองและนำเกมขึ้นบนเว็บไซท์ Itch.io
          </p>
          <p className="text-2">
            🥳 นำเสนอเกมที่น้องๆ สร้างขึ้นมา
          </p>
          <p className="text-2">

            🧑🏽‍💻 พี่ๆ คอมเม้นงานน้องๆและแนะนำแนวทางการต่อยอด
          </p>
          <p className="text-2">
            📢 พาน้องๆ นำเกมของตนเอง Publish ขึ้น Itch.io
          </p>
        </div>
        <br />
      </div>
    </div>
  );
}
export default AiGameDeatail;
