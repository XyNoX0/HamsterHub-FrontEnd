import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function AiGameDeatail() {
  return (
    <div className="aigame-detail-container">
      <div className="timeline-text">
        <p>
          เปลี่ยนการสอน &quot;วิทยาศาสตร์&quot; ให้ใช้ 3D Space เป็นพื้นที่เล่นให้น้อง
          ได้เข้าใจตั้งแต่ตั้งสมมติฐาน ออกแบบการทดลอง พิสูจน์ สรุปผล แล้วได้ประยุกต์ทำให้เกมตัวเองบรรลุภารกิจ เล่นสนุก <br /> <br />
          <span style={{color:"#3894ff"}}>ไม่เชื่อใช่ไหม? ว่าเด็กเกลียดวิทย์</span> ก็กลายเป็นท็อปห้องได้  <span style={{color:"#ffa238ff"}}>มาดูกันว่าทำได้ไง</span> <br /> <br />
        </p>
      </div>
      <div className="aigame-video">
        <video src="https://nj.dekhub.com/public/videos/UPM_SS.mp4" controls>

        </video>
      </div>
      <div className="timeline-text">
        <p>
          🤣 น้องๆ ทุกคนที่ได้เรียนแล้ว <span style={{color:"#ffa238ff"}}>ลงความเห็นว่าสนุกมากกก</span> แถมช่วยส่งเสริมการเรียน<span style={{color:"#3894ff"}}>ฟิสิกส์ในห้องเรียน</span>ได้มาก ได้พูดคุยทำงานกับเพื่อนๆ และศึกษาค้นคว้า ทดลองสิ่งต่างๆ ที่แทบไม่ได้ทำในห้องเรียน
        </p>
      </div>
      <div className="aigame-img">
        <Image src="https://nj.dekhub.com/public/imgs/upm/9.png" className="aigame-img-desktop" width={1920} height={1080} priority alt="" />
        <Image src="https://nj.dekhub.com/public/imgs/upm/9.png" className="aigame-img-mobile" width={1920} height={1080} priority alt="" />
      </div>
      <br />
      <div className="aigame-detail-timeline">
        <div className="timeline-title">
          <h3><b>TIMELINE</b></h3>
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/2.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/2.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 ACT I: Day 1-3 เริ่มต้นกับ Unity และโปรเจกต์</b></h3>
          <p className="text-1">
            ทำความคุ้นเคยกับ Unity ที่สร้างเกมของตัวเองอย่างสนุกใน 3 วัน
          </p>
          <br />
          <p className="text-2">
            Day 1 :
          </p>
          <p className="text-1">
            - Basic Unity: Windows, Scene, Game Object, Component, Asset Store <br />
            - Import Asset : ฝึกใช้ Asset สร้าง Gameplay สุดเจ๋ง <br />
            - Quest : Make Fun Game! <br />
          </p>
          <br />
          <p className="text-2">
            Day 2 :
          </p>
          <p className="text-1">
            - Mock Up : แข่งกันใครทำเกมสนุกกว่า <br />
            - Production : ต่อด้วยจัดฉาก จัดแสง ใส่ Effect ทำเกมให้สวยเวอร์!
          </p>
          <br />
          <p className="text-2">
            Day 3 :
          </p>
          <p className="text-1">
            - Comment & Polish : พี่ๆช่วยแนะนำ เก็บงานให้กริบ <br />
            Mini-Boss: Presention & Ranking : นำเสนอเกม และจัดอันดับเกมใครเจ๋งสุด
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            ใช้เวลาทำแค่ 3 วัน ก็เป็นเกมล่นได้สนุก
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM_S.mp4" controls></video>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/3.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/3.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 ACT II: Day 4-5 ระบบฟิสิกส์ในเกม (แรงและการเคลื่อนที่)</b></h3>
          <p className="text-1">
            หลักการฟิสิกส์ระดับมัธยม เอามาใช้ควบคุมปืนใหญ่
          </p>
          <br />
          <p className="text-2">
            Day 4: แรงและการเคลื่อนที่เชิงเส้น
          </p>
          <p className="text-1">
            - ทฤษฎี: อธิบายกฎการเคลื่อนที่ของนิวตัน (Newton&apos;s Laws of Motion) และแนวคิดเรื่องแรง, มวล, และความเร่ง <br />
            - การประยุกต์ใช้: ใช้ Unity Physics เพื่อให้กระสุนปืนใหญ่มีแรงโน้มถ่วง (Gravity) และความเร็วเริ่มต้นที่กำหนด <br />
            SP : Gravity (Quick Challenge) : แสดงการใช้แรง กับมวลที่แตกต่างกัน เพื่อเล็งเป้าหมายให้แม่น <br />
          </p>
          <br />
          <p className="text-2">
            Day 5: การเคลื่อนที่แบบโพรเจกไทล์ (Projectile Motion)
          </p>
          <p className="text-1">
            - ทฤษฎี: อธิบายแนวคิดของการเคลื่อนที่แบบโค้งของวัตถุภายใต้แรงโน้มถ่วง <br />
            - การประยุกต์ใช้: สร้างโปรแกรมคำนวณวิถีโค้งของกระสุน โดยรับค่าความเร็วต้นและมุมยิง เพื่อให้กระสุนสามารถยิงไปตกยังตำแหน่งที่ต้องการได้ <br />
            SP : Gravity (Challenge) : เราสามารถปรับรูปแบบเกมให้เล่นกับแรงโน้มต่างๆ กันในแต่ละ stage เพิ่มความสะใจได้อีก พอเข้าใจการคำนวณ Projectile ก็ง่ายละทีนี้ <br /> <br />
            Boss: สร้างเกมยิงปืนสู่โจมตี enemy ที่บุกเข้ามาด้วยความเร็วที่แตกต่างกัน ใครทำได้หลาย stage จะได้คะแนนเพิ่ม
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            เกมที่ต้องใช้หลัก Physics มาแก้ปัญหาต่างๆ
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM C2.mp4" controls></video>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/4.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/4.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 ACT III: Day 6-8 คณิตศาสตร์กับการสร้างเกม</b></h3>
          <p className="text-1">
            ใช้ Python เพื่อให้น้องเข้าใจคณิตศาสตร์ได้ง่ายขึ้น
          </p>
          <br />
          <p className="text-2">
            Day 6: ฝึกการเขียนโปรแกรมภาษา Python (Python Foundation)
          </p>
          <p className="text-1">
            - Presentation: ฝึกนำเสนอเกมให้เพื่อนเข้าใจ <br />
            - ทฤษฎี: ฝึกใช้ Python คำนวณหามุมยิงที่เหมาะสม เพื่อให้กระสุนตกถึงเป้าหมายที่กำลังเคลื่อนที่ โดยใช้หลักการคณิตศาสตร์เชิงเวกเตอร์ (Vector Mathematics) <br />
            - การประยุกต์ใช้: สร้างระบบเล็งเป้าหมายอัตโนมัติ (Aiming System) ที่คำนวณมุมยิงที่เหมาะสมเพื่อยิงศัตรูที่กำลังเคลื่อนที่อยู่ <br />
            SP : Projectile (Challenge) : ออกแบบ Free body Diagram แสดงการยิงศัตรูจาก Vector ของกระสุน <br />
          </p>
          <br />
          <p className="text-2">
            Day 7: เรขาคณิตในเกม 2D และ 3D
          </p>
          <p className="text-1">
            - ทฤษฎี: อธิบายแนวคิดเรื่องพิกัด (Coordinates), ระยะทาง (Distance), และเวกเตอร์ (Vectors) ใน Unity <br />
            - การประยุกต์ใช้: <br />
            <div style={{ marginLeft: "50px" }}>
              - ใช้ Python สร้างเส้นทางการเคลื่อนที่ด้วยสมการเชิงเส้นหลายตัวแปร <br />
              - คำนวณระยะห่างระหว่างปืนใหญ่กับศัตรูเพื่อกำหนดรัศมีการยิง <br />
              - ใช้เวกเตอร์ในการกำหนดทิศทางของกระสุน <br />
              - สร้าง Enemy ที่แตกต่างกันหลายชนิด <br />
            </div>
            SP : Projectile (Lab) : ควบคุมปืนใหญ่ให้ยิงโดนเป้าหมาย <br />
          </p>
          <br />
          <p className="text-2">
            Day 8: ความน่าจะเป็น (การสุ่มเกิด Enemy)
          </p>
          <p className="text-1">
            - ทฤษฎี: ฝึกการเขียน Python สุ่มเกิด Enemy ตามความสามารถ หลังจากมี Enemy ถูกยิงจะเกิดผลกระทบกับ Enemy ตามค่าพลัง <br />
            - การประยุกต์ใช้: <br />
            <div style={{ marginLeft: "50px" }}>
              - สุ่ม Enemy <br />
              - Rarity มีผลต่อความเก่งของ Enemy <br />
            </div>
            SP : สุ่มให้ Enemy เกิดตามจำนวนที่ต้องการ เพื่อให้เกมสนุกขึ้นเรื่อยๆ
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            ใช้ Python แก้ไขสมสมการที่ซับซ้อน และสร้างเกมที่สนุกไปกับคณิตสาสตร์
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM C1.mp4" controls></video>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/5.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/5.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 ACT IV:Day 9-10 การใช้สถิติปรับรายละเอียดการยิงในเกมให้ดูสมจริงขึ้น</b></h3>
          <p className="text-1">
            เพิ่มความสนุกในความแม่นและ Damage ในการยิง
          </p>
          <br />
          <p className="text-2">
            Day 9: การคำนวณ Damage จากค่าสถิติ
          </p>
          <p className="text-1">
            - ทฤษฎี: สอนหลักการคำนวณเชิงเส้น (Linear Functions) <br />
            - การประยุกต์ใช้: <br />
            <div style={{ marginLeft: "50px" }}>
              - คำนวณ Damage ของกระสุนที่ลดเลือดศัตรู <br />
              - คำนวณค่าพลังชีวิตของศัตรูตามระดับ (Level) <br />
              - สร้างระบบเงินและระบบอัปเกรดปืนใหญ่ <br />
            </div>
            SP : 2D-3D (Challenge) : แข่งสร้างระบบการยิงที่สมจริง <br />
          </p>
          <br />
          <p className="text-2">
            Day 10: การชนและการคำนวณแรงปะทะ
          </p>
          <p className="text-1">
            - ทฤษฎี: อธิบายแนวคิดเรื่องการชน (Collision) <br />
            - การประยุกต์ใช้: <br />
            <div style={{ marginLeft: "50px" }}>
              - สร้างระบบให้กระสุนเมื่อชนกับศัตรูแล้วระเบิด <br />
              - คำนวณแรงปะทะที่เกิดขึ้นและคำนวณดาเมจตามแรงปะทะ <br />
              - ใช้ Unity Physics ในการตรวจจับการชน (Collision Detection) <br />
            </div>
            SP : Projectile (Lab) : ควบคุมปืนใหญ่ให้ยิงโดนเป้าหมาย <br /> <br />
            Boss : ทำ Game Tower Defense ให้เล่นสนุก
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            ป้องกันฐานจากการบุกรุกของศัตรูกับเกมแนว Tower Defense
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM C3.mp4" controls></video>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/6.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/6.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 ACT V: Day 11-13 ประยุกต์ใช้คณิตและฟิสิกส์กับการสร้างเกมให้เพื่อนเล่น</b></h3>
          <p className="text-1">
            ฝึกใช้หลักการเคลื่อนที่ แรง ความเร็ว ความเร่ง และคณิตศาสตร์ ทำให้เกมสนุก
          </p>
          <br />
          <p className="text-2">
            Day 11: การเพิ่มประสิทธิภาพของเกม
          </p>
          <p className="text-1">
            - ทฤษฎี: สอนเรื่องการจัดการวัตถุในเกม (Object Pooling) เพื่อลดการใช้ทรัพยากร <br />
            - การประยุกต์ใช้: สร้างระบบจัดการจำนวนกระสุนและศัตรูเพื่อเพิ่ม Frame Rate <br />
            - ฝึกทำงานเป็นกลุ่ม <br />
          </p>
          <br />
          <p className="text-2">
            Day 12: การปรับแต่งความสวยงามของฉาก และระบบแสง
          </p>
          <p className="text-1">
            - ทฤษฎี: ฝึกการจัดแสง และองค์ประกอบในเกม <br />
            - การประยุกต์ใช้: ฝึกออกแบบเกมให้สวยงาม <br />
            - ฝึกทำงานเป็นกลุ่ม <br />
          </p>
          <br />
          <p className="text-2">
            Day 13: การปรับแต่ง Animation และ Effect ในเกม
          </p>
          <p className="text-1">
            - ทฤษฎี: สร้าง Animation ของ Enemy กระสุน และ Player รวมทั้งองค์ประกอบสำคัญต่างๆ เพิ่มเติมระบบ Effect ให้น่าสนใจ <br />
            - การประยุกต์ใช้: ฝึกออกแบบเกมให้เคลื่อนไหวอย่างน่าเล่น <br />
            - ฝึกทำงานเป็นกลุ่ม <br />
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            การเก็บรายละเอียดทีให้เกมสวยงาม และน่าเล่นมากยิ่งขึ้น!
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM_5.mp4" controls></video>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/upm/7.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/upm/7.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>🔖 Final Act: สร้างเกมสนุกได้จนเสร็จ นำเสนอให้เพื่อนเข้าใจ ได้เรียนรู้ร่วมกัน</b></h3>
          <p className="text-2">
            Day 14: Final Boss พัฒนาเกม Game Tower Defense ที่สมบูรณ์ สวยงาม
          </p>
          <br />
          <p className="text-2">
            Day 15: นำเสนอผลงาน และนำไปอวดชาวโลก
          </p>
          <p className="text-1">
            - ทฤษฎี: ทบทวนสิ่งที่เรียนรู้ทั้งหมด <br />
            - นำเสนอ: ผู้เรียนแต่ละคนนำเสนอเกม Tower Defense ที่ตัวเองสร้างขึ้น พร้อมอธิบายการนำหลักทางคณิตศาสตร์และฟิสิกส์มาใช้ในเกม <br />
          </p>
        </div>
        <br />
        <div className="timeline-text-2">
          <p>
            ถ้าทำเกมที่ลงลึก และเก็บรายละเอียดได้ดีก็ลุ้นรางวัลระดับประเทศได้
          </p>
        </div>
        <div className="timeline-video">
          <video src="https://nj.dekhub.com/public/videos/upm/UPM_6.mp4" controls></video>
        </div>
        <br />
      </div>
    </div>
  );
}
export default AiGameDeatail;
