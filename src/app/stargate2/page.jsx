import React from "react";
import "./starter.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import CourseGet from "./components/CourseGet"
import PXPDetail from "./components/CourseDetail"
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
            <CourseGet />
            <PXPDetail />
            <Slider items={items}/>
            <Footer />
        </div>
    );
}


export default Page;