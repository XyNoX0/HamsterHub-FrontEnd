import React from "react";
import "./starway.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "./components/Detail";
import Slider from "./components/Slider";


function Starway() {
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
            <Detail />
            <Slider items={items} />
            <Footer />
        </div>
    );
}


export default Starway;