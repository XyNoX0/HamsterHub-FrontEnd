import React from "react";
import "./CourseGet.css";
import Image from "next/image";

function CourseGet() {
  const get_list = [
{
  title:"🏆 อันดับ 1: เงินรางวัล 3,000 บาท + ประกาศนียบัตร",
  description:""
},
{
  title:"🥈 อันดับ 2: เงินรางวัล 2,000 บาท + ประกาศนียบัตร",
  description:""
},
{
  title:"🥉 อันดับ 3: เงินรางวัล 1,000 บาท + ประกาศนียบัตร",
  description:""
},
{
  title:"🎁 รางวัลพิเศษ: Sponsor’s Special Gift",
  description:""
},
{
  title:"🔥 รางวัลยอดนิยม: IoT Equipment + Training Package",
  description:""
},
  ]
  return (
    <div className="course-get">
      <Image src="https://nj.dekhub.com/public/imgs/HGJ6_Poster.jpg" width={1920} height={1080} priority />
      <br />
      <h3 id="coursegettext">ของรางวัล</h3>
      <div className="course-get-text">
        <ul>
          {get_list.map((item, index) => (
            <li key={index}>
              <h4>{item.title}</h4>
              {item.description && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseGet;
