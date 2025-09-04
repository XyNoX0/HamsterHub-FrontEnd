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
          <Image src="https://nj.dekhub.com/public/imgs/SWDT.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/SWMB.png" className="img-mobile" width={1920} height={1080} priority />
        </div>
        <div className="starway-hero-buttom">
          <div className="starway-price">
            <p>1 - 30 ก.ย. (everyday)</p>
            <p>anytime</p>
          </div>
          <hr />
          <div className="starway-links">
            <h3>1990฿</h3>
            <Link href="/apply/128/">Book</Link>
          </div>
        </div>
        <div className="starway-hero-buttom-mobile">
          <div className="starway-price">
            <div className="starway-price-mobile-wrapper">
              <p>1 - 30 ก.ย. (everyday)</p>
              <p>anytime</p>
            </div>
            <hr />
          </div>
          <div className="starway-links">
            <h3>1990฿</h3>
            <Link href="/apply/128/">Book</Link>
          </div>
        </div>
      </div>
      <br />
      <div className="starway-detail">
        <div className="part-1">
          <h1>อยากทำผลงานในฝัน แต่ไม่รู้จะเริ่มยังไง?</h1>
          <p>คลาสนี้จะให้น้องๆ จะได้เรียนพื้นฐานที่จำเป็น สำหรับทำผลงานสุดโหด ผ่านการ Self Learning ที่มีพี่ๆคอยช่วย guide ทำให้ไปได้ไวโดยไม่ต้องคอยเพื่อนๆ และไม่หลงเรื่องแน่นอน ดังนั้นถ้าน้องพร้อมแล้วก็ขึ้นมาบนเส้นทางที่จะพาน้องไปคว้าดาวในฝันมาไว้ในมือกันเถอะ!</p>
        </div>
        <div className="video-container">
          <video
            src="https://nj.dekhub.com/public/videos/PP.mp4"
            controls
          ></video>
        </div>
        <div className="part-1">
          <h1>Starway คืออะไร?</h1>
          <p>Starways เป็นคอร์สรายเดือนที่ยกเลิกได้ตลอด ที่น้องจะได้มาปูพื้นฐานให้แน่นไม่ว่าจะเป็น​ Game หรือ Data Sci แล้วนำไปต่อยอดสู่ผลงานระดับประเทศ นอกจากนี้หากน้องมีพื้นฐานมาแล้ว สามารถข้ามไปวางแผนทำผลงานในฝันกับพี่ๆได้เลย!</p>
        </div>
        <div className="part-1">
          <h1>ใน Starways มีอะไรให้ทำบ้าง?</h1>
        </div>
        <div className="prob-1">
          <Image src="https://nj.dekhub.com/public/imgs/SW-1.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/SW-1.png" className="img-mobile" width={1920} height={1080} priority />
        </div>
        <div className="part-1">
          <h1>สิ่งที่ได้รับ</h1>
          <p>
            - ได้เรียนรู้พื้นฐานให้แน่นผ่านการฝึกทำโปรเจคใช้จริงตามสายที่ตัวเองเลือก <br />
            - เข้าร่วม Activity ต่างๆ ที่จะช่วยพัฒนาทักษะของน้องผ่านการทั้งแข่งขันและร่วมมือกับเพื่อนๆในคลาส <br />
            - Community พื้นที่ที่น้องๆสามารถทำความรู้จักและพูดคุยกับเพื่อนๆที่มีความสนใจด้านเดียวกันได้ <br />
            - House น้องแต่ละคนจะถูกแยกไปตามบ้านต่างๆ ซึ่งมีพี่ๆ เป็นหัวหน้าบ้านประจำอยู๋ โดยจะมีกิจกรรมที่จะให้น้องได้มาวัดฝีมือกัน เพื่อหาว่าบ้านไหนจะบ้านอันดับ 1 และคว้ารางวัลไป <br />
            - Hamster Map กระบวนการสอนสุดสนุก ที่จะให้น้องๆ ได้มาเล่นเกมแข่งกัน พร้อมได้รับความรู้ไปใช้สำหรับทำโปรเจคของตัวเองอีกด้วย <br />
          </p>
        </div>
        <div className="part-1">
          <h1>Timeline</h1>
        </div>
        <div className="prob-1">
          <Image src="https://nj.dekhub.com/public/imgs/SW-2.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/SW-2.png" className="img-mobile" width={1920} height={1080} priority />
          <br />
          <Image src="https://nj.dekhub.com/public/imgs/SW-3.png" className="img-desktop" width={1920} height={1080} priority />
          <Image src="https://nj.dekhub.com/public/imgs/SW-3.png" className="img-mobile" width={1920} height={1080} priority />
        </div>
      </div>
      <br />
      <h3 style={{"color":"white","textAlign":"center"}}>ผลงานตัวอย่างของปีนี้ที่ได้เข้า จุฬา ม.เกษตร และ U of Washington</h3>
    </div>
  );
}

export default Detail;
