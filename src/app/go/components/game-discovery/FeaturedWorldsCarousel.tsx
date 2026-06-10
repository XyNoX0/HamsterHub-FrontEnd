"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { GoProject } from "../../lib/api/discovery";
import "./FeaturedWorldsCarousel.css";

// Helper component for robust image fallbacks
function CarouselImage({ src, alt, className, priority = false }: { src: string, alt: string, className: string, priority?: boolean }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div className={className} style={{ position: 'absolute', inset: 0, backgroundColor: 'color-mix(in srgb, var(--color-dang-soft) 20%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'color-mix(in srgb, var(--color-dang-ink) 30%, transparent)' }}>
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
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        unoptimized
      />
    </>
  );
}

interface StarProjectsSliderProps {
  games: GoProject[];
  onSelectGame?: (id: string) => void;
}

export function FeaturedWorldsCarousel({ games, onSelectGame }: StarProjectsSliderProps) {
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

  const worlds = games.slice(0, 5);

  return (
    <section
      className="page-zone page-zone--sea-mist carousel-section"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="carousel-container">
        <div className="carousel-header">
          <div className="carousel-titleRow">
            <h2 className="carousel-title">
              <span className="carousel-titleStar">Star</span>
              <span className="carousel-titleProjects">Projects</span>
            </h2>
          </div>
        </div>

        <div className="carousel-carouselRelative">
          {/* Apple-style Arrows */}
          <AnimatePresence>
            {showArrows && (
              <>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scroll('left')}
                  className="carousel-arrowBtnLeft"
                >
                  <svg className="carousel-arrowIcon" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => scroll('right')}
                  className="carousel-arrowBtnRight"
                >
                  <svg className="carousel-arrowIconRight" viewBox="0 0 9 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.275 29.46a1.61 1.61 0 0 0 1.456 1.077c1.018 0 1.772-.737 1.772-1.737 0-.526-.277-1.186-.449-1.62l-4.68-11.912L8.05 3.363c.172-.442.45-1.116.45-1.625A1.702 1.702 0 0 0 6.728.002a1.603 1.603 0 0 0-1.456 1.09L.675 12.774c-.301.775-.677 1.744-.677 2.495 0 .754.376 1.705.677 2.498L5.272 29.46Z"></path>
                  </svg>
                </motion.button>
              </>
            )}
          </AnimatePresence>

          <div 
            ref={scrollRef}
            className="carousel-scrollContainer"
          >
            {worlds.map((world, index) => (
              <motion.div
                key={world.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.06, duration: 0.42, ease: [0.2, 0.8, 0.3, 1.05] }}
                whileHover={{ y: -4 }}
                onClick={() => onSelectGame?.(world.id)}
                className="carousel-cardItem"
              >
                <div className="carousel-imageBox">
                  <CarouselImage
                    src={world.posterUrl}
                    alt={world.title}
                    className="carousel-imageObj"
                    priority={index < 4}
                  />
                  {world.achievements && world.achievements.length > 0 && (
                    <div className="carousel-badge">
                      {world.achievements[0]}
                    </div>
                  )}
                </div>
                <div className="carousel-infoBox">
                  <span className="carousel-eventSubtitle">
                    {world.eventName || "FEATURED"}
                  </span>
                  <h3 className="carousel-itemTitle">
                    {world.title}
                  </h3>
                  <p className="carousel-itemDesc">{world.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
