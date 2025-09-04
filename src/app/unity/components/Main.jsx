"use client"
import React, { useEffect, useState } from "react";

import CourseHero from "./CourseHero";
import CourseOutline from "./CourseOutline";
import CourseContent from "./CourseContent";
import CourseTag from "./CourseTag";
import CourseGet from "./CourseGet";
import CourseHeader from "./CourseHeader";
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";

import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import { GetUnityCourse } from "@/utils/api"

function Main() {
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetUnityCourse();
                setCourseData(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [GetUnityCourse]);

    if (!courseData) {
        return (
            <Loading />
        )
    }

    const course = courseData.find((item) => item.courseDetail.course_path === "unity-3");
    const course2 = courseData.find((item) => item.courseDetail.course_path === "unity-2");

    // If no course is found, show an error or fallback
    // if (!course) {
    //   return (
    //     <div className="course-not-found">
    //       <RxCross1 className="cross" />
    //       <h1>Course Not Found</h1>
    //       <Link href="/">Back to home <IoMdHome /></Link>
    //     </div>
    //   );
    // }

    return (
        <div >
            <CourseHeader />
            <CourseHero courseData={course.courseDetail} />
            <CourseContent content={course.content} courseDetail={course.courseDetail} />
            <CourseGet get={course.get} />
            <CourseOutline timeline={course.timeline} />
            <CourseTag courseData={course.courseDetail} />
            {/* <CourseHero courseData={course2.courseDetail} />
            <CourseContent content={course2.content} courseDetail={course2.courseDetail} />
            <CourseGet get={course2.get} />
            <CourseOutline timeline={course2.timeline} />
            <CourseTag courseData={course2.courseDetail} /> */}
            <div className="course-hero-buttom-mobile">
                <h3 style={{ color: "black" }}>Project Gallery</h3>
            </div>
            <Slider items={course.items} />
        </div>
    );
}


export default Main;