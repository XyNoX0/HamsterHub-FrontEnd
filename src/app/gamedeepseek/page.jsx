import React from "react";
import "./gamedeepseek.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import CourseDetail from "./components/CourseDetail"

function GameDeepSeek() {

  return (
    <div className="gamedeepseek"> 
      <Navbar />
      <CourseHero />
      <CourseDetail />
      <Footer />
    </div>
  )
};
export default GameDeepSeek;
