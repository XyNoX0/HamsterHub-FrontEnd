"use client";
import React, { useState, useEffect, useRef } from "react";
import "./TopProjects.css";
import "@/app/go/components/game-discovery/FeaturedWorldsCarousel.css";
import Image from "next/image";
import { ProjectPopupDesktop } from "@/app/go/components/game-discovery/ProjectPopupDesktop";
import { GameDetailsPopup } from "@/app/go/components/game-discovery/GameDetailsPopup";

// Helper component for robust image fallbacks
function CarouselImage({ src, alt, className, priority = false }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={className} style={{ position: 'absolute', inset: 0, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#ccc' }}>
        ?
      </div>
    );
  }

  return (
    <>
      {!loaded && <span className="skel skel-imageFill" aria-hidden />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} skel-imageFade`}
        style={{ opacity: loaded ? 1 : 0, objectFit: "cover" }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        unoptimized
      />
    </>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function TopProjects() {
  const isDesktop = useIsDesktop();
  const [games, setGames] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/go-projects")
      .then(r => r.json())
      .then(d => { if (d?.success) setGames(d.projects); })
      .catch(() => {});
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const step = 500;
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  // Show up to 20 latest projects to utilize the wider display
  const displayGames = games.slice(0, 20);

  return (
    <section className="top-projects" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
      <h2 className="top-projects-title">Top Projects</h2>
      <h4 className="top-projects-subtitle"><span className="tp-highlight">โปรเจคเด็ด</span>จากน้องๆ</h4>

      <div className="carousel-container" style={{ width: "100%", maxWidth: "100%", marginTop: "30px", zIndex: 10 }}>
        <div className="carousel-carouselRelative">
          {showArrows && (
            <>
              <button onClick={() => scroll('left')} className="carousel-arrowBtnLeft" style={{ display: 'flex' }}>
                  <svg className="carousel-arrowIcon" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                  </svg>
              </button>
              <button onClick={() => scroll('right')} className="carousel-arrowBtnRight" style={{ display: 'flex' }}>
                  <svg className="carousel-arrowIconRight" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                  </svg>
              </button>
            </>
          )}

          <div ref={scrollRef} className="carousel-scrollContainer" style={{ padding: "10px 20px 20px" }}>
            {displayGames.map((project, index) => (
              <div
                key={project.id || index}
                className="carousel-cardItem"
                onClick={() => setSelectedGameId(project.id)}
                style={{ transform: "none" }}
              >
                <div className="carousel-imageBox">
                  <CarouselImage
                    src={project.posterUrl}
                    alt={project.title}
                    className="carousel-imageObj"
                    priority={index < 4}
                  />
                  {project.achievements && project.achievements.length > 0 && (
                    <div className="carousel-badge">
                      {project.achievements[0]}
                    </div>
                  )}
                </div>
                <div className="carousel-infoBox">
                  <span className="carousel-eventSubtitle">
                    {project.eventName || "FEATURED"}
                  </span>
                  <h3 className="carousel-itemTitle">
                    {project.title}
                  </h3>
                  <p className="carousel-itemDesc">{project.description}</p>
                </div>
              </div>
            ))}
            
            {displayGames.length === 0 && (
               <div style={{ padding: "20px", color: "#666" }}>กำลังโหลดโปรเจค...</div>
            )}
          </div>
        </div>
      </div>

      {selectedGameId && (
        isDesktop ? (
          <ProjectPopupDesktop
            key={selectedGameId}
            gameId={selectedGameId}
            games={games}
            onClose={() => setSelectedGameId(null)}
          />
        ) : (
          <GameDetailsPopup
            key={selectedGameId}
            gameId={selectedGameId}
            games={games}
            onClose={() => setSelectedGameId(null)}
          />
        )
      )}
    </section>
  );
}

export default TopProjects;
