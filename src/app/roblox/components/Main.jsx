"use client"
import React, { useEffect, useState } from "react";

import CourseHero from "./CourseHero";
import CourseOutline from "./CourseOutline";
import CourseContent from "./CourseContent";
import CourseTag from "./CourseTag";
import CourseHeader from "./CourseHeader";
import CourseIndex from "./CourseIndex";
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";

import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import { GetRobloxCourse } from "@/utils/api"

function Main() {
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetRobloxCourse();
                setCourseData(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [GetRobloxCourse]);

    if (!courseData) {
        return (
            <Loading />
        )
    }

    const course = courseData.find((item) => item.courseDetail.course_path === "roblox");
    const course2 = courseData.find((item) => item.courseDetail.course_path === "roblox-2");
    const course3 = courseData.find((item) => item.courseDetail.course_path === "roblox-3");
    console.log("course3",course3)
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
        <div>
            <CourseHeader />
            {/* <CourseHero courseData={course3.courseDetail} />
            <CourseContent content={course3.content} />
            <CourseOutline timeline={course3.timeline} />
            <p className="space"></p> */}
            <CourseHero courseData={course.courseDetail} />
            <CourseContent content={course.content} />
            <CourseIndex />
            <CourseOutline timeline={course.timeline} />
            <div className="Timeline-Video">
                <h2>Project Showcase</h2>
                <a href="https://www.roblox.com/games/116187517813348/DuneXtreme">
                    DuneXtreme
                </a>
                <p className="space"></p>
                <video controls src="https://nj.dekhub.com/public/roblox/videos/Dune.mp4" ></video>
            </div>
            {/* <CourseOutline timeline={course2.timeline} /> */}
            <Slider items={course.items} />
        </div>
    );
}


export default Main;