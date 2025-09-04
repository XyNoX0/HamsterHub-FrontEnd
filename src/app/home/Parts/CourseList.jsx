"use client"
import React, { useEffect, useState } from "react";
import "./CourseList.css";
import Loading from "../../components/Loading";
import { GetCourseList } from "@/utils/api"

import Link from "next/link";
import Image from "next/image";

function CourseList() {
    const [CourseData, setCourseData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await GetCourseList();
                console.log(Data);
                setCourseData(Data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [GetCourseList]);

    if (!CourseData) {
        return (
            <div className="course-not-found">
                <Loading />
            </div>
        )
    }

    return (
        <div className="home-course-open-content">
            <h3 className="home-content-open-header">Opening Courses</h3>
            <p className="space"></p>
            <div className="home-course-open-list">
                {CourseData.map((item, index) => (
                    <div key={index} className="home-course-intel">
                        <Link href={`${item.courseDetail.href}`}>
                            <Image className="home-course-intel-img" src={item.courseDetail.icon} alt="Hams" width={90} height={90} />
                        </Link>
                        <div className="home-course-intel-text">
                            <a href={`${item.courseDetail.href}`} style={{ textDecoration: "none" }}>
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
