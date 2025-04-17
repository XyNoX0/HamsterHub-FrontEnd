import React from "react";
import "./Rov.css";
import Image from "next/image";
function Rov() {
  return (
    <div className="rov">
      <div className="rov-banner">
        <Image
          src="https://i.pinimg.com/originals/0f/bf/fd/0fbffdd3d728ea924845acfcfc33c508.jpg"
          alt="rov"
          className="rov-img"
          width={1980}
          height={1000}
          priority
        />
        <div className="rov-banner-text">
          <h1>ROV Tournament</h1>
          <h4>29-30 มีนาคม 2568</h4>
        </div>
      </div>
      <div className="rov-text">
        <h2>
          ปิดเทอมใหญ่ก็ไปมันส์สุดๆ <br />
          ไปกับการแข่งขัน ROV กันเลย
        </h2>
        <h5>
          หากทีมใดไม่สามารถแข่งได้ในเวลาที่กำหนด จะถือว่าสละสิทธิ์การแข่งขัน
        </h5>
      </div>
      <div className="prize">
        <h2>รางวัล</h2>
        <ul className="prize-content">
          <li id="first" className="prize-card">
            <div className="prize-rank">1st</div>
            <div className="prize-amount">3,000฿ <br />+ <br />7,990฿</div>
            <div className="prize-description">of a seat in NSC SP.</div>
          </li>
          <li id="second" className="prize-card">
            <div className="prize-rank">2nd</div>
            <div className="prize-amount">2,000฿</div>
          </li>
          <li id="third" className="prize-card">
            <div className="prize-rank">3rd</div>
            <div className="prize-amount">1,000฿</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Rov;
