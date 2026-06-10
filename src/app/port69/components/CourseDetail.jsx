import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function CourseDetail() {
  return (
    <div className="course-detail-container">
      <div className="course-port-1">
        <div className="course-detail-img">
          <Image src="https://nj.dekhub.com/public/imgs/port-1.png" className="img-desktop" width={1300} height={800} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port-1.png" className="img-mobile" width={350} height={250} priority alt="" />
        </div>
        <div className="course-detail-text">
          <p>
          เปิดเส้นทางอนาคต แต่แค่พูดก็<span className="black">หาว่าโม้</span><br />
          ลองฝึก <span className="black">สร้างของจริง</span> <br />
          ได้ <span className="black">&quot;มั่นใจ&quot;</span> ว่าเราชอบอะไรกันแน่ 
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className="course-port-2">
        <div className="course-detail-timeline">
          <div className="timeline-header">
            <h1>TIMELINE</h1>
          </div>
          <br />
          <div className="timeline-detail">
            <h3>Day 1</h3>
            <p>
              พี่มหาลัยแนะนำสาขาสำคัญสายเทคฯ <br />
              ให้น้องได้เลือกเส้นทางที่สนใจ
            </p>
            <br />
            <p>
              🐍 Python : ใครอยากลองเป็น Programmer นี่เลย! จุดเริ่มต้นทุกสิ่ง <br />
              🌐 Web&App : เปลี่ยนไอเดียให้เป็นของเจ๋งที่ใช้ประโยชน์ได้จริง <br />
              🎮 Game : ฝันอยากสร้างเกมให้ปังและดัง? เจอกัน! <br />
              🎬 3D&Animation : ถ่ายทอดความคิดสร้างสรรค์ผ่านงาน 2D, 3D และ Presentation <br />
            </p>
          </div>
          <br />
          <div className="course-detail-img-2">
            <Image src="https://nj.dekhub.com/public/imgs/port-2.png" className="img-desktop" width={2000} height={1000} priority alt="" />
            <Image src="https://nj.dekhub.com/public/imgs/port-2.png" className="img-mobile" width={400} height={300} priority alt="" />
          </div>
          <br />
          <div className="timeline-detail">
            <h3>Day 2</h3>
            <p>
              ภารกิจที่เป็นไปได้  <br />
              ฝึกฝีมือในด้านที่เราสนใจ ภายใต้โจทย์ที่ท้าทาย <br />
              ทดลองสร้างผลงานจริง <br />
            </p>
            <br />
            <p>
              🐍 Python : ฝึกสร้าง App ด้วย Algorithm ที่คิดเอง <br />
              💻 Web&App : ออกแบบและพัฒนาเว็บด้วย HTML, CSS และ JavaScript <br />
              🎮 Game : สร้าง Scene และใส่ Gameplay ให้เกมเราเล่นได้จริง <br />
              🏗 3D&Animation : ฝึกปั้น Model และสร้าง Animation ให้สมจริง <br />
              🏅 รับภารกิจสุดท้าย พิชิตรางวัลใหญ่ <br />
            </p>
          </div>
          <br />
          <div className="course-detail-img-2">
            <Image src="https://nj.dekhub.com/public/imgs/port-3.png" className="img-desktop" width={2000} height={1000} priority alt="" />
            <Image src="https://nj.dekhub.com/public/imgs/port-3.png" className="img-mobile" width={400} height={300} priority alt="" />
          </div>
          <br />
          <div className="timeline-detail">
            <h3>Day 3</h3>
            <p>
              นำเสนอผลงาน และรับรางวัล <br />
              🔹 พี่ๆ ช่วยแนะนำและต่อยอดผลงาน <br />
              🔹 ฝึกนำเสนอผลงาน ร่วมกับเพื่อนๆ <br />
              🏆 ผู้ที่ผ่านการคัดเลือกผลงานดีเด่น ลุ้นโชครับรางวัล <br />
            </p>
            <br />
            <p>
              ✨ รางวัลทุนการศึกษา💰 สำหรับการพัฒนาผลงานใน Phase 2 (5 วัน) <br />
              เพื่อต่อยอดสู่ผลงานที่ใช้เข้ามหาวิทยาลัยดังในรอบ Portfolio 🎓
            </p>
          </div>
          <br />
        </div>
      </div>
      <br />
      <div className="course-gif">
        <div className="course-git-container">
          <div className="course-gif-text">
            <h3>3D & Animation</h3>
            <p>
              แสดงออกความคิดสร้างสรรค์ผ่าน <br />
              งาน 2D, 3D และ Presentation <br />
              ที่ไม่มีขีดจำกัด
            </p>
          </div>
          <div className="img-gif">
            <Image
              src="https://nj.dekhub.com/public/videos/port-4.gif"
              alt="Animated GIF"
              className="img-desktop"
              width={700}
              height={700}
              priority/>
            <Image
              src="https://nj.dekhub.com/public/videos/port-4.gif"
              alt="Animated GIF"
              className="img-mobile"
              width={200}
              height={200}
              priority />
          </div>
        </div>
      </div>
      <br />
      <div className="course-detail-2">
        <div className="course-detail-img-4">
          <Image src="https://nj.dekhub.com/public/imgs/port-6.png" className="img-desktop" width={600} height={400} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port-6.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="course-detail-text-2">
          <p>
            ไม่ว่าน้องจะชอบแบบไหน <br />
            สร้างอะไรออกมา
          </p>
        </div>
      </div>
      <br />
      <div className="course-detail-img-3">
        <Image src="https://nj.dekhub.com/public/imgs/port-5.png" className="img-desktop" width={2000} height={1000} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/port-5.png" className="img-mobile" width={450} height={400} priority alt="" />
      </div>
      <div className="course-port-3">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="course-detail-2">
          <div className="course-detail-img-4">
            <Image src="https://nj.dekhub.com/public/imgs/port-7.png" className="img-desktop" width={600} height={400} priority alt="" />
            <Image src="https://nj.dekhub.com/public/imgs/port-7.png" className="img-mobile" width={400} height={300} priority alt="" />
          </div>
          <div className="course-detail-text-2">
            <p>
              น้องจะได้ทำอย่างมีความสุข <br />
              แล้วผลงานก็จะออกมาดี <br />
              มีคุณภาพสูง
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="course-detail-2">
          <div className="course-detail-img-4">
            <Image src="https://nj.dekhub.com/public/imgs/port-8.png" className="img-desktop" width={600} height={400} priority alt="" />
            <Image src="https://nj.dekhub.com/public/imgs/port-8.png" className="img-mobile" width={400} height={300} priority alt="" />
          </div>
          <div className="course-detail-text-2">
            <p>
              เข้ามหาวิทยาลัยดังๆ ได้สบาย <br />
              ⬇ เหมือนคลิปพี่ๆ Hamsters ด้านล่างเลย ⬇
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
export default CourseDetail;
