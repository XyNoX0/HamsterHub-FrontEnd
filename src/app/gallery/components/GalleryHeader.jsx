import React from "react";
import "./GalleryHeader.css";

function GalleryHeader() {
  return (
    <div className="galleryHeader">
      <video
        src="/assets/Gallery.mp4"
        className="galleryHeader-desktop"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
      ></video>
      <video
        src="/assets/Gallery-Mobile.mp4"
        className="galleryHeader-mobile"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
      ></video>
      <div className="galleryHeader-header">
        {/* <h2>รวมส่วนหนึ่งของผลงาน ที่สร้างสรรค์โดยชาว Hamster</h2> */}
        <div className="box">
          <div className="box-img">
            <img src="https://nj.dekhub.com/public/imgs/Gallery/Washington.png" alt="" />
          </div>
          <div className="box-video">
            <video src="https://nj.dekhub.com/public/videos/Gallery/mrCITY.mp4" controls></video>
          </div>
          <div className="box-text">
            <h1>mrCITY StartUp จากเด็กมัธยม</h1>
            <p>จากความหลงใหลในเมืองเก่าสงขลา สู่การสร้างแอปท่องเที่ยวที่ทำให้ทุกการเดินทางเต็มไปด้วยความสนุก โปรเจคนี้ไม่เพียงคว้ารางวัลรองชนะเลิศ NSC แต่ยังเป็นกุญแจสำคัญที่นำพาทั้งทีมสู่มหาวิทยาลัยชั้นนำทั้งทีม</p>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src="https://nj.dekhub.com/public/imgs/Gallery/Chula.png" alt="" />
          </div>
          <div className="box-video">
            <video src="https://nj.dekhub.com/public/videos/Gallery/VeggieDash.mp4" controls></video>
          </div>
          <div className="box-text">
            <h1>ทำผลงาน 4 เดือนเข้าม.จุฬา CEDT!!</h1>
            <p>รับบทเป็นแครอทผจญภัยช่วยเพื่อนๆจากเจ้าบอสตัวร้าย จนคว้ารางวัลรองชนะเลิศอันดับที่สอง NSC และพาพี่แมคเข้า CEDT จุฬา รอบพอร์ตได้แบบชิวๆ</p>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src="https://nj.dekhub.com/public/imgs/Gallery/KU.png" alt="" />
          </div>
          <div className="box-video">
            <video src="https://nj.dekhub.com/public/videos/Gallery/JamBest.mp4" controls></video>
          </div>
          <div className="box-text">
            <h1>เกม Roblox ที่ได้ Winner Hamster GameJam</h1>
            <p>เกม Bullet Hell จาก Roblox Studio แต่สามารถเอาชนะทุกคนได้ใน Hamster Hub Game Jam Sp1 และผลงานนี้เองที่พี่เบสใช้ยื่นเข้ารอบพอร์ต คณะวิศวะคอม มก.</p>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src="https://nj.dekhub.com/public/imgs/Gallery/KMUTT.png" alt="" />
          </div>
          <div className="box-video">
            <video src="https://nj.dekhub.com/public/videos/Gallery/Flukz.mp4" controls></video>
          </div>
          <div className="box-text">
            <h1>เรียนทำเกม 2 เดือนได้ผลงานติดบางมด</h1>
            <p>เกมสอน C# สไตล์ 2D Side Scroll ตัวเอกเป็นแฮมสเตอร์ ลงแข่ง Game Jam และพี่ฟรุ๊คใช้ยื่นวิศวะคอมบางมด ติดรอบพอร์ต</p>
          </div>
        </div>
        <div className="box">
          <div className="box-img">
            <img src="https://nj.dekhub.com/public/imgs/Gallery/CM.png" alt="" />
          </div>
          <div className="box-video">
            <video src="https://nj.dekhub.com/public/videos/Gallery/NSCPangR2.mp4" controls></video>
          </div>
          <div className="box-text">
            <h1>ทำเกม 1 ปีเต็มจนได้ที่ 2 ของประเทศ</h1>
            <p>ผลงานพี่แป้ง เกมสองผู้เล่น “ดินสอ” กับ “ยางลบ” คว้ารองชนะเลิศ NSC และยื่นเข้าม.เชียงใหม่ ติดรอบพอร์ต </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryHeader;
