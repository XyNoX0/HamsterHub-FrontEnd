import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseHero from "./components/CourseHero";
import CourseGet from "./components/CourseGet";
import CourseOutline from "./components/CourseOutline";
import Slider from "../components/Slider";
import CourseContent from "./components/CourseContent";
import CourseTag from "./components/CourseTag";
import CourseHeader from "./components/CourseHeader";
import CourseFooter from "./components/CourseFooter";
import Main from "./components/Main";
import "./Unity.css";

import { IoMdHome } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
// Import JSON data
import courseData from "@/utils/test.json";
import Link from "next/link";


function Page() {
  return (
    <div >
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}


export default Page;