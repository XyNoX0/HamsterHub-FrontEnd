import React from "react";
import "./CourseContent.css";
import OnSiteImage from "./OnSiteImage";

function CourseContent({ content }) {
  const { content_title, content_description} = content;

  return (
    <div className="course-content">
      <div className="content-text">
        <h3>{content_title}</h3>
        <p dangerouslySetInnerHTML={{ __html: content_description }}></p>
      </div>
    </div>
  );
}

export default CourseContent;

