import React from "react";
import "./ShopHeader.css";

function ShopHeader() {
  return (
    <div className="shopHeader">
      <video
        src="https://nj.dekhub.com/public/videos/ShopDesktop.mp4"
        className="shopHeader-desktop"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
      ></video>
      <video
        src="https://nj.dekhub.com/public/videos/ShopMobile.mp4"
        className="shopHeader-mobile"
        autoPlay
        muted
        playsInline
        disablePictureInPicture
      ></video>
      {/* <div className="shopHeader-header">
        <h2>รวมส่วนหนึ่งของผลงาน ที่สร้างสรรค์โดยชาว Hamster</h2>
      </div> */}
    </div>
  );
}

export default ShopHeader;
