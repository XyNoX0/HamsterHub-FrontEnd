import React from "react";
import "./starway.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "./components/Detail";

import { getCourseData } from "@/utils/api";


async function PyMap() {
    const data = await getCourseData("826");
    return (
        <div>
            <Navbar />
            <Detail courseData={data.course}/>
            <Footer />
        </div>
    );
}


export default PyMap;