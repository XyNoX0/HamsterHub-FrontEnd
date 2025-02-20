import React from "react";
import "./CourseHeader.css";
import Image from "next/image";

function CourseHeader() {
    const text = '<p><strong style="color: #007bff;">เด็กส่วนใหญ่ชอบเกม</strong> ถึงขั้นติด และใช้เวลากับการเล่นเกม🎮 ดูคลิป และพูดคุยเกี่ยวกับเกมหลายชั่วโมงต่อวัน</p> <p style="padding: 15px"></p> <p><em>น้องที่ได้ฝึกพัฒนาเกม</em> จะมีมุมมองของผู้พัฒนา เมื่อเล่นเกมจะเริ่ม <span style="text-decoration: underline;">วิเคราะห์</span> และเรียนรู้เทคนิคในเกมที่ชื่นชอบ</p> <p style="padding: 15px"></p> <p><strong style="color: #ff6600;">Game Lab</strong> จึงมอบโอกาสให้น้องๆ ได้สมัครเข้ามา <span>ฝึกเล่นเกมแบบผู้สร้าง</span>,  ฝึกการวิเคราะห์องค์ประกอบในเกม รวมถึง <span style="color: #d63384;">กลไก</span> และ <span style="color: #17a2b8;">โปรแกรม</span> ที่ใช้สร้าง  <br>💡 <strong>ผู้ที่นำเสนอได้ตามเกณฑ์มากที่สุด</strong> จะได้รับ <span style="color: #ff4444;">ทุนการศึกษา</span>  หรือได้เข้าร่วมการฝึกสร้างองค์ประกอบ (Asset) ของเกม<br>เป็นระยะเวลา 2 เดือน (40 วัน = 80 ชม.) <p style="padding: 15px"></p>🎯 <span style="font-style: italic;">พร้อม Workshop🛠️ พิเศษ</span> สำหรับผู้ที่พัฒนาผลงานได้ดี สามารถต่อยอดเป็นสินค้าบน Store ได้</p>  <p><b style="color: #6f42c1;">กลุ่มเป้าหมาย:</b>  <u>นักเรียนมัธยม 200 คน</u> ที่ชอบเล่นเกม และสนใจพัฒนา Asset</p>'
    return (
        <div>
            <div className="course-hero">
                <div className="course-hero-img">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://nj.dekhub.com/public/videos/GameLab.mov" type="video/mp4" />
                    </video>
                    <div className="course-overlay">
                        <div className="course-text">
                            <h1>Game Lab </h1>
                            <h2>Summer Camp 2025</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="course-content">
                <div className="content-text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
        </div>
    );
}

export default CourseHeader;
