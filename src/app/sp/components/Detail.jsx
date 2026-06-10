import React from "react";
import "./Detail.css";
import Image from "next/image";
import Link from "next/link";


function Detail({courseData}) {
  return (
    <div className="starway">
      <div className="starway-header">
        <div className="starway-header-img">
          <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/DT.png" className="img-desktop" width={1920} height={1080} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/MB.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        </div>
        <div className="starway-hero-buttom">
          <div className="starway-price">
            <p>{courseData.date}</p>
            <p>{courseData.time}</p>
          </div>
          <hr />
          <div className="starway-links">
            <h3>{courseData.price}฿</h3>
            <Link href={courseData.book_link}>Book</Link>
          </div>
        </div>
        <div className="starway-hero-buttom-mobile">
          <div className="starway-price">
            <div className="starway-price-mobile-wrapper">
              <p>{courseData.date}</p>
              <p>{courseData.time}</p>
            </div>
            <hr />
          </div>
          <div className="starway-links">
            <h3>{courseData.price}฿</h3>
            <Link href={courseData.book_link}>Book</Link>
          </div>
        </div>
      </div>
      <div className="course-content">
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/1.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/1.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/2.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/2.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/3.gif" className="img-desktop" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/videos/Starplatinum/3.gif" className="img-mobile" width={1920} height={1080} priority alt="" unoptimized />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/5.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/5.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/6.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/6.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/7.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/7.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/8.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/8.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/9.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/9.png" className="img-mobile" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/10.png" className="img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/Starplatinum/10.png" className="img-mobile" width={1920} height={1080} priority alt="" />
      </div>
    </div>
  );
}

export default Detail;
