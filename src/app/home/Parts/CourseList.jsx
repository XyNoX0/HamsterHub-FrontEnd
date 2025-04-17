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
        <div className="home-course-open-content">
            <h3 className="home-content-open-header">Opening Courses</h3>
            <p className="space"></p>
            <div className="home-course-open-list">
                <div className="home-course-intel">
                    <Link href="/gameai">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/AI_Icon.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/gameai" style={{ textDecoration: "none" }}>
                            <h4 className="home-course-intel-name">Make Game with AI (ราคาพิเศษครบรอบ 4 ปี)</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">1990฿</p>
                            <p className="home-course-intel-date">16 เม.ย. - 9 พ.ค. 68 (พุธ, ศุกร์)</p>
                            <p className="home-course-intel-time">เวลา 19:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/820" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                <div className="home-course-intel">
                    <Link href="/port69">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/port69_icon.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/port69" style={{ textDecoration: "none" }}>
                            <h4 className="home-course-intel-name">กิจกรรมพิเศษ &quot;ตึงจัดเต็ม&quot; สู่ Port69</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">190฿</p>
                            <p className="home-course-intel-date">3-5 พ.ค. 2568 (เสาร์-จันทร์)</p>
                            <p className="home-course-intel-time">เวลา 19:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/125" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                {/* <div className="home-course-intel">
                    <Link href="/nsc">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/trophy.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/nsc" style={{ textDecoration: "none" }}>
                            <h4 className="home-course-intel-name">NSC Software Project SS2</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">฿ 5990</p>
                            <p className="home-course-intel-date">1 เม.ย.-24 พ.ค.(อ พฤ ส)</p>
                            <p className="home-course-intel-time">เวลา 19:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/935" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div> */}
                {/* <div className="home-course-intel">
                    <Link href="/gamedeepseek">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/GDSTN.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/gamedeepseek" style={{ textDecoration: "none" }}>
                            <h4 className="course-intel-name">game Deep SeeK</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">฿ 1290</p>
                            <p className="home-course-intel-date">10-14 มี.ค.</p>
                            <p className="home-course-intel-time">เวลา 19:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/121" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div> */}
                <div className="home-course-intel">
                    <Link href="/rov">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/ROV_Icon.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/rov" style={{ textDecoration: "none" }}>
                            <h4 className="course-intel-name">ROV: Hamster Cup</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">490฿/ทีม</p>
                            <p className="home-course-intel-date">26-27 เม.ษ.</p>
                            <p className="home-course-intel-time">เวลา 14:00-21:00</p>
                        </div>
                    </div>
                    <a href="/apply/123" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                <div className="home-course-intel">
                    <Link href="/gamejam6">
                        <Image className="home-course-intel-img" src="https://nj.dekhub.com/public/imgs/HGJ6_Icon.png" alt="Hams" width={90} height={90} />
                    </Link>
                    <div className="home-course-intel-text">
                        <a href="/gamejam6" style={{ textDecoration: "none" }}>
                            <h4 className="course-intel-name">Hamster Game Jam 6</h4>
                        </a>
                        <div className="home-course-intel-bottom">
                            <p className="home-course-intel-price">190฿</p>
                            <p className="home-course-intel-date">21-24 เม.ษ.</p>
                            <p className="home-course-intel-time">เริ่ม 14:00</p>
                        </div>
                    </div>
                    <a href="/apply/124" target="_blank" rel="noopener noreferrer" className="more-open">
                        Book
                    </a>
                </div>
                {pythonCourseData.map((item, index) => (
                    <div key={index} className="home-course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="home-course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>
                        <div className="home-course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="home-course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="home-course-intel-bottom">
                                <p className="home-course-intel-price">{item.courseDetail.price}฿</p>
                                <p className="home-course-intel-date">{item.courseDetail.date}</p>
                                <p className="home-course-intel-time">เวลา {item.courseDetail.time}</p>
                            </div>
                        </div>
                        <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                            Book
                        </a>
                    </div>
                ))}
                {unityCourseData.map((item, index) => (
                    <div key={index} className="home-course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="home-course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>
                        <div className="home-course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="home-course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="home-course-intel-bottom">
                                <p className="home-course-intel-price">{item.courseDetail.price}฿</p>
                                <p className="home-course-intel-date">{item.courseDetail.date}</p>
                                <p className="home-course-intel-time">เวลา {item.courseDetail.time}</p>
                            </div>
                        </div>
                        <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                            Book
                        </a>
                    </div>
                ))}
                {robloxCourseData.map((item, index) => (
                    <div key={index} className="home-course-intel">
                        <Link href={`/course/${item.courseDetail.no}`}>
                            <Image className="home-course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>                        <div className="course-intel-text">
                            <a href={`/course/${item.courseDetail.no}`} style={{ textDecoration: "none" }}>
                                <h4 className="home-course-intel-name">{item.courseDetail.name}</h4>
                            </a>
                            <div className="home-course-intel-bottom">
                                <p className="home-course-intel-price">{item.courseDetail.price}฿</p>
                                <p className="home-course-intel-date">{item.courseDetail.date}</p>
                                <p className="home-course-intel-time">เวลา {item.courseDetail.time}</p>
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
