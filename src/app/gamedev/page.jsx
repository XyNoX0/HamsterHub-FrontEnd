import React from "react";
import "./Course.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseGet from "./components/CourseGet"
import CourseContent from "./components/CourseContent"
import CourseOutline  from "./components/CourseOutline"
import CourseTag  from "./components/CourseTag"

import { getCourseData } from "@/utils/api";

async function Page() {
  const data = await getCourseData("145");
  return (
    <div>
      <Navbar />
      <CourseHero courseData={data.course} />
      <CourseContent content={data.course.content} />
      <CourseGet get={data.course.get} />
      <CourseOutline timeline={data.course.timeline} />
      <CourseTag courseData={data.course} />
      <Footer />
    </div>
  );
}


export default Page;