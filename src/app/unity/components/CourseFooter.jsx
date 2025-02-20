import React from "react";
import "./CourseFooter.css";
import Image from "next/image";

function CourseFooter() {
    const cover = "https://nj.dekhub.com/public/imgs/3DToon-1.png"
    return (
        <div className="Unity-Footer">
            <div className="Header">
                <h2>รีวิวจากผู้ปกครองและนักเรียน</h2>
            </div>
            <div className="Footer-Detail">
                <h3>เสียงจากผู้เรียนและผู้ปกครอง</h3>
                <div className="Review-Box">
                    <div className="Review">
                        <p>รีวิวจากผู้ปกครองที่เห็นพัฒนาการของลูก</p>
                        <div className="Footer-Detail-Image">
                            <Image src={cover} alt="" width={1920} height={1080} priority />
                        </div>
                    </div>
                    <div className="Review">
                        <p>รีวิวจากนักเรียนที่สร้างเกมและนำไปต่อยอดในอนาคต</p>
                        <div className="Footer-Detail-Image">
                            <Image src={cover} alt="" width={1920} height={1080} priority />
                        </div>
                    </div>
                </div>

            </div>
            <div className="Header">
                <h2>แนวทางต่อยอด</h2>
            </div>
                <div className="Footer-Detail-Box">
                    <h3>การสร้างเกมจะพาลูกของคุณไปไหนได้บ้าง?</h3>
                    <p>ต่อยอดในมหาวิทยาลัย: คณะวิทยาการคอมพิวเตอร์, สาขาออกแบบเกม</p>
                    <p>โอกาสในอาชีพ: นักพัฒนาเกม, นักออกแบบเกม, นักเขียนโปรแกรม</p>
                    <p>สร้างเกมของตัวเองเพื่อขาย</p>
                </div>
        </div>
    );
}

export default CourseFooter;