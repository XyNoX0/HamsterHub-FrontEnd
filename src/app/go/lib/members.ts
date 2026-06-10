import { ALL_GAMES } from "../data/games/registry";
import {
  MEMBER_OVERRIDES,
  MemberOverride,
  MemberSkill,
  MemberAchievement,
  JourneyStage,
} from "../data/members/overrides";

/**
 * Slugs that must never surface as a real public profile, even if they
 * appear in a game's teamMembers[]. Single source of truth — kept in sync
 * with scripts/gen-go-registries.mjs (profile filter) and
 * scripts/export-go.mjs (asset copy filter).
 */
const RESERVED_MEMBER_SLUGS = new Set(["_debug_member_", "template"]);

/** Filled in `getAllMembers` when ชื่อ–นามสกุล is absent from data. */
export const LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH = "ยังไม่ระบุชื่อ-นามสกุล";

export type MemberGameAppearance = {
  id: string;
  title: string;
  posterSrc: string;
  iconSrc: string;
  event: string;
  teamName: string;
  role: string;
  videoUrl?: string;
  description?: string;
  sourceProjectId?: string;
  sourceFileId?: string;
  featured?: boolean;
  teamMembers?: Array<{
    discordId?: string;
    memberId?: string;
    name: string;
    username?: string;
    profileSrc?: string;
    roles?: string[];
  }>;
  stats?: {
    complexity: number;
    creativity: number;
    completeness: number;
    fun: number;
  };
  achievements?: string[];
};

export type MemberReportRecord = {
  id: string;
  courseId: string;
  eventName: string;
  report: string;
  projectUrl?: string;
  reportChartUrl?: string;
  evaluatedAt?: string | null;
  stats?: {
    spirit?: number | null;
    power?: number | null;
    creative?: number | null;
    empathy?: number | null;
    communicate?: number | null;
    complexity?: number | null;
    creativity?: number | null;
    completeness?: number | null;
    fun?: number | null;
  };
};

export type MemberCertificateRecord = {
  id: string;
  courseId: string;
  eventName: string;
  fileName?: string;
  fileUrl: string;
  issuedAt?: string | null;
};

export type AggregateMember = {
  slug: string;
  /** ชื่อเล่น (stored as `username` in JSON / teamMembers for legacy schema). Never a Discord login. */
  username: string;
  /** ชื่อจริง + นามสกุล — from data only, never Discord handle. */
  name: string;
  profileSrc: string;
  roles: string[];
  games: MemberGameAppearance[];
  reports?: MemberReportRecord[];
  certificates?: MemberCertificateRecord[];
  projectsCount: number;
  visitsCount: number;
  questsCount: number;
  invitedCount: number;
  coins: number;
  rank: string;
  override: MemberOverride | null;
};

export function hasKnownLegalName(member: AggregateMember): boolean {
  const n = (member.name ?? "").trim();
  return n.length > 0 && n !== LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH;
}

/** Public headline: real name if known; otherwise nickname or a neutral slug-based label (never the internal placeholder). */
export function publicProfileHeadline(member: AggregateMember): string {
  if (hasKnownLegalName(member)) return member.name.trim();
  const nick = (member.username ?? "").trim();
  if (nick) return nick;
  return `โปรไฟล์ ${member.slug}`;
}

function pickRole(roles: string[] | undefined): string {
  if (!roles || roles.length === 0) return "Member";
  return roles[0];
}

