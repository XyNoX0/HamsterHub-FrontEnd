"use client"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./Payment.css";
import Image from 'next/image';
import BankImg from "./ktb.png"
import BankImg2 from "./KBank.png"
import KTBQR from "./KTBQR.png"
import KBankQR from "./KBankQR.png"
import { getCourseData } from "@/utils/api";


export default function Payment({ courseId }) {
  const [courseData, setCourseData] = useState(null);
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourseData(courseId);
        setCourseData(data.course);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, [courseId]);

  if (!courseData) {
    return (
      <div className="Detail">
        <div className="summary">
          <div className="summary-content">
            <h2 className="summary-header">ช่องทางการชำระเงิน</h2>
          </div>
          <div className="bank">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="Detail">
      <div className="summary">
        <div className="summary-content">
          <h2 className="summary-header">ช่องทางการชำระเงิน</h2>
        </div>
        {courseData.nextcourse === "1" ? (
          <div className="bank bank-with-qr">
            <Image className="BankImg" src={BankImg2} alt="BankImg" />
            <div className="bank-data">
              <h5 className="bank-text"><b>ธนาคารกสิกรไทย</b></h5>
              <h5 className="bank-text">
                เลขบัญชี 102-2-30322-6 <br />
                ชื่อบัญชี นาย ณัฐพล ศุภนาม
              </h5>
            </div>
            <Image className="BankImgQR" src={KBankQR} alt="KBankQR" />
          </div>
        ) : (
          <div className="bank bank-with-qr">
            <Image className="BankImg" src={BankImg} alt="BankImg" />
            <div className="bank-data">
              <h5 className="bank-text"><b>ธนาคาร กรุงไทย จำกัด(มหาชน) สาขาอโศก</b></h5>
              <h5 className="bank-text">
                เลขบัญชี 015-1-56503-1 <br />
                ชื่อบัญชี บริษัท เอ็กซ์บิส  (ประเทศไทย) จำกัด
              </h5>
            </div>
            <Image className="BankImgQR" src={KTBQR} alt="KTBQR" />
          </div>
        )}
      </div>
    </div>
  );
}