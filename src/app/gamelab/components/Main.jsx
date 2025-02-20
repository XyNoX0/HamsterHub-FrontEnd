"use client"
import React from "react";
import "./CourseHeader.css"

import CourseHeader from "./CourseHeader";
import CourseOutline from "./CourseOutline";
import CourseGet from "./CourseGet";
import Slider from "../../components/Slider";

function Main() {
    const course = {
        "timeline": {
            "timeline_title": "📢 รายละเอียดกิจกรรม GL-Summer Camp 2025",
            "timeline_description": "",
            "timeline_img": "",
            "timeline_list": [
                {
                    "title": "14 ก.พ.-9 มี.ค.",
                    "topics": [
                        "เปิดรับสมัครผู้สนใจเข้าร่วมกิจกรรม"
                    ]
                },
                {
                    "title": "10-14 มี.ค.",
                    "topics": [
                        "ผู้ผ่านเข้ารอบ 2 จำนวน 200 คนจะได้เข้าร่วม Game Hacking Camp เพื่อฝึกทักษะการวิเคราะห์ และพัฒนาเกม แล้วได้นำเสนอต่อคณะกรรมการ"
                    ]
                },
                {
                    "title": "15 มี.ค.-11 พ.ค.",
                    "topics": [
                        "ผู้ผ่านเข้ารอบสุดท้าย 60 คนจะได้เข้าร่วมพัฒนา Asset",
                        "Asset Categories",
                        "🎀 2D & 3D Character",
                        "🌳 Map & Environment",
                        "✨ Visual Effects",
                        "🎧 Sound",
                        "💡 Script & Server Service",
                        "🎥 Cinematic"
                    ]
                }
            ]
        },
        "items": [
            {
                "title": "mrCITY",
                "description": null,
                "image": "https://nj.dekhub.com/public/imgs/Gallery/MobileApp&Game/mrcity.PNG",
                "content": "https://nj.dekhub.com/public/videos/Gallery/MobileApp&Game/mrCITY.mp4"
            },
            {
                "title": "Hamster Town",
                "description": null,
                "image": "https://nj.dekhub.com/public/imgs/Gallery/MobileApp&Game/HamsterTownMobile.png",
                "content": "https://nj.dekhub.com/public/videos/Gallery/MobileApp&Game/HamsterTownMobile.mp4"
            },
            {
                "title": "wOof",
                "description": null,
                "image": "https://nj.dekhub.com/public/imgs/Gallery/MobileApp&Game/wOof.png",
                "content": "https://nj.dekhub.com/public/videos/Gallery/MobileApp&Game/wOof.mp4"
            },
            {
                "title": "Phufa",
                "description": null,
                "image": "https://nj.dekhub.com/public/imgs/Gallery/Desktop/PXS_Phufa.png",
                "content": "https://nj.dekhub.com/public/videos/Gallery/Desktop/PXS_Phufa.mp4"
            },
            {
                "title": "Star Odyssey",
                "description": null,
                "image": "https://nj.dekhub.com/public/imgs/Gallery/Desktop/GameJam_jumping5.png",
                "content": "https://nj.dekhub.com/public/videos/Gallery/Desktop/GameJam_jumping5.mp4"
            }
        ],
        "get": {
            "get_video": "https://nj.dekhub.com/public/videos/PHCMap.mp4",
            "get_title": "🎁 สิ่งที่ได้รับ",
            "get_list": [
                {
                    "title": "เข้าใจกระบวนการพัฒนาเกม",
                    "description": ""
                },
                {
                    "title": "เทคนิคการสร้างเกมที่เรียบง่ายและสนุก",
                    "description": ""
                },
                {
                    "title": "การออกแบบเกมให้แตกต่าง",
                    "description": ""
                },
                {
                    "title": "เทคนิคการพัฒนา Asset ในแต่ละด้านที่สนใจ",
                    "description": ""
                },
                {
                    "title": "โอกาสทางธุรกิจ",
                    "description": ""
                },
                {
                    "title": "🏆 ต่อยอดสู่ผลงานที่แข่งขันในระดับประเทศขึ้นไปได้",
                    "description": ""
                },
                {
                    "title": "🎮 ผลงานและเกียรติบัตรเข้าร่วมกิจกรรม",
                    "description": ""
                }
            ]
        }
    }
    return (
        <div >
            <CourseHeader />
            <CourseGet get={course.get} />
            <CourseOutline timeline={course.timeline} />
            <Slider items={course.items} />
        </div>
    );
}


export default Main;