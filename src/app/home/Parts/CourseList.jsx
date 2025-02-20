"use client"
import React, { useEffect, useState } from "react";
import "./CourseList.css";
import Loading from "../../components/Loading";
import { GetPythonCourse, GetRobloxCourse, GetUnityCourse, GetSpecialCourse } from "@/utils/api"

import Link from "next/link";
import Image from "next/image";

function CourseList() {
    const [pythonCourseData, setPythonCourseData] = useState(null);
    const [robloxCourseData, setRobloxCourseData] = useState(null);
    const [unityCourseData, setUnityCourseData] = useState(null);
    const [specialCourseData, setSpecialCourseData] = useState(null);
    const courses = []
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pythonData = await GetPythonCourse();
                const robloxData = await GetRobloxCourse();
                const unityData = await GetUnityCourse();
                const specialData = await GetSpecialCourse();
                setPythonCourseData(pythonData);
                setRobloxCourseData(robloxData);
                setUnityCourseData(unityData);
                setSpecialCourseData(specialData);

            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [GetPythonCourse, GetRobloxCourse, GetUnityCourse]);

    if (!pythonCourseData && !robloxCourseData && !unityCourseData) {
        return (
            <div className="course-not-found">
                <Loading />
            </div>
        )
    }
    // console.log("pythonCourseData", pythonCourseData)
    // console.log("robloxCourseData", robloxCourseData)
    // console.log("unityCourseData", unityCourseData)


    return (
        <div className="course-open-content">
            <h3 className="content-open-header">Opening Courses</h3>
            <p className="space"></p>
            <div className="course-open-list">
                <div className="course-intel">
                    <Link href="/nsc">
                        <Image className="course-intel-img" src="https://nj.dekhub.com/public/imgs/trophy.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="course-intel-text">
                        <a href="/nsc" style={{ textDecoration: "none" }}>
                            <h4 className="course-intel-name">NSC Software Project</h4>
                        </a>
                        <div className="course-intel-bottom">
                            <p className="course-intel-price">฿ 5990</p>
                            <p className="course-intel-date">17 มี.ค.-12 พ.ค.(จันทร์ พุธ ศุกร์)</p>
                            <p className="course-intel-time">เวลา 19:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/935" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                <div className="course-intel">
                    <Link href="/gamedeepseek">
                        <Image className="course-intel-img" src="https://nj.dekhub.com/public/imgs/GDSTN.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="course-intel-text">
                        <a href="/gamedeepseek" style={{ textDecoration: "none" }}>
                            <h4 className="course-intel-name">game Deep SeeK</h4>
                        </a>
                        <div className="course-intel-bottom">
                            <p className="course-intel-price">฿ 1290</p>
                            <p className="course-intel-date">10-14 มี.ค.</p>
                            <p className="course-intel-time">เวลา 19.00-21.00</p>
                        </div>
                    </div>
                    <a href="/apply/121" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                {pythonCourseData.map((item, index) => (
                    <div key={index} className="course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>
                        <div className="course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="course-intel-bottom">
                                <p className="course-intel-price">฿{item.courseDetail.price}</p>
                                <p className="course-intel-date">{item.courseDetail.date}</p>
                                <p className="course-intel-time">เวลา {item.courseDetail.time}</p>
                            </div>
                        </div>
                        <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                            Book
                        </a>
                    </div>
                ))}
                {unityCourseData.map((item, index) => (
                    <div key={index} className="course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>
                        <div className="course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="course-intel-bottom">
                                <p className="course-intel-price">฿{item.courseDetail.price}</p>
                                <p className="course-intel-date">{item.courseDetail.date}</p>
                                <p className="course-intel-time">เวลา {item.courseDetail.time}</p>
                            </div>
                        </div>
                        <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                            Book
                        </a>
                    </div>
                ))}
                {robloxCourseData.map((item, index) => (
                    <div key={index} className="course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>                        <div className="course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="course-intel-bottom">
                                <p className="course-intel-price">฿{item.courseDetail.price}</p>
                                <p className="course-intel-date">{item.courseDetail.date}</p>
                                <p className="course-intel-time">เวลา {item.courseDetail.time}</p>
                            </div>
                        </div>
                        <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                            Book
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;
