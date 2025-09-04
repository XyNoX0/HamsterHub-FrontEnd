import React from "react";
import "./GameJam.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"

function Page() {

  return (
    <div>
      <Navbar />
      <CourseHero/>
      <CourseContent/>
      <Footer />
    </div>
  );
}

 
export default Page;