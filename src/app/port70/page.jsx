import React from "react";
import "./AiGame.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import AiGameDetail from "./components/CourseDetail"
import Slider from "./components/Slider";

function AiGame() {
  var items = [
    {
      "title": "ARIEAK",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/ARIEAK.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/ARIEAK.mp4"
    },
    {
      "title": "Slime",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/Slime.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/Slime.mp4"
    },
    {
      "title": "NSG",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/NSG.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/NSG.mp4"
    },
    {
      "title": "HPC",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/HPC.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/HPC.mp4"
    },
    {
      "title": "Footwork",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/Footwork.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/Footwork.mp4"
    },
    {
      "title": "AO",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/AO.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/AO.mp4"
    },
    {
      "title": "Pong",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/Pong.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/Pong.mp4"
    },
    {
      "title": "Starlight",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/Starlight.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/Starlight.mp4"
    },
    {
      "title": "AOB",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/AOB.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/AOB.mp4"
    },
    {
      "title": "RunForPack",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/RunForPack.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/RunForPack.mp4"
    },
    {
      "title": "SRT",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/GamejamInter/SRT.png",
      "content": "https://nj.dekhub.com/public/videos/GamejamInter/SRT.mp4"
    },
  ]
  return (
    <div className="AiGame">
      <Navbar />
      <CourseHero />
      <AiGameDetail />
      <div style={{ textAlign: "center", backgroundColor: "black", color: "white"}}>
        <h3><b>ผลงานของน้องๆใน 3 วัน</b></h3>
      </div>
      <Slider items={items} />
      <Footer />
    </div>
  )
};
export default AiGame;
