import React from "react";
import "./CourseIndex.css";
import Image from 'next/image';

function CourseIndex() {
    const info = {
        header: "<h2>Road map</h2>",
        text: `
          <h2 style="color: #007acc;">Let's start the Adventure</h2>
          <h5>
            ใช้ความสนุก <strong>เล่นเกมแข่งกับเพื่อน</strong> 
            ด้วยภารกิจท้าทายที่แตกต่าง น้องจะได้ <span style="color: #007acc; font-weight: bold;">เก่งเร็ว</span> 
            และต่อยอดสู่การพัฒนา <span style="color: #007acc; font-weight: bold;">โปรแกรม</span>, 
            <span style="color: #007acc; font-weight: bold;">เกม</span>, 
            หรือผลงานสำหรับเข้าเรียนต่อได้ทุกคณะ
          </h5>
        `,
    };
    return (
        <div>
            <div className="course-index-video">
                <video controls src="https://nj.dekhub.com/public/videos/PHCSP.mp4"></video>
            </div>
            <div className="course-index-content">
                <div className="content-index-text">
                    <div className="content-index-header" dangerouslySetInnerHTML={{ __html: info.header }}></div>
                    <p className="space"></p>
                    <div className="content-index-text" dangerouslySetInnerHTML={{ __html: info.text }}></div>
                </div>
            </div>
            <p className="space"></p>
            <div className="course-index-table">
                <div className="course-index-table-basic">
                    <div className="course-index-table-content">
                        <Image className="course-table-img" src="https://nj.dekhub.com/public/imgs/PYL1.png" alt="Hams" width={200} height={200} />
                        <div className="course-index-table-text">
                            <h2>Basic Programming</h2>
                            <h5>Python พื้นฐานฝึกการเรียนรู้ด้วยตัวเองไปจนการแก้ปัญหาที่ซับซ้อน</h5>
                        </div>
                    </div>
                </div>
                <p className="space"></p>
                <div className="course-index-table-intermediate">
                    <div className="course-index-table-content">
                        <Image className="course-table-img" src="https://nj.dekhub.com/public/imgs/PYL2.png" alt="Hams" width={200} height={200} />
                        <div className="course-index-table-text">
                        <h2>Data Science</h2>
                        <h5>การจัดวางข้อมูล ค้นหาข้อมูลที่น่าสนใจ วางรากฐานสู่การทำข้อมูลขนาดใหญ่อย่าง AI</h5>
                        </div>
                    </div>
                </div>
                <p className="space"></p>
                <div className="course-index-table-advance">
                    <div className="course-index-table-content">
                        <Image className="course-table-img" src="https://nj.dekhub.com/public/imgs/PYL3.png" alt="Hams" width={200} height={200} />
                        <div className="course-index-table-text">
                        <h2>AI : Artificial Intelligence</h2>
                        <h5>ปัญญาประดิษฐ์ ที่สามารถกระทำได้เหมือนมนุษย์ ซึ่งสามารถใช้จินตนาการ สร้างสรรค์ได้หลากหลายรูปแบบ</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseIndex;
