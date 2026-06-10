"use client";
import React from "react";
import "./HeroSection.css";
import Image from "next/image";
import Link from "next/link";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-bg-overlay" />
      <div className="hero-light-ray" />

      <div className="hero-stars">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="hero-star" />
        ))}
      </div>


      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-star">Hamster</span>
          <span className="hero-title-platinum">Hub</span>
        </h1>

        <p className="hero-subtitle">
          สร้างผลงานอย่างต่อเนื่อง<span className="hero-highlight">สู่มหาลัยระดับท็อป</span>
        </p>
      </div>

      <div className="hero-buttons">
        <button onClick={() => document.getElementById('why-success')?.scrollIntoView({ behavior: 'smooth' })} className="hero-square-btn hero-square-btn-1">
          <div className="hero-square-btn-img">
            <Image src="/new-assets/hamster/4.png" alt="Why Success" width={55} height={75} />
          </div>
          <span className="hero-square-btn-label">Winner?</span>
        </button>
        <button onClick={() => document.getElementById('2025-success')?.scrollIntoView({ behavior: 'smooth' })} className="hero-square-btn hero-square-btn-2">
          <div className="hero-square-btn-img">
            <Image src="/new-assets/hamster/2.png" alt="2025 Story" width={75} height={75} />
          </div>
          <span className="hero-square-btn-label">2025 Story</span>
        </button>
        <button onClick={() => document.getElementById('success-story')?.scrollIntoView({ behavior: 'smooth' })} className="hero-square-btn hero-square-btn-3">
          <div className="hero-square-btn-img">
            <Image src="/new-assets/hamster/3.png" alt="Latest Story" width={75} height={75} />
          </div>
          <span className="hero-square-btn-label">Camps & Course</span>
        </button>
      </div>

      {/* New Image on the Right */}
      <div className="hero-right-image">
        <Image
          src="/new-assets/Starlight.png"
          alt="Starlight"
          width={800}
          height={800}
          className="idinnsc-img"
          quality={100}
          unoptimized
          priority
        />
        <Link href="https://hamsterhub.co/starlight" className="hero-cta-btn">
          สมัครเลย
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
