import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSection from "./Parts/HeroSection";
import TopProjects from "./Parts/TopProjects";
import WhySuccess from "./Parts/WhySuccess";
import Statistics from "./Parts/Statistics";
import LatestStory from "./Parts/LatestStory";
import OurTeam from "./Parts/OurTeam";
import "./Home.css";

import { GetSliders } from "@/utils/api";

async function HomePage() {
  const data = await GetSliders();
  return (
    <div className="home">
      <Navbar />
      <HeroSection />
      <TopProjects />
      <LatestStory courseData={data}/>
      <WhySuccess />
      <Statistics />
      <Footer />
    </div>
  );
}

export default HomePage;
