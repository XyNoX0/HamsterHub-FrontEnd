"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GoProject } from "../../lib/api/discovery";
import "./ProjectGallery.css";

function ProjectTags({ tags }: { tags: string[] }) {
  if (!tags || tags.length === 0) return null;
  const displayTags = tags.slice(0, 1);
  const extraCount = tags.length - 1;

  return (
    <div className="gallery-tagRow">
      {displayTags.map((tag) => (
        <span key={tag} className="gallery-tagChip">{tag}</span>
      ))}
      {extraCount > 0 && <span className="gallery-tagMore">+{extraCount}</span>}
    </div>
  );
}

// Helper component for robust image fallbacks
function GalleryImage({ src, alt, className, fallbackClass }: { src: string, alt: string, className: string, fallbackClass?: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={fallbackClass || "gallery-gridPlaceholderImg"} style={{ width: '100%', height: '100%', borderRadius: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="gallery-gridPlaceholderText">?</span>
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
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        unoptimized
      />
    </>
  );
}

interface ProjectGalleryProps {
  games: GoProject[];
  onSelectGame?: (id: string) => void;
}

export function ProjectGallery({ games, onSelectGame }: ProjectGalleryProps) {
  const [mounted, setMounted] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const step = 500;
      const { scrollLeft } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  const realGames = games;

  const allItems = realGames.map(g => ({ ...g, type: 'real' as const }));

  const columns = [];
  for (let i = 0; i < allItems.length; i += 3) {
    columns.push(allItems.slice(i, i + 3));
  }

  return (
    <section
      className="page-zone page-zone--sea-soft gallery-section"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="gallery-container">
        {/* Mobile Layout: Today List Card Style */}
        <div className="gallery-mobileBox">
          <div className="gallery-mobileHeader">
            <h2 className="gallery-mobileTitle">
              <span className="gallery-goWord">Go</span><span className="gallery-galleryWord">llery</span>
            </h2>
          </div>

          <div className="gallery-relativeWrapper">
            <div className="gallery-fadeTop" />

            <div className="gallery-listScroll is-staggered">
              {allItems.map((item, i) => (
                <div
                  key={item.id}
                  className={`gallery-listItem ${item.type === 'real' ? 'gallery-listItemReal' : 'gallery-listItemPlaceholder'}`}
                  style={{ ["--i" as string]: i } as React.CSSProperties}
                  onClick={() => item.type === 'real' && onSelectGame?.(item.id)}
                >
                  <div className="gallery-listLeft">
                    <div className="gallery-listImgBox">
                      {item.type === 'real' && item.iconUrl ? (
                        <GalleryImage src={item.iconUrl} alt={item.title} className="gallery-listImg" fallbackClass="gallery-listPlaceholderImg" />
                      ) : (
                        <div className="gallery-listPlaceholderImg">
                          <span className="gallery-listPlaceholderText">?</span>
                        </div>
                      )}
                    </div>
                    <div className="gallery-listInfo">
                      <h4 className="gallery-listInfoTitle">{item.title}</h4>
                      <p className="gallery-listInfoTeam deco-uppercase-tracked">{item.teamName}</p>
                      <ProjectTags tags={[item.eventName, ...(item.achievements || [])].filter(Boolean)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="gallery-fadeBottom" />
          </div>
        </div>

        {/* Desktop Layout: Grid Slider */}
        <div className="gallery-desktopBox">
          <div className="gallery-desktopHeader">
            <div className="gallery-desktopTitleRow">
              <h2 className="gallery-desktopTitle">
                <span className="gallery-goWord">Go</span><span className="gallery-galleryWord">llery</span>
              </h2>
            </div>
          </div>

          <div className="gallery-relativeWrapper">
            <AnimatePresence>
              {showArrows && (
                <>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll('left')}
                    className="gallery-arrowBtnLeft"
                  >
                    <svg className="gallery-arrowIcon" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                    </svg>
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scroll('right')}
                    className="gallery-arrowBtnRight"
                  >
                    <svg className="gallery-arrowIconRight" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                    </svg>
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            <div
              ref={scrollRef}
              className="gallery-gridScroll is-staggered"
            >
              {columns.map((column, colIdx) => (
                <div key={`col-${colIdx}`} className="gallery-gridCol" style={{ ["--i" as string]: colIdx } as React.CSSProperties}>
                  {column.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => item.type === 'real' && onSelectGame?.(item.id)}
                      className={`gallery-gridItem ${item.type === 'real' ? 'gallery-gridItemReal' : 'gallery-gridItemPlaceholder'}`}
                    >
                      <div className="gallery-gridLeft">
                        <div className="gallery-gridImgBox">
                          {item.type === 'real' ? (
                            <GalleryImage src={item.iconUrl} alt={item.title} className="gallery-gridImg" fallbackClass="gallery-gridPlaceholderImg" />
                          ) : (
                            <div className="gallery-gridPlaceholderImg">
                               <span className="gallery-gridPlaceholderText">?</span>
                            </div>
                          )}
                        </div>
                        <div className="gallery-gridInfo">
                          <h3 className="gallery-gridInfoTitle">
                            {item.title}
                          </h3>
                          <p className="gallery-gridInfoTeam deco-uppercase-tracked">
                            {item.teamName}
                          </p>
                          <ProjectTags tags={[item.eventName, ...(item.achievements || [])].filter(Boolean)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
