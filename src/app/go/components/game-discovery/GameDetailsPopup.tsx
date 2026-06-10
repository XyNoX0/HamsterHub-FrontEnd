"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, RotateCcw, Trophy, Sparkles, Layers, Lightbulb, CheckCircle2, Smile, Users, Award } from "lucide-react";
import type { GoProject } from "../../lib/api/discovery";
import type { MemberGameAppearance } from "../../lib/members";
import { PopupCloseButton } from "./PopupCloseButton";
import "./GameDetailsPopup.css";

type PlaybackState = "ready" | "playing" | "revealed";

function getApiMediaBase() {
  return (
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    "https://api.hamsterquest.com/api/nuutor/api"
  ).replace(/\/+$/, "").replace(/\/api$/, "");
}

function getDriveFileId(url: string) {
  if (!url.includes("drive.google.com")) return "";
  const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
  return idMatch?.[1] || "";
}

async function isDriveVideoProcessing(fileId: string) {
  if (!fileId) return false;
  try {
    const response = await fetch(`${getApiMediaBase()}/drive-video-status/${encodeURIComponent(fileId)}`, {
      cache: "no-store",
    });
    const payload = await response.json().catch(() => null);
    return Boolean(response.ok && payload?.success && payload.processing);
  } catch {
    return false;
  }
}

function Star({ filled, delay }: { filled: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#F5A623" : "#E2E8F0"}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    </motion.div>
  );
}

function StatsRow({ icon, label, filled, tone }: { icon: React.ReactNode; label: string; filled: number; tone: "peach" | "sun" | "mint" | "sea" }) {
  const bgClass = `popup-bg-${tone}`;
  return (
    <div className="popup-statsRow">
      <div className="popup-statsRowLeft">
        <div className={`popup-statsRowIconBox ${bgClass}`}>
          {icon}
        </div>
        <span className="popup-statsRowLabel">{label}</span>
      </div>
      <div className="popup-statsRowRight">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < filled} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}

interface GameDetailsPopupProps {
  gameId: string;
  games?: GoProject[];
  onClose: () => void;
  project?: MemberGameAppearance;
  reduceMotion?: boolean | null;
}

