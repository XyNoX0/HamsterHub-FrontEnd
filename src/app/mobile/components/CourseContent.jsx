import React from "react";
import "./CourseContent.css";
import Image from "next/image";
import Slider from "./Slider";


function CourseContent() {
  var items = [
      {
        title: "Gambling Invader",
        subtitle: "Game Jam Specials",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Desktop/GameJam_Ton.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Desktop/GameJam_Ton.mp4",
      },
      {
        title: "Star Odyssey",
        subtitle: "Game Jam 5",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Desktop/GameJam_jumping5.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Desktop/GameJam_jumping5.mp4",
      },
      {
        title: "Orange",
        subtitle: "Computer Software project",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Desktop/Game_SpaceCat.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Desktop/Game_SpaceCat.mp4",
      },
      {
        title: "Phufa",
        subtitle: "Project Express Special",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Desktop/PXS_Phufa.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Desktop/PXS_Phufa.mp4",
      },
      {
        title: "Fear Of Asuka",
        subtitle: "Game Jam 3",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Desktop/GameJam_program.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Desktop/GameJam_program.mp4",
      },
      {
        title: "Best",
        subtitle: "Game Jam Special",

        image:
          "https://nj.dekhub.com/public/imgs/Gallery/Roblox/GameJam_Best.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Roblox/GameJam_Best.mp4",
      },
      {
        title: "เวียร์",
        subtitle: "Roblox Creator Camp",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Roblox/RB45L1_Vier.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Roblox/RB45L1_Vier.mp4",
      },
      {
        title: "Ball",
        subtitle: "Roblox Game Project",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Roblox/RBL6_NongBall.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Roblox/RBL6_NongBall.mp4",
      },
      {
        title: "X",
        subtitle: "Open World Project",
        image:
        "https://nj.dekhub.com/public/imgs/Gallery/Roblox/RBL4_X.png",
        content: "https://nj.dekhub.com/public/videos/Gallery/Roblox/RBL4_X.mp4",
      }
    ]
  return (
    <div className="course-content">
      <Image src="https://nj.dekhub.com/public/imgs/Want/1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <div style={{ textAlign: "center","backgroundColor":"black", "color":"white" }}>
        <h3><b>Gallery โชว์ผลงาน</b></h3>
      </div>
      <Slider items={items} />
      <Image src="https://nj.dekhub.com/public/imgs/Want/4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/5.png" className="img-desktop" width={1920} height={1080} priority alt="" />
      <Image src="https://nj.dekhub.com/public/imgs/Want/5.png" className="img-mobile" width={1920} height={1080} priority alt="" />
    </div>
  );
}

export default CourseContent;
