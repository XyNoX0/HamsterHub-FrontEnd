import React from "react";
import "./gamelab.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Main from "./components/Main";

function Page() {
    return (
        <div>
            <Navbar />
            <Main />
            <Footer />
        </div>
    );
}


export default Page;