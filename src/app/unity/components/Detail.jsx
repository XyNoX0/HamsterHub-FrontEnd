import React from "react";
import "./Detail.css";
import Image from "next/image";


function Detail() {
    return (
        <div className="Unity">
            <div className="Main-img">
                <Image src="https://nj.dekhub.com/public/unity/imgs/unity-main.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                <Image src="https://nj.dekhub.com/public/unity/imgs/unity-main.png" className="img-mobile" width={1920} height={1080} priority alt="" />
            </div>
            <div className="Detail-img">
                <div className="img-row">
                    <div className="left">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                    <br className="mobile-space"/>
                    <div className="right">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                </div>
                <br />
                <br />
                <div className="img-row">
                    <div className="left">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                    <br className="mobile-space"/>
                    <div className="right">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                </div>
                <br />
                <br />
                <div className="img-row">
                    <div className="left">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-5.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-5.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                    <br className="mobile-space"/>
                    <div className="right">
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-6.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/unity/imgs/unity-detail-6.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
}

export default Detail;
