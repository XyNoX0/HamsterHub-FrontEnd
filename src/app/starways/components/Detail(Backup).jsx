import React from "react";
import "./Detail.css";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";
import Slider2 from "./Slider2";


function Detail() {
  const items = [
    {
      "title": "mrCITY",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/mrCITY.PNG",
      "content": "https://nj.dekhub.com/public/videos/mrCITY.mp4"
    },
    {
      "title": "Beam",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Beam.png",
      "content": "https://nj.dekhub.com/public/videos/Beam.mp4"
    },
    {
      "title": "Veggie Dash",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Veggie Dash.png",
      "content": "https://nj.dekhub.com/public/videos/Veggie%20Dash.mp4"
    },
    {
      "title": "ขนมปัง",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Knompang.png",
      "content": "https://nj.dekhub.com/public/videos/Knompang.mp4"
    },
    {
      "title": "wOof",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/wOof.png",
      "content": "https://nj.dekhub.com/public/videos/wOof.mp4"
    },
    {
      "title": "Pang",
      "description": null,
      "image": "https://nj.dekhub.com/public/imgs/Pang.png",
      "content": "https://nj.dekhub.com/public/videos/Pang.mp4"
    }
  ]
  const items2 = [
    {
      "image": "https://nj.dekhub.com/public/imgs/Starway/sw_gallery-1.jpg",
    },
    {
      "image": "https://nj.dekhub.com/public/imgs/Starway/sw_gallery-2.jpg",
    },
    {
      "image": "https://nj.dekhub.com/public/imgs/Starway/sw_gallery-3.jpg",
    },
    {
      "image": "https://nj.dekhub.com/public/imgs/Starway/sw_gallery-4.jpg",
    },
    {
      "image": "https://nj.dekhub.com/public/imgs/Starway/sw_gallery-5.jpg",
    }
  ];
  return (
    <div className="starway">
      <div className="starway-header">
        <div className="starway-header-img">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/StarwayBannerDT.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/StarwayBannerMB.png" className="img-mobile" width={1920} height={1080} priority />
        </div>
        <div className="starway-hero-buttom">
          <div className="starway-price">
            <p>1-31 ก.ค. (everyday)</p>
            <p>anytime</p>
          </div>
          <hr />
          <div className="starway-links">
            <h3>990฿</h3>
          </div>
        </div>
        <div className="starway-hero-buttom-mobile">
          <div className="starway-price">
            <div className="starway-price-mobile-wrapper">
              <p>1-30 ก.ค. (everyday)</p>
              <p>anytime</p>
            </div>
            <hr />
          </div>
          <div className="starway-links">
            <h3>990฿</h3>
          </div>
        </div>
      </div>
      <br />
      <div className="starway-detail">
        {/* <div className="starway-detail-img">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-1DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-1MB.png" className="img-mobile" width={500} height={350} priority />
        </div> */}
        <div className="starway-detail-text">
          <h3>เส้นทางสู่ยอดฝีมือแห่งยุค AI</h3>
          <h3><span className="gray">น้องจะได้สัมผัสเส้นทางสำคัญทั้ง</span></h3>
          <h3><span className="gray">การสร้าง</span>เว็บที่ดูดี สร้างเกมเท่ๆ <span className="gray">และฝึก</span>เขียนโปรแกรม <span className="gray">ทั้ง 3 เส้นทาง</span></h3>
          <h3><span className="gray">น้องจะได้ผลงานและทักษะที่ทำให้น้องได้</span></h3>
          <h3><span className="gray">เปรียบมากมายในยุคนี้ ไม่ต้องมีพื้นฐานน้องจะได้สนุกกับภารกิจท้าทายพร้อม</span></h3>
          <h3><span className="gray">เพื่อนๆทั่วประเทศได้</span>รางวัล<span className="gray">ที่อาจจะโชคดีได้ไป</span>ขิงกับเพื่อนๆ <span className="gray">ที่ชอบแนวเดียวกัน</span></h3>
          <h3><span className="gray">ก่อนจะผ่านแต่ละด่านน้องจะได้พบ Bossเป็นอุปสรรคใหญ่ให้น้องได้พิชิต</span></h3>
          <h3><span className="gray">เพื่อแสดงความเก่งกาจแถมได้โอกาสมุ่ง</span></h3>
          <h3><span className="gray">สู่เส้นทางแห่งผู้กล้าที่เหนือชั้นขึ้นไปอีก</span></h3>
          <h3>ทุกขั้นตอน<span className="gray">น้องจะ</span>ได้รับความช่วยเหลือจากพี่ๆ ตลอดเวลา</h3>
        </div>
        <div className="starway-detail-img-2">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-2DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-2MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-text-2">
          <h4>น้องจะได้</h4>
          <h3>สิทธิพิเศษของพวกเรา</h3>
        </div>
        <p className="space"></p>
        <div className="starway-detail-img-3">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-1DT.png" className="img-desktop" width={1920} height={800} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-1MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-img">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-3DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-3MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container">
          <div className="header">
            <h4>บ้าน</h4>
            <h3>Unity</h3>
            <h4>ฝึกสร้างเกมด้วยเครื่องมืออันดับ 1 ของโลก ที่เป็นมิตรกับน้องๆ ตั้งแต่มือใหม่</h4>
            <h4>จนถึงระดับโปร สร้างเกมระดับ AAA มากมายเช่น Genshin, ROV และ Pokemon Go</h4>
          </div>
          <br />
          <div className="detail">
            <div className="video-container">
              <video
                src="https://nj.dekhub.com/public/videos/Starways/Star-1.mp4"
                controls
              ></video>
            </div>
            <div className="text">
              <h3>Unity Skills</h3>
              <h3>💻 เรียนรู้พื้นฐานการใช้ Unity</h3>
              <h3>🧠 พื้นฐานการใช้ AI เขียนโปรแกรม</h3>
              <h3>⚙️ องค์ประกอบสำคัญ ในการสร้างเกม</h3>
              <h3 className="space-left">- Feel</h3>
              <h3 className="space-left">- UI & Transition</h3>
              <h3 className="space-left">- Cutscene</h3>
              <h3 className="space-left">- Effect</h3>
              <h3 className="space-left">- Sound</h3>
              <h3 className="space-left">- Map</h3>
              <h3 className="space-left">- Light & Volume</h3>
              <h3 className="space-left">- Animation (Generic, Micro)</h3>
              <h3 className="space-left">- Level Design</h3>
            </div>
          </div>
        </div>
        <div className="starway-detail-img-4">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-4DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-4MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-2">
          <div className="header">
            <h4>บ้าน</h4>
            <h3>Python</h3>
            <h4>Power Up ให้น้องแก้ปัญหาที่ซับซ้อนได้ตลอดชีวิต ด้วยการฝึกแสนสนุก ให้น้องผ่านภารกิจท้าทายแถมเขียน Python คล่องจนได้เปรียบถึงมหาวิทยาลัย แล้วเอาไปใช้ทำงานจริงได้เลย</h4>
          </div>
          <br />
          <div className="detail">
            <div className="text">
              <h3>💡 ชนิดของข้อมูล และตัวแปร (Data Type and Variable)</h3>
              <h3>✨ เงื่อนไข/ Conditions if .... else</h3>
              <h3>🖥 การทำซ้ำ และพื้นฐานอัลกอริทึม / Loop</h3>
              <h3>🧿 Nested Loops</h3>
              <br />
              <h3>🌐 การประยุกต์ใช้งานคำสั่งพื้นฐาน</h3>
              <h3>🛠 การใช้ตัวแปรเก็บข้อมูลขนาดใหญ่ / List</h3>
              <h3>💻 Dictionaries</h3>
              <br />
              <h3>📃 Excel</h3>
              <h3>📒 Mini Project</h3>
              <h3>📊 Final Presentation</h3>
            </div>
            <div className="video-container">
              <video
                src="https://nj.dekhub.com/public/videos/PHCMap.mp4"
                controls
              ></video>
            </div>
          </div>
        </div>
        <div className="starway-detail-container-2s">
          <div className="header">
            <h4>บ้าน</h4>
            <h3>Python</h3>
          </div>
          <br />
          <div className="detail">
            <div className="video-container">
              <video
                src="https://nj.dekhub.com/public/videos/PHCMap.mp4"
                controls
              ></video>
            </div>
            <div className="text">
              <h3>💡 ชนิดของข้อมูล และตัวแปร (Data Type and Variable)</h3>
              <h3>✨ เงื่อนไข/ Conditions if .... else</h3>
              <h3>🖥 การทำซ้ำ และพื้นฐานอัลกอริทึม / Loop</h3>
              <h3>🧿 Nested Loops</h3>
              <br />
              <h3>🌐 การประยุกต์ใช้งานคำสั่งพื้นฐาน</h3>
              <h3>🛠 การใช้ตัวแปรเก็บข้อมูลขนาดใหญ่ / List</h3>
              <h3>💻 Dictionaries</h3>
              <br />
              <h3>📃 Excel</h3>
              <h3>📒 Mini Project</h3>
              <h3>📊 Final Presentation</h3>
            </div>
          </div>
        </div>
        <div className="starway-detail-img-4">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-5DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-5MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-3">
          <div className="header">
            <h4>แล้ว</h4>
            <h3>จะสอนยังไงล่ะ?</h3>
            <h4>สู่มิติใหม่แห่งการเรียนรู้  ด้วยเกมผจญภัยในดินแดนผู้กล้าและการต่อสู้สุดมัน</h4>
            <h4>พร้อมเพื่อนรู้ใจ สะใจไปกับภารกิจลับและบอสโหดๆ</h4>
          </div>
          <br />
          <div className="detail">
            <div className="video-container">
              <video
                src="https://nj.dekhub.com/public/videos/Starways/Star-3.mov"
                controls
              ></video>
            </div>
            <div className="text">
              <h3>Hamster Map</h3>
              <h3> 💻 เลือกเทคโนโลยีที่ชอบได้เลย</h3>
              <h3> 📚 ได้รับภารกิจท้าทายจาก NPC</h3>
              <h3> 💪 ทำไมก็ไม่รู้นะ แต่ไม่ทันไรก็เก่งขึ้นเห็นได้ชัด</h3>
              <h3> 🤝 สนุกกับการเรียนรู้ด้วยตัวเอง ไปพร้อมเพื่อนๆ ทั่วประเทศที่ชอบเหมือนกัน</h3>
            </div>
          </div>
        </div>

        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-6DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-6MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-5">
          <div className="header">
            <h4>แล้ว</h4>
            <h3>มา Starways กัน</h3>
            <h4>เพียงแค่เข้าร่วมกิจกรรม Tech. Kickstarter</h4>
            <h4>แล้วถ้าน้องเป็นคนที่ใช่ เราจะได้ผจญภัยไปพร้อมกัน</h4>
          </div>
          <br />
          <div className="detail">
            <div className="video-container">
              <video
                src="https://nj.dekhub.com/public/videos/Starways/Star-4.mp4"
                controls
              ></video>
            </div>
          </div>
        </div>
        <div className="starway-detail-img-6">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-8DT.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/sw-8MB.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-8">
          <div className="header">
            <h3>Technology Kickstarter</h3>
          </div>
          <br />
          <div className="detail">
            <a href="/starter1">
              <div className="starway-detail-img">
                <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-2DT.png" className="img-desktop" width={1920} height={800} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-2MB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </a>
            <a href="/starter2">
              <div className="starway-detail-img">
                <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-3DT.png" className="img-desktop" width={1920} height={800} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-3MB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </a>
          </div>
        </div>
        <p className="space"></p>
        <div className="starway-detail-container-7">
          <div className="header">
            <h4>โครงการ</h4>
            <h3>Starways++ (Onsite)</h3>
            <h4>เพิ่มพลังแห่ง Social ให้น้องได้เพื่อน สนิทกับพี่ๆ up skill เท่ๆ ที่เติมไฟให้ความคิดสร้างสรรค์ เร่ง speed การเรียนรู้กับคู่หูที่ชอบแนวเดียวกัน</h4>
          </div>
          <p className="space"></p>
          <div className="detail">
            <div className="starway-detail-text-4">
              <h4>💪 ฝึกทักษะเพิ่มเติมจาก Starways แบบใกล้ชิดกับผู้เชี่ยวชาญ</h4>
              <h4>👀 ร่วมกิจกรรมสนุกๆ เสริมทักษะการเข้าสังคม,</h4>
              <h4>🛠 เร่ง Speed การเรียนรู้พร้อม Workshop ที่ให้ฝึกของจริง,</h4>
              <h4>📱 ภารกิจท้าทาย แสนสนุก outdoor ด้วย App AR+ ผจญภัยในสวนสาธารณะขนาดใหญ่</h4>
            </div>
            <br />
            <div className="starway-detail-img-8">
              <Image src="https://nj.dekhub.com/public/imgs/Starway/sw_gallery-1.jpg" className="img-desktop" width={1920} height={800} priority />
              <Image src="https://nj.dekhub.com/public/imgs/Starway/sw_gallery-1.jpg" className="img-mobile" width={500} height={350} priority />
            </div>
          </div>
        </div>
        <br />
        <div className="starway-detail-container-6">
          <div className="header">
            <h3>ผลงานคุณภาพ</h3>
            <h4>พี่ๆ คว้ารางวัลมากมายจากแทบทุกรายการทั่วประเทศ ได้เข้าวิศวะคอม</h4>
            <h4>ม.ท็อปๆ แทบยกรุ่น พร้อม App ที่ใช้จริงแล้วอย่าง mrCITY และ PHC Map</h4>
          </div>
          <br />
          <div className="detail">
            <Slider items={items} />
          </div>
        </div>
        <br />
        <div className="starway-detail-container-4">
          <div className="header">
            <h4>แล้ว</h4>
            <h3>คอร์สพิเศษเพิ่มทักษะ</h3>
          </div>
          <br />
          <div className="detail">
            <a href="/gameai">
              <div className="detail-img" >
                <Image src="https://nj.dekhub.com/public/imgs/Starway/aiDT.png" className="img-desktop" width={1920} height={500} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starway/aiMB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </a>
            <p className="space-2"></p>
            <a href="/unity">
              <div className="detail-img">
                <Image src="https://nj.dekhub.com/public/imgs/Starway/unDT.png" className="img-desktop" width={1920} height={500} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starway/unMB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </a>
            <p className="space-2"></p>
            <a href="/python">
              <div className="detail-img">
                <Image src="https://nj.dekhub.com/public/imgs/Starway/pyDT.png" className="img-desktop" width={1920} height={500} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starway/pyMB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </a>
          </div>
        </div>


        {/* <div className="starway-detail-container">
          <div className="tag-box">
            <span className="tag-text">Hamster Map</span>
          </div>
        </div>
        <div className="starway-detail-video">
          <video
            src="https://nj.dekhub.com/public/videos/Star.mp4"
            className="starway-detail-video"
            controls
          ></video>
        </div>
        <div className="starway-detail-text">
          <h3>Gamification</h3>
          <h3>กระบวนการเรียนรู้ด้วยตัวเอง และโคตรสนุก</h3>
        </div>
        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-6.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-6.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-2">
          <div className="tag-box">
            <span className="tag-text">House Member</span>
          </div>
        </div>
        <div className="starway-detail-img-2">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-2DT.png" className="img-desktop" width={1920} height={300} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-2MB.png" className="img-mobile" width={500} height={800} priority />
        </div>
        <div className="starway-detail-text-4"></div>
        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-7.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-7.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-3">
          <div className="tag-box">
            <span className="tag-text">Project</span>
          </div>
        </div>
        <div className="starway-detail-container-6">
          <div className="tag-box">
            <span className="tag-text">Project</span>
          </div>
        </div>
        <Slider items={items} />
        <div className="starway-detail-text-2">
          <h3>หลังจากเล่นจบ World</h3>
          <h3>จะมีโปรเจคเป็นบอสบททดสอบความสามารถ</h3>
        </div>
        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-8.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-8.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-4">
          <div className="tag-box">
            <span className="tag-text">Rewards & Shop</span>
          </div>
        </div>
        <div className="starway-detail-container-7">
          <div className="tag-box">
            <span className="tag-text">Rewards & Shop</span>
          </div>
        </div>
        <div className="starway-detail-img-3">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-3DT.png" className="img-desktop" width={700} height={300} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-3MB.png" className="img-mobile" width={500} height={300} priority />
        </div>
        <div className="starway-detail-text-3">
          <h3>ของรางวัล & และสินค้าในร้านค้ามากมาย</h3>
          <div className="starway-detail-a">
            <a href="/shop">
              Hamster Store
            </a>
          </div>
        </div>
        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-9.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-9.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-5">
          <div className="tag-box">
            <span className="tag-text">Competition Consultant</span>
          </div>
        </div>
        <div className="starway-detail-container-8">
          <div className="tag-box">
            <span className="tag-text">Competition Consultant</span>
          </div>
        </div>
        <div className="starway-detail-img-3">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-4DT.png" className="img-desktop" width={800} height={300} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-4MB.png" className="img-mobile" width={500} height={250} priority />
        </div>
        <div className="starway-detail-text">
          <h3>ประกาศข่าวสารการแข่งขัน และให้คำปรึกษาการลงแข่ง</h3>
        </div>
        <div className="starway-detail-img-5">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-10.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-10.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="starway-detail-container-4">
          <div className="tag-box">
            <span className="tag-text">Friends</span>
          </div>
        </div>
        <div className="starway-detail-container-8">
          <div className="tag-box">
            <span className="tag-text">Friends</span>
          </div>
        </div>
        <div className="starway-detail-img-3">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-5DT.png" className="img-desktop" width={800} height={300} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-5MB.png" className="img-mobile" width={500} height={200} priority />
        </div>
        <div className="starway-detail-text-3">
          <h3>ฝ่าฟันภารกิจแสนท้าทาย</h3>
          <h3>พร้อมเหล่าสหายรู้ใจไปด้วยกัน</h3>
        </div>
        <p className="space"></p>
        <p className="space"></p>
        <p className="space"></p>
        <div className="starway-detail-img-4">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/StarFooterDT.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/Star-1MB.png" className="img-mobile" width={500} height={350} priority />
        </div> */}
      </div>
    </div>
  );
}

export default Detail;
