import React from "react";
import "./CourseGet.css";
import Image from "next/image";

function CourseGet() {
  const get_list = [
{
  title:"📂 ไฟล์ Unity/Unreal Template",
  description:""
},
{
  title:"📜 ใบประกาศ “Game Creator Explorer”",
  description:""
},
{
  title:"💡 แรงบันดาลใจและแนวทางพัฒนาตนเองต่อในสายเกม",
  description:""
}
  ]
  return (
    <div className="course-get">
      <Image src="https://nj.dekhub.com/public/imgs/gamejourneyPT.png" width={1920} height={1080} priority />
      <br />
      <h3 id="coursegettext">🎁 สิ่งที่น้อง ๆ จะได้รับ:</h3>
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
