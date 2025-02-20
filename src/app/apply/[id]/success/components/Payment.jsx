import React from "react";
import "./Payment.css";
import Image from 'next/image';
import BankImg from "./ktb.png"

export default function Payment() {
  return (
    <div className="Detail">
      <div className="summary">
        <div className="summary-content">
          <h2 className="summary-header">ช่องทางการชำระเงิน</h2>
        </div>
        <div className="bank">
          <Image className="BankImg" src={BankImg} alt="BankImg" />
          <div className="bank-data">
            <h5 className="bank-text"><b>ธนาคาร กรุงไทย จำกัด(มหาชน) สาขาอโศก</b></h5>
            <h5 className="bank-text">
              เลขบัญชี 015-1-56503-1
              ชื่อบัญชี บริษัท เอ็กซ์บิส  (ประเทศไทย) จำกัด
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}