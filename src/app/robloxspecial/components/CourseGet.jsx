import React from "react";
import "./CourseGet.css";
import Image from "next/image";

function CourseGet() {
  const get_list = [
    {
      title: "✅ เกมเล็ก 1 เกมที่สามารถเล่นได้จริง (เช่น Obby / Adventure RPG ง่าย ๆ)",
      description: ""
    },
    {
      title: "✅ เข้าใจการใช้ Roblox Studio + เขียน Lua Script เบื้องต้น",
      description: ""
    },
    {
      title: "✅ ได้ลองวิเคราะห์และสร้างระบบจากเกมดัง",
      description: ""
    },
    {
      title: "✅ พร้อมสำหรับการสร้างไอเดียและทีมเพื่อเข้าสู่ Roblox Game Jam",
      description: ""
    }
  ]
  return (
    <div className="course-get">
      <Image src="https://nj.dekhub.com/public/imgs/RBspecialPoster.png" width={1920} height={1080} priority />
      <br />
      <h3 id="coursegettext">🎁 สิ่งที่ได้</h3>
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
