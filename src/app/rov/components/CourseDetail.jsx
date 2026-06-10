import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function CourseDetail() {
  const clip = "https://www.youtube.com/embed/dMxSbS1uWDE";
  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <h1>
          RoV Hamster Cup 2025
        </h1>
        <h4>เตรียมพบการแข่งขัน RoV Hamster Cup 2025 ปลายเดือนมีนาคมนี้ พร้อมเพื่อนๆ ชาว Hamster Hub !</h4>
      </div>
      <div style={{ width: "max-content", margin: "auto", height: "auto" }}>
        <Image src="https://nj.dekhub.com/public/imgs/ROVPoster.png" className="img-desktop" width={1200} height={700} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/ROVPoster.png" className="img-mobile" width={350} height={250} priority alt="" />
      </div>
      <br />
      <div className="course-detail-text">
        <p>
          <b>คุณสมบัติ</b> <br />
          - ผู้สมัครให้เป็น เด็กมัธยมศึกษา <br />
          - แข่งขันประเภททีมประกอบด้วยผู้เล่น จำนวน 5 คน และผู้เล่นสำรองไม่เกิน 2 คน <br />
          - ชื่อทีมต้องสุภาพ และได้รับการตรวจสอบจากทีมงานล่วงหน้า <br />
          - ผู้สมัคร ช่วยกรอกรายละเอียดให้เรียบร้อยด้วยครับพี่ <br />
          - ผู้สมัครต้องมีตัวละครมากกว่า 18 ตัว สำหรับการแข่งขัน Tournament Mode <br />
          - ห้ามจงใจหลุดจากการแข่งขัน <br />
          - ห้ามทำให้ฝั่งตรงข้ามชนะอย่างชัดเจน (ล้มมวย) <br />
          - ห้ามมิให้เพิ่มรายชื่อผู้เข้าแข่งขันหรือเปลี่ยนตัวผู้เข้าแข่งขันภายหลังจากการประกาศสายเสร็จสิ้น <br />
        </p>
      </div>
      <br />
    </div>
  );
}
export default CourseDetail;
