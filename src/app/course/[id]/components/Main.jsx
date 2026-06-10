"use client"
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Slider from "@/app/components/Slider";

import CourseHero from "../components/CourseHero";
import CourseGet from "../components/CourseGet";
import CourseOutline from "../components/CourseOutline";
import CourseContent from "../components/CourseContent";
import CourseTag from "../components/CourseTag";
import "./Main.css";

import { getCourseData } from "@/utils/api";


function MainCourse({ id }) {
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
        <div>
            <CourseHero courseData={courseData} />
            <CourseContent content={courseData.content}/>
            <CourseGet get={courseData.get}/>
            <CourseOutline timeline={courseData.timeline} />
            <CourseTag courseData={courseData} />
            <Slider items={courseData.items} />
        </div>
    );
}


export default MainCourse;