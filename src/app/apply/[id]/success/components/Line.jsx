import React from "react";
import "./Line.css";
import Image from 'next/image';
import LineImg from "./Line.png"

function Line() {
    return (
        <div className="Line-body">
            <center>
                <h4 className="line-header">การแจ้งชำระเงินและเข้าเรียน</h4>
                <h5 className="line-text">
                    * ให้ add Line: <span style={{ color: "blue" }}> @smart-school </span> <br />
                    พร้อมส่ง <u>slip</u>  และ <u>ชื่อผู้สมัคร</u> <br />
                    ภายใน 24 ชม.จะได้รับการติดต่อจากเจ้าหน้าที่ทางไลน์
                </h5>
            </center>
            <center>
                <a href="https://lin.ee/1qkMi19">
                    <Image className="LineImg" src={LineImg} alt="LineImg" />
                </a>
                {/* <br />
                <p className="line-text">@smart-school</p> */}
            </center>
        </div>
    );
}

export default Line