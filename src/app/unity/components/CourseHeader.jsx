import React from "react";
import "./CourseHeader.css";
import Image from "next/image";

function CourseHeader() {
    const DetailVideo = "https://www.youtube.com/embed/09XGap8QiL8"
    const HeaderImg = "https://nj.dekhub.com/public/unity/imgs/UNITY-6.png"
    const DetailImg = "https://nj.dekhub.com/public/unity/imgs/UNITY-2.png"
    return (
        <div className="Unity-Header">
            <div className="Header-Unity-Image">
                <Image src={HeaderImg} alt="" width={1920} height={1080} priority />
                <div className="course-overlay">
                    <div className="course-text">
                        <h1>Creative Design & 3D-Object Management</h1>
                        <p>from imagination to reality</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="Header">
                <h2>Unity คืออะไร</h2>
            </div>
            <br />
            <div className="Header-Detail">
                <p>Unity คือซอฟต์แวร์ที่ใช้สร้างเกมระดับโลก เช่น Pokémon Go, Among Us</p>
                <p>การสร้างเกมไม่ได้มีแค่เรื่องความสนุก แต่ยังฝึกทักษะเขียนโปรแกรม การออกแบบ และการแก้ปัญหา</p>
                <div className="Header-Detail-Box">
                    <h3>1. สร้างเกมทุกแพลตฟอร์ม</h3>
                    <p>Unity สามารถสร้างเกมที่เล่นได้ทั้งบนมือถือ (iOS/Android), คอมพิวเตอร์ (Windows/Mac), คอนโซล (PlayStation/Xbox), และแม้แต่เกม VR (Virtual Reality) หรือ AR (Augmented Reality) ออกแบบเกม 2D และ 3D</p>
                    <h3>2. สร้างเกมได้ทั้งแบบ 2D และ 3D</h3>
                    <p>ตั้งแต่เกมเล็ก ๆ ที่เล่นง่าย ไปจนถึงเกมขนาดใหญ่ที่มีรายละเอียดซับซ้อน จำลองสถานการณ์และการฝึกอบรม</p>
                    <h3>3. สร้างระบบจำลองสถานการณ์</h3>
                    <p>เช่น การฝึกอบรมพนักงาน หรือการจำลองโลกเสมือน (Virtual Simulation)</p>
                    <h3>4. สร้าง Mobile App</h3>
                    <p>ไม่ได้ใช้แค่สร้างเกมเท่านั้น แต่ยังสร้างแอปพลิเคชันแบบอินเตอร์แอคทีฟ เช่น การนำเสนอสินค้า 3D หรือการออกแบบอาคารในโลกเสมือน</p>
                    <br />
                </div>
                <h3 className="Header">Unity ช่วยฝึกทักษะการเขียนโปรแกรมที่เป็นประโยชน์</h3>
                <br />
                {/* <p>ต่อการเรียนต่อในด้านวิทยาการคอมพิวเตอร์ และฝึกการออกแบบที่เกี่ยวข้องกับการสร้างสรรค์ผลงาน</p> */}
                <div className="Header-Video-Main-Div">
                    <div className="Header-Video-Div">
                        <iframe
                            src={DetailVideo}
                            className="Header-Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <br />
                <div className="Header">
                    <h2>เริ่มด้วย Unity?</h2>
                </div>
                <br />
                <p>Unity ใช้งานง่ายและมีเครื่องมือที่ช่วยให้การเริ่มต้นพัฒนาเกมไม่ซับซ้อน เด็ก ๆ สามารถสร้างเกมของตัวเองได้ตั้งแต่แรกเริ่ม พร้อมฝึกทักษะที่สำคัญต่ออนาคต เช่น การคิดเชิงตรรกะ การแก้ปัญหา และความคิดสร้างสรรค์ด้วย Unity เด็ก ๆ จะไม่ได้แค่เรียนรู้การสร้างเกม แต่ยังได้เปิดโอกาสเข้าสู่โลกเทคโนโลยีและสร้างผลงานที่ใช้ต่อยอดในชีวิตจริงได้อีกด้วย!</p>
                <div className="Header-Detail-Box">
                    <h3>คุ้มค่ากับสิ่งที่ได้</h3>
                    <p>👨‍🏫 ฝึกทักษะเขียนโปรแกรมและตรรกะ (Logic Thinking)</p>
                    <p>🌟 สร้างผลงานเกมของตัวเองเพื่อใส่ใน Portfolio</p>
                    <p>📂 ต่อยอดการเรียนสาขาวิชาที่เกี่ยวข้อง เช่น วิทยา-การคอมพิวเตอร์ การออกแบบเกม</p>
                    <p>🎉 เปิดโอกาสในอุตสาหกรรมเกมที่เติบโตอย่างรวดเร็ว</p>
                </div>
                <div className="Header-Detail-Image">
                    <Image src={DetailImg} alt="" width={1920} height={1080} priority />
                </div>
            </div>
            <br />
            <div className="Header">
                <h2>Opening Unity Courses</h2>
            </div>
            <br />
        </div>
    );
}

export default CourseHeader;
