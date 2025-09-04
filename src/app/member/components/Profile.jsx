import React from "react";
import Image from "next/image";
import "./Profile.css";


const Profile = ({ Data }) => {
    const { memberData, courseData } = Data;

    return (
        <div className="profile">
            <Image src="/assets/test-2.png" className="img-desktop" width={1920} height={1080} priority />
            <Image src="/assets/test.png" className="img-mobile" width={1920} height={1080} priority />
            <div className="overlay">
                <div className="stats-content">
                    <div className="stats-header">
                        <h2>Stats</h2>
                    </div>
                    <div className="stats-info">
                        <div className="info-1">
                            <div className="name">
                                <p>Name</p>
                                <h1>{memberData.nick}</h1>
                            </div>
                            <div className="rank">
                                <p>Rank</p>
                                <h1>{memberData.rank}</h1>
                            </div>
                        </div>
                        <div className="info-2">
                            <div className="code">
                                <p>Code</p>
                                <h2>{memberData.code}</h2>
                            </div>
                            {["Hero", "hero", "Ace", "ace", "Admin", "admin", "Ass", "ass"].includes(memberData.rank) ? (
                                <div className="coin">
                                    <p>Balls</p>
                                    <h2>{memberData.ball} <Image src="/assets/H-Coin.png" width={100} height={100} /></h2>
                                </div>
                            ) : (
                                <div className="coin">
                                    <p>Coins</p>
                                    <h2>{memberData.coin} <Image src="/assets/HCoin.png" width={100} height={100} /></h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="icons">
                <div className="icon-1">
                    <Image src="/assets/IP.png" width={100} height={100} />
                    <p>In Progress</p>
                </div>
                <div className="icon-2">
                    <Image src="/assets/Item.png" width={100} height={100} />
                    <p>Items</p>
                </div>
                <div className="icon-3">
                    <Image src="/assets/Course.png" width={100} height={100} />
                    <p>Course</p>
                </div>
                <div className="icon-4">
                    <Image src="/assets/Friend.png" width={100} height={100} />
                    <p>Friends</p>
                </div>
            </div> */}
            {/* <div className="progress">
                <div className="header">
                    <h2>In Progress</h2>
                </div>
                <Image src="/assets/test-3.png" className="img-desktop" width={1920} height={1080} priority />
                <Image src="/assets/test3.png" className="img-mobile" width={1920} height={1080} priority />
                <div className="detail">
                    <div className="box">
                        <h2>Minecraft</h2>
                        <h3>เกมเหลี่ยมของคนเหลี่ยมๆ ใช้เวลาพัฒนา 2 ปี แต่ก็ไม่เป็นไรไหวชิว</h3>
                    </div>
                    <br />
                    <div className="button">
                        <a href="#">
                            Game Design
                        </a>
                    </div>
                </div>
            </div> */}
            {/* <br />
            <div className="item">
                <div className="header">
                    <h2>Items</h2>
                </div>
                <div className="desktop">
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>
                <div className="mobile">
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                    <p className="space"></p>
                    <div className="detail">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>
                    </div>
                </div>
            </div> */}
            <br />
            <div className="course">
                <div className="header">
                    <h2>Recent Courses</h2>
                </div>
                <div className="detail">
                    {courseData.map((course, index) => (
                        <div key={index} className="course-box">
                            {course.courseDetail?.cover_desktop && course.courseDetail?.cover_mobile && (
                                <a href={`/course/${course.id}`}>
                                    <div className="detail-img" >
                                        <Image src={`${course.courseDetail.cover_desktop}`} className="img-desktop" width={1920} height={500} alt="" priority />
                                        <Image src={`${course.courseDetail.cover_mobile}`} className="img-mobile" width={500} height={350} alt="" priority />
                                    </div>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
