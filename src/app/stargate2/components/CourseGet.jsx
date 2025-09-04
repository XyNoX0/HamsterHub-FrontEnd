import React from "react";
import "./CourseGet.css";

function CourseGet({ }) {
  let get_list = [
    {
      "title": "👨‍🏫 ฝึกกับผู้เชี่ยวชาญที่สร้างทีมเข้ารอบชิง 7 ผลงาน ใน NSC-2024",
      "description": ""
    },
    {
      "title": "📂 แนวทางสู่ผลงานเพื่อใช้เข้ารอบ Portfolio",
      "description": ""
    },
    {
      "title": "🏆 เทคนิคส่งผลงานเข้าแข่งขันรายการระดับประเทศ",
      "description": ""
    },
    {
      "title": "🤝 ฝึกทำงานเป็นทีม ได้แก้ปัญหาพร้อมเพื่อนๆ 👩‍💻👨‍💻",
      "description": ""
    },
    {
      "title": "🖥️ ฝึกเขียน Python และสร้างเกมด้วย Unity ที่ทำให้น้องได้เปรียบจนจบมหาวิทยาลัย 🚀",
      "description": ""
    }
  ]

  return (
    <div className="course-get">
      <br />
      <h3 id="coursegettext">สิ่งสำคัญในกิจกรรม</h3>
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
