import React from "react";
import "./gamedeepseek.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import CourseDetail from "./components/CourseDetail"
import Rov from "./components/Rov";

function GameDeepSeek() {

  return (
    <div className="gamedeepseek"> 
      <Navbar />
      <CourseHero />
      <CourseDetail />
      <Rov />
      <Footer />
    </div>
  )
};
export default GameDeepSeek;
