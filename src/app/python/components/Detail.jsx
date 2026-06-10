import React from "react";
import "./Detail.css";
import Image from "next/image";


function Detail() {
    return (
        <div className="Python">
            <div className="Main-img">
                <Image src="https://nj.dekhub.com/public/python/imgs/python-main.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                <Image src="https://nj.dekhub.com/public/python/imgs/python-main.png" className="img-mobile" width={1920} height={1080} priority alt="" />
            </div>
            <div className="Detail-img">
                <div className="img-row">
                    <div className="left">
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-1.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-1.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                    <br className="mobile-space" />
                    <div className="right">
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-2.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-2.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                </div>
                <br />
                <br />
                <div className="img-row">
                    <div className="left">
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-3.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-3.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                    <br className="mobile-space" />
                    <div className="right">
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-4.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                        <Image src="https://nj.dekhub.com/public/python/imgs/python-detail-4.png" className="img-mobile" width={1920} height={1080} priority alt="" />
                    </div>
                </div>
                <br />
                <br />
            </div>
            <div className="Footer-img">
                <Image src="https://nj.dekhub.com/public/python/imgs/python-footer.png" className="img-desktop" width={1920} height={1080} priority alt="" />
                <Image src="https://nj.dekhub.com/public/python/imgs/python-footer.png" className="img-mobile" width={1920} height={1080} priority alt="" />
            </div>
        </div>
    );
}

export default Detail;
