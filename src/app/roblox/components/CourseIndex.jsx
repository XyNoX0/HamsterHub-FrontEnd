import React from "react";
import "./CourseIndex.css";
import Image from "next/image";

function CourseIndex() {
    return (
        <div className="Index-Main-Box">
            <br />
            <h3>ขั้นตอนการสร้างเกม Roblox</h3>
            <div className="Index-Detail-Box">
                <a href="#Day 1">
                    <h3>พื้นฐานการสร้างเกมที่สนุกและง่าย</h3>
                </a>
            </div>
            <div className="Arrow"></div>
            <div className="Index-Detail-Box">
                <a href="#Day 2">
                    <h3>สร้างโมเดล 3D สุดเจ๋งของตัวเอง</h3>
                </a>
            </div>
            <div className="Arrow"></div>
            <div className="Index-Detail-Box">
                <a href="#Day 3">
                    <h3>เติมชีวิตให้เกมด้วยแสงและเอฟเฟกต์</h3>
                </a>
            </div>
            <div className="Arrow"></div>
            <div className="Index-Detail-Box">
                <a href="#Day 4">
                    <h3>ภูมิใจกับเกมของตัวเอง</h3>
                </a>
            </div>
            <div className="Arrow"></div>
            <div className="Arrow"></div>
            <div className="Arrow"></div>
            <div className="Index-Detail-Box">
                <a href="#Roblox Project Timeline">
                    <h3>Roblox Project</h3>
                </a>
            </div>
        </div>
    );
}

export default CourseIndex;
