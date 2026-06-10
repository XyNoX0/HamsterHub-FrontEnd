import React from "react";
import "./Footer.css";
import { FaFacebook, FaLine, FaInstagram } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col footer-brand">
          <Link href="/">
            <Image
              src="/new-assets/FooterIcon.webp"
              width={350}
              height={120}
              alt="Hamster Hub"
              className="footer-logo-img"
            />
          </Link>
        </div>

        <div className="footer-col quick-links">
          <h4 className="footer-col-title">Quick Links</h4>
          <Link href="/" className="footer-link-item">Home</Link>
          <Link href="/python" className="footer-link-item">Python</Link>
          <Link href="/unity" className="footer-link-item">Unity</Link>
          <Link href="/roblox" className="footer-link-item">Roblox</Link>
          <Link href="/gallery" className="footer-link-item">Gallery</Link>
        </div>

        <div className="footer-col contact-col-desktop">
          <h4 className="footer-col-title">Contact</h4>
          <a href="https://www.facebook.com/HamsterHubThailand" target="_blank" rel="noopener noreferrer" className="footer-link-item">
            <FaFacebook /> Hamster Hub
          </a>
          <a href="https://page.line.me/jkm4247u?openQrModal=true" target="_blank" rel="noopener noreferrer" className="footer-link-item">
            <FaLine /> @smart-school
          </a>
          <a href="tel:0900602555" className="footer-link-item">
            <MdLocalPhone /> 090-060-2555
          </a>
          <a href="https://www.instagram.com/hamsterhub_ig/" target="_blank" rel="noopener noreferrer" className="footer-link-item">
            <FaInstagram /> hamsterhub_ig
          </a>
        </div>
      </div>

      <div className="footer-bottom desktop-only">
        <div className="footer-line"></div>
        <p>© 2025 Hamster Hub. All rights reserved.</p>
      </div>

      <div className="footer-bottom-mobile">
        <div className="mobile-social-icons">
          <a href="https://www.facebook.com/HamsterHubThailand" target="_blank" rel="noopener noreferrer" className="mobile-social-item">
            <FaFacebook />
          </a>
          <span className="mobile-social-divider"></span>
          <a href="https://page.line.me/jkm4247u?openQrModal=true" target="_blank" rel="noopener noreferrer" className="mobile-social-item">
            <FaLine />
          </a>
          <span className="mobile-social-divider"></span>
          <a href="tel:0900602555" className="mobile-social-item">
            <MdLocalPhone />
          </a>
          <span className="mobile-social-divider"></span>
          <a href="https://www.instagram.com/hamsterhub_ig/" target="_blank" rel="noopener noreferrer" className="mobile-social-item">
            <FaInstagram />
          </a>
        </div>
        <div className="mobile-footer-delimiter"></div>
        <p className="mobile-footer-copyright">© 2025 Hamster Hub. All rights reserved.</p>
      </div>
    </footer >
  );
}

export default Footer;
