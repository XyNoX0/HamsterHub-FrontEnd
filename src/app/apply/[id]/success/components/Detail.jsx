"use client"
import React, { useEffect, useState } from "react";
import "./Detail.css";
import { getCourseData } from "../../../../../utils/api";
import { useSearchParams } from "next/navigation";


function Detail({ items }) {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  var id = items
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourseData(id);
        setCourseData(data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [id]);
  console.log("ref", ref)
  if (!courseData) {
    return (
      <div className="Detail">
        <div className="summary">
          <div className="summary-content">
            <h2 className="header">สรุปข้อมูลการสมัคร</h2>
          </div>
          <div className="summary-content">
            <h5 className="course-title">คอร์ส</h5>
            <div className="course-data">
              Loading...
            </div>
          </div>
          <div className="summary-content">
            <h5>รวมทั้งหมด</h5>
            <div className="price" style={{ color: "black" }}>
              Loading...
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="Detail">
      <div className="summary">
        <div className="summary-content">
          <h2 className="summary-header">สรุปข้อมูลการสมัคร</h2>
        </div>
        <div className="summary-content">
          <h5 className="summary-title">คอร์ส</h5>
          <div className="course-data">
            <h4 className="subject"><b>{courseData.subject}</b></h4>
            <h5 className="date">เรียนวันที่ {courseData.date}</h5>
            <h5 className="time">เวลา {courseData.time}</h5>
          </div>
        </div>
        <div className="summary-content">
          <h5 className="summary-title">รวมทั้งหมด</h5>
          {(ref === "1" || courseData.promotion === "1") ? (
            <div className="price">
              <h5 className="price-text"><b>ราคาพิเศษ ฿{courseData.discount}</b></h5>
            </div>
          ) : (
            <div className="price">
              <h5 className="price-text"><b>฿{courseData.price}</b></h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detail