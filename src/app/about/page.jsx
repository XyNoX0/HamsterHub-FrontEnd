import React from "react";
import "./About.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

import Image from "next/image";

function Page() {
    return (
        <div className="about-main">
            <div className="about-for-desktop">
                <Navbar />
                <div className="blank"></div>

                <div className="about-first">
                    <h2 className="about-text-header"><span className="underline">HAM·STER</span></h2>
                    <p className="about-text-detail-1"><b>/&apos;ham(p)stər/</b></p>
                    <p className="about-text-detail-2"><b>noun</b></p>
                    <p className="space"></p>
                    <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-1.png" width={500} height={200} priority />
                    <p className="space"></p>
                    <p className="about-text-detail-3">
                        <b>นักผจญภัยเล็กๆ</b> <br />
                        ที่จะกลายเป็นกำลัง<b>สำคัญของประเทศ</b> <br />
                        ด้วยเทคนิคการฝึกที่สนุก น้องๆ จะได้ up skill ที่จำเป็น ได้นำไปใช้ <br />
                        พัฒนา<span className="underline"><b>ผลงานที่ใช้ประโยชน์ได้จริง</b></span>นี่แหละ ความเป็นมืออาชีพของเหล่า Hamsters

                    </p>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-second">
                    <div className="about-container">
                        <div className="about-img-div">
                            <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-2.png" width={900} height={1100} />
                        </div>
                        <div className="about-text">
                            <p className="about-text-header">
                                <span className="text-expand">ชะแว๊บส์!!</span> <br />
                                ปิดเทอมแล้วโว้ย<br />
                                ไปลุยโลกกว้างงง ลา ลัล ล๊า ลา ลา~
                            </p>
                            <p className="space"></p>
                            <p className="about-text-header">น้องแคปอยู่หนายยยย</p>
                        </div>
                    </div>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-third">
                    <div className="about-container">
                        <div className="about-text">
                            <h3 className="about-text-header"><b><span className="text-expand">นี่ไง!</span> เครื่องมือวิเศษ<br />ที่ใช้ท่องโลกกว้างของ “ซน”</b></h3>
                        </div>
                        <p className="space"></p>
                        <div className="about-img-div">
                            <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-3.png" width={700} height={900} />
                        </div>
                    </div>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-fourth">
                    <div className="about-content">
                        <h2 className="about-text-header">
                            <b>mrCITY 2<br />สวนสัตว์สงขลา</b>
                        </h2>
                        <br />
                        <p className="about-text-detail-1">
                            แอพทำยากไหมนะ<br />
                            เราเคยเห็นว่าเด็กทำได้ไหม?
                        </p>
                        <p className="about-text-detail-2">
                            มาดูขั้นตอนจาก<span className="highlight"><b>เด็กติดเกม</b></span><br />
                            สู่<span className="highlight"><b>แอพท่องเที่ยว</b></span>ที่เปิดให้<span className="highlight"><span className="underline">บริการจริง</span></span>
                        </p>
                        <br />
                        <div className="about-more">
                            <div className="icon-box">
                                <div className="circle-icon">
                                    <Image className="about-img-1" src="/assets/mrcity-icon.png" width={80} height={80} />
                                </div>

                                <span className="text">@</span>

                                <div className="square-icon">
                                    <Image className="about-img-2" src="/assets/appstore-icon.png" width={60} height={60} />
                                </div>

                                <span className="ampersand">+</span>

                                <div className="square-icon">
                                    <Image className="about-img-3" src="/assets/playstore-icon.png" width={60} height={60} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="about-video">
                        <video
                            src="https://nj.dekhub.com/public/videos/Zoo.mp4"
                            className="about-video-1"
                            controls
                        ></video>
                    </div>
                </div>


                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-fifth">
                    <h2 className="about-text-header"><b>mrCITY Team<br />เคยเป็นเด็กติดเกม?</b></h2>
                    <p className="space"></p>
                    <div className="about-container">
                        <div className="about-box-left">
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-4.png" width={300} height={300} priority />
                            </div>
                            <p className="about-text-left">
                                เด็กทุกคนอยากเก่ง<br />
                                อยากมั่นใจ อยากได้การยอมรับ
                            </p>
                        </div>
                    </div>

                    <br />

                    <div className="about-container">
                        <div className="about-box-right">
                            <p className="about-text-right">
                                &quot;สนใจไหมน้องๆ&quot; ทำ app <br />
                                เที่ยวเมืองเก่า จ.สงขลา <br />
                                ได้ตัง💰 แบบ Pokemon Go
                            </p>
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-5.png" width={300} height={300} priority />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="about-container">
                        <div className="about-box-left">
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-6.png" width={300} height={300} priority />
                            </div>
                            <p className="about-text-left">
                                พอได้เป็นรูปเป็นร่าง <br />
                                เราก็ไปสงขลากัน<br />
                                ได้คุยกับ คนพื้นที่ นักธุรกิจ <br />
                                และ ผู้นำชุมชน <br />
                            </p>
                        </div>
                    </div>

                    <br />

                    <div className="about-container">
                        <div className="about-box-right">
                            <p className="about-text-right">
                                set เป้าหมายเปิดตัวยิ่งใหญ่ในงาน <br />
                                “ Pakk Taii Design Week “
                            </p>
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-7.png" width={300} height={300} priority />
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="about-container">
                        <div className="about-box-left">
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-8.png" width={300} height={300} priority />
                            </div>
                            <p className="about-text-left">
                                จบงานแล้ว แต่ภารกิจช่วยโลกไม่จบ <br />
                                zoo ติดต่อให้ทำ App <br />
                                เที่ยวชมสัตว์ด้วย..  wowza! <br />
                                ผนวกเข้ากับการท่องเที่ยวเมืองเก่า <br />
                            </p>
                        </div>
                    </div>

                    <br />

                    <div className="about-container">
                        <div className="about-box-right">
                            <p className="about-text-right">
                                น้องอั่งเปา ใช้ mrCITY <br />
                                เป็นผลงานได้เข้า <br />
                                U of Washington,  <br />
                                Rank 12, Com. Engineering  <br />
                            </p>
                            <div className="about-img">
                                <Image src="https://nj.dekhub.com/public/imgs/About/about-9.png" width={300} height={300} priority />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-eighth">
                    <div className="about-content">
                        <h2>Who we are?</h2>
                        <br />
                        <p>พวกเราจะได้ฝึกจาก<b>สิ่งที่ดีที่สุดในโลก</b></p>
                        <p>
                            มีพี่ๆ ใจดี ค้นหาและดึงศักยภาพแต่ละคน <br />
                            พัฒนา สร้างความมั่นใจ พบเพื่อนใหม่ <br />
                            กับภารกิจที่ท้าทายไปด้วยกัน
                        </p>
                        <br />
                        <p><b><i>Anyone can do anything</i></b></p>
                    </div>

                    <br />

                    <div className="about-image">
                        <Image src="/assets/HWR.png" width={600} height={450} priority />
                    </div>
                </div>

                <div className="blank"></div>

                <div className="about-sixth">
                    <p className="about-text-1">
                        <b>
                            เหล่า Hamsters กลายเป็น Hero ได้ไง.. <br />
                            つづく
                        </b>
                    </p>
                </div>
                <div className="blank"></div>
                <div className="blank"></div>
                <Footer />
            </div>
            <div className="about-for-mobile">
                <Navbar />

                <div className="blank"></div>

                <div className="about-first">
                    <h2 className="about-text-header"><span className="underline">HAM·STER</span></h2>
                    <p className="about-text-detail-1"><b>/&apos;ham(p)stər/</b></p>
                    <p className="about-text-detail-2"><b>noun</b></p>
                    <p className="space"></p>
                    <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-1.png" width={500} height={200} priority />
                    <p className="space"></p>
                    <p className="about-text-detail-3">
                        <b>นักผจญภัยเล็กๆ</b> <br />
                        ที่จะกลายเป็นกำลัง<b>สำคัญของประเทศ</b> <br />
                        ด้วยเทคนิคการฝึกที่สนุก น้องๆ จะได้ up skill ที่จำเป็น ได้นำไปใช้ <br />
                        พัฒนา<span className="underline"><b>ผลงานที่ใช้ประโยชน์ได้จริง</b></span>นี่แหละ ความเป็นมืออาชีพของเหล่า Hamsters
                    </p>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-second">
                    <h3 className="about-text-header">
                        <b>
                            <span className="text-expand">ชะแว๊บส์!!</span> ปิดเทอมแล้วโว้ย<br />ไปลุยโลกกว้างงง ลา ลัล ล๊า ลา ลา~
                        </b>
                    </h3>
                    <p className="space"></p>
                    <h3 className="about-text-header"><b>น้องแคปอยู่หนายยยย</b></h3>
                    <p className="space"></p>
                    <div className="about-img-div">
                        <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-2.png" width={400} height={500} />
                    </div>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-third">
                    <div className="about-img-div">
                        <Image className="about-img-1" src="https://nj.dekhub.com/public/imgs/About/about-3.png" width={300} height={700} />
                    </div>
                    <p className="space"></p>
                    <h3 className="about-text-header"><b><span className="text-expand">นี่ไง!</span> เครื่องมือวิเศษ<br />ที่ใช้ท่องโลกกว้างของ “ซน”</b></h3>
                </div>

                <div className="blank"></div>
                <div className="blank"></div>

                <div className="about-fourth">
                    <h2 className="about-text-header"><b>mrCITY 2<br />สวนสัตว์สงขลา</b></h2>
                    <p className="space"></p>
                    <video
                        src="https://nj.dekhub.com/public/videos/Zoo.mp4"
                        controls
                        className="about-video-1"
                    ></video>
                    <p className="space"></p>
                    <p className="about-text-detail-1">
                        <b>
                            แอพทำยากไหมนะ<br />
                            เราเคยเห็นว่าเด็กทำได้ไหม?
                        </b>
                    </p>
                    <p className="space"></p>
                    <p className="about-text-detail-2">
                        <b>
                            มาดูขั้นตอนจาก<span className="highlight"><b>เด็กติดเกม</b></span><br />
                            สู่<span className="highlight"><b>แอพท่องเที่ยว</b></span>ที่เปิดให้<span className="highlight"><span className="underline">บริการจริง</span></span>
                        </b>
                    </p>
                    <p className="space"></p>
                    <p className="space"></p>

                    <div className="about-more">
                        <div className="icon-box">
                            <div className="circle-icon">
                                <Image className="about-img-1" src="/assets/mrcity-icon.png" width={50} height={50} />
                            </div>

                            <span className="text">@</span>

                            <div className="square-icon">
                                <Image className="about-img-2" src="/assets/appstore-icon.png" width={50} height={50} />
                            </div>

                            <span className="ampersand">+</span>

                            <div className="square-icon">
                                <Image className="about-img-3" src="/assets/playstore-icon.png" width={50} height={50} />
                            </div>
                        </div>
                    </div>

                    <div className="blank"></div>
                    <div className="blank"></div>

                    <div className="about-fifth">
                        <h2 className="about-text-header"><b>mrCITY Team<br />เคยเป็นเด็กติดเกม?</b></h2>
                        <p className="space"></p>
                        <div className="container">
                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-4.png" className="about-img-1" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    เด็กทุกคนอยากเก่ง<br />
                                    อยากมั่นใจ อยากได้การยอมรับ
                                </p>
                                <br />
                                <div className="blank"></div>
                            </div>

                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-5.png" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    &quot;สนใจไหมน้องๆ&quot; ทำ app <br />
                                    เที่ยวเมืองเก่า จ.สงขลา <br />
                                    ได้ตัง💰 แบบ Pokemon Go
                                </p>
                                <div className="blank"></div>
                            </div>

                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-6.png" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    พอได้เป็นรูปเป็นร่าง <br />
                                    เราไปสงขลากันได้คุยกับ <br />
                                    คนพื้นที่ นักธุรกิจ <br />
                                    และ ผู้นำชุมชน <br />
                                </p>
                                <div className="blank"></div>
                            </div>

                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-7.png" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    set เป้าหมายเปิดตัวยิ่งใหญ่ในงาน <br />
                                    “ Pakk Taii Design Week “
                                </p>
                                <div className="blank"></div>
                            </div>

                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-8.png" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    จบงานแล้ว แต่ภารกิจช่วยโลกไม่จบ <br />
                                    zoo ติดต่อให้ทำ App <br />
                                    เที่ยวชมสัตว์ด้วย..  wowza! <br />
                                    ผนวกเข้ากับการท่องเที่ยวเมืองเก่า <br />
                                </p>
                                <div className="blank"></div>
                            </div>

                            <div className="about-box">
                                <div className="about-img">
                                    <Image src="https://nj.dekhub.com/public/imgs/About/about-9.png" width={300} height={300} priority />
                                </div>
                                <p className="about-text">
                                    น้องอั่งเปา ใช้ mrCITY <br />
                                    เป็นผลงานได้เข้า <br />
                                    U of Washington,  <br />
                                    Rank 12 Com. Engineering  <br />
                                </p>
                                <div className="blank"></div>
                            </div>
                        </div>
                    </div>

                    <div className="blank"></div>

                    <div className="about-eighth">
                        <div className="about-content">
                            <h2>Who we are?</h2>
                            <br />
                            <p>พวกเราจะได้ฝึกจาก<b>สิ่งที่ดีที่สุดในโลก</b></p>
                            <p>
                                มีพี่ๆ ใจดี ค้นหาและดึงศักยภาพแต่ละคน <br />
                                พัฒนา สร้างความมั่นใจ พบเพื่อนใหม่ <br />
                                กับภารกิจที่ท้าทายไปด้วยกัน
                            </p>
                            <br />
                            <p><b><i>Anyone can do anything</i></b></p>
                        </div>

                        <br />

                        <div className="about-image">
                            <Image src="/assets/HWR.png" width={350} height={250} priority />
                        </div>
                    </div>

                    <div className="blank"></div>


                    <div className="about-sixth">
                        <p className="about-text-1">
                            <b>
                                เหล่า Hamsters กลายเป็น Hero ได้ไง.. <br />
                                つづく
                            </b>
                        </p>
                    </div>

                    <div className="blank"></div>
                    <div className="blank"></div>
                </div>
                <Footer />
            </div>
        </div>
    );
}


export default Page;