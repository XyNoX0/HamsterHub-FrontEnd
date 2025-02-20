import React from "react";
import "./CourseContent.css";

function CourseContent({ content }) {
  const { content_title, content_description, content_detail } = content;
  return (
    <div className="course-content">
      <div className="content-text">
        <h3>{content_title}</h3>
        <p>
          {content_description}
        </p>
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
