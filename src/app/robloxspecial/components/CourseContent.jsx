import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent() {

  return (
    <div className="course-content">
      <div className="content-text">
        <h3>คำอธิบายกิจกรรม</h3>
        <p>
          Roblox Game Special – สร้างเกมสุดเจ๋งก่อนลงสนาม Game Jam! <br />
          🎮 อยากสร้างเกม Roblox เป็นไหม?! เตรียมตัวให้พร้อมกับคอร์สเรียน Roblox Studio สุดมันส์! <br />
          เรียนสดทุกเสาร์-อาทิตย์ วันละ 2 ชั่วโมง ตลอด 1 เดือนเต็ม ที่จะพาน้องๆ วัย 8 ปีขึ้นไป เรียนรู้ตั้งแต่พื้นฐาน <br />
          จนสร้างเกมของตัวเองได้จริง พร้อมฝึกคิดเป็นระบบ เสริมความคิดสร้างสรรค์ และเตรียมลงแข่งขัน Roblox Game Jam ได้อย่างมั่นใจ! 🚀✨
        </p>
        <p>
          Timeline <br /> <br />

          🧭 สัปดาห์ที่ 1: พื้นฐาน Roblox Studio และการออกแบบฉาก <br />
          🔹 วันเสาร์: ทำความรู้จัก Roblox Studio + สร้าง Obby ง่าย ๆ <br />
           - แนะนำ Roblox Studio และอินเทอร์เฟซ <br />
           - การใช้เครื่องมือ Move, Scale, Rotate <br />
           - การเพิ่ม Part และตั้งค่า Anchored, CanCollide <br />
           - สร้าง Obby ด่านแรก (เน้นความเข้าใจเรื่องพื้นที่และตำแหน่ง) <br /> <br />

          🔹 วันอาทิตย์: การตกแต่งฉากและ UI พื้นฐาน <br />
           - ตกแต่งด้วย Toolbox / Material / Color <br />
           - สร้างภูมิประเทศด้วย Terrain Tool <br />
           - ใส่ UI เบื้องต้น เช่น ป้ายชื่อเกม / ปุ่มเริ่มเกม <br />
           - ทำ Checkpoint ง่าย ๆ ด้วย IntValue <br /> <br />

          🧭 สัปดาห์ที่ 2: สคริปต์เบื้องต้นและระบบพื้นฐาน <br />
          🔹 วันเสาร์: Leaderstats และ Checkpoint ด้วย Script <br />
           - อธิบาย Script vs LocalScript <br />
           - สร้าง Leaderstats (Stage, Coin) <br />
           - เขียน Script Checkpoint <br />
           - ทดลอง Reset แล้วกลับมาที่จุดเดิม <br /> <br />

          🔹 วันอาทิตย์: ตัวละครและการโจมตี <br />
           - เพิ่ม Dummy/NPC ในเกม <br />
           - สร้างอาวุธ (ดาบ + Tool) <br />
           - เขียน Script โจมตีศัตรูแบบง่าย <br />
           - เพิ่ม Sound Effect <br /> <br />

          🧭 สัปดาห์ที่ 3: ระบบเกมและกลไกที่สนุกขึ้น <br />
          🔹 วันเสาร์: ระบบศัตรูและพลังชีวิต <br />
           - ใส่ Enemy ที่เคลื่อนไหว (Pathfinding ง่าย ๆ) <br />
           - สร้าง HP System ให้ Enemy <br />
           - สร้าง GUI แสดงพลังชีวิตด้วย BillboardGui <br />
           - เขียน Script ให้ศัตรูหายเมื่อ HP หมด <br /> <br />

          🔹 วันอาทิตย์: สะสมเหรียญ + ร้านค้า <br />
           - วางเหรียญในแผนที่ <br />
           - Script เก็บเหรียญและเพิ่ม Coin <br />
           - ทำร้านค้าอัปเกรด (Speed / Jump) <br />
           - ใช้ GUI และ RemoteEvent เบื้องต้น <br /> <br />

          🧭 สัปดาห์ที่ 4: สร้างเกมจริง + เรียนรู้จากเกมดัง <br />
          🔹 วันเสาร์: สร้างระบบเกมแบบ &quot;เกมดัง&quot; <br />
           - หัวข้อพิเศษ: ศึกษาจากเกมดัง แล้วลองเขียนระบบดู <br />
           - ตัวอย่างเกมดัง: DOORS, Tower of Hell, Pet Simulator, Blox Fruits <br />
           - วิเคราะห์ระบบง่าย ๆ จากเกม (เก็บเหรียญ, ซื้อของ, ปลดล็อกพื้นที่) <br />
           - เขียน Script ระบบเกมที่คล้ายเกมดัง เช่น: <br />
           - ระบบเปิดประตู (DOORS) <br />
           - ระบบเก็บเพชร (Pet Simulator) <br />
           - ระบบซื้ออาวุธ (Blox Fruits) <br />
           - ปรับให้เป็นเวอร์ชันของตัวเอง (เปลี่ยนเสียง, สี, ค่า) <br /> <br />
          📌 กิจกรรม: <br />
           - ภารกิจลับ: ถอดรหัสเกมดัง! <br />
           - เลือกเกม Roblox ที่ชอบ <br />
           - แยกระบบเป็นชิ้นย่อย <br />
           - เขียนระบบขึ้นเอง <br />
           - ปรับแต่งให้เป็นของตัวเอง <br /> <br />

          🔹 วันอาทิตย์: ทดสอบเกม + นำเสนอผลงาน <br />
           - ทดสอบเกมทั้งเกมร่วมกัน <br />
           - เช็คบั๊ก + แก้ไข <br />
           - สร้างปุ่ม Reset / Teleport / Replay <br />
           - สอนการ Publish เกมขึ้น Roblox <br />
           - แชร์ Link และเตรียมตัว Game Jam <br />
        </p>
      </div>
    </div>
  );
}

export default CourseContent;
