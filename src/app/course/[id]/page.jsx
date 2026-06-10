import React from "react";
import "./Course.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MainCourse from "./components/Main"

async function Page({ params }) {
  var { id } = await params
  return (
    <div>
      <Navbar />
      <MainCourse id={id}/>
      <Footer />
    </div>
  );
}

 
export default Page;