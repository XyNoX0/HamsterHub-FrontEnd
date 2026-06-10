import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Detail from "./components/Detail.jsx";
import "./Unity.css";


function Page() {
  return (
    <div >
      <Navbar />
      <Detail />
      <Footer />
    </div>
  );
}


export default Page;