import React from "react";
import "./CourseContent.css";
import Image from "next/image";
import roadmap from "../../../../public/pxp_road_map.svg"
import pxp8 from "../../../../public/pxp-8.svg"
import pxp9 from "../../../../public/pxp-9.svg"

function CourseContent({ }) {
  let content_detail = [
    {
      "header": "1. Conceptual Design",
      "content": "ออกแบบแนวคิดที่แตกต่าง หรือมีประโยชน์ชัดเจน นำไปสู่ชัยชนะร่วมกับผู้เชี่ยวชาญ"
    },
    {
      "header": "2. Personal Coach",
      "content": "เจาะลึกถึงจุดอ่อนและจุดแข็งของทีมงานทุกคน และดึงศักยภาพมาพัฒนาผลงานที่เข้ากับตัวเอง"
    },
    {
      "header": "3. Prototype",
      "content": "สร้างต้นแบบเพื่อเก็บประสบการณ์การใช้งานและความคิดเห็นในกลุ่มผู้ทดสอบ 🧐"
    },
    {
      "header": "4. Simulation",
      "content": "จำลองสถานการณ์ให้เหมือนจริง ก่อนจะลงพื้นที่ทดสอบจริง"
    },
    {
      "header": "5. UX/UI Design",
      "content": "ออกแบบประสบการณ์ที่ดีที่สุด เพื่อให้ประทับใจผู้ใช้งาน"
    },
    {
      "header": "6. เลือกเทคโนโลยีที่เหมาะกับตัวผลงาน",
      "content": "เพื่อความเร็วในการพัฒนา ⚡ และคุณภาพผลงานที่ดีที่สุด"
    },
    {
      "header": "7. เข้าร่วมการแข่งและโชว์ผลงาน",
      "content": "ในรายการระดับประเทศ เช่น NSC, YSC, Thailand Game Show, Global Game Jam, The New Gen และอื่นๆ 🎤🏆"
    },
    {
      "header": "8. Agile Techniques",
      "content": "พัฒนาแบบลงรายละเอียดเพิ่มเติมทีละส่วนและเก็บรายละเอียดแบบมืออาชีพ"
    },
    {
      "header": "9. พัฒนาผลงานแล้วนำขึ้น Store",
      "content": "เก็บรายละเอียดจนสมบูรณ์ เข้าถึงผู้คนทั้งโลก และสร้างรายได้ 💰"
    }
  ]
  return (
    <div className="course-content">
      <div className="content-text">
        <Image src={pxp8} className="img-desktop" width={2000} height={1000} priority />
        <Image src={pxp8} className="img-mobile" width={400} height={300} priority />
        <Image src={pxp9} className="img-desktop" width={2000} height={1000} priority />
        <Image src={pxp9} className="img-mobile" width={400} height={300} priority />
        {/* <h3>โครงการพัฒนาผลงานเพื่อเข้ารอบ Port มหาวิทยาลัยระดับท็อป</h3>
        <p>
          🌟 เน้นสอนพื้นฐานเฉพาะที่จำเป็นสำหรับพัฒนาผลงาน ☯ให้ความสำคัญกับการออกแบบผลงานที่แตกต่าง☯<br />&quot;เน้นใช้ประโยชน์ หรือเล่นได้สนุกจริง&quot;
        </p>
        <p>
          🔥 ฝึกสร้างความเหนือชั้น วาง Concept สุดยอดเข้ากับประสบการณ์ออกแบบ ต่อยอดจากผลงานระดับโลก 🌍<br />สู่ความเป็นมืออาชีพและรางวัลจากรายการที่มีชื่อเสียงทั้งในและต่างประเทศ 🏆
        </p>
        <p>
          🎮 เริ่มด้วยความสนุก ออกแบบเป้าหมายร่วมกัน พัฒนาเส้นทางสู่การยกระดับผลงานสู่ระดับ Pro 🚀<br />ด้วยการคุมคุณภาพทุกขั้นตอน แล้วนำไปใช้ประโยชน์ได้จริง
        </p> */}
        <br />
        <br />
      </div>
      <div className="course-img">
        <Image
          src={roadmap}
          alt="NSC"
          width={1200}
          height={1200}
          id="content-img-desktop"
          priority
        />
        <Image
          src={roadmap}
          alt="NSC"
          width={1200}
          height={1200}
          id="content-img-mobile"
          priority
        />
      </div>
      <div className="course-item">
        <ul>
          {content_detail.map((item, index) => (
            <li key={index}>
              <h4>{item.header}</h4>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
        <br />
      </div>
    </div>
  );
}

export default CourseContent;
