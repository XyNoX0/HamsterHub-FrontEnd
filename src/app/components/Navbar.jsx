"use client"
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { getDiscordProfileAuthUrl } from "@/utils/profileAuth";
import Link from "next/link";
import "./Navbar.css";
import Image from "next/image";

export default function Navbar({ variant = "", forceHidden = false }) {
  const [LinkData, setLinkData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  const loginWithDiscord = () => {
    window.location.href = getDiscordProfileAuthUrl();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;

      if (menuOpen || currentY < 16) {
        setHidden(false);
      } else if (delta > 8 && currentY > 96) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <nav className={`navbar ${variant ? `navbar--${variant}` : ""} ${hidden || forceHidden ? "navbar-hidden" : ""}`}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <Image
            src="/assets/Hamster.png"
            width={200}
            height={200}
            alt="Hamster Logo"
            className="hamster-logo"
            priority
          />
        </Link>

        <div className="nav-center">
          <Link href="/" className="nav-link-item">Home</Link>
          <Link href="/" className="nav-link-item" onClick={(e) => { const el = document.getElementById('success-story'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } }}>Course</Link>
          <Link href="/hamstore" className="nav-link-item">HamStore</Link>
          <Link href="/profile" className="nav-link-item">Profile</Link>
          <Link href="/about" className="nav-link-item">About</Link>
        </div>

        <div className="nav-right">
          <Link href="/go" className="nav-login-btn" aria-label="เปิดหน้าโปรไฟล์น้องๆ">
            Project Showcase
          </Link>

          <button
            className="hamburger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <Link href="/" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/" className="mobile-menu-item" onClick={(e) => { const el = document.getElementById('success-story'); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); } setMenuOpen(false); }}>Course</Link>
        <Link href="/gallery" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>Gallery</Link>
        <Link href="/about" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/profile" className="mobile-menu-item mobile-menu-profile" onClick={() => setMenuOpen(false)}>โปรไฟล์น้องๆ!</Link>
        {LinkData && LinkData.map((item, index) => (
          <Link
            href={`${item.href}`}
            key={index}
            className="mobile-menu-item mobile-menu-course"
            onClick={() => setMenuOpen(false)}
          >
            {item.subject}
          </Link>
        ))}
      </div>
    </nav>
  );
}
