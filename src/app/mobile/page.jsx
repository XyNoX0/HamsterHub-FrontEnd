import React from "react";
import "./Want.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"
import CourseTag from "./components/CourseTag"

import { getCourseData } from "@/utils/api";

async function Page() {
  const data = await getCourseData("143");
  return (
    <div>
      <Navbar />
      <CourseHero courseData={data.course}/>
      <CourseContent />
      <CourseTag courseData={data.course}/>
      <Footer />
    </div>
  );
}


export default Page;