export function GameDetailsPopup({
  gameId,
  games = [],
  onClose,
  project,
  reduceMotion,
}: GameDetailsPopupProps) {
  const goProject = games.find(g => g.id === gameId) || games[0];
  const fallbackDetail = project ? {
    id: project.id,
    title: project.title,
    description: project.description || "",
    videoUrl: project.videoUrl || "",
    posterSrc: project.posterSrc || "",
    iconSrc: project.iconSrc || "",
    event: project.event,
    teamName: project.teamName,
    stats: project.stats || { complexity: 0, creativity: 0, completeness: 0, fun: 0 },
    achievements: project.achievements || [],
    teamMembers: project.teamMembers || [],
  } : null;
  const staticDetail = goProject ? {
    ...goProject,
    videoUrl: goProject.videoUrl || "",
    posterSrc: goProject.posterUrl,
    iconSrc: goProject.iconUrl || goProject.posterUrl,
    event: goProject.eventName || undefined,
    teamMembers: goProject.teamMembers.map(m => ({
      name: m.name || m.nickname,
      profileSrc: m.avatarUrl,
      roles: [m.role],
    })),
  } : fallbackDetail;
  const detail = project?.videoUrl ? {
    ...staticDetail,
    id: project.id,
    title: project.title,
    event: project.event,
    teamName: project.teamName,
    description: project.description || staticDetail?.description || "",
    videoUrl: project.videoUrl,
    posterSrc: project.posterSrc || "",
    iconSrc: project.iconSrc || "",
    stats: project.stats || { complexity: 0, creativity: 0, completeness: 0, fun: 0 },
    achievements: project.achievements || [],
    teamMembers: project.teamMembers?.length ? project.teamMembers : staticDetail?.teamMembers || [],
  } : staticDetail;

  // Start at "revealed" when user prefers reduced motion so we don't auto-fetch
  // a video they're not expecting. Otherwise show the Play overlay first so the
  // user opts-in before any network / decode work happens.
  const [playback, setPlayback] = useState<PlaybackState>(reduceMotion ? "revealed" : "ready");
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isCheckingVideo, setIsCheckingVideo] = useState(false);
  const [isVideoProcessing, setIsVideoProcessing] = useState(false);

  const getStreamUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = getDriveFileId(url);
      if (fileId) return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return url;
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const fileId = getDriveFileId(url);
      if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return null;
  };

  const streamUrl = getStreamUrl(detail?.videoUrl || "");
  const embedUrl = getEmbedUrl(detail?.videoUrl || "");
  const driveFileId = getDriveFileId(detail?.videoUrl || "");
  const previewSrc = detail?.posterSrc || detail?.iconSrc || "";
  const previewFit = detail?.posterSrc ? "cover" : "contain";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleVideoEnd = () => {
    setPlayback("revealed");
  };

  const handlePlay = async () => {
    // Drive videos are more reliable in the preview player while Google is
    // still preparing streaming metadata for newly uploaded files.
    if (driveFileId) {
      setIsCheckingVideo(true);
      const processing = await isDriveVideoProcessing(driveFileId);
      setIsCheckingVideo(false);
      if (processing) {
        setIsVideoProcessing(true);
        setPlayback("playing");
        return;
      }
    }
    setIsVideoProcessing(false);
    if (embedUrl) setUseIframeFallback(true);
    setPlayback("playing");
  };

  const handleReplay = async () => {
    if (driveFileId) {
      setIsCheckingVideo(true);
      const processing = await isDriveVideoProcessing(driveFileId);
      setIsCheckingVideo(false);
      if (processing) {
        setIsVideoProcessing(true);
        setPlayback("playing");
        return;
      }
    }
    setIsVideoProcessing(false);
    setUseIframeFallback(Boolean(embedUrl));
    setPlayback("playing");
  };

  if (!detail) return null;

  const hasAchievements = detail.achievements && detail.achievements.length > 0;

  return (
    <div className="popup-overlay">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="popup-backdrop"
      />

      <motion.div
        layoutId={`game-card-${gameId}`}
        className="popup-cardContainer"
      >
        {/* Header - Mobile Only */}
        <div className="popup-headerMobile">
          <h2 className="popup-titleTextMobile">
            {detail.title} <Sparkles className="popup-sparkleIcon" fill="currentColor" strokeWidth={1.5} />
          </h2>
          {hasAchievements && (
            <div className="popup-achievementBadgeMobile">
               <Trophy className="popup-achievementIconMobile" />
               <span className="popup-achievementTextMobile">{detail.achievements[0]}</span>
            </div>
          )}
        </div>

        {/* Media Column */}
        <div className="popup-mediaCol">
          <div className="popup-mediaWrapper">
            <AnimatePresence mode="wait">
              {playback !== "revealed" ? (
                <motion.div 
                  key="video-layer" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="popup-layerAbsolute"
                >
                  {playback === "playing" ? (
                    <div className="popup-layerBgBlack">
                      {isVideoProcessing || isCheckingVideo ? (
                        <div className="popup-processing">
                          <div className="popup-processingSpinner" aria-hidden />
                          <h3>ระบบหลังบ้านกำลังประมวลผลวีดีโอ</h3>
                          <p>กรุณารอซักครู่..</p>
                          <button
                            type="button"
                            onClick={async () => {
                              setIsCheckingVideo(true);
                              const processing = await isDriveVideoProcessing(driveFileId);
                              setIsCheckingVideo(false);
                              setIsVideoProcessing(processing);
                              if (!processing) {
                                setUseIframeFallback(Boolean(embedUrl));
                              }
                            }}
                          >
                            ลองอีกครั้ง
                          </button>
                        </div>
                      ) : useIframeFallback && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          className="popup-videoPlayer"
                          allow="autoplay"
                          allowFullScreen
                          title={detail.title}
                        />
                      ) : (
                        <video
                          autoPlay
                          playsInline
                          controls
                          onEnded={handleVideoEnd}
                          onError={() => {
                            if (embedUrl) setUseIframeFallback(true);
                          }}
                          className="popup-videoPlayer"
                        >
                          <source src={streamUrl} type="video/mp4" />
                        </video>
                      )}
                      <button
                        onClick={handleVideoEnd}
                        className="popup-skipBtn"
                      >
                        Skip to Info
                      </button>
                    </div>
                  ) : (
                    <>
                      {imgError || !previewSrc ? (
                        <div className="popup-imageObjectCover popup-imageOpacity" style={{ position: 'absolute', inset: 0, backgroundColor: 'color-mix(in srgb, var(--color-dang-soft) 20%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', color: 'color-mix(in srgb, var(--color-dang-ink) 30%, transparent)' }}>
                          ?
                        </div>
                      ) : (
                        <Image
                          src={previewSrc}
                          alt={detail.title}
                          fill
                          className="popup-imageObjectCover popup-imageOpacity"
                          style={{ objectFit: previewFit }}
                          onError={() => setImgError(true)}
                          unoptimized
                        />
                      )}
                      <button
                        onClick={handlePlay}
                        className="popup-playBtn"
                      >
                        <Play className="popup-playIcon" />
                      </button>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="info-layer" 
                  initial={{ opacity: 0, scale: 1.1 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="popup-layerAbsolute"
                >
                  {imgError || !previewSrc ? (
                    <div className="popup-imageObjectCover" style={{ position: 'absolute', inset: 0, backgroundColor: 'color-mix(in srgb, var(--color-dang-soft) 20%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', color: 'color-mix(in srgb, var(--color-dang-ink) 30%, transparent)' }}>
                      ?
                    </div>
                  ) : (
                    <Image
                      src={previewSrc}
                      alt={detail.title}
                      fill
                      className="popup-imageObjectCover"
                      style={{ objectFit: previewFit }}
                      onError={() => setImgError(true)}
                      unoptimized
                    />
                  )}
                  <div className="popup-gradientOverlay" />
                  <div className="popup-bottomContentArea" />
                  <button
                    onClick={handleReplay}
                    className="popup-replayBtn"
                  >
                    <RotateCcw className="popup-replayIcon" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Column */}
        <div className="popup-contentCol">
          <div className="popup-headerDesktop">
            <h2 className="popup-titleTextDesktop">
              {detail.title} <Sparkles className="popup-sparkleIcon" fill="currentColor" strokeWidth={1.5} />
            </h2>
            {hasAchievements && (
              <div className="popup-achievementBadgeDesktop">
                 <Trophy className="popup-achievementIconDesktop" />
                 <span className="popup-achievementTextDesktop">{detail.achievements[0]}</span>
              </div>
            )}
          </div>

          <div className="popup-contentFlex1 popup-spaceY10">
            <div className="popup-descriptionBox">
              <p className="popup-descriptionText">{detail.description}</p>
              <div className="popup-descriptionDeco">
                <span className="popup-descBadge" aria-hidden>
                  <span className="popup-descBadgeInner">
                    <Award className="popup-descBadgeIcon" strokeWidth={2.4} />
                  </span>
                </span>
              </div>
            </div>

            <div className="popup-splitGrid">
              <div className="popup-statsSection">
                <div className="popup-statsHeader">
                  <h3 className="popup-statsTitle">Project Stats</h3>
                  <div className="popup-statsLine" />
                </div>
                <div className="popup-spaceY1">
                  <StatsRow icon={<Layers className="popup-statsRowIcon" strokeWidth={2.2} />} label="Complexity" filled={detail.stats.complexity} tone="peach" />
                  <StatsRow icon={<Lightbulb className="popup-statsRowIcon" strokeWidth={2.2} />} label="Creativity" filled={detail.stats.creativity} tone="sun" />
                  <StatsRow icon={<CheckCircle2 className="popup-statsRowIcon" strokeWidth={2.2} />} label="Completeness" filled={detail.stats.completeness} tone="mint" />
                  <StatsRow icon={<Smile className="popup-statsRowIcon" strokeWidth={2.2} />} label="Fun" filled={detail.stats.fun} tone="sea" />
                </div>
              </div>

              <div className="popup-teamSection">
                <div className="popup-teamHeader">
                  <div className="popup-teamHeaderIconBox">
                    <Users className="popup-teamHeaderIcon" strokeWidth={2.2} />
                  </div>
                  <div className="popup-teamHeaderCol">
                    <span className="popup-teamSubtitle">Creators</span>
                    <h4 className="popup-teamTitle">{detail.teamName}</h4>
                  </div>
                </div>

                <div className="popup-teamGrid">
                  {detail.teamMembers.map((member, i) => (
                    <div key={i} className="popup-teamMemberBox">
                      <div className="popup-teamAvatarWrapper">
                        <img
                          src={member.profileSrc || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`}
                          alt={member.name}
                          className="popup-teamAvatarImg"
                          onError={(e) => {
                            const el = e.currentTarget;
                            if (el.dataset.fallbackApplied === "1") return;
                            el.dataset.fallbackApplied = "1";
                            el.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`;
                          }}
                        />
                      </div>
                      <div className="popup-teamInfoBox">
                        <div className="popup-teamName">
                          {member.name}
                        </div>
                        <div className="popup-teamRoles">
                          {member.roles?.join(' • ') || "Developer"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="popup-mobileDivider" />
        </div>

        <PopupCloseButton onClose={onClose} tone="onLight" />
      </motion.div>
    </div>
  );
}
