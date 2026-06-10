import type { AggregateMember, MemberCertificateRecord, MemberGameAppearance, MemberReportRecord } from "./members";
import type { JourneyStage, MemberAchievement, MemberOverride } from "../data/members/overrides";
import { renderableImageSrc } from "./image-src";

type PublicIdentity = {
  discordId?: string;
  username?: string;
  realName?: string;
  nickname?: string;
  code?: string;
  school?: string;
  rank?: string;
  profileUrl?: string;
};

type PublicStats = {
  coursesCount?: number;
  evaluationsCount?: number;
  certificatesCount?: number;
  projectsCount?: number;
  invitedCount?: number;
  coins?: number | string;
  overallScore?: number | null;
};

type PublicEvaluation = {
  projectId?: string;
  projectDbId?: string;
  courseId?: string;
  eventName?: string;
  attendance?: string;
  spirit?: number | null;
  power?: number | null;
  creative?: number | null;
  empathy?: number | null;
  communicate?: number | null;
  complexity?: number | null;
  creativity?: number | null;
  completeness?: number | null;
  fun?: number | null;
  report?: string;
  achievement?: string;
  projectUrl?: string;
  reportChartUrl?: string;
  evaluatedAt?: string | null;
};

type PublicCertificate = {
  courseId?: string;
  eventName?: string;
  fileName?: string;
  fileUrl?: string;
  issuedAt?: string | null;
};

type PublicJourneyItem = {
  type?: "course" | "evaluation" | "certificate" | string;
  courseId?: string;
  eventName?: string;
  at?: string | null;
  data?: Record<string, unknown> & {
    id?: string;
    label?: string;
    sublabel?: string;
    tone?: "muted" | "color" | "glow";
  };
};

type PublicProject = {
  projectId?: string;
  projectDbId?: string;
  courseId?: string;
  eventName?: string;
  title?: string;
  description?: string;
  fileName?: string;
  fileUrl?: string;
  fileId?: string;
  mimeType?: string;
  thumbnailUrl?: string;
  posterUrl?: string;
  bannerUrl?: string;
  iconUrl?: string;
  featured?: boolean;
  teamName?: string;
  teamMembers?: Array<{
    discordId?: string;
    memberId?: string;
    name?: string;
    username?: string;
    profileSrc?: string;
    roles?: string[];
  }>;
  uploadedAt?: string | null;
  stats?: {
    complexity?: number | null;
    creativity?: number | null;
    completeness?: number | null;
    fun?: number | null;
  };
  report?: string;
  achievement?: string;
  reportChartUrl?: string;
};

export type PublicProfile = {
  identity?: PublicIdentity;
  stats?: PublicStats;
  about?: string;
  courses?: string[];
  evaluations?: PublicEvaluation[];
  certificates?: PublicCertificate[];
  projects?: PublicProject[];
  skills?: Array<{
    name?: string;
    level?: number | null;
  }>;
  achievements?: Array<{
    id?: string;
    label?: string;
    sublabel?: string;
    kind?: "top" | "team" | "fast" | "custom" | string;
    icon?: string;
    courseId?: string;
    eventName?: string;
    achievement?: string;
    at?: string | null;
  }>;
  journey?: PublicJourneyItem[];
  updatedAt?: string | null;
};

