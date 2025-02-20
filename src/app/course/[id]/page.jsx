import React from "react";
import "./Course.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import MainCourse from "./components/Main"

function Page({ params }) {
  var id = params.id
  return (
    <div>
      <Navbar />
      <MainCourse id={id}/>
      <Footer />
    </div>
  );
}

 
export default Page;