"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Prompt, Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";
import { Sidebar } from "../../../components/game-discovery/Sidebar";
import { TopAppBar } from "../../../components/game-discovery/TopAppBar";
import { ProHero } from "../../../components/studio-profile/ProHero";
import { ProStatsBar } from "../../../components/studio-profile/ProStatsBar";
import { ProAbout } from "../../../components/studio-profile/ProAbout";
import { ProFeatured } from "../../../components/studio-profile/ProFeatured";
import { ProProjects } from "../../../components/studio-profile/ProProjects";
import { ProAchievements } from "../../../components/studio-profile/ProAchievements";
import { ProJourney } from "../../../components/studio-profile/ProJourney";
import { GameDetailsPopup } from "../../../components/game-discovery/GameDetailsPopup";
import { ProjectPopupDesktop } from "../../../components/game-discovery/ProjectPopupDesktop";
import { getFeaturedGame, type AggregateMember } from "../../../lib/members";
import "../../../page.css";
import "../../../components/studio-profile/profile-page.css";
import "../preview.css";

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
  // Preview is dev-only and most testing happens at desktop. Skip the
  // listener dance — fewer moving parts in the preview surface.
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(min-width: 1024px)").matches ?? false;
}

export function PreviewClient({
  member,
  fileSlug,
  relativePath,
}: {
  member: AggregateMember;
  fileSlug: string;
  relativePath: string;
}) {
  const isDesktop = useIsDesktop();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const handleSelect = useCallback((id: string) => {
    setSelectedGameId(id);
  }, []);

  const featured = getFeaturedGame(member);

  return (
    <div className={`page-layout ${prompt.variable} ${poppins.variable}`}>
      <Sidebar />
      <div className="page-main">
        <TopAppBar />
        <main className="page-scroll">
          <div className="preview-banner" role="status">
            <div className="preview-bannerLeft">
              <span className="preview-bannerDot" aria-hidden />
              <span>Dev Preview</span>
              <span className="preview-bannerMeta">
                file: {relativePath} · resolved slug: {member.slug}
                {fileSlug !== member.slug ? ` (url: ${fileSlug})` : ""}
              </span>
            </div>
            <div className="preview-bannerActions">
              <Link href="/go/admin/preview" className="preview-bannerLink">
                ← All profiles
              </Link>
              <Link href="/go/admin" className="preview-bannerLink">
                Admin home
              </Link>
            </div>
          </div>

          <div className="page-container">
            <ProHero member={member} />
            <ProStatsBar member={member} />

            <section className="page-zone page-zone--sea-soft pro-mainSection">
              <div className="pro-mainGrid">
                <div className="pro-mainLeft">
                  <ProAbout member={member} />
                </div>
                <div className="pro-mainRight">
                  {featured ? (
                    <ProFeatured
                      member={member}
                      game={featured}
                      onSelectGame={handleSelect}
                    />
                  ) : null}
                </div>
              </div>
            </section>

            <ProProjects games={member.games} onSelectGame={handleSelect} />

            <section className="page-zone page-zone--sea-medium pro-bottomSection">
              <div className="pro-bottomGrid">
                <ProAchievements member={member} />
                <ProJourney member={member} />
              </div>
              <div className="pro-horizon" aria-hidden>
                <span className="pro-horizonSpark">
                  <Sparkles strokeWidth={2.4} width={12} height={12} />
                </span>
              </div>
            </section>
          </div>
        </main>
      </div>

      {selectedGameId &&
        (isDesktop ? (
          <ProjectPopupDesktop
            key={selectedGameId}
            gameId={selectedGameId}
            onClose={() => setSelectedGameId(null)}
          />
        ) : (
          <GameDetailsPopup
            key={selectedGameId}
            gameId={selectedGameId}
            onClose={() => setSelectedGameId(null)}
          />
        ))}
    </div>
  );
}
