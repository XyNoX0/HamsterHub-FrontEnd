import { cookies } from "next/headers";
import { GO_ADMIN_TOKEN_COOKIE } from "./auth-constants";

const ALLOWED_RANKS = new Set(["ace", "admin"]);
const DEFAULT_API_BASE_URL = "https://api.hamsterquest.com/api/nuutor/api";

type GoAdminSessionPayload = {
  success?: boolean;
  error?: string;
  user?: {
    id?: string;
    username?: string;
    globalName?: string;
    avatarUrl?: string;
  } | null;
  member?: {
    discordId?: string;
    username?: string;
    rank?: string;
  } | null;
  seed?: {
    rank?: string;
  } | null;
  profile?: {
    identity?: {
      rank?: string;
      username?: string;
      discordId?: string;
    };
  } | null;
};

export type GoAdminAuthResult = {
  allowed: boolean;
  reason: "missing" | "invalid" | "forbidden" | "";
  rank: string;
  userLabel: string;
};

function apiBaseUrl() {
  return (
    process.env.NUUTOR_API_BASE_URL ||
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/+$/, "");
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAllowedRank(rank: string) {
  return ALLOWED_RANKS.has(rank.trim().toLowerCase());
}

export async function getGoAdminAuth(): Promise<GoAdminAuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(GO_ADMIN_TOKEN_COOKIE)?.value || "";
  if (!token) return { allowed: false, reason: "missing", rank: "", userLabel: "" };

  try {
    const res = await fetch(`${apiBaseUrl()}/profile/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    const payload = (await res.json().catch(() => null)) as GoAdminSessionPayload | null;
    if (!res.ok || !payload?.success) {
      return { allowed: false, reason: "invalid", rank: "", userLabel: "" };
    }

    const rank =
      text(payload.member?.rank) ||
      text(payload.seed?.rank) ||
      text(payload.profile?.identity?.rank);
    const userLabel =
      text(payload.profile?.identity?.username) ||
      text(payload.member?.username) ||
      text(payload.user?.globalName) ||
      text(payload.user?.username) ||
      text(payload.user?.id);

    if (!isAllowedRank(rank)) {
      return { allowed: false, reason: "forbidden", rank, userLabel };
    }

    return { allowed: true, reason: "", rank, userLabel };
  } catch {
    return { allowed: false, reason: "invalid", rank: "", userLabel: "" };
  }
}