export function getAllMembers(): AggregateMember[] {
  const map = new Map<string, AggregateMember>();
  const teammates = new Map<string, Set<string>>();

  for (const game of ALL_GAMES) {
    const members = (game.teamMembers ?? []) as Array<{
      slug?: string;
      name: string;
      username: string;
      profileSrc: string;
      roles?: string[];
    }>;
    // Defense-in-depth: drop any reserved/internal slugs that may have leaked
    // into a game's teamMembers[] from a copy-pasted template. Mirrors the
    // exclusions in scripts/gen-go-registries.mjs and scripts/export-go.mjs
    // so a single bad data entry can never surface in /go/pro or /profile listings.
    const safeMembers = members.filter(
      (m) => !RESERVED_MEMBER_SLUGS.has((m.slug ?? m.username).toLowerCase()),
    );
    const slugs = safeMembers.map((m) => m.slug ?? m.username.toLowerCase());

    for (const m of safeMembers) {
      const slug = m.slug ?? m.username.toLowerCase();
      let agg = map.get(slug);
      if (!agg) {
        agg = {
          slug,
          username: m.username,
          name: m.name,
          profileSrc: m.profileSrc,
          roles: [],
          games: [],
          reports: [],
          certificates: [],
          projectsCount: 0,
          visitsCount: 0,
          questsCount: 0,
          invitedCount: 0,
          coins: 0,
          rank: "Warrior",
          override: MEMBER_OVERRIDES[slug] ?? null,
        };
        map.set(slug, agg);
        teammates.set(slug, new Set());
      }
      if (!agg.profileSrc && m.profileSrc) agg.profileSrc = m.profileSrc;
      for (const r of m.roles ?? []) {
        if (!agg.roles.includes(r)) agg.roles.push(r);
      }
      agg.games.push({
        id: game.id,
        title: game.title,
        posterSrc: game.posterSrc,
        iconSrc: game.iconSrc,
        event: game.event,
        teamName: game.teamName,
        role: pickRole(m.roles),
      });
      const set = teammates.get(slug)!;
      for (const s of slugs) if (s !== slug) set.add(s);
    }
  }

  // Profile JSON overrides public name / nickname (never Discord usernames).
  for (const agg of map.values()) {
    const o = MEMBER_OVERRIDES[agg.slug] as (MemberOverride & { name?: string; username?: string }) | undefined;
    if (!o) continue;
    if (o.name?.trim()) agg.name = o.name.trim();
    if (o.username != null && String(o.username).trim()) agg.username = String(o.username).trim();
  }

  // Profiles present on disk but not yet attached to any game (e.g. campers who
  // have not shipped a build) should still appear in /go/pro directory.
  for (const profileKey of Object.keys(MEMBER_OVERRIDES)) {
    const slug = profileKey.toLowerCase();
    if (RESERVED_MEMBER_SLUGS.has(slug)) continue;
    if (map.has(slug)) continue;

    const o = MEMBER_OVERRIDES[profileKey] as MemberOverride & {
      name?: string;
      username?: string;
      profileSrc?: string;
    };
    const nickname = o.username?.trim() ?? "";
    const legalName = o.name?.trim() ?? "";
    const name = legalName || LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH;
    const username = nickname;

    map.set(slug, {
      slug,
      username,
      name,
      profileSrc: o.profileSrc ?? "",
      roles: [],
      games: [],
      reports: [],
      certificates: [],
      projectsCount: 0,
      visitsCount: 0,
      questsCount: 0,
      invitedCount: 0,
      coins: 0,
      rank: "Warrior",
      override: o,
    });
  }

  for (const agg of map.values()) {
    if (!agg.name?.trim()) agg.name = LEGAL_NAME_UNKNOWN_PLACEHOLDER_TH;
    agg.projectsCount = agg.games.length;
    agg.questsCount = agg.override?.questsCount ?? new Set(agg.games.map((g) => g.event)).size;
    agg.invitedCount = agg.override?.invitedCount ?? 0;
    agg.visitsCount = agg.override?.visits ?? (agg.projectsCount * 42 + 13);

    // Coins: Use explicit override or default to 0 (to be fetched from real DB by main system)
    agg.coins = agg.override?.coins ?? 0;
    agg.rank = agg.override?.rank ?? "Warrior";
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.games.length !== a.games.length) return b.games.length - a.games.length;
    return a.slug.localeCompare(b.slug);
  });
}

export function getMemberBySlug(slug: string): AggregateMember | null {
  const decoded = decodeURIComponent(slug).toLowerCase();
  const all = getAllMembers();
  return all.find((m) => m.slug === decoded) ?? null;
}

export const SKILL_NAMES = [
  "OOP",
  "Server x Unity",
  "Shader Graph",
  "VFX",
  "Level Design",
  "Story",
  "Animation",
  "Rigging",
  "Modelling",
  "Coding",
  "Sound",
] as const;

export type SkillName = typeof SKILL_NAMES[number];

