"use client";
import React from "react";
import "./WhySuccess.css";
import Image from "next/image";

function WhySuccess() {
  const [activeVideo, setActiveVideo] = React.useState(null);

  // Example video IDs (YouTube). Replace these with your actual video links/IDs.
  const videos = {
    1: "/new-assets/WhySuccess/HMap.mp4", // Gamification
    2: "/new-assets/WhySuccess/selflearn.mp4", // Self-Learning
    3: "/new-assets/WhySuccess/Recap.mp4", // Innovation
  };

  const handleOpenVideo = (step) => {
    setActiveVideo(videos[step]);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section className="why-success" id="why-success">
      {/* ====== ROW 1: Step 1 (left) + Header (right) ====== */}
      <div className="ws-row ws-row-1">
        <div className="ws-step ws-step-1">
          <div className="ws-step-text">
            <h3 className="ws-step-title">GAMIFICATION</h3>
            <p>สนุกกับเทคนิคเกมระดับโลก<br />เปลี่ยนเรื่องยากให้ท้าทาย</p>
          </div>
          <div className="ws-step-number">1</div>
          <div className="ws-step-image-wrapper">
            <div className="ws-step-image" onClick={() => handleOpenVideo(1)}>
              <Image
                src="/new-assets/gamification.png"
                alt="Gamification"
                width={300}
                height={220}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="why-success-header">
          <h2>Why Success</h2>
          <p>ทำไมน้องๆ ที่<span className="ws-highlight">เรียนกับเราถึงเก่ง</span></p>
        </div>
      </div>

      {/* ====== Magic Thread: Image 1 → Image 2 ====== */}
      <div className="ws-connector ws-connector-1">
        <svg className="ws-thread-svg" viewBox="0 0 1000 250" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gold-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5d060" />
              <stop offset="35%" stopColor="#e8a030" />
              <stop offset="65%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#f5d060" />
            </linearGradient>
            <filter id="glow-1" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="spark-1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe082" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffd700" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e8a030" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g filter="url(#glow-1)">
            {/* Main winding thread: from Image1 bottom (~x450) to Image2 top (~x580) */}
            <path
              d="M 450 0 C 420 35, 370 55, 400 95 C 430 135, 530 110, 510 160 C 490 210, 555 235, 580 250"
              stroke="url(#gold-1)" strokeWidth="3" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-1"
            />
            {/* Secondary thread (slight offset for depth) */}
            <path
              d="M 460 0 C 435 40, 385 60, 410 100 C 435 140, 525 115, 505 165 C 485 215, 555 240, 575 250"
              stroke="url(#gold-1)" strokeWidth="1.8" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-2" opacity="0.55"
            />
            {/* Wispy thin thread */}
            <path
              d="M 440 0 C 400 40, 355 50, 390 90 C 425 130, 540 105, 520 155 C 500 205, 565 230, 585 250"
              stroke="url(#gold-1)" strokeWidth="1" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-3" opacity="0.3"
            />
          </g>

          {/* Energy sparks along the path */}
          <circle cx="395" cy="85" r="6" fill="url(#spark-1)" className="ws-spark ws-spark-1" />
          <circle cx="480" cy="130" r="8" fill="url(#spark-1)" className="ws-spark ws-spark-2" />
          <circle cx="530" cy="195" r="5" fill="url(#spark-1)" className="ws-spark ws-spark-3" />

          {/* Connection orbs at start & end */}
          <circle cx="450" cy="5" r="6" fill="#ffe082" opacity="0.8" className="ws-orb ws-orb-1" />
          <circle cx="580" cy="245" r="6" fill="#ffe082" opacity="0.8" className="ws-orb ws-orb-2" />
        </svg>
      </div>

      {/* ====== ROW 2: Step 2 (center) ====== */}
      <div className="ws-row ws-row-2">
        <div className="ws-step ws-step-2">
          <div className="ws-step-text">
            <h3 className="ws-step-title">SELF-LEARNING</h3>
            <p>ฝึกทักษะ ทำลายขีดจำกัดการเรียนรู้จากอัจฉริยะทั่วโลก ให้ได้เปรียบไปตลอดชีวิต</p>
          </div>
          <div className="ws-step-number">2</div>
          <div className="ws-step-image-wrapper">
            <div className="ws-step-image" onClick={() => handleOpenVideo(2)}>
              <Image
                src="/new-assets/selflearning.png"
                alt="Self Learning"
                width={300}
                height={220}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====== Magic Thread: Image 2 → Image 3 ====== */}
      <div className="ws-connector ws-connector-2">
        <svg className="ws-thread-svg" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gold-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="35%" stopColor="#e8a030" />
              <stop offset="65%" stopColor="#f5d060" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
            <filter id="glow-2" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="spark-2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe082" stopOpacity="1" />
              <stop offset="60%" stopColor="#ffd700" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e8a030" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g filter="url(#glow-2)">
            {/* Main winding thread: Shifted Right +60px, Extended Y to 300 */}
            <path
              d="M 690 0 C 720 40, 780 35, 760 90 C 740 145, 685 170, 730 220 C 775 270, 810 280, 830 300"
              stroke="url(#gold-2)" strokeWidth="3" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-4"
            />
            {/* Secondary thread */}
            <path
              d="M 700 0 C 725 45, 770 45, 755 95 C 740 145, 695 175, 735 225 C 775 275, 815 290, 835 300"
              stroke="url(#gold-2)" strokeWidth="1.8" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-5" opacity="0.55"
            />
            {/* Wispy thin thread */}
            <path
              d="M 680 0 C 710 45, 790 30, 765 85 C 740 140, 675 165, 720 215 C 765 265, 805 285, 825 300"
              stroke="url(#gold-2)" strokeWidth="1" fill="none" strokeLinecap="round"
              className="ws-thread ws-thread-6" opacity="0.3"
            />
          </g>

          {/* Energy sparks - Shifted positions */}
          <circle cx="760" cy="80" r="6" fill="url(#spark-2)" className="ws-spark ws-spark-4" />
          <circle cx="710" cy="170" r="8" fill="url(#spark-2)" className="ws-spark ws-spark-5" />
          <circle cx="790" cy="260" r="5" fill="url(#spark-2)" className="ws-spark ws-spark-6" />

          {/* Connection orbs */}
          <circle cx="690" cy="5" r="6" fill="#ffe082" opacity="0.8" className="ws-orb ws-orb-3" />
          <circle cx="830" cy="295" r="6" fill="#ffe082" opacity="0.8" className="ws-orb ws-orb-4" />
        </svg>
      </div>

      {/* ====== ROW 3: Step 3 (right) ====== */}
      <div className="ws-row ws-row-3">
        <div className="ws-step ws-step-3">
          <div className="ws-step-text">
            <h3 className="ws-step-title">INNOVATION</h3>
            <p>ใส่ไอเดียให้เต็มแม็กซ์<br />สร้างสรรค์สิ่งใหม่แบบไม่ซ้ำใคร</p>
          </div>
          <div className="ws-step-number">3</div>
          <div className="ws-step-image-wrapper">
            <div className="ws-step-image" onClick={() => handleOpenVideo(3)}>
              <Image
                src="/new-assets/innovation.png"
                alt="Innovation"
                width={300}
                height={220}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====== VIDEO MODAL ====== */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className={`video-modal-content ${activeVideo === videos[3] ? "vertical-mobile" : ""}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseVideo}>&times;</button>
            {(activeVideo.endsWith(".mp4") || activeVideo.endsWith(".mov")) ? (
              <video
                className="video-frame"
                src={activeVideo}
                autoPlay
                controls
              />
            ) : (
              <iframe
                className="video-frame"
                src={activeVideo}
                title="Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default WhySuccess;
