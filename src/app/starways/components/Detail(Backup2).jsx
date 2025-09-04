import React from "react";
import "./Detail.css";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";


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
  return (
    <div className="starway">
      <div className="starway-header">
        <div className="starway-header-img">
          <Image src="https://nj.dekhub.com/public/imgs/Starway/StarwayBannerDT.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starway/StarwayBannerMB.png" className="img-mobile" width={1920} height={1080} priority />
        </div>
        <div className="starway-hero-buttom">
          <div className="starway-price">
            <p>1-31 ส.ค. (everyday)</p>
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
              <p>1-30 ส.ค. (everyday)</p>
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
        <div className="part-1">
          <h1>คืออะไร?</h1>
          <p><span className="text-bold">Starways</span> เป็นเส้นทางให้พวกเราที่<span className="text-white">อยากสนุกกับเทคโนโลยีไปกับเพื่อนๆ ที่ก็ชอบเหมือนกัน</span></p>
          <p className="space"></p>
          <p>ด้วยรูปแบบการผจญภัยที่โคตรสนุก <span className="text-white">ฝึกทักษะผ่านอุปสรรคต่างๆ ให้น้องเก่งขึ้นเป็นลำดับขั้น</span> ใครเร็วก็ยาวไปเลย ลูกพี่...</p>
          <p className="space"></p>
          <p>แต่ไม่ได้ใจร้าย เพราะ<span className="text-white">มีพี่ๆ expert คอยช่วย</span> เพื่อสร้างผลงานเทพๆ ให้สำเร็จตามเป้าหมาย</p>
        </div>
        <div className="prob-1">
          <Image src="https://nj.dekhub.com/public/imgs/Starways/prob-1.png" className="img-desktop" width={1920} height={500} priority />
          <Image src="https://nj.dekhub.com/public/imgs/Starways/prob-1.png" className="img-mobile" width={500} height={350} priority />
        </div>
        <div className="video-container">
          <video
            src="https://nj.dekhub.com/public/videos/Starways/Star-1.mp4"
            controls
          ></video>
        </div>
        <br />
        <br />
        <div className="part-2">
          <div className="header">
            <h1>ดูไฮไลท์ต่างๆ</h1>
          </div>
          <br />
          <div className="detail">
            <div className="box">
              <h2>แตกต่างจากที่อื่นยังไง?</h2>
              <ul className="list">
                <li>มีพี่คอยให้คำแนะนำทุกวัน</li>
                <li>เรียนรู้ไปพร้อมกับเพื่อนๆที่มี Passion ในเรื่องเดียวกัน</li>
                <li>กระบวนการสอนด้วยภารกิจในเกมฝึกการเรียนรู้ด้วยตัวเองทักษะสำคัญในยุคนี้</li>
              </ul>
            </div>
            <div className="box">
              <h2>Activity</h2>
              <ul className="list">
                <li>hamsTalk : เปิดเวิร์คช็อปเนื้อหาที่น่าสนใจ และเรียนรู้ไปพร้อมกับเพื่อนๆ</li>
                <li>Expert : มีที่พี่ดูแลแล้ว ยังมีพี่จะถนัดลึกในแต่ละด้านด้วย ทั้งด้าน Unity, Python, Blender และอื่นๆ</li>
              </ul>
            </div>
            <div className="box">
              <h2>Hamster Map?</h2>
              <ul className="list">
                <li>เรียนรู้ตั้งแต่พื้นฐานจนถึงโปร ด้วยการภารกิจสุดมันส์ ภายในเกม และหาของเทพๆ ไปขิงเพื่อน</li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="part-3">
          <div className="header">
            <h1><span className="text-small">ด้วย</span> 6 ขั้นตอนเป็นเทพ</h1>
          </div>
          <div className="detail">
            <div className="one">
              <div className="header-container">
                <div className="number-container">
                  <h1>1</h1>
                </div>
                <div className="text-container">
                  <h1>Technology Kickstarter</h1>
                  <p>เริ่มต้นพื้นฐานทางเทคโนโลยี</p>
                </div>
              </div>
              <div className="img-container">
                <a href="/starter2">
                  <Image src="https://nj.dekhub.com/public/imgs/Starways/tk-unity.png" className="img-desktop" width={1920} height={500} priority />
                  <Image src="https://nj.dekhub.com/public/imgs/Starways/tk-unity.png" className="img-mobile" width={500} height={350} priority />
                </a>
                <a href="/starter1">
                  <Image src="https://nj.dekhub.com/public/imgs/Starways/tk-python.png" className="img-desktop" width={1920} height={500} priority />
                  <Image src="https://nj.dekhub.com/public/imgs/Starways/tk-python.png" className="img-mobile" width={500} height={350} priority />
                </a>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="two">
              <div className="header-container">
                <div className="number-container">
                  <h1>2</h1>
                </div>
                <div className="text-container">
                  <h1>คัดเลือกเข้า Starways</h1>
                  <p>ได้รับบัตรเชิญพิเศษ วัดผลจากความตั้งใจ</p>
                </div>
              </div>
              <div className="img-container">
                <Image src="https://nj.dekhub.com/public/imgs/Starways/two.png" className="img-desktop" width={1920} height={500} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starways/twoMB.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="three">
              <div className="header-container">
                <div className="number-container">
                  <h1>3</h1>
                </div>
                <div className="text-container">
                  <h1>ตั้งเป้าหมาย & เลือกเส้นทาง</h1>
                  <p>เข้ามาแล้วไม่ต้องกลัวหลง พี่ๆจะคอยแนะนำเส้นทางตามสิ่งที่น้องชอบ</p>
                </div>
              </div>
              <div className="detail-container">
                <div className="text">
                  <h2>อยากทำเกม?</h2>
                  <p>ฝึกสร้างเกมด้วยเครื่องมืออันดับ 1 ของโลก ที่เป็นมิตรกับน้องๆ ตั้งแต่มือใหม่</p>
                  <p>จนถึงระดับโปร สร้างเกมระดับ AAA มากมายเช่น Genshin, ROV และ Pokemon Go</p>
                </div>
                <div className="more-detail">
                  <div className="video-container">
                    <video
                      src="https://nj.dekhub.com/public/videos/Starways/Star-1.mp4"
                      controls
                    ></video>
                  </div>
                  {/* <div className="img-container">
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/three.png" className="img-desktop" width={1920} height={500} priority />
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/three.png" className="img-mobile" width={500} height={350} priority />
                  </div> */}
                  <div className="text-more" >
                    <p>Unity Skills</p>
                    <p>💻 เรียนรู้พื้นฐานการใช้ Unity</p>
                    <p>🧠 พื้นฐานการใช้ AI เขียนโปรแกรม</p>
                    <p>⚙️ องค์ประกอบสำคัญ ในการสร้างเกม</p>
                    <p>- Feel</p>
                    <p>- UI & Transition</p>
                    <p>- Cutscene</p>
                    <p>- Effect</p>
                    <p>- Sound</p>
                    <p>- Map</p>
                    <p>- Light & Volume</p>
                    <p>- Animation (Generic, Micro)</p>
                    <p>- Level Design</p>
                  </div>
                </div>
                <br />
                <br />
                <div className="text">
                  <h2>อยากเป็นโปรแกรมเมอร์?</h2>
                  <p>Power Up ให้น้องแก้ปัญหาที่ซับซ้อนได้ตลอดชีวิต ด้วยการฝึกแสนสนุก</p>
                  <p>ให้น้องผ่านภารกิจท้าทายแถมเขียน Python คล่องจนได้เปรียบถึงมหาวิทยาลัย แล้วเอาไปใช้ทำงานจริงได้เลย</p>
                </div>
                <div className="more-detail">
                  <div className="video-container">
                    <video
                      src="https://nj.dekhub.com/public/videos/PHCMap.mp4"
                      controls
                    ></video>
                  </div>
                  {/* <div className="img-container">
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/three.png" className="img-desktop" width={1920} height={500} priority />
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/three.png" className="img-mobile" width={500} height={350} priority />
                  </div> */}
                  <div className="text-more" >
                    <p>Python Skills</p>
                    <p>💡 ชนิดของข้อมูลและตัวแปร (Data Type and Variable)</p>
                    <p>✨ เงื่อนไข/ Conditions if .... else</p>
                    <p>🖥 การทำซ้ำ และพื้นฐานอัลกอริทึม / Loop</p>
                    <p>🧿 Nested Loops</p>
                    <br />
                    <p>🌐 การประยุกต์ใช้งานคำสั่งพื้นฐาน</p>
                    <p>🛠 การใช้ตัวแปรเก็บข้อมูลขนาดใหญ่ / List</p>
                    <p>💻 Dictionaries</p>
                    <br />
                    <p>📃 Excel</p>
                    <p>📒 Mini Project</p>
                    <p>📊 Final Presentation</p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="four">
              <div className="header-container">
                <div className="number-container">
                  <h1>4</h1>
                </div>
                <div className="text-container">
                  <h1>Hamster Map</h1>
                  <p>เรียนรู้ด้วยตัวเองผ่านเกมไปกับภารกิจที่ท้าทาย</p>
                </div>
              </div>
              <div className="detail-container">
                <div className="video-container">
                  <video
                    src="https://nj.dekhub.com/public/videos/Starways/Star-1.mp4"
                    controls
                  ></video>
                </div>
                <div className="more-detail">
                  <div className="header">
                    <h1>สอนยังไง?</h1>
                  </div>
                  <div className="img-container">
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/four.png" className="img-desktop" width={1920} height={500} priority />
                    <Image src="https://nj.dekhub.com/public/imgs/Starways/fourMB.png" className="img-mobile" width={500} height={350} priority />
                  </div>
                  <div className="detail">
                    <h2>NPC</h2>
                    <p>เพื่อนๆในเกม ที่พร้อมสอนและช่วยเหลือ และให้ภารกิจสุดท้าทาย</p>
                    <p className="space"></p>
                    <h2>Quest</h2>
                    <p>ผจญภัยทำภารกิจจาก NPC เรียนรู้ไปกับเนื้อหามากมาย เช่น</p>
                    <p>เข้าไปในโลกแห่ง Untiy เรียนรู้การสร้างเกม พร้อมแข่งไปกับเพื่อนๆ</p>
                    <p className="space"></p>
                    <h2>Battle</h2>
                    <p>แอ็คชั่นสุดมันส์ พัฒนาตัวละคร พร้อมไปตบตีกับมอนเตอร์</p>
                    <p className="space"></p>
                    <h2>Discord Activity</h2>
                    <p>มาสนุกทุกวันไปกับเพื่อนๆ ใน Activity บน Discord </p>
                    <p>ของ Hamster Hub</p>
                    <p className="space"></p>
                    <h2>Self Learning</h2>
                    <p>ทุกภารกิจของเกม จะต้องฝ่าฟันด้วยตัวเอง ไปกับเพื่อนๆ </p>
                    <p>โดยไม่มีสปอย เพื่อสร้างทักษะสำคัญในโลกยุคนี้</p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="five">
              <div className="header-container">
                <div className="number-container">
                  <h1>5</h1>
                </div>
                <div className="text-container">
                  <h1>Activity</h1>
                  <p>กิจกรรมพิเศษ สุดมันส์และของรางวัลมากมาย</p>
                </div>
              </div>
              <div className="detail-container">
                <div className="header">
                  <h1>hamsTalk</h1>
                  <p>Workshop สนุกๆ ได้ความรู้หลากหลายรู้แล้ว</p>
                  <br />
                  <p>ที่เคยจัด เช่น</p>
                </div>
                <div className="detail">
                  <div className="box">
                    <div className="img-container">
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-1.png" className="img-desktop" width={1920} height={500} priority />
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-1.png" className="img-mobile" width={500} height={350} priority />
                    </div>
                    <div className="text">
                      <h2>Make Money with Tiktok</h2>
                      <p>poobpupchannel - 500k followers</p>
                    </div>
                  </div>
                  <div className="box">
                    <div className="img-container">
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-2.png" className="img-desktop" width={1920} height={500} priority />
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-2.png" className="img-mobile" width={500} height={350} priority />
                    </div>
                    <div className="text">
                      <h2>VI’NNER of NSC-2020</h2>
                      <p>พี่ไว - นักธุรกิจ</p>
                    </div>
                  </div>
                  <div className="box">
                    <div className="img-container">
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-3.png" className="img-desktop" width={1920} height={500} priority />
                      <Image src="https://nj.dekhub.com/public/imgs/Starways/five-3.png" className="img-mobile" width={500} height={350} priority />
                    </div>
                    <div className="text">
                      <h2>Big Talk about AI</h2>
                      <p>พี่บิ๊ก - นักศึกษา ม.จุฬา</p>
                    </div>
                  </div>
                </div>
                <br />
                <div className="header">
                  <h1>Expert</h1>
                  <p>ผู้เชี่ยวชาญในด้านต่างๆ</p>
                </div>
                <div className="detail-2">
                  <div className="box">
                    <div className="img-container">
                      <a href="/unity">
                        <Image src="https://nj.dekhub.com/public/imgs/Starways/five-4.png" className="img-desktop" width={1920} height={500} priority />
                        <Image src="https://nj.dekhub.com/public/imgs/Starways/five-4.png" className="img-mobile" width={500} height={350} priority />
                      </a>
                    </div>
                    <div className="text">
                      <h2>Unity</h2>
                      <p>พี่ขวัญ - เข้ารอบชิงชนะเลิศ NSC</p>
                    </div>
                  </div>
                  <div className="box">
                    <div className="img-container">
                      <a href="/python">
                        <Image src="https://nj.dekhub.com/public/imgs/Starways/five-5.png" className="img-desktop" width={1920} height={500} priority />
                        <Image src="https://nj.dekhub.com/public/imgs/Starways/five-5.png" className="img-mobile" width={500} height={350} priority />
                      </a>
                    </div>
                    <div className="text">
                      <h2>Python</h2>
                      <p>พี่ปาคเกอร์ - พาเด็กเข้ารอบชิง NSC2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="six">
              <div className="header-container">
                <div className="number-container">
                  <h1>6</h1>
                </div>
                <div className="text-container">
                  <h1>โฟกัส และสร้างผลงานระดับเทพ</h1>
                  <p>“ความต่อเนื่อง” ทำให้เกิดผลลัพธิ์ที่แตกต่างมากมาย</p>
                </div>
              </div>
              <br />
              <div className="detail-container">
                <div className="text">
                  <h1>ผลงานคุณภาพ</h1>
                  <p>พี่ๆ คว้ารางวัลมากมายจากแทบทุกรายการทั่วประเทศ ได้เข้าวิศวะคอม</p>
                  <p>ม.ท็อปๆ แทบยกรุ่น พร้อม App ที่ใช้จริงแล้วอย่าง mrCITY และ PHC Map</p>
                </div>
                <div className="text-moblie">
                  <h1>ผลงานคุณภาพ</h1>
                  <p>พี่ๆ คว้ารางวัลมากมายจากแทบทุกรายการทั่วประเทศ </p>
                  <p>ได้เข้าวิศวะคอมม.ท็อปๆ แทบยกรุ่น พร้อม App </p>
                  <p>ที่ใช้จริงแล้วอย่าง mrCITY และ PHC Map</p>
                </div>
              </div>
              <Slider items={items} />
            </div>
            <br />
            <div className="sum">
              <div className="header">
                <h1>สรุปคือ...อะไร?</h1>
              </div>
              <div className="img-container">
                <Image src="https://nj.dekhub.com/public/imgs/Starways/four.png" className="img-desktop" width={1920} height={500} priority />
                <Image src="https://nj.dekhub.com/public/imgs/Starways/four.png" className="img-mobile" width={500} height={350} priority />
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
