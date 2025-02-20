"use client"
import React, { useEffect, useState } from "react";
import "./Course.css";
import { getCourseData } from "../../../../utils/api";
import Image from "next/image";

function CourseApply({ items }) {
    var id = items
    const [courseData, setCourseData] = useState(null);
    const [icon, setIcon] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourseData(id);
                setCourseData(data.course);
                setIcon(`https://nj.dekhub.com/public/imgs/${data.course.icon}`);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [id]);

    if (!courseData) {
        return (
            <div className="course">
                <div className="course-body">
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <div className="course">
            <br />
            <div className="course-body">
                <div className="course-icon">
                    <Image className="Icon" src={icon} alt="Course Icon" width={60} height={60} />
                </div>
                <div className="course-detail">
                    {/* <p className="course-tag">{courseData.tag}</p> */}
                    <h2 className="course-subject">{courseData.subject}</h2>
                    <h5 className="course-price"><b>฿{courseData.price}</b></h5>
                    <h5 className="course-day">เริ่ม {courseData.startdate} ⏰{courseData.time}</h5>
                </div>
            </div>
        </div>
    );
}

export default CourseApply;