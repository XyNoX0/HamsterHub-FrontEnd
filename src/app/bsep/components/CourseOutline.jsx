import React from "react";
import "./CourseOutline.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

function CourseOutline({}) {
  var timeline_list = [
        {
          "title": "Day 1-2: Business Goal Setup",
          "topics": [
            "- Market Survey & Best Practices",
            "- การสร้างรายได้",
            "- ขายแนวไหนดี"
          ]
        },
        {
          "title": "Track 1: Day 3-8: Data Science",
          "topics": [
            "- สถิติ",
            "- วิธีการรวบรวมข้อมูล",
            "- แนวทางการวิเคราะห์ และจัดการข้อมูลขนาดใหญ่",
            "- การคาดการณ์อนาคต",
            "- การนำเสนอข้อมูลอย่างสร้างสรรต์",
            "- การใช้งาน AI ร่วมวิเคราะห์ จัดการข้อมูล และคาดการณ์แนวโน้ม"
          ]
        },
        {
          "title": "Track 2: Day 3-8: Advanced Gaming Features",
          "topics": [
            "- Advanced Terrain",
            "- Advanced Lighting & Shader",
            "- Advanced Visual Effect",
            "- การออกแบบ AI ผู้ช่วยขั้นสูง เพื่อช่วยเขียน code และสร้าง Asset ในแบบของเรา",
            "- Optimization"
          ]
        },
        {
          "title": "Track 3: Day 3-8: Advanced Web Construction",
          "topics": [
            "- Back End",
            "- การวางโครงสร้างเพื่อรองรับการทำเว็บใช้จริง",
            "- การใช้งาน AI ช่วยในการสร้าง Web ให้เร็วและได้ดั่งใจ",
            "- Security & Optimization"
          ]
        },
        {
          "title": "Day 9-12: Project Development",
          "topics": [
            "- สร้างโปรเจ๊คอย่างมีแบบแผน",
            "- การแบ่งอย่างงานมีประสิทธิภาพ",
            "- การพัฒนางานอย่างมีระบบ โดยใช้ AI เป็นผู้ช่วย"
          ]
        },
        {
          "title": "Day 13: Into the real world",
          "topics": [
            "- ธุรกิจที่มีรากฐานจาก Technology Projects",
            "- วิเคราะห์เจาะลึกถึงสิ่งที่ลูกค้าได้รับจากผลงานเหล่านั้น"
          ]
        },
        {
          "title": "Day 14-18: User Experience",
          "topics": [
            "- ทดลองให้กลุ่มเป้าหมายใช้งานจริง",
            "- ปรับ UI/UX ให้สอดคล้องกับการใช้งาน",
            "- ทดสอบความพึงพอใจ"
          ]
        },
        {
          "title": "Day 19-20: Presentation",
          "topics": [
            "- ฝึกนำเสนอให้ลูกค้าสนใจ",
            "- ฝึกการทำ Infographic"
          ]
        },
        {
          "title": "Day 21: World Best Marketing Strategies",
          "topics": [
            "- กลยุทธ์การตลาดเทคโนโลยีระดับโลก",
            "- การออกแบบการขาย Project"
          ]
        },
        {
          "title": "Day 22-25: Real Project Deployment",
          "topics": [
            "- Mobile App Store & Stream Deployment",
            "- Code Optimization",
            "- Network & Performance Monitoring"
          ]
        },
        {
          "title": "Day 26-28: Beta Testing",
          "topics": [
            "- ทดสอบความประทับใจในการใช้งานกับกลุ่มผู้ใช้จริง",
            "- เก็บ bug และปรับขั้นตอนสุดท้าย"
          ]
        },
        {
          "title": "Day 29-30: Project Launch",
          "topics": [
            "- Social Marketing",
            "- Project Completion",
            "- Portfolio Summary"
          ]
        }
      ]


  return (
    <div className="course-outline">
      <input
        type="checkbox"
        id="timeline-checkbox"
        className="hidden-checkbox"
      />
      <div className="course-timeline">
        <div className="timeline-title">
          <h1>Timeline</h1>
        </div>

        {timeline_list.map((month, index) => (
          <div
            key={index}
            className={`timeline ${index % 2 === 0 ? "left" : "right"}`}
          >
            {month.title.split("\n").map((line, i) => (
              <h3 key={i}>{line}</h3>
            ))}
            <ul>
              {month.topics.map((topic, idx) => (
                <li key={idx}>
                  <p>{topic}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="button-container">
          <label htmlFor="timeline-checkbox" className="checkbox-label">
            <FaChevronDown id="down" />
            <FaChevronUp id="up" />
          </label>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
}

export default CourseOutline;
