import React from "react";
import "./Python.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "./components/Detail.jsx";

async function Page() {
  return (
    <div >
      <Navbar />
      <Detail />
      <Footer />
    </div>
  );
}


export default Page;