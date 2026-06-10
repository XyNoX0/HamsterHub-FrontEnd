"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Profile.css";
import Slider from "./Slider.jsx";


import { getMemberData } from "@/utils/api";


const Profile = ({ DiscordData }) => {
    DiscordData = DiscordData.DiscordData
    var id = DiscordData.id;
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isClipOpen, setIsClipOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const toggleClip = () => {
        setIsClipOpen(!isClipOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMemberData(id);
                setData(data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchData();
    }, [id]);

    if (!data) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading...</p>
            </div>
        );
    }


    return (
        <div>
            <div className="clip-wrapper">
                {isClipOpen && <div className="overlay" onClick={toggleClip}></div>}
                <div className={`popup ${isClipOpen ? 'popup-open' : ''}`}>
                    <div className="popupContent">
                        <div className="clip">
                            <iframe
                                src={`${data.MemberData.about.clip}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="youtube-embed-frame"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popup-wrapper">
                {isOpen && <div className="overlay" onClick={togglePopup}></div>}
                <div className={`popup ${isOpen ? 'popup-open' : ''}`}>
                    <div className="popupContent">
                        <div className="header" onClick={toggleClip}>
                            <h5>{data.MemberData.nick}</h5>
                            <div className="icon-img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/clip.png`} width={200} height={200} alt="" priority />
                            </div>
                        </div>
                        <p>{data.MemberData.about.detail}</p>
                        <button onClick={togglePopup} className="closeButton">
                            OK
                        </button>
                    </div>
                </div>
            </div>
            <div className="profile">
                <br />
                <br />
                <div className="main-detail">
                    <div className="content">
                        <div className="profile-img">
                            <Image src={`https://cdn.discordapp.com/avatars/${DiscordData.id}/${DiscordData.avatar}.png`} width={200} height={200} alt="" priority />
                        </div>
                        <div className="detail">
                            <div className="name">
                                <h2>{data.MemberData.fullname}</h2>
                            </div>
                            <div className="bio">
                                <p>{data.MemberData.quota}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="category">
                        <button className="about-btn">
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/paper.png`} width={200} height={200} alt="" priority />
                            About
                        </button>
                        <button className="skill-btn">
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/star.png`} width={200} height={200} priority alt="" />
                            Item
                        </button>
                        <button className="gallery-btn">
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/computer.png`} width={200} height={200} priority alt="" />
                            Gallery
                        </button>
                    </div> */}
                </div>
                <div className="space-1"></div>
                <div className="about-section">
                    <div className="detail">
                        <div className="rank">
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/hero.png`} width={200} height={200} alt="" priority />
                            <p>{data.MemberData.rank}</p>
                        </div>
                        <div className="line"></div>
                        <div className="code">
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/code.png`} width={200} height={200} alt="" priority />
                            <p>{data.MemberData.code}</p>
                        </div>
                        <div className="line"></div>
                        <div className="coin">
                            <Link href="/shop" className="coin-img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/coin.png`} width={200} height={200} alt="" priority />
                            </Link>
                            <p>{data.MemberData.coin}</p>
                        </div>
                    </div>
                </div>
                <div className="space-1"></div>
                <div className="contact-section">
                    <div className="detail">
                        <div className="about" onClick={togglePopup}>
                            <Image src={`https://nj.dekhub.com/public/imgs/Member/aboutme.png`} width={200} height={200} alt="" priority />
                        </div>
                        {data.MemberData.contact.ig != "" && (
                            <Link href={data.MemberData.contact.ig} className="ig">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/ig.png`} width={200} height={200} alt="" priority />
                            </Link>
                        )}
                        {data.MemberData.contact.github != "" && (
                            <Link href={data.MemberData.contact.github} className="github">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/github.png`} width={200} height={200} alt="" priority />
                            </Link>
                        )}
                        {data.MemberData.contact.facebook != "" && (
                            <Link href={data.MemberData.contact.facebook} className="facebook">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/facebook.png`} width={200} height={200} alt="" priority />
                            </Link>
                        )}
                        {data.MemberData.contact.youtube != "" && (
                            <Link href={data.MemberData.contact.youtube} className="youtube">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/youtube.png`} width={200} height={200} alt="" priority />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="space-1"></div>
                <div className="skill-section">
                    <div className="header">
                        <h2>Skills</h2>
                    </div>
                    <div className="top">
                        <div className="fogus">
                            <div className="img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/fogus.png`} width={200} height={200} alt="" priority />
                            </div>
                            <div className="text">
                                <h3>Focus</h3>
                                <p>{data.MemberData.skill.fogus}</p>
                            </div>
                        </div>
                        <div className="attitude">
                            <div className="img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/attitude.png`} width={200} height={200} alt="" priority />
                            </div>
                            <div className="text">
                                <h3>Attitude</h3>
                                <p>{data.MemberData.skill.attitude}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="creativity">
                            <div className="img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/creativity.png`} width={200} height={200} alt="" priority />
                            </div>
                            <div className="text">
                                <h3>Creativity</h3>
                                <p>{data.MemberData.skill.creativity}</p>
                            </div>
                        </div>
                        <div className="speed">
                            <div className="img">
                                <Image src={`https://nj.dekhub.com/public/imgs/Member/speed.png`} width={200} height={200} alt="" priority />
                            </div>
                            <div className="text">
                                <h3>Speed</h3>
                                <p>{data.MemberData.skill.speed}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-1"></div>
                {data.MemberData.courses.length > 0 ? (
                    <div className="course-section">
                        <div className="header">
                            <h2>Recent Courses</h2>
                        </div>
                        <div className="detail">
                            <Slider data={data.MemberData.courses} courseData={data.CourseData} />
                        </div>
                    </div>
                ) : (
                    <div className="course-section">
                        <div className="header">
                            <h2>Recent Courses</h2>
                        </div>
                    </div>
                )}
                <br />
            </div>
        </div>
    );
};

export default Profile;
