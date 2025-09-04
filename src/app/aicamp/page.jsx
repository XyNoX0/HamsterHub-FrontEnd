import React from "react";
import "./AiCamp.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import AiCampDetail from "./components/CourseDetail"

function AiCamp() {
  return (
    <div className="AiCamp">
      <Navbar />
      <CourseHero />
      <AiCampDetail />
      <Footer />
    </div>
  )
};
export default AiCamp;
