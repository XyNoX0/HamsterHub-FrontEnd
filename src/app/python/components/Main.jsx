"use client"
import React, { useEffect, useState } from "react";
//Import file
import "./Main.css"
import Slide from "./Slide";
import Slider from "../../components/Slider";
import Loading from "../../components/Loading";
import CourseHeader from "./CourseHeader";
import CourseIndex from "./CourseIndex";
import CourseOpening from "./CourseOpening";

//Import Utils
import { GetPythonCourse } from "@/utils/api"
import  CourseData  from "@/utils/Course.json"

function Main() {
    const [courseData, setCourseData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetPythonCourse();
                setCourseData(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [GetPythonCourse]);

    if (!courseData) {
        return (
            <div className="course-not-found">
                <Loading />
            </div>
        )
    }
    console.log("courseData",courseData)

    const courseInfo = CourseData.find((item) => item.course === "python");


    return (
        <div >
            <Slide slides={courseInfo.slide}/>
            <p className="space"></p>
            <CourseHeader />
            <p className="space-0"></p>
            <CourseOpening courses={courseData}/>
            <p className="space-2"></p>
            <CourseIndex />
            <p className="space"></p>
            <div className="course-hero-buttom-mobile">
                <h3 style={{ color: "black", width:"max-content", margin:"auto"}}>Project Gallery</h3>
            </div>
            <Slider items={courseInfo.gallery} />
        </div>
    );
}


export default Main;