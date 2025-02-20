import React from "react";
import "./CourseHeader.css";
import Image from "next/image";

function CourseHeader() {
    const HeaderImgDesktop = "https://nj.dekhub.com/public/roblox/imgs/Roblox-Header.png"
    const HeaderImgMobile = "https://nj.dekhub.com/public/roblox/imgs/RobloxMobile.png"
    return (
        <div className="Unity-Header">
            <div className="Header-Roblox-Image">
                <Image src={HeaderImgDesktop} alt="" width={1920} height={1080} priority className="Img-desktop" />
                <Image src={HeaderImgMobile} alt="" width={1920} height={1080} priority className="Img-mobile" />
            </div>
            <div className="Header">
                <h2>Roblox สำคัญอย่างไร</h2>
            </div>
            <div className="Header-Detail">
                <p>Roblox มีความสำคัญสำหรับเด็กเล็กในหลายแง่มุม เพราะมันไม่ใช่แค่เกม แต่ยังเป็นเครื่องมือการเรียนรู้และพัฒนาทักษะต่าง ๆ ได้อย่างดี</p>
                <div className="Header-Detail-Box">
                    <p>1. การพัฒนาความคิดสร้างสรรค์</p>
                    <p>2. การพัฒนาทักษะด้านเทคโนโลยี</p>
                    <p>3. การทำงานร่วมกัน</p>
                    <p>4. การพัฒนาทักษะการแก้ปัญหา</p>
                    <p>5. การเสริมทักษะทางสังคม</p>
                    <p>6. การสร้างแรงบันดาลใจในการเรียนรู้</p>
                </div>
                <div className="Header">
                    <h2>เส้นทางการพัฒนาเด็ก</h2>
                </div>
                {/* <div className="Header">
                    <h2>สอนอย่างไรให้ได้ใจเด็ก</h2>
                </div>
                <div className="Header">
                    <h2>ขั้นตอนสู่ผลงานบนสโตร์</h2>
                </div> */}
                <div className="Detail-Box">
                    <div className="Header-Detail-Box2">
                        <h3>Beginner</h3>
                        <p><b>ทำความคุ้นเคยกับ Roblox Studio</b></p>
                        <p>ทำความรู้จักกับ Roblox Studio</p>
                        <p>ใช้ Roblox Studio</p>
                        <p>สร้าง Obby Game เบื้องต้น</p>
                    </div>
                    <div className="Header-Detail-Box2">
                        <h3>Basic</h3>
                        <p><b>เรียนรู้การพัฒนาเกมเบื้องต้น</b></p>
                        <p>ออกแบบเกม</p>
                        <p>เพิ่มลูกเล่นในเกม</p>
                        <p>เขียนโค้ดพื้นฐาน</p>
                    </div>
                    <div className="Header-Detail-Box2">
                        <h3>Intermediate</h3>
                        <p><b>เขียนโค้ดสร้างเกมที่ซับซ้อนขึ้น</b></p>
                        <p>เขียนสคริปต์เชิงลึก</p>
                        <p>สร้าง NPC และระบบ AI</p>
                        <p>พัฒนาเกม OpenWorld เบื้องต้น</p>
                    </div>
                    <div className="Header-Detail-Box2">
                        <h3>Advanced</h3>
                        <p><b>พัฒนาเกมที่สมบูรณ์แบบ</b></p>
                        <p>พัฒนาระบบเกมที่ซับซ้อน</p>
                        <p>สร้างระบบเกมที่มีเงื่อนไข</p>
                        <p>ออกแบบ UX/UI
                        </p>
                    </div>
                </div>
            </div>
            <br />
            <div className="Header">
                <h2>Opening Roblox Courses</h2>
            </div>
        </div>
    );
}

export default CourseHeader;
