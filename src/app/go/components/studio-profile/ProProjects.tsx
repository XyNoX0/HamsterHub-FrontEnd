"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import type { MemberGameAppearance } from "../../lib/members";
import "./ProProjects.css";

function TilePoster({ poster, icon, alt }: { poster: string; icon: string; alt: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const src = icon || poster;

  if (!src || error) {
    return <div className="projects-imageFallback" aria-hidden />;
  }
  return (
    <>
      {!loaded && <span className="skel skel-imageFill" aria-hidden />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
        className="projects-image skel-imageFade"
        style={{ opacity: loaded ? 1 : 0, objectFit: icon ? 'contain' : 'cover' }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        unoptimized
      />
    </>
  );
}

export function ProProjects({
  games,
  featuredId,
  onSelectGame,
  onFeatureProject,
  uploadTrigger,
}: {
  games: MemberGameAppearance[];
  featuredId?: string | null;
  onSelectGame?: (id: string) => void;
  onFeatureProject?: (game: MemberGameAppearance) => void;
  uploadTrigger?: React.ReactNode;
}) {
  if (games.length === 0 && !uploadTrigger) return null;
  const canOpenDetails = Boolean(onSelectGame);

  return (
    <section className="page-zone page-zone--sea-mist projects-section">
      <div className="projects-container">
        <header className="projects-header">
          <div className="projects-titleRow">
            <h2 className="projects-title">
              <span className="projects-titleMy">My</span>
              <span className="projects-titleProjects">Projects</span>
            </h2>
            <span className="projects-count">{games.length}</span>
            {uploadTrigger && <div className="projects-uploadTrigger">{uploadTrigger}</div>}
          </div>
        </header>

        <ul className="projects-grid is-staggered">
          {games.map((g, i) => (
            <li key={g.id} className="projects-tileWrap" style={{ ["--i" as string]: i } as React.CSSProperties}>
              <button 
                type="button"
                onClick={() => onSelectGame?.(g.id)}
                aria-disabled={!canOpenDetails}
                className="projects-tile"
                style={{ cursor: canOpenDetails ? "pointer" : "default" }}
              >
                <div className="projects-imageBox">
                  <TilePoster poster={g.posterSrc} icon={g.iconSrc} alt={g.title} />
                  <span className="projects-eventBadge">{g.event}</span>
                </div>
                <div className="projects-info">
                  <h3 className="projects-name">{g.title}</h3>
                  <p className="projects-meta">{g.role}</p>
                  <p className="projects-subMeta">{g.teamName}</p>
                </div>
              </button>
              {onFeatureProject && g.sourceProjectId ? (
                <button
                  type="button"
                  className={`projects-featureButton${featuredId === g.id || g.featured ? " is-active" : ""}`}
                  aria-label={(featuredId === g.id || g.featured) ? `Cancel featured project ${g.title}` : `Feature ${g.title}`}
                  title={(featuredId === g.id || g.featured) ? "Cancel featured project" : "Set as featured project"}
                  onClick={() => onFeatureProject(g)}
                >
                  <Star className="projects-featureIcon" strokeWidth={2.6} aria-hidden />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
