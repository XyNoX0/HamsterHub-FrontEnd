// Dekhub schema + adapter (types only used at runtime).
//
// Actual fetching lives in scripts/sync-dekhub.mjs — Node's undici fetch
// rejects GET with a request body, which is the only shape /getMemberData
// accepts, so the script uses node:https directly. This file stays in /go
// for use by lib/dekhub-cache.ts and any page that reads the snapshot.

export const DEKHUB_API_URL = "https://nj.dekhub.com/getMemberData";

// ── Raw API shape (legacy nested form returned by /getMemberData) ──────────

type RawEvaluation = {
  complexity?: number;
  creativity?: number;
  completeness?: number;
  fun?: number;
  instructorReport?: string;
  projectUrl?: string;
  reportChartUrl?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
};

type RawDelivery = {
  reportSentToLine?: boolean;
  certificateSentToLine?: boolean;
  sentAt?: string;
  lineUserId?: string;
  certificateFileUrl?: string;
  status?: string;
  error?: string;
};

type RawCourse = {
  project?: { name?: string; url?: string };
  courseId?: string;
  eventName?: string;
  evaluation?: RawEvaluation;
  delivery?: RawDelivery;
  _id?: string;
};

type RawMember = {
  discordId?: string;
  fullname?: string;
  nickname?: string;
  courses?: RawCourse[];
};

// ── Normalized schema (the one shared with nuutor / used by /go) ──────────

export type DekhubEvaluation = {
  courseId: string;
  attendance: string;
  complexity: number | null;
  creativity: number | null;
  completeness: number | null;
  fun: number | null;
  report: string;
  achievement: string;
  projectUrl: string;
  evaluatedAt: string | null;
};

export type DekhubCertificate = {
  courseId: string;
  eventName: string;
  fileName: string;
  fileUrl: string;
  issuedAt: string | null;
};

export type DekhubMember = {
  discordId: string;
  realName: string;
  nickname: string;
  courses: string[];
  evaluations: DekhubEvaluation[];
  certificates: DekhubCertificate[];
};

// ── Adapter ────────────────────────────────────────────────────────────────

function fileNameFromUrl(url: string): string {
  try {
    const path = new URL(url).pathname;
    const last = path.split("/").filter(Boolean).pop() ?? "";
    return decodeURIComponent(last);
  } catch {
    return url.split("/").pop() ?? "";
  }
}

function isNotFoundStub(raw: RawMember): boolean {
  return raw?.fullname === "Not found" && raw?.nickname === "Not found";
}

export function adaptMember(raw: RawMember, fallbackDiscordId?: string): DekhubMember | null {
  if (!raw || isNotFoundStub(raw)) return null;

  const discordId = raw.discordId ?? fallbackDiscordId ?? "";
  if (!discordId) return null;

  const rawCourses = raw.courses ?? [];
  const courseIds = rawCourses.map((c) => c?.courseId ?? "").filter(Boolean);

  const evaluations: DekhubEvaluation[] = rawCourses.map((c) => ({
    courseId: c?.courseId ?? "",
    attendance: "",
    complexity: c?.evaluation?.complexity ?? null,
    creativity: c?.evaluation?.creativity ?? null,
    completeness: c?.evaluation?.completeness ?? null,
    fun: c?.evaluation?.fun ?? null,
    report: c?.evaluation?.instructorReport ?? "",
    achievement: "",
    projectUrl: c?.evaluation?.projectUrl ?? c?.project?.url ?? "",
    evaluatedAt: c?.evaluation?.evaluatedAt ?? null,
  }));

  const certificates: DekhubCertificate[] = rawCourses
    .filter((c) => Boolean(c?.delivery?.certificateFileUrl))
    .map((c) => {
      const url = c!.delivery!.certificateFileUrl!;
      return {
        courseId: c?.courseId ?? "",
        eventName: c?.eventName ?? "",
        fileName: fileNameFromUrl(url),
        fileUrl: url,
        issuedAt: c?.delivery?.sentAt ?? null,
      };
    });

  return {
    discordId,
    realName: raw.fullname ?? "",
    nickname: raw.nickname ?? "",
    courses: courseIds,
    evaluations,
    certificates,
  };
}

// ── Fetcher ────────────────────────────────────────────────────────────────
//
// Intentionally not implemented here. Node's built-in fetch (undici) refuses
// GET with a request body, which is the only shape /getMemberData accepts.
// Use `node scripts/sync-dekhub.mjs` (which uses node:https directly) to
// refresh the cache, then read via lib/dekhub-cache.ts.
