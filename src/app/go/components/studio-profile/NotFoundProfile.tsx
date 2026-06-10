"use client";

import Link from "next/link";
import { UserX, ArrowLeft } from "lucide-react";
import "./NotFoundProfile.css";

export function NotFoundProfile({ slug }: { slug: string }) {
  return (
    <section className="page-zone page-zone--sea-mist nfp-section">
      <div className="nfp-card">
        <span className="nfp-iconBox">
          <UserX className="nfp-icon" strokeWidth={2.2} aria-hidden />
        </span>
        <h1 className="nfp-title">Profile not found</h1>
        <p className="nfp-body">
          ไม่เจอโปรไฟล์สำหรับลิงก์ <strong>{slug}</strong> ใน Go Dang
        </p>
        <Link href="/profile" className="nfp-cta">
          <ArrowLeft className="nfp-ctaIcon" strokeWidth={2.4} aria-hidden />
          Back to directory
        </Link>
      </div>
    </section>
  );
}
