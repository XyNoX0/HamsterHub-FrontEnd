import React from "react";
import "./Main.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import CourseTag from "./components/CourseTag"
import Detail from "./components/CourseDetail"

function AiGame() {
  return (
    <div className="AiGame">
      <Navbar />
      <CourseHero />
      <Detail />
      <CourseTag />
      <Footer />
    </div>
  )
};
export default AiGame;
