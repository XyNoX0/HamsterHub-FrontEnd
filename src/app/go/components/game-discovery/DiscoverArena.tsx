"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Package, Trophy, UserRound, X, Flame, Flag, Layers, Lightbulb, CheckCircle2, Users, BarChart3, Award, HelpCircle, Smile, Frown, Meh, RotateCcw } from "lucide-react";
import {
  getArenaCols,
  getArenaSize,
  getMineCountForStage,
} from "./minesweeper/config";
import {
  createInitialState,
  hintReveal,
  numberColorClass,
  revealCell,
  toggleFlag,
  type ArenaCell,
  type ArenaGameState,
  type CellVisibility,
} from "./minesweeper/logic";
import { GameDetailsPopup } from "./GameDetailsPopup";
import { fetchProjects, type ArenaGame, type GoProject } from "../../lib/api/discovery";
import "./DiscoverArena.css";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    // Safari ≤13 / older WebKit — only the deprecated API is available.
    const legacy = mql as unknown as {
      addListener: (cb: () => void) => void;
      removeListener: (cb: () => void) => void;
    };
    legacy.addListener(update);
    return () => legacy.removeListener(update);
  }, []);
  return isDesktop;
}

function Star({ filled, delay }: { filled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#F5A623" : "#E2E8F0"}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </motion.div>
  );
}

