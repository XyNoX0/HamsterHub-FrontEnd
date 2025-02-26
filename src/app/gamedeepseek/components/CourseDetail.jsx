import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function CourseDetail() {
  const clip = "https://www.youtube.com/embed/dMxSbS1uWDE";
  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <h1>
          จากเกมเมอร์ <br /> สู่เกมเมคเกอร์
        </h1>
        <h4>พลิกวิธีคิด เปลี่ยนโลกเกม</h4>
      </div>

      <br />
      <div className="course-detail-text">
        <p>
          กิจกรรมที่จะทำให้น้องๆ
          <br />
          ใช้
          <span className="bold">เรื่องที่น้องชอบอยู่แล้ว</span>
          อย่าง
          <span className="bold">การเล่นเกม</span>
          <br />
          ดูคลิป และพูดคุยเกี่ยวกับเกมหลายชั่วโมงต่อวัน
        </p>
        <br />
        <p>
          <span className="bold">game Deep SeeK</span> จึงมอบโอกาสให้น้องๆ
          <br />
          ได้เข้ามา{" "}
          <span className="bold">
            ฝึกเล่นเกมแบบผู้สร้าง,
            <br /> ฝึกการวิเคราะห์องค์ประกอบในเกม
          </span>
          <br />
          รวมถึง กลไก และ โปรแกรม ที่ใช้สร้าง
        </p>
        <p>ผู้ที่นำเสนอได้ตามเกณฑ์ที่ดีที่สุด</p>
        <br />
        <p>
          <span className="bold">
            มีโอกาสได้ทุนพัฒนา Asset ขึ้น Store
            <br />
            มูลค่า 10,000 บาท
          </span>
        </p>
      </div>
      <br />
      <div className="course-detail-asset">
        <div className="course-detail-header-2">
          <span>
            <h1>GAME ASSET</h1>
            <p>
              องค์ประกอบต่าง ๆ ที่ใช้ในการสร้างเกม <br />
              ซึ่งรวมถึงไฟล์หรือข้อมูลที่จำเป็นสำหรับพัฒนา
            </p>
          </span>
        </div>

        <div className="course-detail-text-2">
          <li>
            <p>
              <span className="bold">องค์ประกอบ</span>
            </p>
            <Image
              src="https://assetstorev1-prd-cdn.unity3d.com/key-image/421988f6-a827-428b-86d4-9b815f15cdce.jpg"
              alt="Asset"
              width={500}
              height={500}
            />
          </li>
          <li>
            <p>
              <span className="bold">กราฟิก</span>
            </p>
            <Image
              src="https://cdn.sanity.io/images/fuvbjjlp/production/13db1599b7cc730cd6d0b4f36199fd6aa19721c7-800x450.jpg"
              alt="Asset"
              width={500}
              height={500}
            />
          </li>
          <li>
            <p>
              <span className="bold">เสียง</span>
            </p>
            <Image
              src="https://assetstorev1-prd-cdn.unity3d.com/key-image/a61eb300-679b-4bab-9942-7001aa280e16.jpg"
              alt="Asset"
              width={500}
              height={500}
            />
          </li>
          <li>
            <p>
              <span className="bold">ข้อมูล</span>
            </p>
            <Image
              src="https://assetstorev1-prd-cdn.unity3d.com/key-image/52a96e98-c514-4f51-9fbd-2a2075ab4a23.jpg"
              alt="Asset"
              width={500}
              height={500}
            />
          </li>
          <li>
            <p>
              <span className="bold">โค้ด</span>
            </p>
            <Image
              src="https://mfranc.com/images/code_review.jpeg"
              alt="Asset"
              width={500}
              height={500}
            />
          </li>
        </div>
        <div className="course-detail-header-2">
          <p>
            ผู้พัฒนาสามารถ<span className="bold">ทำเงิน</span>จาก{" "}
            <span className="bold">Asset</span> ได้มากมาย <br />
            <a href="https://assetstore.unity.com/">ดูรายละเอียดเพิ่มเติม</a>
          </p>
        </div>
      </div>
      <div className="course-detail-how">
      <div className="course-detail-video-2">
          <iframe
            src={clip}
            className="Header-Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="deepseek-how">
      
            <div className="course-detail-header-3">
              <h1>HOW?</h1>
            </div>
            <div className="course-detail-text-3">
              <p>
                เวลาเล่นเกม
                <span className="bold">
                  ผู้เล่นมักรู้แค่ว่าเกมนี้
                  <br />
                  สนุก หรือ ไม่สนุก
                </span>
                <br />
                แต่ก็อธิบายไม่ค่อยได้ว่าทำไม...
              </p>
              <br />
              <p>
                แล้วเคยสงสัยมั้ยว่า
                <span className="bold">
                  ผู้สร้างเกมคิดอะไรอยู่?
                  <br />
                  ทำไม
                </span>
                เขาถึง
                <span className="bold">ออกแบบเกมแบบนี้?</span>
                <br />
                <span className="bold">ความสนุกที่เรารู้สึก</span>
                มันถูก
                <span className="bold">สร้างขึ้นมาได้ยังไง?</span>
              </p>
              <br />
              <p>
                เราจะมา
                <span className="bold">เจาะลึก</span>
                ไปจนถึงเบื้องหลัง
                <br />
                <span className="bold">
                  การสร้างเกมตั้งแต่การออกแบบ
                  <br />
                  Gameplay, กลไก, เรื่องราว
                  <br />
                </span>
                ไปจนถึง จิตวิทยาผู้เล่น
                <br />
                เพื่อให้เราเข้าใจว่า
                <span className="bold">อะไรที่ทำให้เกมสนุก</span>
              </p>
              <br />
              <p>
                <span className="bold">
                  และที่สำคัญ...
                  <br />
                  เราจะคิดเกมที่สนุกกว่าเดิมได้ยังไง!?
                </span>
              </p>
            </div>
      
        </div>
      </div>
  <Image
          src="https://staticg.sportskeeda.com/editor/2022/07/89cef-16566325661680-1920.jpg"
          alt="gamedeepseek"
          className="timeline-img"
          width={1980}
          height={1000}
          priority
        />
      <div className="course-detail-timeline">
        <div className="course-detail-header-2">
          <h1>TIMELINE</h1>
        </div>
        <div className="course-detail-text-2-timeline">
          <p>
            เส้นทางสู่ทุนพัฒนา Asset <span className="bold">10,000 บาท</span>
          </p>

          <div className="vertical-container">
            <div className="vertical-line"></div>
          </div>

          <p>
            <span className="title">1</span>{" "}
            <span className="bold">รอบคัดเลือก</span>
          </p>
          <p>
            <span className="bold">ตั้งแต่วันนี้ - 9 มีนาคม</span>
          </p>
          <p>
            สมัคร <span className="bold">ตอบคำถาม</span>{" "}
            ก็เข้าร่วมสนุกกันได้ง่ายๆ
          </p>

          <div className="vertical-container">
            <div className="vertical-line"></div>
          </div>

          <p>
            <span className="title">2</span>{" "}
            <span className="bold">WORKSHOP</span>
          </p>
          <p>
            <span className="bold">10 - 14 มีนาคม (19:00 - 21:00)</span>
          </p>
          <p>
            เรียนรู้พร้อมกัน ได้ทั้ง
            <span className="bold">เพื่อนใหม่และคู่แข่ง</span>ในคนเดียวกัน
          </p>
          <br />
          <p>
            <span className="bold">Day 1: แข่งขันเกมที่ชอบ</span>
          </p>
          <ul>
            <li>
              ผู้เข้าร่วมสามารถแข่งเกมในกลุ่มที่ตัวเองถนัด (เช่นแนว Valorant,
              Land.io, Tetris) ได้ฝึกทักษะและวิเคราะห์กลยุทธ์การเล่น
            </li>
          </ul>
          <br />
          <p>
            <span className="bold">Day 2: เวิร์กช็อปแยกชิ้นส่วนเกม</span>
          </p>
          <ul>
            <li>
              เจาะลึกองค์ประกอบสำคัญของเกมดัง เช่น Gameplay, กราฟิก, เสียง
              และการออกแบบด่าน เพื่อเข้าใจว่าอะไรทำให้เกมประสบความสำเร็จ
            </li>
          </ul>
          <br />
          <p>
            <span className="bold">Day 3: ออกแบบเกมที่เกรียนที่สุด</span>
          </p>
          <ul>
            <li>
              ดึงไอเดียสุดแหวกแนวเพื่อสร้างเกมที่ตลก สนุก หรือบ้าสุด ๆ
              สร้างสรรค์แบบไร้ขีดจำกัด
            </li>
          </ul>
          <br />
          <p>
            <span className="bold">Day 4: นำเสนอเกมใน 30 วินาที</span>
          </p>
          <ul>
            <li>
              ฝึกทักษะการพรีเซนต์และขายไอเดียเกมของตัวเองให้โดดเด่นและดึงดูดใจในเวลาจำกัด
            </li>
          </ul>
          <br />
          <p>
            <span className="bold">
              Day 5: ฟังประสบการณ์จากผู้ชนะ NSC และ Game Jam
            </span>
          </p>
          <ul>
            <li>
              เรียนรู้แนวคิด กลยุทธ์
              และแรงบันดาลใจจากผู้ที่เคยสร้างเกมจนได้ทั้งรางวัลและเรียนต่อมหาลัยชั้นนำ
            </li>
          </ul>
          <div className="vertical-container">
            <div className="vertical-line"></div>
          </div>
          <p>
            <span className="title">3</span>{" "}
            <span className="bold">FINAL ROUND</span>
          </p>

          <span className="bold">22 มี.ค.</span>
          <ul>
            <li>
              ผู้เข้ารอบสุดท้าย ฝึกพัฒนา Asset ในแต่ละ Category กับผู้เชี่ยวชาญ
            </li>
            <li>
              ผู้พัฒนา Asset ที่มีคุณภาพ จะได้รับทุนพัฒนา 10,000 บาท เพื่อนำขึ้น
              Store
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default CourseDetail;
