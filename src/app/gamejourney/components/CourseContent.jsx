import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <div className="content-text">
        <h3>อยากสร้างเกมเป็นของตัวเองไหม? 🕹️✨</h3>
        <p>
          กิจกรรม “รู้จัก Game Engine และสายงานเกมสร้างฝัน” คือโอกาสดีสำหรับน้อง ๆ มัธยมต้นและปลายที่อยากก้าวสู่โลกของนักพัฒนาเกม! <br /> <br />
          ภายใน 2 วัน นี้ น้อง ๆ จะได้: <br />
          ✅ ทำความรู้จักกับ 2 โปรแกรมสร้างเกมยอดนิยมระดับโลก: Unity 6 และ Unreal Engine 5 <br />
          ✅ ลองสร้างเกมเล็ก ๆ ด้วยตัวเองแบบง่าย ๆ โดยไม่ต้องมีพื้นฐานมาก่อน <br /> <br />
          นอกจากนี้ยังได้เปิดโลกสายงานต่าง ๆ ที่เกี่ยวข้องกับการทำเกม ไม่ว่าจะเป็น: <br />
          🎨 2D / 3D Art <br />
          🎧 Sound Design <br />
          🎬 Animation (2D/3D) <br />
          🖥️ UX/UI Design <br />
          🧩 Game Design <br />
          📖 Storytelling <br /> <br />
          น้อง ๆ จะได้ลองสัมผัสแต่ละสายแบบสนุก ๆ และค้นหาว่า…ตัวเองเหมาะกับบทบาทไหนในโลกแห่งการสร้างเกม! 🌟 <br /> <br />

          🔹 วันที่ 1 (3 ชั่วโมง) <br />
          หัวข้อหลัก: เริ่มต้นสู่โลก Game Engine + Unity 6 เบื้องต้น <br />  <br />
          💡 ช่วงที่ 1 (60 นาที): <br />
          โลกของนักพัฒนาเกม & ภาพรวมสายงานเกม <br /> <br />
           - เกมคืออะไร <br /> <br />
           - พัฒนาเกมต้องมีอะไรบ้าง <br /> <br />
          อธิบายสายงานหลักในเกม: <br />
          🎨 2D/3D Art <br />
          🧩 Game Design <br />
          🎬 Animation <br />
          🎧 Sound <br />
          🎮 Programming <br /> <br />
          🛠️ เครื่องมือยอดนิยมที่มือใหม่ใช้ได้:<br />
          🖌️ Krita / ibisPaint (2D Art)<br />
          🧊 Blender (3D Model + Animation) <br />
          🔊 Audacity / LMMS (Sound) <br />
          🗺️ Tiled (2D Level Design) <br />
          🖍️ Figma (UX/UI) <br />
          📝 Twine (Story) <br />
          📄 Google Docs / Notion (Game Design Doc) <br /><br />
          ✅ ของที่ได้รับ: <br />
          มินิชีท “แผนผังอาชีพในสายเกม” พร้อมตัวอย่างเครื่องมือ <br /> <br />
          💡 ช่วงที่ 2 (60 นาที): <br />
          🛠️ รู้จัก Unity 6 – Game Engine สุดฮิต <br />
          - จุดเด่นของ Unity 6 <br />
          - ตัวอย่างเกมดังที่ใช้ Unity <br />
          - แนะนำอินเทอร์เฟส, GameObject, Script <br /> <br />
          🎮 Workshop: <br />
          สาธิตสร้างเกม 2D ง่าย ๆ เช่น กดปุ่มให้ตัวละครเดิน <br /> <br />
          💡 ช่วงที่ 3 (60 นาที): <br />
          🧪 ลงมือทดลอง! Unity Mini Lab <br /> <br />
           - ลองสร้างฉากเกมเล็ก ๆ เอง <br /> <br />
           - วางตัวละคร, พื้น, ปุ่มควบคุมง่าย ๆ <br /> <br />
          เทมเพลตให้เลือก: <br />
          🚧 “เกมเดินหลบสิ่งกีดขวาง” <br />
          💰 “เกมกระโดดเก็บเหรียญ” <br /> <br />
          🔸 วันที่ 2 (3 ชั่วโมง) <br />
          หัวข้อหลัก: รู้จัก Unreal Engine 5 + สายงานสร้างเกมเพิ่มเติม <br /> <br />
          💡 ช่วงที่ 1 (60 นาที): <br />
          ⚙️ รู้จัก Unreal Engine 5 – พลังแห่ง AAA <br /> <br />
           - จุดเด่น: Nanite, Lumen, Blueprint <br /> <br />
           - ตัวอย่างเกมดังที่ใช้ UE5 <br /> <br />
           - เปรียบเทียบกับ Unity (มือใหม่ควรเลือกอะไร?) <br /> <br />
          🎮 Workshop: <br />
          สาธิตสร้างเกม 3D ง่าย ๆ โดยใช้ Blueprint <br /> <br />
          💡 ช่วงที่ 2 (60 นาที): <br />
          🔍 แนะนำอาชีพเสริมในเกม: <br />
          ✏️ 2D Artist: Krita, ibisPaint <br />
          🧊 3D Modeler: Blender <br />
          📣 Sound Designer: เอฟเฟกต์เสียง <br />
          ✍️ Game Writer: Twine, Notion <br /> <br />
          💡 ช่วงที่ 3 (60 นาที): <br />
          🚀 Game Pitch & Show Time! <br /> <br />
           - แต่ละกลุ่มเลือก Game Engine หรือสายงานที่สนใจ <br /> <br />

           - คิดไอเดียเกมและนำเสนอ <br /> <br />
        </p>
      </div>
    </div>
  );
}

export default CourseContent;
