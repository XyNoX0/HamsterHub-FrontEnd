import React from "react";
import "./GameJam.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"
import Slider from "../components/Slider";


function Page() {
  var items = [
    {
      "title": "Veggie Dash",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Veggie Dash.png",
      "content": "https://nj.dekhub.com/public/videos/Veggie%20Dash.mp4"
    },
    {
      "title": "mrCITY",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/mrCITY.PNG",
      "content": "https://nj.dekhub.com/public/videos/mrCITY.mp4"
    },
    {
      "title": "GDS",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Fish.png",
      "content": "https://nj.dekhub.com/public/videos/Fish.mov"
    },

    {
      "title": "Beam",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Beam.png",
      "content": "https://nj.dekhub.com/public/videos/Beam.mp4"
    }
  ]
  return (
    <div>
      <Navbar />
      <CourseHero />
      <CourseContent />
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h3><b>ผลงาน Game Jam ของเพื่อนๆ</b></h3>
      </div>
      <Slider items={items} />
      <Footer />
    </div>
  );
}


export default Page;