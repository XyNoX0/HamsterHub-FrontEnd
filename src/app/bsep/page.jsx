import React from "react";
import "./pxp.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import CourseContent from "./components/CourseContent"
import CourseGet from "./components/CourseGet"
import CourseOutline from "./components/CourseOutline"
import Slider from "../components/Slider";

function Page() {
  let items = [
    {
      "title": "mrCITY",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/mrCITY.PNG",
      "content": "https://nj.dekhub.com/public/videos/mrCITY.mp4"
    },
    {
      "title": "Beam",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Beam.png",
      "content": "https://nj.dekhub.com/public/videos/Beam.mp4"
    },
    {
      "title": "Veggie Dash",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Veggie Dash.png",
      "content": "https://nj.dekhub.com/public/videos/Veggie%20Dash.mp4"
    },
    {
      "title": "ขนมปัง",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Knompang.png",
      "content": "https://nj.dekhub.com/public/videos/Knompang.mp4"
    },
    {
      "title": "wOof",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/wOof.png",
      "content": "https://nj.dekhub.com/public/videos/wOof.mp4"
    },
    {
      "title": "Pang",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Pang.png",
      "content": "https://nj.dekhub.com/public/videos/Pang.mp4"
    }
  ]
  return (
    <div>
      <Navbar />
      <CourseHero />
      <CourseContent />
      <CourseGet />
      <CourseOutline />
      <Slider items={items} />
      <Footer />
    </div>
  );
}

 
export default Page;