export function deriveSkills(member: AggregateMember): MemberSkill[] {
  const overrideMap = new Map<string, MemberSkill>();
  for (const s of member.override?.skills ?? []) {
    const name = String(s.name || "").trim();
    if (!name) continue;
    overrideMap.set(name.toLowerCase(), { name, level: s.level });
  }
  const known = SKILL_NAMES
    .map((name) => overrideMap.get(name.toLowerCase()) ?? { name, level: 0 })
    .filter((s) => s.level > 0);
  const custom = Array.from(overrideMap.values())
    .filter((skill) => skill.level > 0 && !SKILL_NAMES.some((name) => name.toLowerCase() === skill.name.toLowerCase()));
  return [...known, ...custom];
}

export function deriveAchievements(member: AggregateMember): MemberAchievement[] {
  return member.override?.achievements ?? [];
}

export function deriveJourney(member: AggregateMember): JourneyStage[] {
  const personal = member.override?.journey ?? [];
  return personal.map((s, i) => ({
    ...s,
    tone: i === 0 ? "color" : i === personal.length - 1 ? "glow" : s.tone ?? "muted"
  }));
}
export function deriveLevel(member: AggregateMember): number {
  // Auto-derived from activity. Not editable via admin (single source of truth).
  const xp = (member.projectsCount * 1) + (member.questsCount * 2);
  return Math.max(1, xp + 1);
}

export function deriveTitleLine(member: AggregateMember): string {
  if (member.override?.code) return member.override.code;
  if (member.override?.titleLine) return member.override.titleLine;
  // Default /profile/[slug] headline: rank (Warrior, …) — per-game job titles stay on each game card.
  return member.rank || "Warrior";
}

export function deriveMotto(member: AggregateMember): string | null {
  if (member.override?.motto) return member.override.motto;
  return null;
}

export function deriveAboutText(member: AggregateMember): string {
  if (member.override?.aboutText) return member.override.aboutText;
  const gameCount = member.games.length;
  const jamCount = member.questsCount;
  if (gameCount === 0) {
    return "นักสร้างเกมหน้าใหม่ของ Go Dang — กำลังเริ่มต้นเส้นทางสนุก ๆ กับเพื่อน ๆ";
  }
  const projectsLine = `ร่วมทำเกมไปแล้ว ${gameCount} โปรเจกต์${jamCount > 0 ? ` ผ่าน ${jamCount} jam` : ""}`;
  return `${projectsLine} ชอบลองของใหม่ เรียนรู้ทักษะใหม่ ๆ และสร้างผลงานสนุก ๆ ไปกับเพื่อน`;
}

export function getFeaturedGame(member: AggregateMember): MemberGameAppearance | null {
  if (member.override && Object.prototype.hasOwnProperty.call(member.override, "featuredGameId")) {
    const explicitId = member.override.featuredGameId;
    if (!explicitId) return null;
    return member.games.find((g) => g.id === explicitId) ?? null;
  }

  const id = member.override?.featuredGameId;
  if (id) {
    const found = member.games.find((g) => g.id === id);
    if (found) return found;
  }
  return member.games[0] ?? null;
}

export type FirstJamTeammate = {
  slug?: string;
  name: string;
  username: string;
  profileSrc: string;
};

export type FirstJamInfo = {
  game: MemberGameAppearance;
  event: string;
  teammates: FirstJamTeammate[];
};

export function getFirstJamInfo(member: AggregateMember): FirstJamInfo | null {
  const first = member.games[member.games.length - 1] ?? member.games[0];
  if (!first) return null;
  const fullGame = ALL_GAMES.find((g) => g.id === first.id);
  const raw = ((fullGame?.teamMembers ?? []) as FirstJamTeammate[]).filter(
    (m) => (m.slug ?? m.username.toLowerCase()) !== member.slug
  );
  return { game: first, event: first.event, teammates: raw };
}

export type MemberVibe = {
  text: string;
  tone: "multi" | "first" | "roles";
};

export function getMemberVibe(member: AggregateMember): MemberVibe {
  if (member.roles.length >= 3) {
    return { text: `Multi-role · ${member.roles.length} hats`, tone: "roles" };
  }
  if (member.games.length >= 2) {
    return {
      text: `Quest hunter · ${member.questsCount} quest${member.questsCount === 1 ? "" : "s"}`,
      tone: "multi",
    };
  }
  const first = member.games[0]?.event;
  return { text: first ? `First jam: ${first}` : "New creator", tone: "first" };
}
