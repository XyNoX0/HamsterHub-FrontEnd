import path from "node:path";
import fs from "node:fs/promises";
import Link from "next/link";
import { ALL_GAMES } from "../../../data/games/registry";
import { PreviewClient } from "./PreviewClient";
import {
  LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH,
  type AggregateMember,
  type MemberGameAppearance,
} from "../../../lib/members";
import type { MemberOverride } from "../../../data/members/overrides";
import "../preview.css";

const PROFILES_DIR = path.join(process.cwd(), "src/app/go/data/members/profiles");

export const dynamic = "force-dynamic";

function pickRole(roles: string[] | undefined): string {
  if (!roles || roles.length === 0) return "Member";
  return roles[0];
}

/** Synthesize what getAllMembers() would have produced for this slug, but
 *  without the registry filter — so reserved/orphan profiles are visible. */
function buildPreviewMember(fileSlug: string, raw: MemberOverride): AggregateMember {
  const profileSlug = (raw.slug ?? fileSlug).toLowerCase();

  // Find game appearances by matching ALL_GAMES.teamMembers[].slug. For an
  // orphan profile (no team[] mentions) this stays empty.
  const games: MemberGameAppearance[] = [];
  const rolesSet = new Set<string>();
  let username = "";
  let name = "";
  let profileSrc = "";

  for (const g of ALL_GAMES) {
    const team = (g as any).teamMembers ?? [];
    for (const m of team) {
      const tSlug = (m.slug ?? m.username ?? "").toLowerCase();
      if (tSlug !== profileSlug) continue;
      if (!username && m.username) username = m.username;
      if (!name && m.name) name = m.name;
      if (!profileSrc && m.profileSrc) profileSrc = m.profileSrc;
      for (const r of m.roles ?? []) rolesSet.add(r);
      games.push({
        id: g.id,
        title: g.title,
        posterSrc: (g as any).posterSrc,
        iconSrc: (g as any).iconSrc,
        event: (g as any).event,
        teamName: (g as any).teamName,
        role: pickRole(m.roles),
      });
    }
  }

  // Profile JSON wins for identity fields if it provides them (debug profile
  // sets a custom `name`/`username` even though no team[] entry exists).
  const fallbackName =
    String((raw as any).name ?? name ?? "").trim() || LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH;
  const fallbackUsername = String((raw as any).username ?? username ?? "").trim();
  const fallbackProfileSrc = (raw as any).profileSrc ?? profileSrc ?? "";

  return {
    slug: profileSlug,
    username: fallbackUsername,
    name: fallbackName,
    profileSrc: fallbackProfileSrc,
    roles: Array.from(rolesSet),
    games,
    projectsCount: games.length,
    visitsCount: raw.visits ?? games.length * 42 + 13,
    questsCount: raw.questsCount ?? new Set(games.map((g) => g.event)).size,
    invitedCount: raw.invitedCount ?? 0,
    coins: raw.coins ?? 0,
    rank: raw.rank ?? "Warrior",
    override: raw,
  };
}

export default async function PreviewSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const safeSlug = slug.replace(/[^a-zA-Z0-9_\-]/g, "");
  const file = path.join(PROFILES_DIR, `${safeSlug}.json`);

  let raw: MemberOverride | null = null;
  let parseError: string | null = null;
  try {
    const text = await fs.readFile(file, "utf8");
    raw = JSON.parse(text) as MemberOverride;
  } catch (err: any) {
    parseError = err?.code === "ENOENT" ? "File not found" : err?.message ?? String(err);
  }

  if (!raw) {
    return (
      <div className="preview-notFound">
        <div className="preview-notFoundInner">
          <h1 className="preview-notFoundTitle">Preview unavailable</h1>
          <p>ไม่เจอไฟล์ profile JSON สำหรับ slug นี้</p>
          <code className="preview-notFoundCode">{file}</code>
          <p style={{ fontSize: 13, opacity: 0.7 }}>{parseError}</p>
          <Link href="/go/admin/preview" className="preview-indexBackLink">
            ← Back to all profiles
          </Link>
        </div>
      </div>
    );
  }

  const member = buildPreviewMember(safeSlug, raw);

  return <PreviewClient member={member} fileSlug={safeSlug} relativePath={`src/app/go/data/members/profiles/${safeSlug}.json`} />;
}
