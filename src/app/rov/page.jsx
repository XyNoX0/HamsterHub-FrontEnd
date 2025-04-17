import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero"
import ROV from "./components/Rov"
import CourseDetail from "./components/CourseDetail"
import "./rov.css";
import Image from "next/image";


function Page() {
    return (
        <div >
            <Navbar />
            <CourseHero />
            <CourseDetail />
            <ROV />
            <Footer />
        </div>
    );
}


export default Page;