export type ProfileDirectoryResult = {
  members: AggregateMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const DEFAULT_API_BASE_URL = "https://api.hamsterquest.com/api/nuutor/api";

function apiBaseUrl() {
  return (
    process.env.NUUTOR_API_BASE_URL ||
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/+$/, "");
}

function mediaProxyBaseUrl() {
  return apiBaseUrl().replace(/\/api$/, "");
}

async function fetchJson<T>(path: string): Promise<T | null> {
  const url = `${apiBaseUrl()}${path}`;
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function numberOrZero(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function statToFive(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  if (n <= 5) return Math.max(0, Math.round(n));
  if (n <= 10) return Math.max(0, Math.min(5, Math.round(n / 2)));
  return Math.max(0, Math.min(5, Math.round(n / 20)));
}

function slugify(value: string): string {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "course";
}

function extractDriveFileId(url: string): string {
  if (!url) return "";
  return (
    url.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1] ||
    ""
  );
}

function driveImageProxyUrl(fileId: string): string {
  return fileId ? `${mediaProxyBaseUrl()}/drive-image/${encodeURIComponent(fileId)}` : "";
}

/** แปลง Google Drive URL ให้โหลดผ่าน backend proxy เพื่อกัน Google thumbnail redirect/rate-limit */
function transformGDriveImageUrl(url: string): string {
  if (!url) return url;
  if (url.includes("drive.google.com") || url.includes("lh3.googleusercontent.com")) {
    const fileId = extractDriveFileId(url);
    if (fileId) return driveImageProxyUrl(fileId);
  }
  return url;
}

/** แปลง Google Drive URL ทุก format ให้เป็น direct-download URL สำหรับ video */
function transformGDriveVideoUrl(url: string): string {
  if (!url) return url;
  if (url.includes("drive.google.com")) {
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) return `https://drive.google.com/uc?export=download&id=${idMatch[1]}`;
  }
  return url;
}

function courseLabel(courseId?: string, eventName?: string) {
  return text(eventName) || text(courseId) || "Hamster Hub Course";
}

function buildCourseGames(profile: PublicProfile, slug: string): MemberGameAppearance[] {
  return (profile.projects ?? [])
    .filter((project) => text(project.fileUrl))
    .map((project, index) => {
      const title = text(project.title) || text(project.fileName).replace(/\.[^.]+$/, "") || `Project ${index + 1}`;
      const stats = project.stats ?? {};
      const fileId = text(project.fileId);
      const projectId = text(project.projectId);
      const projectDbId = text(project.projectDbId);

      // ดึง image URL จาก field ที่ API return
      const rawImageUrl = text(project.bannerUrl) || text(project.posterUrl) || text(project.thumbnailUrl);
      const imageUrl = transformGDriveImageUrl(rawImageUrl);

      // Fallback: user ไม่ rename ไฟล์ → API อาจไม่ set image fields
      // ใช้ fileId ของ video แทน — Drive auto-generate thumbnail จาก frame แรกของวิดีโอ
      const videoFileId = fileId ||
        extractDriveFileId(text(project.fileUrl));
      const fallbackPoster = driveImageProxyUrl(videoFileId);

      return {
        id: `profile-${slug}-project-${projectDbId || projectId || fileId || slugify(title)}-${index}`,
        title,
        posterSrc: imageUrl || fallbackPoster,
        iconSrc: transformGDriveImageUrl(text(project.iconUrl)),
        event: courseLabel(project.courseId, project.eventName),
        teamName: text(project.teamName) || "Hamster Hub",
        role: "Project video",
        videoUrl: transformGDriveVideoUrl(text(project.fileUrl)),
        sourceProjectId: projectDbId || projectId || fileId,
        sourceFileId: fileId,
        featured: Boolean(project.featured),
        description: text(project.description) || text(project.report) || "Project video from the course Drive folder.",
        teamMembers: (project.teamMembers ?? [])
          .filter((member) => text(member.name))
          .map((member) => ({
            discordId: text(member.discordId),
            memberId: text(member.memberId),
            name: text(member.name),
            username: text(member.username) || text(member.name),
            profileSrc: renderableImageSrc(member.profileSrc),
            roles: Array.isArray(member.roles) ? member.roles.map(text).filter(Boolean) : [],
          })),
        stats: {
          complexity: statToFive(stats.complexity),
          creativity: statToFive(stats.creativity),
          completeness: statToFive(stats.completeness),
          fun: statToFive(stats.fun),
        },
        achievements: text(project.achievement) ? [text(project.achievement)] : [],
      };
    });
}

function buildAchievements(profile: PublicProfile): MemberAchievement[] {
  return (profile.achievements ?? [])
    .filter((item) => text(item.label) || text(item.achievement))
    .map((item, index) => ({
      id: text(item.id) || `${text(item.courseId) || text(item.eventName) || "achievement"}-${index}`,
      label: text(item.label) || text(item.achievement),
      sublabel: text(item.sublabel) || courseLabel(item.courseId, item.eventName),
      kind: (["top", "team", "fast", "custom"].includes(text(item.kind)) ? text(item.kind) : "custom") as MemberAchievement["kind"],
      icon: text(item.icon),
    }));
}

function buildJourney(profile: PublicProfile): JourneyStage[] {
  const timeline = (profile.journey ?? [])
    .filter((item) => {
      const type = text(item.type);
      return ["course_checkin", "project_published", "certificate_received"].includes(type) || Boolean(text(item.data?.label));
    });

  return timeline.map((item, index) => {
    const manualLabel = text(item.data?.label);
    if (manualLabel) {
      return {
        id: text(item.data?.id) || `journey-${index}`,
        label: manualLabel,
        sublabel: text(item.data?.sublabel) || undefined,
        tone: item.data?.tone || (index === 0 ? "color" : index === timeline.length - 1 ? "glow" : "muted"),
      };
    }

    const label =
      item.type === "course_checkin"
        ? `Check-in: ${courseLabel(item.courseId, item.eventName)}`
        : item.type === "project_published"
          ? `Project uploaded: ${courseLabel(item.courseId, item.eventName)}`
          : `Certificate: ${courseLabel(item.courseId, item.eventName)}`;
    const at = text(item.at);
    const date = at ? new Date(at) : null;
    const sublabel = date && Number.isFinite(date.getTime())
      ? new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(date)
      : undefined;
    return {
      id: `${item.type || "journey"}-${index}`,
      label,
      sublabel,
      tone: index === 0 ? "color" : index === timeline.length - 1 ? "glow" : "muted",
    };
  });
}

function buildReports(profile: PublicProfile): MemberReportRecord[] {
  return (profile.evaluations ?? [])
    .filter((evaluation) =>
      text(evaluation.report) ||
      text(evaluation.projectUrl) ||
      evaluation.spirit != null ||
      evaluation.power != null ||
      evaluation.creative != null ||
      evaluation.empathy != null ||
      evaluation.communicate != null ||
      evaluation.complexity != null ||
      evaluation.creativity != null ||
      evaluation.completeness != null ||
      evaluation.fun != null
    )
    .map((evaluation, index) => ({
      id: `${text(evaluation.projectDbId) || text(evaluation.projectId) || text(evaluation.courseId) || "report"}-${index}`,
      courseId: text(evaluation.courseId),
      eventName: courseLabel(evaluation.courseId, evaluation.eventName),
      report: text(evaluation.report),
      projectUrl: text(evaluation.projectUrl),
      reportChartUrl: text(evaluation.reportChartUrl),
      evaluatedAt: evaluation.evaluatedAt ?? null,
      stats: {
        spirit: evaluation.spirit ?? null,
        power: evaluation.power ?? null,
        creative: evaluation.creative ?? null,
        empathy: evaluation.empathy ?? null,
        communicate: evaluation.communicate ?? null,
        complexity: evaluation.complexity ?? null,
        creativity: evaluation.creativity ?? null,
        completeness: evaluation.completeness ?? null,
        fun: evaluation.fun ?? null,
      },
    }));
}

function buildCertificates(profile: PublicProfile): MemberCertificateRecord[] {
  return (profile.certificates ?? [])
    .filter((certificate) => text(certificate.fileUrl))
    .map((certificate, index) => ({
      id: `${text(certificate.fileUrl) || text(certificate.courseId) || "certificate"}-${index}`,
      courseId: text(certificate.courseId),
      eventName: courseLabel(certificate.courseId, certificate.eventName),
      fileName: text(certificate.fileName),
      fileUrl: text(certificate.fileUrl),
      issuedAt: certificate.issuedAt ?? null,
    }));
}

function buildSkills(profile: PublicProfile) {
  return (profile.skills ?? [])
    .map((skill) => ({
      name: text(skill.name),
      level: numberOrZero(skill.level),
    }))
    .filter((skill) => skill.name && skill.level > 0);
}

function buildAbout(profile: PublicProfile) {
  const about = text(profile.about);
  if (about) return about;
  const stats = profile.stats ?? {};
  const parts = [
    `${numberOrZero(stats.coursesCount)} courses`,
    `${numberOrZero(stats.evaluationsCount)} evaluations`,
    `${numberOrZero(stats.certificatesCount)} certificates`,
  ];
  return `Hamster Hub creator profile synced from the live learning database with ${parts.join(", ")}.`;
}

export function mapPublicProfileToMember(profile: PublicProfile): AggregateMember | null {
  const identity = profile.identity ?? {};
  const slug = text(identity.username) || text(identity.discordId);
  if (!slug) return null;

  const realName = text(identity.realName);
  const nickname = text(identity.nickname);
  const games = buildCourseGames(profile, slug);
  const reports = buildReports(profile);
  const certificates = buildCertificates(profile);
  const featuredGame = games.find((game) => game.featured) ?? null;
  const stats = profile.stats ?? {};
  const profileSrc = renderableImageSrc(identity.profileUrl);
  const override: MemberOverride = {
    profileSrc,
    aboutText: buildAbout(profile),
    skills: buildSkills(profile),
    achievements: buildAchievements(profile),
    journey: buildJourney(profile),
    featuredGameId: featuredGame?.id ?? null,
    rank: text(identity.rank) || "Warrior",
    code: `Code: ${text(identity.code)}`,
  };

  return {
    slug,
    username: nickname || slug,
    name: realName || nickname || slug,
    profileSrc,
    roles: [],
    games,
    reports,
    certificates,
    projectsCount: games.length,
    visitsCount: 0,
    questsCount: numberOrZero(stats.coursesCount) || games.length,
    invitedCount: numberOrZero(stats.invitedCount),
    coins: numberOrZero(stats.coins),
    rank: text(identity.rank) || "Warrior",
    override,
  };
}

export async function getDynamicProfileByUsername(username: string) {
  const safe = encodeURIComponent(username);
  const payload = await fetchJson<{ success?: boolean; profile?: PublicProfile }>(`/profile/username/${safe}`);
  if (!payload?.success || !payload.profile) return null;
  return mapPublicProfileToMember(payload.profile);
}

export async function getDynamicProfileByCode(code: string) {
  const safe = encodeURIComponent(code);
  const payload = await fetchJson<{ success?: boolean; profile?: PublicProfile }>(`/profile/code/${safe}`);
  if (!payload?.success || !payload.profile) return null;
  return mapPublicProfileToMember(payload.profile);
}

export async function getDynamicProfileBySlug(slug: string) {
  return (await getDynamicProfileByCode(slug)) ?? getDynamicProfileByUsername(slug);
}

export async function getDynamicProfileDirectory({ page = 1, limit = 30 } = {}): Promise<ProfileDirectoryResult | null> {
  const safePage = Math.max(1, Math.floor(Number(page) || 1));
  const safeLimit = Math.min(Math.max(Math.floor(Number(limit) || 30), 1), 50);
  const payload = await fetchJson<{
    success?: boolean;
    profiles?: PublicProfile[];
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  }>(`/profile?page=${safePage}&limit=${safeLimit}`);
  if (!payload?.success || !Array.isArray(payload.profiles)) return null;
  const members = payload.profiles
    .map(mapPublicProfileToMember)
    .filter((member): member is AggregateMember => Boolean(member));
  return {
    members,
    total: numberOrZero(payload.total),
    page: numberOrZero(payload.page) || safePage,
    limit: numberOrZero(payload.limit) || safeLimit,
    totalPages: numberOrZero(payload.totalPages) || 1,
    hasNext: Boolean(payload.hasNext),
    hasPrev: Boolean(payload.hasPrev),
  };
}
