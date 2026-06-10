"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Statistics.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function useCountUp(target, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return count;
}

function CountUp({ value, shouldStart }) {
  const count = useCountUp(value, 1500, shouldStart);
  return <>{count}</>;
}

function Statistics() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [galleryState, setGalleryState] = useState({ prevIndex: null, direction: 'next' });
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Handle window resize to swap images on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ฟังชั่นสำหรับจัดการเมื่อคลิกที่พื้นผิวการ์ดแต่ละใบ (Mockup)

  const handleCardClick = (action) => {
    if (!action) return;

    // หากเลือกแอคชั่นเป็น link ให้เปิดหน้าต่างใหม่ (หากเป็นลิงก์ภายนอก) หรือใช้ router (หากเป็นลิงก์ภายใน)
    if (action.type === "link") {
      if (action.url.startsWith("/")) {
        router.push(action.url);
      } else {
        window.open(action.url, "_blank");
      }
    }
    // หากเลือกเป็น image หรือ video ให้เปิด Modal ย่อขยาย
    else if (action.type === "image" || action.type === "video") {
      setActiveModal(action);
    }
    // หากเลือกเป็น gallery ให้เปิด Modal แบบเลื่อนรูปได้
    else if (action.type === "gallery") {
      setGalleryState({ prevIndex: null, direction: 'next' });
      setActiveModal({
        type: "gallery",
        folder: action.folder,
        count: action.count,
        currentIndex: 1 // เริ่มที่รูปแรก 1.png
      });
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (activeModal && activeModal.type === "gallery") {
      setGalleryState({ prevIndex: activeModal.currentIndex, direction: 'next' });
      setActiveModal((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex < prev.count ? prev.currentIndex + 1 : 1
      }));
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (activeModal && activeModal.type === "gallery") {
      setGalleryState({ prevIndex: activeModal.currentIndex, direction: 'prev' });
      setActiveModal((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex > 1 ? prev.currentIndex - 1 : prev.count
      }));
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  return (
    <section className="statistics" ref={sectionRef} id="2025-success">
      <div className="ss-header">
        <h2>Hamster Story</h2>
      </div>
      <div className="ss-bento">
        {/* ====== Card 1: 9 คน วิศวกรรมคอมพิวเตอร์ + Portfolio logo ====== */}
        {/* ตัวอย่างเซ็ต action ให้เปิดรูปภาพ */}
        <div
          className="ss-card ss-card-1"
          onClick={() => handleCardClick({ type: "gallery", folder: "mu", count: 7 })}
        >
          {isMobile ? (
            <div className="ss-card-7-inner">
              <div className="ss-card-image-person">
                <Image src="/new-assets/university/mu.png" alt="MU" width={100} height={100} style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "10px" }} />
              </div>
              <div className="ss-card-7-info">
                <div className="ss-card-number-group">
                  <span className="ss-big-number"><CountUp value={7} shouldStart={isVisible} /></span>
                  <span className="ss-suffix">คน</span>
                </div>
                <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์</p>
              </div>
            </div>
          ) : (
            <>
              <div className="ss-card-number-group">
                <span className="ss-big-number"><CountUp value={7} shouldStart={isVisible} /></span>
                <span className="ss-suffix">คน</span>
              </div>
              <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์</p>
              <div className="ss-card-image-small">
                <Image src="/new-assets/Canvas/mu.png" alt="Portfolio" width={520} height={160} style={{ objectFit: "contain", borderRadius: "8px" }} />
              </div>
            </>
          )}
        </div>

        {/* ====== Card 2: PORTFOLIO 15 คน ====== */}
        {/* ตัวอย่างเซ็ต action ให้เปิดวิดีโอ */}
        <div
          className="ss-card ss-card-2"
          onClick={() => handleCardClick({ type: "gallery", folder: "kmutt", count: 13 })}
        >
          {isMobile ? (
            <div className="ss-card-7-inner">
              <div className="ss-card-image-person">
                <Image src="/new-assets/university/kmutt.png" alt="KMUTT" width={100} height={100} style={{ objectFit: "contain", width: "100%", height: "100%", borderRadius: "10px" }} />
              </div>
              <div className="ss-card-7-info">
                <div className="ss-card-number-group">
                  <span className="ss-big-number"><CountUp value={13} shouldStart={isVisible} /></span>
                  <span className="ss-suffix">คน</span>
                </div>
                <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์<br />เทคโนโลยีสารสนเทศ</p>
              </div>
            </div>
          ) : (
            <>
              <div className="ss-card-image-bg">
                <Image src="/new-assets/Canvas/kmutt.png" alt="Student" width={200} height={140} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px" }} />
              </div>
              <div className="ss-card-overlay">
                <div className="ss-portfolio-badge"></div>
                <div className="ss-card-number-group">
                  <span className="ss-big-number"><CountUp value={13} shouldStart={isVisible} /></span>
                  <span className="ss-suffix">คน</span>
                </div>
                <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์<br />เทคโนโลยีสารสนเทศ</p>
              </div>
            </>
          )}
        </div>

        {/* ====== Card 3: Official Collaboration ====== */}
        {/* ตัวอย่างเซ็ต action ให้เปิด Web page ขึ้นมา */}
        <div
          className="ss-card ss-card-3 ss-card-static"
        >
          <p className="ss-card-top-label">Official Collaboration</p>
          <div className="ss-collab-icons">
            <div className="ss-collab-icon">
              <Image src="/new-assets/Hamster.png" alt=" Hamster" width={120} height={120} style={{ objectFit: "contain" }} />
            </div>
            <span className="ss-collab-x">✕</span>
            <div className="ss-collab-brand">
              <span className="ss-edu-text">Eduverse</span>
              <Image src="/new-assets/Canvas/eduverse.png" alt="Eduverse" width={200} height={200} style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>

        {/* ====== Card 4: KMITL Jam ====== */}
        <div className="ss-card ss-card-4"
          onClick={() => handleCardClick({ type: "link", url: "https://hamsterhub.co/kmitljam" })}>
          <div className="ss-gallery-label-bottom">KMITL Jam</div>
          <div className="ss-card-image-full">
            <Image src="/new-assets/Canvas/kmitljam.png" alt="Study after dark" width={400} height={280} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>

        </div>

        {/* ====== Card 5: NSC Finalists 12 คน ====== */}
        <div className="ss-card ss-card-5"
          onClick={() => handleCardClick({ type: "gallery", folder: "nsc", count: 7 })}>
          <div className="ss-nsc-row">
            <div className="ss-nsc-icon">
              <Image src="/new-assets/Canvas/nsc.png" alt="NSC" width={60} height={60} style={{ objectFit: "contain", borderRadius: "8px" }} />
            </div>
            <div className="ss-nsc-info">
              <div className="ss-card-number-group">
                <span className="ss-big-number"><CountUp value={12} shouldStart={isVisible} /></span>
                <span className="ss-suffix">คน</span>
              </div>
              <p className="ss-card-label">NSC Finalists</p>
            </div>
          </div>
        </div>

        {/* ====== Card 6: Gamification with Hamster Quest ====== */}
        <div className="ss-card ss-card-6"
          onClick={() => handleCardClick({ type: "video", url: "/new-assets/WhySuccess/HMap.mp4" })}>
          <p className="ss-card-top-label">Gamification</p>
          <div className="ss-card-image-phone">
            <Image src="/new-assets/Canvas/hamsterquest_phone.png" alt="Hamster Quest" width={120} height={160} style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* ====== Center Card: 2025 Success Story ====== */}
        <div className="ss-card ss-card-center ss-card-static">
          <div className="ss-year">2025</div>
          <div className="ss-story-label">Success Story</div>
        </div>

        {/* ====== Card 7: Person + 9 คน (3 departments) ====== */}
        <div className="ss-card ss-card-7"
          onClick={() => handleCardClick({ type: "gallery", folder: "kmitl", count: 6 })}>
          <div className="ss-card-7-inner">
            <div className="ss-card-image-person">
              <Image src={isMobile ? "/new-assets/university/kmitl.png" : "/new-assets/Canvas/kmitl.png"} alt="Teacher" width={120} height={120} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "10px" }} />
            </div>
            <div className="ss-card-7-info">
              <div className="ss-card-number-group">
                <span className="ss-big-number"><CountUp value={6} shouldStart={isVisible} /></span>
                <span className="ss-suffix">คน</span>
              </div>
              <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์<br />วิทยาการคอมพิวเตอร์<br />เทคโนโลยีสารสนเทศ</p>
            </div>
          </div>
        </div>

        {/* ====== Card 9: CEDT 8 คน ====== */}
        <div className="ss-card ss-card-9"
          onClick={() => handleCardClick({ type: "gallery", folder: "cedt", count: 6 })}>
          <div className="ss-cedt-icon">
            <Image src="/new-assets/Canvas/cu.png" alt="CEDT" width={50} height={50} style={{ objectFit: "contain" }} />
          </div>
          <div className="ss-card-number-group">
            <span className="ss-big-number"><CountUp value={6} shouldStart={isVisible} /></span>
            <span className="ss-suffix">คน</span>
          </div>
          <p className="ss-card-label">CEDT</p>
        </div>

        {/* ====== Card 10: 7 คน + University logos ====== */}
        <div className="ss-card ss-card-10"
          onClick={() => handleCardClick({ type: "gallery", folder: "ku", count: 4 })}>
          <div className="ss-uni-logos">
            <Image src={isMobile ? "/new-assets/university/ku.png" : "/new-assets/Canvas/ku.png"} alt="KU" width={100} height={100} style={{ objectFit: "cover" }} />
          </div>
          <div className="ss-card-10-info">
            <div className="ss-card-number-group">
              <span className="ss-big-number"><CountUp value={5} shouldStart={isVisible} /></span>
              <span className="ss-suffix">คน</span>
            </div>
            <p className="ss-card-desc">วิศวกรรมคอมพิวเตอร์<br />วิทยาการคอมพิวเตอร์</p>
          </div>
        </div>

        {/* ====== Card 11: Success Gallery ====== */}
        <div className="ss-card ss-card-11"
          onClick={() => handleCardClick({ type: "link", url: "/gallery" })}>
          <div className="ss-gallery-label-bottom">Success Gallery</div>
          <div className="ss-card-image-full">
            <Image src="/new-assets/Card.gif" alt="Success Gallery" width={400} height={280} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
          </div>
        </div>

      </div>

      {/* Mockup Modal สำหรับแสดงรูปภาพหรือวิดีโอ */}
      {activeModal && (
        <div className="ss-modal-overlay" onClick={() => setActiveModal(null)}>
          <div
            className={`ss-modal-content ${activeModal.type === "gallery" ? "ss-modal-gallery-mode" : ""}`}
            onClick={(e) => {
              if (activeModal.type === "gallery") {
                // If in gallery mode, close unless clicking specifically on the image, functional arrows, or links.
                if (e.target.tagName !== "IMG" && e.target.tagName !== "BUTTON" && !e.target.closest("button") && e.target.tagName !== "A" && !e.target.closest("a")) {
                  setActiveModal(null);
                }
              } else {
                e.stopPropagation();
              }
            }}
          >
            {activeModal.type !== "gallery" && (
              <button className="ss-modal-close-btn" onClick={() => setActiveModal(null)}>&times;</button>
            )}

            {activeModal.type === "image" && (
              <img src={activeModal.url} alt="Mockup" className="ss-modal-media" />
            )}

            {activeModal.type === "video" && (
              activeModal.url.endsWith(".mp4") ? (
                <video src={activeModal.url} autoPlay controls className="ss-modal-media" />
              ) : (
                <iframe
                  className="ss-modal-media"
                  src={activeModal.url}
                  title="Video Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}
            {activeModal.type === "gallery" && (
              <div className="ss-gallery-wrapper">
                <button className="ss-gallery-arrow ss-gallery-prev" onClick={handlePrevImage} aria-label="Previous image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                <div className="ss-gallery-image-container">

                  {Array.from({ length: activeModal.count }).map((_, idx) => {
                    const isActive = activeModal.currentIndex === idx + 1;
                    const isPrev = galleryState.prevIndex === idx + 1;

                    let className = "ss-gallery-image";
                    if (isActive) className += ` active slide-in-${galleryState.direction}`;
                    else if (isPrev) className += ` exiting slide-out-${galleryState.direction}`;

                    return (
                      <img
                        key={`gallery-slide-${idx}`}
                        src={`/new-assets/Canvas/${activeModal.folder}/${idx + 1}.png`}
                        alt={`Gallery image ${idx + 1}`}
                        className={className}
                      />
                    );
                  })}
                </div>

                <button className="ss-gallery-arrow ss-gallery-next" onClick={handleNextImage} aria-label="Next image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {activeModal.folder === "nsc" && (
                  <Link href="/nsc" className="nsc-apply-btn">
                    สมัครเลย
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Statistics;
