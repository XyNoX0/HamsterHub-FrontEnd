import React from "react";
import "./Python.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Main from "./components/Main";

async function Page() {
  return (
    <div >
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}


export default Page;