import React from "react";
import "./CourseOpening.css";
import Image from 'next/image';

function CourseIndex({ courses }) {
    return (
        <div>
            <div className="course-open-content">
                <h3 className="content-open-header">Opening Courses</h3>
                <p className="space-2"></p>
                <div className="course-open-list">
                    {courses.map((item, index) => (
                        <div key={index} className="course-intel">
                            <Image className="course-intel-img" src={item.courseDetail.icon} alt="Hams" width={70} height={70} />
                            <div className="course-intel-text">
                                <a href={`/course/${item.courseDetail.no}`} style={{textDecoration: "none"}}>
                                    <h4 className="course-intel-name">{item.courseDetail.name}</h4>
                                </a>
                                <div className="course-intel-bottom">
                                    <p className="course-intel-price">฿{item.courseDetail.price}</p>
                                    <p className="course-intel-date">เรียนวันที่ {item.courseDetail.date}</p>
                                </div>
                            </div>
                            <a href={item.courseDetail.book_link} target="_blank" rel="noopener noreferrer" className="more-open">
                                Book
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CourseIndex;
