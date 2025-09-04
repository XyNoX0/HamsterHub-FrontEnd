import React from "react";
import "./CourseGet.css";
import Image from "next/image";

function CourseGet() {
  return (
    <div className="course-get">
      <Image src="https://nj.dekhub.com/public/imgs/s2uPoster.png" width={1920} height={1080} priority />
      <p style={{ width: '80%' }}>
        เริ่มด้วยการแนะนำแนวทางการเรียนต่อในสาขายอดฮิต สู่การสร้างรายได้หลังเรียนจบ แล้วเข้าสู่ภารกิจทั้ง 2 Phase<br /><br />

        Phase 1: Human Intelligence Test<br />
        📌 สิ่งที่น้องจะได้รับ<br />
        1. วิธีการทดสอบ และผลที่จะได้จากการแสดงออกของเรา<br />
        2. ทดสอบความสามารถด้านการเรียนรู้ด้วยตนเอง<br />
        - การถอดรหัส<br />
        - การค้นหาวิธีแก้ปัญหาในหลายรูปแบบ<br />
        3.ทดสอบ Logic และการใช้เหตุผล<br />
        - การเก็บข้อมูล<br />
        - การสลับตำแหน่ง<br />
        - การประมวลผล<br />
        4. ทดสอบความสามารถด้านการแก้ปัญหาที่ซับซ้อน<br />
        - ทักษะการแก้ปัญหา<br />
        - การนำเสนอวิธีแก้ปัญหา<br /><br />

        Phase 2: เลือกภารกิจตามความสนใจและความถนัดในแต่ละคณะ, สาขาอาชีพ<br />
        📌 เส้นทางและภารกิจที่จะได้รับ<br />
        1. Health Science & Medical<br />
        - วิเคราะห์เคส และคิดวิธีแก้<br />
        - Research & Analyse<br />
        2. Engineering & Programming & AI<br />
        - Algorithm<br />
        - Project with AI<br />
        3. Game Design & Dev<br />
        - โจทย์ &quot;Make it Fun Game&quot;<br />
        - Design Board Game ให้เพื่อนเล่น<br />
        4. Creative & Design<br />
        - วาดรูปตัวละคร<br />
        - แต่งเรื่องราวชวนน่าติดตาม<br />
        - ออกแบบบ้านในฝัน<br />
        5. Business & Startup<br />
        - วิเคราะห์ธุรกิจ และจำลองการซื้อหุ้น<br />
        - ลองทำการตลาดด้วยเคสจริง<br />
      </p>
    </div>
  );
}

export default CourseGet;
