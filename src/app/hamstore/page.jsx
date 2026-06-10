import Link from "next/link";
import "./hamstore.css";

export const metadata = {
  title: "HamStore — Coming Soon | HamsterHub",
  description: "HamStore กำลังจะเปิดให้บริการเร็วๆ นี้!",
};

export default function HamStorePage() {
  return (
    <main className="hs-root">
      {/* Background */}
      <div className="hs-bg">
        <div className="hs-blob hs-blob-1" />
        <div className="hs-blob hs-blob-2" />
        <div className="hs-blob hs-blob-3" />
        <div className="hs-grid" />
      </div>

      {/* Content */}
      <div className="hs-content">
        {/* Icon */}
        <div className="hs-icon-wrap">
          <div className="hs-icon-ring" />
          <div className="hs-icon-ring hs-icon-ring-2" />
          <span className="hs-icon">🐹</span>
        </div>

        {/* Badge */}
        <div className="hs-badge">
          <span className="hs-badge-dot" />
          COMING SOON
        </div>

        {/* Title */}
        <h1 className="hs-title">
          Ham<span className="hs-title-hi">Store</span>
        </h1>

        {/* Description */}
        <p className="hs-desc">
          เรากำลังสร้างบางอย่างที่พิเศษสำหรับคุณ<br />
          ร้านค้าของ HamsterHub กำลังจะมาเร็วๆ นี้
        </p>

        {/* Status row */}
        <div className="hs-pills">
          <div className="hs-pill"><span className="hs-dot hs-dot-orange"/>กำลังพัฒนา</div>
          <div className="hs-pill"><span className="hs-dot hs-dot-blue"/>เร็วๆ นี้</div>
          <div className="hs-pill"><span className="hs-dot hs-dot-green"/>ติดตามได้เลย</div>
        </div>

        {/* Back */}
        <Link href="/" className="hs-back">← กลับหน้าหลัก</Link>
      </div>
    </main>
  );
}
