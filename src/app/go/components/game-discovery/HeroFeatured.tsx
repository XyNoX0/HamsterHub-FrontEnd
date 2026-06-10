"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GoProject } from "../../lib/api/discovery";
import "./HeroFeatured.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SWIPER_MODULES = [Autoplay, Pagination, Navigation];
const SLIDE_DURATION_MS = 5500;
const SWIPER_AUTOPLAY = { delay: SLIDE_DURATION_MS, disableOnInteraction: false };
const SWIPER_PAGINATION = { clickable: true };

export function HeroFeatured({ games, onSelectGame }: { games: GoProject[]; onSelectGame?: (id: string) => void }) {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause Swiper autoplay when offscreen — saves a constant rAF + paint loop.
  // Also pause when tab is hidden (visibilitychange). Both restored on return.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const sw = swiperRef.current;
        if (!sw || !sw.autoplay) return;
        if (entry.isIntersecting) sw.autoplay.start();
        else sw.autoplay.stop();
      },
      { threshold: 0.05 },
    );
    obs.observe(el);

    const onVisibility = () => {
      const sw = swiperRef.current;
      if (!sw || !sw.autoplay) return;
      if (document.hidden) sw.autoplay.stop();
      else sw.autoplay.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted]);

  const featuredGames = games.slice(0, 3);

  if (!mounted || featuredGames.length === 0) {
    return <section ref={sectionRef} className="hero-pulseSection" />;
  }

  return (
    <section ref={sectionRef} className="page-zone page-zone--sea-deep hero-section">
      <div className="hero-container">
        <Swiper
          modules={SWIPER_MODULES}
          slidesPerView={1}
          spaceBetween={0}
          speed={520}
          pagination={SWIPER_PAGINATION}
          navigation={true}
          autoplay={SWIPER_AUTOPLAY}
          loop={featuredGames.length > 1}
          className="hero-swiper"
          onSwiper={(sw) => {
            swiperRef.current = sw;
            setActiveIdx(sw.realIndex);
          }}
          onSlideChange={(sw) => {
            setActiveIdx(sw.realIndex);
            setProgressKey((k) => k + 1);
          }}
          onAutoplayPause={() => setAutoplayPaused(true)}
          onAutoplayResume={() => setAutoplayPaused(false)}
        >
          {featuredGames.map((game, idx) => {
            const chipText = game.achievements?.[0] || game.eventName || `Rank #${idx + 1}`;
            const handleSelect = () => onSelectGame?.(game.id);

            return (
              <SwiperSlide key={game.id}>
                {/* Mobile Card */}
                <button
                  type="button"
                  className="hero-mobileCard"
                  onClick={handleSelect}
                  aria-label={`Open ${game.title} details`}
                >
                  <div className="hero-mobileImageWrapper">
                    {!game.posterUrl ? (
                      <div className="hero-imageFallback">?</div>
                    ) : (
                      <Image
                        src={game.posterUrl}
                        alt={game.title}
                        fill
                        className="hero-image"
                        priority={idx === 0}
                        loading={idx === 0 ? undefined : "lazy"}
                        unoptimized
                        sizes="(min-width: 768px) 720px, 100vw"
                      />
                    )}
                    <div className="hero-mobileGradient" aria-hidden />
                    <div className="hero-mobileOverlay">
                      {chipText && <span className="hero-chip hero-chipMobile">{chipText}</span>}
                      <h2 className="hero-titleMobile">{game.title}</h2>
                    </div>
                  </div>
                  <div className="hero-lockupBar">
                    <div className="hero-lockupIconBox">
                      {!game.iconUrl ? (
                        <div className="hero-lockupFallback">?</div>
                      ) : (
                        <Image
                          src={game.iconUrl}
                          alt=""
                          fill
                          className="hero-lockupImage"
                          loading="lazy"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="hero-lockupInfo">
                      <h4 className="hero-lockupTitle">{game.title}</h4>
                      <p className="hero-lockupTeam">{game.teamName}</p>
                    </div>
                  </div>
                </button>

                {/* Desktop Card */}
                <button
                  type="button"
                  className="hero-desktopCard"
                  onClick={handleSelect}
                  aria-label={`Open ${game.title} details`}
                >
                  {!game.posterUrl ? (
                    <div className="hero-imageFallback">?</div>
                  ) : (
                    <Image
                      src={game.posterUrl}
                      alt={game.title}
                      fill
                      className="hero-image"
                      priority={idx === 0}
                      loading={idx === 0 ? undefined : "lazy"}
                      unoptimized
                      sizes="(min-width: 1280px) 1200px, 100vw"
                    />
                  )}
                  <div className="hero-desktopGradient" aria-hidden />
                  <div className="hero-desktopOverlay">
                    {chipText && <span className="hero-chip hero-chipDesktop">{chipText}</span>}
                    <h2 className="hero-titleDesktop">{game.title}</h2>
                    <p className="hero-desktopTeam">{game.teamName}</p>
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Slider indicator — communicates "this is a slider, you can swipe / wait
            for next" with a per-slide progress bar that drains over SLIDE_DURATION_MS.
            The progressKey forces the bar to remount on every slide change so the
            CSS animation restarts in sync with autoplay. Pause animation when
            Swiper itself is paused (offscreen / tab hidden / hover-pause). */}
        <div className="hero-slider" aria-hidden>
          <div className="hero-sliderTrack">
            {featuredGames.map((g, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  type="button"
                  key={g.id}
                  className={`hero-sliderTick ${isActive ? "hero-sliderTickActive" : ""}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    key={isActive ? `p-${progressKey}` : `idle-${i}`}
                    className="hero-sliderFill"
                    style={
                      isActive
                        ? {
                            animationDuration: `${SLIDE_DURATION_MS}ms`,
                            animationPlayState: autoplayPaused ? "paused" : "running",
                          }
                        : undefined
                    }
                  />
                </button>
              );
            })}
          </div>
          <div className="hero-sliderMeta">
            <span className="hero-sliderCount">
              <span className="hero-sliderCountActive">{String(activeIdx + 1).padStart(2, "0")}</span>
              <span className="hero-sliderCountSep">/</span>
              <span className="hero-sliderCountTotal">{String(featuredGames.length).padStart(2, "0")}</span>
            </span>
            <span className="hero-sliderHint">SWIPE OR WAIT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
