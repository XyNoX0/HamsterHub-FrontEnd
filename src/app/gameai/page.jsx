import React from "react";
import "./AiGame.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import AiGameDetail from "./components/CourseDetail"

function AiGame() {
  return (
    <div className="AiGame">
      <Navbar />
      <CourseHero />
      <AiGameDetail />
      <Footer />
    </div>
  )
};
export default AiGame;
