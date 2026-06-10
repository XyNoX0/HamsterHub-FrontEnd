import React from "react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Detail from "./components/Detail.jsx"


async function Page() {
  return (
    <div>
      <Navbar/>
      <Detail/>
      <Footer/>
    </div>
  );
}


export default Page;