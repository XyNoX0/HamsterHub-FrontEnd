import React from "react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero";
import CourseContent from "./components/CourseContent";

import { getCourseData } from "@/utils/api";


async function Page() {
  const data = await getCourseData("150");
  return (
    <div>
      <Navbar />
      <CourseHero courseData={data.course}/>
      <CourseContent />
      <Footer />
    </div>
  );
}


export default Page;