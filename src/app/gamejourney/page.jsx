import React from "react";
import "./GameJourney.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"
import CourseGet from "./components/CourseGet"
import CourseTag from "./components/CourseTag"

function Page() {

  return (
    <div>
      <Navbar />
      <CourseHero/>
      <CourseContent/>
      <CourseGet/>
      <CourseTag/>
      <Footer />
    </div>
  );
}

 
export default Page;