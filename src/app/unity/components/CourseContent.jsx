import React from "react";
import "./CourseContent.css";
import Image from "next/image";

function CourseContent({ content, courseDetail }) {
  const { content_title, content_description, content_img, content_img_mobile, img_description, content_detail } = content;
  const { name } = courseDetail;

  return (
    <div className="course-content">
      <div className="content-text">
        <h3>{content_title}</h3>
        <p>
          {content_description}
        </p>
      </div>
      <div className="course-img">
        <video className="course_img" controls src={content_img}></video>
      </div>
      <div className="course-item">
        <ul>
          {content_detail.map((item, index) => (
            <li key={index}>
              <h4>{item.header}</h4>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseContent;
