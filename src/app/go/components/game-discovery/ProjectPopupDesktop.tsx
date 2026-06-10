"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  Play,
  RotateCcw,
  Trophy,
  Sparkles,
  Users,
  Layers,
  Lightbulb,
  CheckCircle2,
  Smile,
  Award,
  MapPin,
} from "lucide-react";
import type { GoProject } from "../../lib/api/discovery";
import type { MemberGameAppearance } from "../../lib/members";
import { PopupCloseButton } from "./PopupCloseButton";
import "./ProjectPopupDesktop.css";

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

function getStreamUrl(url: string) {
  if (url.includes("drive.google.com")) {
    const fileId = getDriveFileId(url);
    if (fileId) return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

function getEmbedUrl(url: string) {
  if (url.includes("drive.google.com")) {
    const fileId = getDriveFileId(url);
    if (fileId) return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return null;
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

function StatsRow({
  icon,
  label,
  filled,
  toneClass,
}: {
  icon: React.ReactNode;
  label: string;
  filled: number;
  toneClass: string;
}) {
  return (
    <div className="ppd-statsRow">
      <div className="ppd-statsRowLeft">
        <div className={`ppd-statsRowIconBox ${toneClass}`}>{icon}</div>
        <span className="ppd-statsRowLabel">{label}</span>
      </div>
      <div className="ppd-statsRowRight">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={i < filled ? "#F5A623" : "#E2E8F0"}
            aria-hidden
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

interface ProjectPopupDesktopProps {
  gameId: string;
  games?: GoProject[];
  project?: MemberGameAppearance;
  onClose: () => void;
}

export function ProjectPopupDesktop({ gameId, games = [], project, onClose }: ProjectPopupDesktopProps) {
  const reduceMotion = useReducedMotion();
  const goProject = games.find((g) => g.id === gameId) || games[0];
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
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [playback, setPlayback] = useState<PlaybackState>(reduceMotion ? "revealed" : "ready");
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isCheckingVideo, setIsCheckingVideo] = useState(false);
  const [isVideoProcessing, setIsVideoProcessing] = useState(false);

  const streamUrl = getStreamUrl(detail?.videoUrl || "");
  const embedUrl = getEmbedUrl(detail?.videoUrl || "");
  const driveFileId = getDriveFileId(detail?.videoUrl || "");
  const previewSrc = detail?.posterSrc || detail?.iconSrc || "";
  const previewFit = detail?.posterSrc ? "cover" : "contain";
  const hasAchievements = Boolean(detail?.achievements && detail.achievements.length > 0);
  const titleId = `ppd-title-${gameId}`;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const cardMotion = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.18 } }
    : {
        initial: { opacity: 0, scale: 0.94 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96, transition: { duration: 0.14 } },
        transition: { type: "spring" as const, stiffness: 300, damping: 28 },
      };

  if (!detail) return null;

  return (
    <div
      className="ppd-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.button
        type="button"
        aria-label="Close popup"
        className="ppd-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.14 } }}
        transition={{ duration: 0.2 }}
      />

      <motion.div className="ppd-card" {...cardMotion}>
        {/* ── Left: Media ─────────────────────────────────── */}
        <div className="ppd-media">
          <AnimatePresence mode="wait">
            {playback !== "revealed" ? (
              <motion.div
                key="media-pre"
                className="ppd-mediaLayer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {playback === "playing" ? (
                  <div className="ppd-videoBox">
                    {isVideoProcessing || isCheckingVideo ? (
                      <div className="ppd-processing">
                        <div className="ppd-processingSpinner" aria-hidden />
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
                        className="ppd-videoEl"
                        allow="autoplay"
                        allowFullScreen
                        title={detail.title}
                      />
                    ) : (
                      <video
                        autoPlay
                        playsInline
                        controls
                        onEnded={() => setPlayback("revealed")}
                        onError={() => {
                          if (embedUrl) setUseIframeFallback(true);
                        }}
                        className="ppd-videoEl"
                      >
                        <source src={streamUrl} type="video/mp4" />
                      </video>
                    )}
                    <button
                      type="button"
                      className="ppd-skipBtn"
                      onClick={() => setPlayback("revealed")}
                    >
                      Skip to Info
                    </button>
                  </div>
                ) : (
                  <>
                    {imgError || !previewSrc ? (
                      <div className="ppd-posterFallback">?</div>
                    ) : (
                      <Image
                        src={previewSrc}
                        alt={detail.title}
                        fill
                        className="ppd-posterImg"
                        style={{ objectFit: previewFit }}
                        onError={() => setImgError(true)}
                        unoptimized
                        sizes="(min-width: 1024px) 650px, 100vw"
                      />
                    )}
                    <div className="ppd-posterScrim" aria-hidden />
                    <button
                      type="button"
                      className="ppd-playBtn"
                      onClick={async () => {
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
                      }}
                      aria-label="Play project video"
                    >
                      <Play className="ppd-playIcon" fill="currentColor" />
                    </button>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="media-revealed"
                className="ppd-mediaLayer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {imgError || !previewSrc ? (
                  <div className="ppd-posterFallback">?</div>
                ) : (
                  <Image
                    src={previewSrc}
                    alt={detail.title}
                    fill
                    className="ppd-posterImg"
                    style={{ objectFit: previewFit }}
                    onError={() => setImgError(true)}
                    unoptimized
                    sizes="(min-width: 1024px) 650px, 100vw"
                  />
                )}
                <div className="ppd-posterScrim" aria-hidden />
                <button
                  type="button"
                  className="ppd-replayBtn"
                  onClick={async () => {
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
                  }}
                  aria-label="Replay video"
                >
                  <RotateCcw className="ppd-replayIcon" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic title overlay (always visible, above scrim) */}
          <div className="ppd-mediaOverlay">
            {detail.event && (
              <span className="ppd-eventEyebrow">{detail.event}</span>
            )}
            {hasAchievements && (
              <div className="ppd-achievementBadge">
                <Trophy className="ppd-achievementIcon" strokeWidth={2.2} />
                <span>{detail.achievements[0]}</span>
              </div>
            )}
            <h2 id={titleId} className="ppd-titleText">
              {detail.title}
              <Sparkles className="ppd-sparkleIcon" fill="currentColor" strokeWidth={1.5} />
            </h2>
            <div className="ppd-metaRow">
              <span className="ppd-teamName">{detail.teamName}</span>
            </div>
          </div>
        </div>

        {/* ── Right: Content ─────────────────────────────── */}
        <div className="ppd-content">
          <div className="ppd-contentScroll">
            <div className="ppd-descBox">
              <p className="ppd-descText">{detail.description}</p>
              <div className="ppd-descDeco">
                <span className="ppd-descBadge" aria-hidden>
                  <span className="ppd-descBadgeInner">
                    <Award className="ppd-descBadgeIcon" strokeWidth={2.4} />
                  </span>
                </span>
              </div>
            </div>

            <section className="ppd-section">
              <h3 className="ppd-sectionTitle">Project Stats</h3>
              <div className="ppd-statsList">
                <StatsRow
                  icon={<Layers className="ppd-statsRowIcon" strokeWidth={2.2} />}
                  label="Complexity"
                  filled={detail.stats.complexity}
                  toneClass="ppd-tone-peach"
                />
                <StatsRow
                  icon={<Lightbulb className="ppd-statsRowIcon" strokeWidth={2.2} />}
                  label="Creativity"
                  filled={detail.stats.creativity}
                  toneClass="ppd-tone-sun"
                />
                <StatsRow
                  icon={<CheckCircle2 className="ppd-statsRowIcon" strokeWidth={2.2} />}
                  label="Completeness"
                  filled={detail.stats.completeness}
                  toneClass="ppd-tone-mint"
                />
                <StatsRow
                  icon={<Smile className="ppd-statsRowIcon" strokeWidth={2.2} />}
                  label="Fun"
                  filled={detail.stats.fun}
                  toneClass="ppd-tone-sea"
                />
              </div>
            </section>

            <section className="ppd-section">
              <div className="ppd-teamHeader">
                <Users className="ppd-teamHeaderIcon" strokeWidth={2.2} />
                <h3 className="ppd-sectionTitle">Team</h3>
              </div>
              <ul className="ppd-teamList">
                {detail.teamMembers.map((member, i) => (
                  <li key={i} className="ppd-teamItem">
                    <img
                      src={
                        member.profileSrc ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`
                      }
                      alt=""
                      className="ppd-teamAvatar"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (el.dataset.fb === "1") return;
                        el.dataset.fb = "1";
                        el.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`;
                      }}
                    />
                    <div className="ppd-teamItemText">
                      <div className="ppd-teamMemberName">{member.name}</div>
                      <div className="ppd-teamMemberRoles">
                        {member.roles?.join(" • ") || "Developer"}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <PopupCloseButton ref={closeBtnRef} onClose={onClose} tone="onDark" />
      </motion.div>
    </div>
  );
}