function StatsRow({ icon, label, filled, tone }: { icon: React.ReactNode; label: string; filled: number; tone: "peach" | "sun" | "mint" | "sea" }) {
  const bgClass = `arena-bg-${tone}`;
  return (
    <div className="arena-statsRow">
      <div className="arena-statsRowLeft">
        <div className={`arena-statsRowIconBox ${bgClass}`}>
          {icon}
        </div>
        <span className="arena-statsRowLabel">{label}</span>
      </div>
      <div className="arena-statsRowRight">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < filled} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

function FeaturedTileImage({
  src,
  alt = "",
  sizes = "92px",
}: {
  src: string;
  alt?: string;
  sizes?: string;
}) {
  const [broken, setBroken] = useState(false);
  if (broken || !src) {
    return (
      <div className="arena-featuredImg" style={{ backgroundColor: 'color-mix(in srgb, var(--color-dang-soft) 20%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', fontSize: '2rem', color: 'color-mix(in srgb, var(--color-dang-ink) 30%, transparent)' }}>
        ?
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="arena-featuredImg"
      sizes={sizes}
      loading="lazy"
      unoptimized
      onError={() => setBroken(true)}
    />
  );
}

// Internal Project Details Component for Slide-out Panel
function SlideOutDetails({ game, onClose }: { game: ArenaGame; onClose: () => void }) {
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const getStreamUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
      if (idMatch) return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
    }
    return url;
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
      if (idMatch) return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
    }
    return null;
  };

  const streamUrl = getStreamUrl(game.videoUrl);
  const embedUrl = getEmbedUrl(game.videoUrl);

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className="arena-slideOutContainer"
    >
      <div className="arena-slideOutHeader">
        <div className="arena-slideOutBadge">
          <div className="arena-pulseDot" />
          <span className="arena-slideOutBadgeText">Project Selected</span>
        </div>
        <button
          onClick={onClose}
          className="arena-closeBtn"
        >
          <X className="arena-closeIcon" />
        </button>
      </div>

      <div className="arena-slideContent">
        <div className="arena-videoWrapper">
          {useIframeFallback && embedUrl ? (
            <iframe
              src={embedUrl}
              className="arena-videoPlayer"
              allow="autoplay"
              allowFullScreen
              title={game.title}
            />
          ) : (
            <video
              src={streamUrl}
              playsInline
              muted
              controls
              preload="metadata"
              poster={game.iconSrc}
              onError={() => {
                if (embedUrl) setUseIframeFallback(true);
              }}
              className="arena-videoPlayer"
            />
          )}
        </div>

        <div className="arena-detailsContent">
          <p className="arena-eventText">{game.event || "Independent"}</p>
          <h3 className="arena-gameTitle">{game.title}</h3>

          <div className="arena-descriptionBox">
            <p className="arena-descriptionText">{game.description}</p>
            <div className="arena-descriptionDeco">
              <span className="arena-descBadge" aria-hidden>
                <span className="arena-descBadgeInner">
                  <Award className="arena-descBadgeIcon" strokeWidth={2.4} />
                </span>
              </span>
            </div>
        </div>
      </div>

        {/* Stats + Dev Team in 2 columns — Team left, Stats right */}
        <div className="arena-statsGrid">
          {/* Left: Dev Team */}
          <div>
            <div className="arena-statsHeader">
              <Users className="arena-statsHeaderIcon" strokeWidth={2.2} />
              <div className="arena-teamHeaderCol">
                <span className="arena-teamHeaderSubtitle">Team</span>
                <h4 className="arena-teamHeaderTitle">{game.author || "Team"}</h4>
              </div>
            </div>
            <div className="arena-teamList">
              {game.teamMembers?.map((m: any, i: number) => (
                <div key={i} className="arena-teamMember">
                  <div className="arena-teamAvatar">
                    {m.profileSrc ? (
                      <img
                        src={m.profileSrc}
                        alt=""
                        className="arena-teamAvatarImg"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          const el = e.currentTarget;
                          if (el.dataset.fallbackApplied === "1") return;
                          el.dataset.fallbackApplied = "1";
                          el.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(m.name ?? "")}`;
                        }}
                      />
                    ) : <UserRound className="arena-teamAvatarFallback" />}
                  </div>
                  <div className="arena-teamInfo">
                    <span className="arena-teamName">
                      {m.name}
                    </span>
                    <span className="arena-teamRoles">
                      {Array.isArray(m.roles) ? m.roles.join(' • ') : "Developer"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div>
            <div className="arena-statsHeader">
              <BarChart3 className="arena-statsHeaderIcon" strokeWidth={2.2} />
              <h4 className="arena-statsHeaderTitle">Stats</h4>
            </div>
            <div className="arena-statsBox">
              <StatsRow icon={<Layers className="arena-statsRowIcon" strokeWidth={2.2} />} label="Complexity" filled={game.stats.complexity} tone="peach" />
              <StatsRow icon={<Lightbulb className="arena-statsRowIcon" strokeWidth={2.2} />} label="Creativity" filled={game.stats.creativity} tone="sun" />
              <StatsRow icon={<CheckCircle2 className="arena-statsRowIcon" strokeWidth={2.2} />} label="Completeness" filled={game.stats.completeness} tone="mint" />
              <StatsRow icon={<Smile className="arena-statsRowIcon" strokeWidth={2.2} />} label="Fun" filled={game.stats.fun} tone="sea" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArenaTile({
  index,
  cell,
  visibility,
  gameEnded,
  arenaGames,
  isOpened,
  onReveal,
  onToggleFlag,
  onFeaturedGamePress,
}: {
  index: number;
  cell: ArenaCell;
  visibility: CellVisibility;
  gameEnded: boolean;
  arenaGames: ArenaGame[];
  isOpened: boolean;
  onReveal: (i: number) => void;
  onToggleFlag: (i: number) => void;
  onFeaturedGamePress?: (i: number) => void;
}) {
  const handlePointerUp = useCallback(() => {
    if (visibility === "flagged") {
      onToggleFlag(index);
      return;
    }
    if (visibility === "hidden") {
      onReveal(index);
      return;
    }
    if (
      visibility === "revealed" &&
      cell.isMine &&
      cell.gameId !== null &&
      onFeaturedGamePress
    ) {
      onFeaturedGamePress(index);
    }
  }, [cell.isMine, cell.gameId, index, onFeaturedGamePress, onReveal, onToggleFlag, visibility]);

  const renderFace = () => {
    if (cell.isMine) {
      if (isOpened && cell.gameId !== null) {
        const gameData = arenaGames[cell.gameId];
        if (gameData) {
          return (
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="arena-featuredTileBox"
            >
              <FeaturedTileImage src={gameData.iconSrc} alt={gameData.title} />
            </motion.div>
          );
        }
      }
      return <Package className="arena-mineIcon" />;
    }

    if (cell.adjacent === 0) return null;
    return (
      <span className={`arena-numberText ${numberColorClass(cell.adjacent)}`}>
        {cell.adjacent}
      </span>
    );
  };

  const isRevealed = visibility === "revealed";
  const isClosedPackage =
    isRevealed && cell.isMine && !isOpened && cell.gameId !== null;

  return (
    <motion.button
      type="button"
      disabled={gameEnded && visibility === "hidden"}
      onClick={handlePointerUp}
      onContextMenu={(e) => { e.preventDefault(); onToggleFlag(index); }}
      whileHover={
        !isRevealed
          ? { scale: 1.02 }
          : isClosedPackage
            ? { scale: 1.06 }
            : undefined
      }
      whileTap={
        isClosedPackage
          ? { scale: 0.92 }
          : isRevealed
            ? { scale: 0.98 }
            : { scale: 0.95 }
      }
      className={`arena-arenaTile ${isRevealed ? "arena-arenaTileRevealed" : "arena-arenaTileHidden"}${isClosedPackage ? " arena-arenaTilePackage" : ""}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {visibility === "hidden" ? (
          <motion.span
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="arena-tileContentHidden"
            aria-hidden
          />
        ) : visibility === "flagged" ? (
          <motion.span
            key="flag"
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            className="arena-tileContentFlag"
          >
            <Flag className="arena-flagIcon" fill="currentColor" strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="shown"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="arena-tileContentShown"
          >
            {renderFace()}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function DiscoverArena() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [stage, setStage] = useState(1);
  const [streak, setStreak] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [arenaGames, setArenaGames] = useState<ArenaGame[]>([]);
  const [goProjects, setGoProjects] = useState<GoProject[]>([]);
  const [boardId, setBoardId] = useState(0);
  const [game, setGame] = useState<ArenaGameState>(() => createInitialState(getMineCountForStage(stage), getArenaSize(), getArenaCols(), 0));
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [showPopupOnMobile, setShowPopupOnMobile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lostOverlayDismissed, setLostOverlayDismissed] = useState(false);
  const [openedMines, setOpenedMines] = useState<Set<number>>(() => new Set());

  const isPlaying = game.status === "playing";
  const anyRevealed = game.visibility.some(v => v !== "hidden");
  const timerRunning = isPlaying && anyRevealed && !showHelp;

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setElapsed(n => Math.min(999, n + 1)), 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const rawProjects = await fetchProjects();
        if (cancelled) return;
        setGoProjects(rawProjects);
        const games = rawProjects.map(p => ({
          id: p.id,
          title: p.title,
          author: p.teamName,
          description: p.description,
          iconSrc: p.iconUrl || p.posterUrl,
          posterSrc: p.posterUrl,
          genre: "Project",
          stats: p.stats,
          teamMembers: p.teamMembers.map(m => ({ name: m.name || m.nickname, profileSrc: m.avatarUrl, roles: [m.role] })),
          videoUrl: p.videoUrl,
          event: p.eventName || undefined,
          achievements: p.achievements,
        }));
        setArenaGames(games);
        setGame(createInitialState(getMineCountForStage(stage), getArenaSize(), getArenaCols(), games.length));
        setBoardId(n => n + 1);
        setElapsed(0);
        setLostOverlayDismissed(false);
        setOpenedMines(new Set());
      } catch (err) {
        if (cancelled) return;
        console.error("[DiscoverArena] getArenaGames failed:", err);
        setArenaGames([]);
      } finally {
        if (!cancelled) setIsMounted(true);
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  const newBoard = useCallback(() => {
    setGame(createInitialState(getMineCountForStage(stage), getArenaSize(), getArenaCols(), arenaGames.length));
    setBoardId(n => n + 1);
    setElapsed(0);
    setLostOverlayDismissed(false);
    setOpenedMines(new Set());
  }, [stage, arenaGames.length]);

  const onStatusChange = useCallback((prev: ArenaGameState, next: ArenaGameState) => {
    if (prev.status !== "playing" || prev.status === next.status) return;
    if (next.status === "won") {
      setStreak(s => s + 1);
    } else if (next.status === "lost") {
      setStreak(0);
    }
  }, []);

  const onReveal = useCallback((i: number) => {
    setGame(g => {
      if (g.visibility[i] === "revealed") return g;
      const next = revealCell(g, i);
      if (next.status === "lost") {
        const minedCell = next.cells[i];
        if (minedCell.gameId !== null) {
          const gameData = arenaGames[minedCell.gameId];
          if (gameData) {
            setOpenedMines(prev => {
              if (prev.has(i)) return prev;
              const copy = new Set(prev);
              copy.add(i);
              return copy;
            });
            setSelectedGameId(gameData.id);
            if (!isDesktop) setShowPopupOnMobile(true);
          }
        }
      }
      onStatusChange(g, next);
      return next;
    });
  }, [onStatusChange, arenaGames, isDesktop]);

  const onToggleFlag = useCallback((i: number) => {
    setGame(g => toggleFlag(g, i));
  }, []);

  const onFeaturedGamePress = useCallback((i: number) => {
    const id = game.cells[i].gameId;
    if (id === null) return;
    if (!openedMines.has(i)) {
      setOpenedMines(prev => {
        const copy = new Set(prev);
        copy.add(i);
        return copy;
      });
      return;
    }
    const g = arenaGames[id];
    if (g) {
      setSelectedGameId(g.id);
      if (!isDesktop) setShowPopupOnMobile(true);
    }
  }, [game.cells, arenaGames, isDesktop, openedMines]);

  if (!isMounted) return null;

  const selectedGame = arenaGames.find(g => g.id === selectedGameId);
  const revealedSafe = game.visibility.filter((v, i) => v === "revealed" && !game.cells[i].isMine).length;
  const totalSafe = getArenaSize() - game.mineCount;
  const pct = totalSafe > 0 ? Math.min(100, Math.round((100 * revealedSafe) / totalSafe)) : 0;
  const flagsPlaced = game.visibility.filter(v => v === "flagged").length;
  const minesRemaining = Math.max(0, game.mineCount - flagsPlaced);

  const isPanelOpen = !!selectedGameId;

  return (
    <section className="page-zone page-zone--sea-medium arena-section">
      <div className="arena-gridPattern" aria-hidden />
      <div className="arena-maxWidth">
        <div className="arena-grid">
          {/* Left Column: Arena - Fixed Sizing to prevent stretching */}
          <div className="arena-col6">
            <div className="arena-headerWrapper">
              <div className="arena-headerTitles">
                <span className="arena-phaseLabel deco-uppercase-tracked">
                  Phase {stage} · ระเบิด {game.mineCount} ลูก
                </span>
                <h2 className="arena-arenaTitle">
                  The Strait of <span className="arena-titleAccent deco-underline-wave-dang">Hormuz</span>
                </h2>
                <p className="arena-arenaSubtitle deco-italic-accent">
                  หลบระเบิด ปักธง หาโปรเจคลับที่ซ่อนอยู่
                </p>
              </div>

              {/* Retro LCD scoreboard — Mines | Smiley reset | Timer */}
              <div className="arena-scoreboard">
                <div className="arena-lcdPanel" aria-label="Mines remaining">
                  <Package className="arena-lcdIcon" strokeWidth={2.2} />
                  <span className="arena-lcdDigits deco-tabular-nums">
                    {String(Math.min(999, minesRemaining)).padStart(3, "0")}
                  </span>
                </div>

                <div
                  className={`arena-smileyBtn ${game.status === "won" ? "arena-smileyBtnWon" : game.status === "lost" ? "arena-smileyBtnLost" : ""}`}
                  role="img"
                  aria-label={game.status === "won" ? "Phase cleared" : game.status === "lost" ? "Project found" : "Playing"}
                >
                  {game.status === "won" ? (
                    <Smile className="arena-smileyIcon" strokeWidth={2.2} />
                  ) : game.status === "lost" ? (
                    <Frown className="arena-smileyIcon" strokeWidth={2.2} />
                  ) : (
                    <Meh className="arena-smileyIcon" strokeWidth={2.2} />
                  )}
                </div>

                <div className="arena-lcdPanel" aria-label="Timer">
                  <span className="arena-lcdDigits deco-tabular-nums">
                    {String(elapsed).padStart(3, "0")}
                  </span>
                  <span className="arena-lcdUnit">s</span>
                </div>
              </div>

              <div className="arena-headerActions">
                {streak > 0 && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="arena-streakBadge"
                  >
                    <Flame className="arena-streakIcon" fill="currentColor" strokeWidth={1.8} />
                    <span className="arena-streakText deco-tabular-nums">{streak}</span>
                  </motion.div>
                )}
                <button
                  onClick={() => setShowHelp(true)}
                  className="arena-helpBtn"
                  type="button"
                  aria-label="How to play"
                >
                  <HelpCircle className="arena-helpIcon" />
                  <span className="arena-helpLabelInline">กติกา</span>
                </button>
              </div>

              {/* Level Progress Bar */}
              <div className="arena-progressWrapper">
                <div className="arena-progressTrack">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className="arena-progressFill"
                  />
                </div>
              </div>
            </div>

            <div className="arena-boardWrapper">
              <div 
                className="arena-boardGrid"
                style={{ 
                  gridTemplateColumns: `repeat(${getArenaCols()}, 1fr)`
                }}
              >
                {game.cells.map((cell, i) => (
                  <ArenaTile
                    key={`${boardId}-${i}`}
                    index={i}
                    cell={cell}
                    visibility={game.visibility[i]}
                    gameEnded={game.status !== "playing"}
                    arenaGames={arenaGames}
                    isOpened={openedMines.has(i)}
                    onReveal={onReveal}
                    onToggleFlag={onToggleFlag}
                    onFeaturedGamePress={onFeaturedGamePress}
                  />
                ))}
              </div>

              <AnimatePresence>
                {game.status === "won" && (
                  <motion.div
                    key="won"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="arena-statusBanner arena-statusBanner--won"
                    role="status"
                  >
                    <div className="arena-statusBannerIcon">
                      <Trophy className="arena-statusBannerIconSvg" />
                    </div>
                    <div className="arena-statusBannerCopy">
                      <h3 className="arena-statusBannerTitle">PHASE CLEARED!</h3>
                      <p className="arena-statusBannerSubtitle">เคลียร์ครบทุกช่อง — ลองด่านต่อไป</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextStage = stage + 1;
                        setStage(nextStage);
                        setGame(createInitialState(getMineCountForStage(nextStage), getArenaSize(), getArenaCols(), arenaGames.length));
                        setBoardId(n => n + 1);
                        setElapsed(0);
                        setLostOverlayDismissed(false);
                        setOpenedMines(new Set());
                      }}
                      className="arena-statusBannerCta"
                    >
                      Next Phase →
                    </button>
                  </motion.div>
                )}
                {game.status === "lost" && !lostOverlayDismissed && (
                  <motion.div
                    key="lost"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="arena-statusBanner arena-statusBanner--lost"
                    role="status"
                  >
                    <div className="arena-statusBannerIcon">
                      <Package className="arena-statusBannerIconSvg" />
                    </div>
                    <div className="arena-statusBannerCopy">
                      <h3 className="arena-statusBannerTitle">PROJECT FOUND!</h3>
                      <p className="arena-statusBannerSubtitle">
                        You uncovered a hidden game — open it or Try Again.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLostOverlayDismissed(true)}
                      className="arena-statusBannerClose"
                      aria-label="Dismiss"
                    >
                      <X className="arena-statusBannerCloseIcon" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="arena-actionBar">
              <button
                onClick={() => setGame(g => hintReveal(g))}
                className="arena-hintBtn"
                disabled={game.hintsRemaining <= 0 || game.status !== "playing"}
                type="button"
              >
                <Sparkles className="arena-sparklesIcon" /> Hint · {game.hintsRemaining}
              </button>
              {game.status === "lost" && (
                <button
                  type="button"
                  onClick={newBoard}
                  className="arena-tryAgainBtn arena-tryAgainBtnPulse"
                  aria-label="Try again — reset the board"
                >
                  <RotateCcw className="arena-tryAgainIcon" />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Discovery Terminal (Fixed Sidebar) - Desktop only */}
          <div className="arena-rightCol">
            <AnimatePresence mode="wait">
              {isDesktop && isPanelOpen && selectedGame ? (
                <SlideOutDetails
                  key="details-panel"
                  game={selectedGame}
                  onClose={() => setSelectedGameId(null)}
                />
              ) : (
                <motion.div
                  key="placeholder-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="arena-placeholderPanel"
                >
                  <div className="arena-placeholderIconBox">
                    <img src="/godang/brand-logo.png" alt="" className="arena-placeholderImg" />
                  </div>
                  <h3 className="arena-placeholderTitle">Project Details</h3>
                  <p className="arena-placeholderDesc">
                    Select a game to see more.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile-only Popup */}
      <AnimatePresence>
        {!isDesktop && showPopupOnMobile && selectedGameId && (
          <GameDetailsPopup
            key={selectedGameId}
            gameId={selectedGameId}
            games={goProjects}
            reduceMotion={reduceMotion}
            onClose={() => setShowPopupOnMobile(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="arena-helpOverlay"
            role="dialog"
            aria-modal="true"
            aria-label="How to play"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="arena-helpBackdrop" onClick={() => setShowHelp(false)} />
            <motion.div
              className="arena-helpCard"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="arena-helpHeader">
                <span className="arena-helpLabel deco-uppercase-tracked">How to play</span>
                <button
                  type="button"
                  className="arena-helpCloseBtn"
                  onClick={() => setShowHelp(false)}
                  aria-label="Close"
                >
                  <X className="arena-helpCloseIcon" />
                </button>
              </div>
              <h3 className="arena-helpTitle">
                กติกา <span className="deco-highlight-sun">ง่ายๆ</span>
              </h3>
              <ul className="arena-helpList">
                <li><strong>แตะ</strong> ช่องว่าง เพื่อเปิด</li>
                <li><strong>กดค้าง / คลิกขวา</strong> เพื่อปักธงระเบิด</li>
                <li>ตัวเลข = จำนวนระเบิดรอบๆ ช่องนั้น</li>
                <li>เจอ <span className="arena-helpHighlight">ไอคอนโปรเจค</span> ให้แตะอีกครั้งเพื่อดูรายละเอียด</li>
                <li>อย่ากดโดนระเบิด</li>
              </ul>
              <button
                type="button"
                className="arena-helpCTA"
                onClick={() => setShowHelp(false)}
              >
                เข้าใจแล้ว ไปต่อ →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
