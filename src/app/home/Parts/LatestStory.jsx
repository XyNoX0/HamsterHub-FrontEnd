"use client";
import React from "react";
import Link from "next/link";
import "./LatestStory.css";
import Image from "next/image";


function LatestStory({ courseData }) {
  return (
    <section className="latest-story" id="success-story">
      <div className="latest-story-header">
        <h2>Camp & Course</h2>
        <br />
        <p>กิจกรรมพิเศษปิดเทอม<span className="ls-highlight">สมัครด่วน!</span></p>
      </div>

      <div className="ls-grid">
        {/* Large card - left */}
        <Link href={courseData[0].href} className="ls-card ls-card-large" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="ls-card-image-wrapper">
            <Image
              src={courseData[0].content_img}
              alt="Group Photo"
              width={300}
              height={525}
              style={{ width: "100%", height: "auto", borderRadius: "16px" }}
              unoptimized
            />
          </div>
          <div className="ls-card-text">
            {/* <h3 className="ls-main-text">NSC Software Project 2026</h3> */}
            <p className="ls-date-text">{courseData[0].date}</p>
            <h4 className="ls-mid-text">{courseData[0].mainText}</h4>
            <p className="ls-sub-text">{courseData[0].subText}</p>
          </div>
        </Link>

        {/* Right stack */}
        <div className="ls-right-stack">
          <Link href={courseData[1].href} className="ls-card ls-card-small" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ls-card-small-inner">
              <div className="ls-card-image-wrapper">
                <Image
                  src={courseData[1].content_img}
                  alt="Dek70 Camp"
                  width={300}
                  height={225}
                  style={{ width: "100%", height: "auto", borderRadius: "16px" }}
                  unoptimized
                />
              </div>
              <div className="ls-card-text">
                {/* <h3 className="ls-main-text">Dek70 Camp</h3> */}
                <p className="ls-date-text">{courseData[1].date}</p>
                <h4 className="ls-mid-text">{courseData[1].mainText}</h4>
                <p className="ls-sub-text">{courseData[1].subText}</p>
              </div>
            </div>
          </Link>
          <Link href={courseData[2].href} className="ls-card ls-card-small" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ls-card-small-inner">
              <div className="ls-card-image-wrapper">
                <Image
                  src={courseData[2].content_img}
                  alt="Group Photo"
                  width={300}
                  height={225}
                  style={{ width: "100%", height: "auto", borderRadius: "16px" }}
                  unoptimized
                />
              </div>
              <div className="ls-card-text">
                {/* <h3 className="ls-main-text">NSC Software Project 2026</h3> */}
                <p className="ls-date-text">{courseData[2].date}</p>
                <h4 className="ls-mid-text">{courseData[2].mainText}</h4>
                <p className="ls-sub-text">{courseData[2].subText}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestStory;
