import React from "react";
import "./CourseGet.css";

function CourseGet({ }) {
  let get_list = [
    {
      "title": "👨‍🏫 ฝึกกับผู้เชี่ยวชาญ",
      "description": "ฝึกกับทีมงานผู้ปั้นน้องๆ ที่ได้เข้ารอบชิง 7 ผลงาน ใน NSC-2024 และเข้าวิศวะคอมฯ ม.ระดับท็อปกว่า 20 คน"
    },
    {
      "title": "📂 ผลงาน เข้ารอบ Portfolio",
      "description": "ผลงานที่มั่นใจเข้ารอบ Port 🎓 + ฝีมือระดับน้องๆ วิศวะคอมฯ"
    },
    {
      "title": "🏆 เข้าแข่งขันรายการระดับประเทศ",
      "description": "เข้าร่วมแข่งขันรายการที่เลือกสรร 🎤 up ประสบการณ์เทพๆ"
    },
    {
      "title": "🎉 ฝึกทำงานเป็นทีม",
      "description": "ฝึกทำงานเป็นทีม 🤝 ได้แก้ปัญหาพร้อมเพื่อนๆ 👩‍💻👨‍💻"
    },
    {
      "title": "🌟 ทักษะสำคัญ",
      "description": "ทักษะสำคัญในโลกเทคโนโลยี 🖥️ ที่ทำให้น้องได้เปรียบจนจบมหาวิทยาลัย 🚀"
    }
  ]

  return (
    <div className="course-get">
      <video
        controls
        playsInline
        className="pxp-video-desktop"
      >
        <source src="https://nj.dekhub.com/public/videos/PXS69.mp4" type="video/mp4" />
      </video>
      <video
        controls
        playsInline
        className="pxp-video-mobile"
      >
        <source src="https://nj.dekhub.com/public/videos/PXS69.mp4" type="video/mp4" />
      </video>
      <h3 id="coursegettext">สิ่งที่ได้รับ</h3>
      <div className="course-get-text">
        <ul>
          {get_list.map((item, index) => (
            <li key={index}>
              <h4>{item.title}</h4>
              {item.description && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseGet;
