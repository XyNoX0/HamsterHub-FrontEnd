"use client";

import { useCallback, useEffect, useState } from "react";
import { Prompt, Poppins } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import { TopAppBar } from "./components/game-discovery/TopAppBar";
import { HeroFeatured } from "./components/game-discovery/HeroFeatured";
import { FeaturedWorldsCarousel } from "./components/game-discovery/FeaturedWorldsCarousel";
import { ProjectGallery } from "./components/game-discovery/ProjectGallery";
import { DiscoverArena } from "./components/game-discovery/DiscoverArena";
import { GameDetailsPopup } from "./components/game-discovery/GameDetailsPopup";
import { ProjectPopupDesktop } from "./components/game-discovery/ProjectPopupDesktop";
import type { GoProject } from "./lib/api/discovery";
import "./page.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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

export default function Home() {
  const isDesktop = useIsDesktop();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [games, setGames] = useState<GoProject[]>([]);

  useEffect(() => {
    fetch("/api/go-projects")
      .then(r => r.json())
      .then(d => { if (d?.success) setGames(d.projects); })
      .catch(() => {});
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedGameId(id);
  }, []);

  return (
    <>
      <Navbar variant="go" forceHidden={Boolean(selectedGameId)} />
      <div className={`page-layout page-layout--go ${prompt.variable} ${poppins.variable}`}>
      <div className="page-main">
        <TopAppBar />
        <main className="page-scroll">
          <div className="page-container">
            <HeroFeatured games={games} onSelectGame={handleSelect} />
            <FeaturedWorldsCarousel games={games} onSelectGame={handleSelect} />
            <DiscoverArena />
            <ProjectGallery games={games} onSelectGame={handleSelect} />
          </div>
        </main>
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
      </div>
    </>
  );
}
