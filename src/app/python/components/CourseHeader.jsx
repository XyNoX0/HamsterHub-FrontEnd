import React from "react";
import "./CourseHeader.css";

function CourseHeader() {
    const info = {
        first_text: `
            <h3 style="color: #007acc;">Python เป็นภาษายอดนิยมอันดับ 1 ของโลก</h3>
            <p style="padding:10px"></p>
            <h5>
                ที่สำคัญและทำให้น้องได้เปรียบไปถึงระดับมหาวิทยาลัย 
                ต่อยอดใช้งานธุรกิจ <strong>(Data Science)</strong> ได้เลย
            </h5>
            <h5>
                อยู่ในกลุ่มงานที่สร้างรายได้มากที่สุดสาย 
                <span style="color: #007acc; font-weight: bold;">Tech</span>.
            </h5>
            <h5>
                จากการประมวลผลไปถึงการนำเสนอข้อมูล ผ่านรูปแบบ 
                <span style="font-weight: bold; color: #007acc;">กราฟ</span>, 
                <span style="font-weight: bold; color: #007acc;">เว็บไซต์</span>, และ 
                <span style="font-weight: bold; color: #007acc;">App</span>
            </h5>
        `,
        second_text: `
            <h5>
                <strong>เราควรเริ่มด้วย Python</strong> ภาษาอันดับ 1 ของโลก เพราะมีลักษณะที่คล้ายภาษาอังกฤษ 
                <span style="color: #007acc; font-weight: bold;">เขียนสั้น</span>, 
                <span style="color: #007acc; font-weight: bold;">ทำงานได้เร็ว</span> 
                แถมต่อยอดไปใช้ได้กว้างขวาง
            </h5>
            <h5>
                โดยเฉพาะการ <strong>จัดการข้อมูลที่ซับซ้อน</strong> 
                จึงเป็นที่นิยมใช้ในการฝึก Machine Learning ให้เรียนรู้ได้อย่างน่าทึ่ง เช่น 
                <span style="color: #007acc; font-weight: bold;">Deepseek</span> และ 
                <span style="color: #007acc; font-weight: bold;">ChatGPT</span>
            </h5>
        `
    };
    return (
        <div>
            <div className="course-header-content">
                <div>
                    <div className="content-header-text" dangerouslySetInnerHTML={{ __html: info.first_text }}></div>
                    <p className="space"></p>
                    <div className="content-header-text" dangerouslySetInnerHTML={{ __html: info.second_text }}></div>
                </div>
            </div>
        </div>
    );
}

export default CourseHeader;
