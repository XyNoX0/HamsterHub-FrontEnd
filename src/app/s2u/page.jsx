import React from "react";
import "./GameJam.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"
import CourseGet from "./components/CourseGet"
import CourseTag from "./components/CourseTag"
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
      <CourseGet />
      <CourseTag />
      <div style={{ textAlign: "center", marginBottom: "90px" }}>
        <h5><b>ผลงานตัวอย่างของปีนี้ที่ได้เข้า จุฬา เกษตร และ U of Washington</b></h5>
      </div>
      <Slider items={items} />
      <Footer />
    </div>
  );
}


export default Page;