"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, Sparkles, User } from "lucide-react";
import type { AggregateMember, MemberGameAppearance } from "../../lib/members";
import { getFirstJamInfo } from "../../lib/members";
import { renderableImageSrc } from "../../lib/image-src";
import { ALL_GAMES } from "../../data/games/registry";
import { Stamp } from "./Stamp";
import "./ProFeatured.css";

function FeaturedPoster({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageSrc = renderableImageSrc(src);
  if (!imageSrc || error) {
    return (
      <div className="featured-imageFallback" aria-hidden>
        <ImageIcon className="featured-imageFallbackIcon" strokeWidth={2.2} />
        <span className="featured-imageFallbackTitle">{title}</span>
        <span className="featured-imageFallbackSub">Project video</span>
      </div>
    );
  }
  return (
    <>
      {!loaded && <span className="skel skel-imageFill" aria-hidden />}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="featured-image skel-imageFade"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </>
  );
}

function TeamAvatar({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageSrc = renderableImageSrc(src);
  if (!imageSrc || error) {
    return (
      <span className="featured-avatarFallback">
        <User strokeWidth={2} aria-hidden />
      </span>
    );
  }
  return (
    <>
      {!loaded && <span className="skel skel-imageFill skel-circle" aria-hidden />}
      <Image
        src={imageSrc}
        alt={alt}
        width={36}
        height={36}
        className="featured-avatarImg skel-imageFade"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </>
  );
}

export function ProFeatured({
  member,
  game,
  onSelectGame,
}: {
  member: AggregateMember;
  game: MemberGameAppearance;
  onSelectGame?: (id: string) => void;
}) {
  const fullGame = ALL_GAMES.find((g) => g.id === game.id);
  const teamMembers = (game.teamMembers?.length ? game.teamMembers : fullGame?.teamMembers ?? []) as Array<{
    discordId?: string;
    memberId?: string;
    name: string;
    username?: string;
    profileSrc?: string;
  }>;
  const others = teamMembers.filter((m) => m.username !== member.username);
  const visible = others.slice(0, 4);
  const overflow = others.length - visible.length;
  const tagline = (game.description || fullGame?.description || "").split(/[\n.]/)[0]?.trim() || "";

  const firstJam = getFirstJamInfo(member);
  const isFirstJam = firstJam?.game.id === game.id;
  const stampLabel = isFirstJam ? "FIRST JAM" : "TEAM MADE";
  const stampTone = isFirstJam ? "sun" : "dang";

  return (
    <article 
      className="featured-card" 
      onClick={() => onSelectGame?.(game.id)}
      style={{ cursor: onSelectGame ? 'pointer' : 'default' }}
    >
      <div className="featured-ribbon">
        <Sparkles className="featured-ribbonIcon" strokeWidth={2.4} aria-hidden />
        <span className="featured-ribbonText">FEATURED PROJECT</span>
      </div>

      <div className="featured-imageBox">
        <FeaturedPoster
          src={game.posterSrc || fullGame?.posterSrc || game.iconSrc || ""}
          alt={fullGame?.title ?? game.title}
          title={fullGame?.title ?? game.title}
        />
        <div className="featured-imageGradient" />
        <span className="featured-stampSlot">
          <Stamp label={stampLabel} tone={stampTone} rotate={-8} />
        </span>
        <div className="featured-imageOverlay">
          <div className="featured-chips">
            <span className="featured-chip featured-chipEvent">{game.event}</span>
            <span className="featured-chip featured-chipTeam">{game.teamName}</span>
          </div>
          <h2 className="featured-title">{fullGame?.title ?? game.title}</h2>
          {tagline && <p className="featured-tagline">{tagline}</p>}
        </div>
      </div>

      <div className="featured-footer">
        <div className="featured-roleCol">
          <span className="featured-footerLabel">My Role</span>
          <span className="featured-roleText">{game.role}</span>
        </div>
        <div className="featured-teamCol">
          <span className="featured-footerLabel">Team</span>
          <ul className="featured-avatars">
            {visible.map((m, index) => (
              <li
                key={m.discordId || m.memberId || m.username || `${m.name}-${index}`}
                className="featured-avatar"
                title={m.name}
              >
                <TeamAvatar src={m.profileSrc} alt={m.name} />
              </li>
            ))}
            {overflow > 0 && (
              <li className="featured-avatarMore">+{overflow}</li>
            )}
          </ul>
        </div>
      </div>
    </article>
  );
}
