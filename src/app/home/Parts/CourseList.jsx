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
                {CourseData.map((item, index) => {
                    if (item.promotion === "1") {
                        return (
                            <div key={index} className="home-course-intel">
                                <Link href={`${item.href}`}>
                                    <Image className="home-course-intel-img" src={`https://nj.dekhub.com/public/imgs/${item.icon}`} alt="Hams" width={90} height={90} />
                                </Link>
                                <div className="home-course-intel-text">
                                    <a href={`${item.href}`} style={{ textDecoration: "none", color: "#ff0000ff" }}>
                                        <h4 className="home-course-intel-name">🎁 {item.name}</h4>
                                    </a>
                                    <div className="home-course-intel-bottom">
                                        <p className="home-course-intel-date">{item.date}</p>
                                        <p className="home-course-intel-time">เวลา {item.time}</p>
                                    </div>
                                </div>
                                <div className="home-course-intel-button">
                                    <p className="home-course-intel-price" style={{ color: "#ff0000ff", textDecoration: "line-through" }}>{item.price}฿</p>
                                    <p className="home-course-intel-price" style={{ color: "#ff0000ff" }}>{item.discount}฿</p>
                                    <a href={item.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                                        Book
                                    </a>
                                </div>
                            </div>
                        )
                    } else if (item.promotion === "0" || item.promotion == undefined || item.promotion == null || item.promotion === "") {
                        return (
                            <div key={index} className="home-course-intel">
                                <Link href={`${item.href}`}>
                                    <Image className="home-course-intel-img" src={`https://nj.dekhub.com/public/imgs/${item.icon}`} alt="Hams" width={90} height={90} />
                                </Link>
                                <div className="home-course-intel-text">
                                    <a href={`${item.href}`} style={{ textDecoration: "none" }}>
                                        <h4 className="home-course-intel-name">{item.name}</h4>
                                    </a>
                                    <div className="home-course-intel-bottom">
                                        <p className="home-course-intel-date">{item.date}</p>
                                        <p className="home-course-intel-time">เวลา {item.time}</p>
                                    </div>
                                </div>
                                <div className="home-course-intel-button">
                                    <a href={`${item.href}`} style={{ textDecoration: "none" }}>
                                        <p className="home-course-intel-price">{item.price}฿</p>
                                    </a>
                                    <a href={item.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                                        Book
                                    </a>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className="home-course-open-list-moblie">
                {CourseData.map((item, index) => {
                    if (item.promotion === "1") {
                        return (
                            <Link href={`${item.href}`} style={{ textDecoration: "none" }} key={index}>
                                <div key={index} className="home-course-intel" style={{ backgroundColor: "#e7fc03", opacity: "0.8" }}>
                                    <div className="home-course-intel-date" style={{ color: "black" }}>
                                        <p className="home-course-intel-month">{item.month}</p>
                                        <p className="home-course-intel-day">{item.day}</p>
                                    </div>
                                    <div className="line"></div>
                                    <Image src={`https://nj.dekhub.com/public/imgs/${item.icon}`} alt="Hams" width={90} height={90} className="home-course-intel-img" />
                                    <div className="home-course-intel-text" style={{ color: "black" }}>
                                        <p className="home-course-intel-name">{item.name}</p>
                                        <p className="home-course-intel-tag">{item.tag}</p>
                                    </div>
                                    <div className="price">
                                        <Link href={`${item.book_link}`} className="home-course-intel-icon">
                                            <Image src="https://nj.dekhub.com/public/imgs/Register.png" alt="Hams" width={90} height={90} />
                                        </Link>
                                        <p className="home-course-intel-price" style={{textDecoration: "line-through"}}>{item.price}฿</p>
                                        <p className="home-course-intel-price">{item.discount}฿</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    } else if (item.promotion === "0" || item.promotion == undefined || item.promotion == null || item.promotion === "") {
                        return (
                            <Link href={`${item.href}`} style={{ textDecoration: "none" }} key={index}>
                                <div key={index} className="home-course-intel">
                                    <div className="home-course-intel-date">
                                        <p className="home-course-intel-month">{item.month}</p>
                                        <p className="home-course-intel-day">{item.day}</p>
                                    </div>
                                    <div className="line"></div>
                                    <Image src={`https://nj.dekhub.com/public/imgs/${item.icon}`} alt="Hams" width={90} height={90} className="home-course-intel-img" />
                                    <div className="home-course-intel-text">
                                        <p className="home-course-intel-name">{item.name}</p>
                                        <p className="home-course-intel-tag">{item.tag}</p>
                                    </div>
                                    <div className="price">
                                        <Link href={`${item.book_link}`} className="home-course-intel-icon">
                                            <Image src="https://nj.dekhub.com/public/imgs/Register.png" alt="Hams" width={90} height={90} />
                                        </Link>
                                        <p className="home-course-intel-price">{item.price}฿</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default CourseList;
