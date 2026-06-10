"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Link2, Shield, Star, User, Sparkles, ArrowLeft } from "lucide-react";
import type { AggregateMember } from "../../lib/members";
import { deriveLevel, deriveTitleLine, deriveMotto, publicProfileHeadline } from "../../lib/members";
import { renderableImageSrc } from "../../lib/image-src";
import "./ProHero.css";

function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageSrc = renderableImageSrc(src);
  if (!imageSrc || error) {
    return (
      <div className="hero-portraitFallback">
        <User strokeWidth={1.6} aria-hidden />
      </div>
    );
  }
  return (
    <>
      {!loaded && <span className="skel skel-imageFill" aria-hidden />}
      <Image
        src={imageSrc}
        alt={alt}
        width={220}
        height={220}
        className="hero-portraitImg skel-imageFade"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </>
  );
}

export function ProHero({ member }: { member: AggregateMember }) {
  const level = deriveLevel(member);
  const titleLine = deriveTitleLine(member);
  const motto = deriveMotto(member);
  const eventChip = member.games[0]?.event;
  const location = member.override?.location;
  const link = member.override?.link;
  const headline = publicProfileHeadline(member);
  const nick = (member.username ?? "").trim();
  const showNickLine = Boolean(nick && nick !== headline);

  return (
    <section className="page-zone page-zone--sea-deep hero-section hero-section--pro">
      <div className="hero-clouds" aria-hidden />
      <Sparkles className="hero-prop hero-prop-1" strokeWidth={1.8} aria-hidden />
      <Sparkles className="hero-prop hero-prop-2" strokeWidth={1.8} aria-hidden />
      <div className="hero-container">
        <Link href="/profile" className="hero-backLink">
          <ArrowLeft className="hero-backIcon" strokeWidth={2.4} aria-hidden />
          <span>Back to GoPro</span>
        </Link>

        <div className="hero-main">
          <div className="hero-portraitCol">
            <div className="hero-portraitFrame">
              <HeroPortrait src={member.profileSrc} alt={headline} />
              {level != null && (
                <div className="hero-levelChip">
                  <span className="hero-levelLabel">LEVEL</span>
                  <span className="hero-levelNum">{level}</span>
                </div>
              )}
            </div>
          </div>

          <div className="hero-identityCol">
          {eventChip && <span className="hero-eventChip">{eventChip}</span>}
          <h1 className="hero-name">
            {headline}
            <span className="hero-rankBadge">
              <span className="hero-rankIconBox">
                <Shield className="hero-rankIcon" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="hero-rankText">{member.rank}</span>
              <Star className="hero-rankStar" strokeWidth={3} aria-hidden />
            </span>
          </h1>
          {showNickLine ? (
            <p className="hero-nickname">ชื่อเล่น · {member.username}</p>
          ) : null}
          <p className="hero-titleLine">{titleLine}</p>
          {motto && (
            <div className="hero-bubble">
              <p className="hero-bubbleText">{motto}</p>
            </div>
          )}
          {(location || link) && (
            <div className="hero-metaRow">
              {location && (
                <span className="hero-metaItem">
                  <MapPin className="hero-metaIcon" strokeWidth={2.4} aria-hidden />
                  {location}
                </span>
              )}
              {link && (
                <a className="hero-metaItem hero-metaLink" href={link.href} target="_blank" rel="noreferrer">
                  <Link2 className="hero-metaIcon" strokeWidth={2.4} aria-hidden />
                  {link.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
}
