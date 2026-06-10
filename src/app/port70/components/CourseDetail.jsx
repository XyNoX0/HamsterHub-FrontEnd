import React from "react";
import "./CourseDetail.css";
import Image from "next/image";

function AiGameDeatail() {
  return (
    <div className="aigame-detail-container">
      <div className="aigame-detail-timeline">
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-6.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-6.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-7.gif" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-7.gif" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-8.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-8.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-9.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-9.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-2.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-2.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Game Developer</b></h3>
          <p className="text-1">
            ดีไซด์เกม และสร้างเกมสนุกๆ
          </p>
          <p className="text-2">
            - How to Design Game
          </p>
          <p className="text-2">
            - Basic Unity & C#
          </p>
          <p className="text-2">
            - Polish & Build Game
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-3.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-3.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Level Designer</b></h3>
          <p className="text-1">
            ออกแบบฉาก และดีไซด์ความท้าทาย
          </p>
          <p className="text-2">
            - How to Level Design
          </p>
          <p className="text-2">
            - Basic Unity & Environment
          </p>
          <p className="text-2">
            - Light & Sound & Mock up
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-4.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-4.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Coder</b></h3>
          <p className="text-1">
            สร้างระบบ และสร้าง AI
          </p>
          <p className="text-2">
            - Basic Programming
          </p>
          <p className="text-2">
            - Basic Unity & C#
          </p>
          <p className="text-2">
            - How to Design System
          </p>
        </div>
        <br />
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-10.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-10.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-11.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-11.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <div className="timeline-img">
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-12.png" className="img-desktop" width={2000} height={1000} priority alt="" />
          <Image src="https://nj.dekhub.com/public/imgs/port70/port70-12.png" className="img-mobile" width={400} height={300} priority alt="" />
        </div>
        <br />
        <div className="timeline-detail">
          <h3><b>Programmer</b></h3>
          <p className="text-1">
            ฝึกพื้นฐานเขียนโปรแกรม และการใช้ AI ช่วยทำงาน
          </p>
          <p className="text-2">
            - How to Use AI
          </p>
          <p className="text-2">
            - Basic Programming
          </p>
          <p className="text-2">
            - Make Project with AI
          </p>
        </div>
        <br />
      </div>
    </div>
  );
}
export default AiGameDeatail;
