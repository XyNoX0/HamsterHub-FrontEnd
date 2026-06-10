"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { ProHero } from "@/app/go/components/studio-profile/ProHero";
import { ProStatsBar } from "@/app/go/components/studio-profile/ProStatsBar";
import { ProAbout } from "@/app/go/components/studio-profile/ProAbout";
import { ProFeatured } from "@/app/go/components/studio-profile/ProFeatured";
import { ProProjects } from "@/app/go/components/studio-profile/ProProjects";
import { ProAchievements } from "@/app/go/components/studio-profile/ProAchievements";
import { ProJourney } from "@/app/go/components/studio-profile/ProJourney";
import { ProAcademic } from "@/app/go/components/studio-profile/ProAcademic";
import { VisitsIncrementer } from "@/app/go/components/studio-profile/VisitsIncrementer";
import { SubmitProjectPanel } from "@/app/go/components/studio-profile/SubmitProjectPanel";
import { GameDetailsPopup } from "@/app/go/components/game-discovery/GameDetailsPopup";
import { ProjectPopupDesktop } from "@/app/go/components/game-discovery/ProjectPopupDesktop";
import type { AggregateMember, MemberGameAppearance } from "@/app/go/lib/members";
import type { DekhubMember } from "@/app/go/lib/dekhub";

const TOKEN_KEY = "hh_go_pro_profile_token";

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    "https://api.hamsterquest.com/api/nuutor/api"
  ).replace(/\/+$/, "");
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

export function ProDetailClient({
  member,
  featured,
  dekhub,
  enableGamePopups = true,
}: {
  member: AggregateMember;
  featured: MemberGameAppearance | null;
  dekhub: DekhubMember | null;
  enableGamePopups?: boolean;
}) {
  const isDesktop = useIsDesktop();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [projectsKey, setProjectsKey] = useState(0);
  const [featuredGameId, setFeaturedGameId] = useState<string | null>(featured?.id ?? null);
  const [featurePendingId, setFeaturePendingId] = useState<string | null>(null);
  const [aboutText, setAboutText] = useState(member.override?.aboutText ?? "");
  const currentGames = useMemo(
    () => member.games.map((game) => ({
      ...game,
      featured: game.id === featuredGameId,
    })),
    [featuredGameId, member.games],
  );
  const currentFeatured = currentGames.find((game) => game.id === featuredGameId) ?? null;
  const selectedProject = currentGames.find((game) => game.id === selectedGameId) ?? null;

  const handleSelect = useCallback((id: string) => {
    if (!enableGamePopups) return;
    setSelectedGameId(id);
  }, [enableGamePopups]);

  useEffect(() => {
    let active = true;
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) || "" : "";
    if (!token) return;

    fetch(`${getApiBase()}/profile/session`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!active || !payload?.success) return;
        const username = String(payload.profileUsername || payload.profile?.identity?.username || "").trim().toLowerCase();
        const discordId = String(payload.profile?.identity?.discordId || payload.user?.id || "").trim().toLowerCase();
        const slugLower = member.slug.toLowerCase();
        setIsOwner(
          Boolean(username && username === slugLower) ||
          Boolean(discordId && discordId === slugLower)
        );
      })
      .catch(() => {
        if (active) setIsOwner(false);
      });

    return () => {
      active = false;
    };
  }, [member.slug]);

  const handleFeatureProject = useCallback(async (game: MemberGameAppearance) => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) || "" : "";
    const projectId = game.sourceProjectId || "";
    const fileId = game.sourceFileId || "";
    const shouldClear = featuredGameId === game.id || game.featured;
    if (!token || (!shouldClear && !projectId && !fileId) || featurePendingId) return;

    setFeaturePendingId(game.id);
    try {
      const response = await fetch(`${getApiBase()}/profile/featured-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shouldClear ? { clear: true } : { projectId, fileId }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) throw new Error(payload?.error || "Feature project failed");
      setFeaturedGameId(shouldClear ? null : game.id);
    } catch (error) {
      console.error(error);
    } finally {
      setFeaturePendingId(null);
    }
  }, [featurePendingId, featuredGameId]);

  const handleSaveAbout = useCallback(async (about: string) => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) || "" : "";
    if (!token) throw new Error("Login required");

    const response = await fetch(`${getApiBase()}/profile/about`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ about }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload?.success) throw new Error(payload?.error || "Save about failed");
    setAboutText(String(payload.about ?? about));
  }, []);

  return (
    <div className="page-layout">
      <main className="page-main page-main--standalone">
        <div className="page-scroll">
          <div className="page-container">
            <ProHero member={member} />
            <ProStatsBar member={member} />
            <VisitsIncrementer slug={member.slug} />

            <section className="page-zone page-zone--sea-soft pro-mainSection">
              <div className="pro-mainGrid">
                <div className="pro-mainLeft">
                  <ProAbout
                    member={member}
                    canEdit={isOwner}
                    aboutOverride={aboutText}
                    onSaveAbout={handleSaveAbout}
                  />
                </div>
                <div className="pro-mainRight">
                  {currentFeatured ? (
                    <ProFeatured
                      member={member}
                      game={currentFeatured}
                      onSelectGame={enableGamePopups ? handleSelect : undefined}
                    />
                  ) : null}
                </div>
              </div>
            </section>

            <ProProjects
              games={currentGames}
              featuredId={featuredGameId}
              onSelectGame={enableGamePopups ? handleSelect : undefined}
              onFeatureProject={isOwner && !featurePendingId ? handleFeatureProject : undefined}
              uploadTrigger={isOwner ? <SubmitProjectPanel onDone={() => setProjectsKey((k) => k + 1)} /> : undefined}
              key={projectsKey}
            />

            {dekhub ? <ProAcademic dekhub={dekhub} /> : null}

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
        </div>
      </main>

      {selectedGameId && (
        isDesktop ? (
          <ProjectPopupDesktop
            key={selectedGameId}
            gameId={selectedGameId}
            project={selectedProject ?? undefined}
            onClose={() => setSelectedGameId(null)}
          />
        ) : (
          <GameDetailsPopup
            key={selectedGameId}
            gameId={selectedGameId}
            project={selectedProject ?? undefined}
            onClose={() => setSelectedGameId(null)}
          />
        )
      )}
    </div>
  );
}
