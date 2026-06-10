'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { revalidatePath } from 'next/cache';
import {
  readSubmitCourseVisibility,
  writeSubmitCourseVisibility,
  type SubmitCourseVisibilityConfig,
} from '../lib/submit-course-visibility';

function assertDev() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Admin write is disabled in production builds.');
  }
}

const ROOT = process.cwd();
const GAMES_DIR = path.join(ROOT, 'src/app/go/data/games');
const PROFILES_DIR = path.join(ROOT, 'src/app/go/data/members/profiles');
const EVENTS_DIR = path.join(ROOT, 'src/app/go/data/events');
const CODEGEN_SCRIPT = path.join(ROOT, 'scripts/gen-go-registries.mjs');

function safeSegment(s: string): string {
  if (!/^[a-z0-9_-]+$/i.test(s)) {
    throw new Error(`Invalid id segment: ${s}`);
  }
  return s;
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function readJson(filePath: string): Promise<any> {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function regenerateRegistries(): void {
  // Cheap insurance: re-run codegen on every save so the in-memory module
  // graph next request matches whatever just landed on disk.
  execSync(`node "${CODEGEN_SCRIPT}"`, { stdio: 'pipe' });
}

function revalidateAll() {
  revalidatePath('/go/admin');
  revalidatePath('/go');
  revalidatePath('/go/pro', 'layout');
  revalidatePath('/profile', 'layout');
}

export type GamePatch = {
  title?: string;
  description?: string;
  teamName?: string;
  event?: string;
  posterSrc?: string;
  iconSrc?: string;
  videoUrl?: string;
  gameUrl?: string;
  location?: string;
  stats?: {
    complexity?: number;
    creativity?: number;
    completeness?: number;
    fun?: number;
  };
  teamMembers?: Array<{
    slug?: string;
    name: string;
    username: string;
    profileSrc: string;
    roles: string[];
  }>;
  achievements?: Array<{ id: string; label: string; sublabel?: string; kind?: string }>;
};

export async function saveGame(gameId: string, patch: GamePatch): Promise<void> {
  assertDev();
  const safeId = safeSegment(gameId);
  const fp = path.join(GAMES_DIR, safeId, 'info.json');
  const cur = await readJson(fp);
  const next: any = {
    ...cur,
    ...patch,
    stats: { ...(cur.stats ?? {}), ...(patch.stats ?? {}) },
  };
  if (patch.teamMembers) next.teamMembers = patch.teamMembers;
  if (patch.achievements) next.achievements = patch.achievements;
  await writeJson(fp, next);
  regenerateRegistries();
  revalidateAll();
}

export type MemberPatch = {
  titleLine?: string;
  motto?: string;
  aboutText?: string;
  location?: string;
  rank?: string;
  coins?: number;
  profileSrc?: string;
  skills?: { name: string; level: number }[];
  achievements?: Array<{ id: string; label: string; sublabel?: string; kind?: string }>;
};

export async function saveMember(slug: string, patch: MemberPatch): Promise<void> {
  assertDev();
  const safeSlug = safeSegment(slug);
  const fp = path.join(PROFILES_DIR, `${safeSlug}.json`);
  let cur: any = {};
  try {
    cur = await readJson(fp);
  } catch {
    cur = { slug: safeSlug };
  }
  const next: any = { ...cur, ...patch };
  if (patch.achievements) next.achievements = patch.achievements;
  await writeJson(fp, next);
  regenerateRegistries();
  revalidateAll();
}

export type EventPatch = {
  name?: string;
  kind?: 'jam' | 'workshop' | 'showcase' | 'competition';
  date?: string;
  theme?: string;
  location?: string;
  posterSrc?: string;
};

export async function saveEvent(eventId: string, patch: EventPatch): Promise<void> {
  assertDev();
  const safeId = safeSegment(eventId);
  const fp = path.join(EVENTS_DIR, `${safeId}.json`);
  const cur = await readJson(fp);
  const next = { ...cur, ...patch };
  await writeJson(fp, next);
  regenerateRegistries();
  revalidateAll();
}

// ── Create paths ────────────────────────────────────────────────

async function exists(fp: string): Promise<boolean> {
  try {
    await fs.access(fp);
    return true;
  } catch {
    return false;
  }
}

export async function createGame(gameId: string, patch: GamePatch): Promise<void> {
  assertDev();
  const safeId = safeSegment(gameId);
  if (!patch.title || patch.title.trim().length === 0) {
    throw new Error('Title is required.');
  }
  const dir = path.join(GAMES_DIR, safeId);
  const fp = path.join(dir, 'info.json');
  if (await exists(fp)) {
    throw new Error(`Game id "${safeId}" already exists.`);
  }
  await fs.mkdir(dir, { recursive: true });
  const seed = {
    id: safeId,
    title: patch.title,
    description: patch.description ?? '',
    teamName: patch.teamName ?? '',
    posterSrc: patch.posterSrc ?? '',
    iconSrc: patch.iconSrc ?? '',
    videoUrl: patch.videoUrl ?? '',
    gameUrl: patch.gameUrl ?? '',
    location: patch.location ?? '',
    event: patch.event ?? '',
    achievements: patch.achievements ?? [],
    stats: {
      complexity: patch.stats?.complexity ?? 0,
      creativity: patch.stats?.creativity ?? 0,
      completeness: patch.stats?.completeness ?? 0,
      fun: patch.stats?.fun ?? 0,
    },
    teamMembers: patch.teamMembers ?? [],
  };
  await writeJson(fp, seed);
  regenerateRegistries();
  revalidateAll();
}

export async function createMember(slug: string, patch: MemberPatch): Promise<void> {
  assertDev();
  const safeSlug = safeSegment(slug);
  const fp = path.join(PROFILES_DIR, `${safeSlug}.json`);
  if (await exists(fp)) {
    throw new Error(`Member slug "${safeSlug}" already has a profile.`);
  }
  const seed = {
    slug: safeSlug,
    titleLine: patch.titleLine ?? '',
    motto: patch.motto ?? '',
    aboutText: patch.aboutText ?? '',
    location: patch.location ?? '',
    rank: patch.rank ?? '',
    coins: patch.coins ?? 0,
    profileSrc: patch.profileSrc ?? '',
    skills: patch.skills ?? [],
    achievements: patch.achievements ?? [],
  };
  await writeJson(fp, seed);
  regenerateRegistries();
  revalidateAll();
}

export async function createEvent(eventId: string, patch: EventPatch): Promise<void> {
  assertDev();
  const safeId = safeSegment(eventId);
  if (!patch.name || patch.name.trim().length === 0) {
    throw new Error('Event name is required.');
  }
  const fp = path.join(EVENTS_DIR, `${safeId}.json`);
  if (await exists(fp)) {
    throw new Error(`Event id "${safeId}" already exists.`);
  }
  const seed = {
    id: safeId,
    name: patch.name,
    kind: patch.kind ?? 'jam',
    date: patch.date ?? '',
    theme: patch.theme ?? '',
    location: patch.location ?? '',
    posterSrc: patch.posterSrc ?? '',
  };
  await writeJson(fp, seed);
  regenerateRegistries();
  revalidateAll();
}

// ── Asset upload ────────────────────────────────────────────────

const PUBLIC_GODANG = path.join(ROOT, 'public/godang');
const ACHIEVEMENTS_FILE = path.join(ROOT, 'src/app/go/data/achievements/catalog.json');
const ALLOWED_IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']);
const MAX_BYTES = 4 * 1024 * 1024;

type UploadResult = { publicHref: string };

export async function uploadAsset(formData: FormData): Promise<UploadResult> {
  assertDev();
  const file = formData.get('file');
  const kind = String(formData.get('kind') ?? '');
  const id = String(formData.get('id') ?? '');
  const field = String(formData.get('field') ?? '');

  if (!(file instanceof File)) throw new Error('No file provided.');
  if (file.size === 0) throw new Error('File is empty.');
  if (file.size > MAX_BYTES) {
    throw new Error(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB > 4MB).`);
  }

  const origName = file.name || 'upload';
  const ext = origName.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED_IMAGE_EXT.has(ext)) {
    throw new Error(`Unsupported file type: .${ext}. Allowed: ${[...ALLOWED_IMAGE_EXT].join(', ')}`);
  }

  const safeId = safeSegment(id);
  let targetDir: string;
  let targetFile: string;
  let publicHref: string;

  if (kind === 'game' && (field === 'poster' || field === 'icon')) {
    targetDir = path.join(PUBLIC_GODANG, 'games', safeId);
    targetFile = `${field}.${ext}`;
    publicHref = `/godang/games/${safeId}/${targetFile}`;
  } else if (kind === 'member' && field === 'profile') {
    targetDir = path.join(PUBLIC_GODANG, 'members');
    targetFile = `${safeId}.${ext}`;
    publicHref = `/godang/members/${targetFile}`;
  } else if (kind === 'event' && field === 'poster') {
    targetDir = path.join(PUBLIC_GODANG, 'events');
    targetFile = `${safeId}.${ext}`;
    publicHref = `/godang/events/${targetFile}`;
  } else {
    throw new Error(`Unsupported upload target: kind=${kind}, field=${field}`);
  }

  await fs.mkdir(targetDir, { recursive: true });
  // Remove any sibling with a different extension so we don't stack copies.
  for (const sibling of ALLOWED_IMAGE_EXT) {
    if (sibling === ext) continue;
    const candidate = path.join(targetDir, targetFile.replace(`.${ext}`, `.${sibling}`));
    await fs.rm(candidate, { force: true }).catch(() => {});
  }

  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(targetDir, targetFile), buf);
  revalidateAll();
  return { publicHref };
}

// ── Achievement catalog ─────────────────────────────────────────

export type CatalogAchievement = {
  id: string;
  label: string;
  sublabel?: string;
  kind?: 'top' | 'team' | 'fast' | 'custom';
  icon?: string;
};

async function readCatalog(): Promise<{ achievements: CatalogAchievement[] }> {
  try {
    return await readJson(ACHIEVEMENTS_FILE);
  } catch {
    return { achievements: [] };
  }
}

export async function saveCatalogAchievement(
  prevId: string | null,
  patch: CatalogAchievement,
): Promise<void> {
  assertDev();
  if (!patch.id || patch.id.trim().length === 0) throw new Error('ID is required.');
  if (!patch.label || patch.label.trim().length === 0) throw new Error('Label is required.');
  const safeId = safeSegment(patch.id);
  const cat = await readCatalog();
  const list = cat.achievements ?? [];
  if (prevId === null) {
    if (list.some((a) => a.id === safeId)) {
      throw new Error(`Achievement id "${safeId}" already exists.`);
    }
    list.push({ ...patch, id: safeId });
  } else {
    const idx = list.findIndex((a) => a.id === prevId);
    if (idx < 0) throw new Error(`Achievement id "${prevId}" not found.`);
    if (safeId !== prevId && list.some((a) => a.id === safeId)) {
      throw new Error(`Achievement id "${safeId}" already exists.`);
    }
    list[idx] = { ...patch, id: safeId };
  }
  list.sort((a, b) => a.id.localeCompare(b.id));
  await writeJson(ACHIEVEMENTS_FILE, { achievements: list });
  revalidateAll();
}

export async function deleteCatalogAchievement(id: string): Promise<void> {
  assertDev();
  const cat = await readCatalog();
  const list = (cat.achievements ?? []).filter((a) => a.id !== id);
  await writeJson(ACHIEVEMENTS_FILE, { achievements: list });
  revalidateAll();
}

// ── Tools (validate / export) ───────────────────────────────────

export type ValidateSummary = {
  ok: boolean;
  critical: number;
  warn: number;
  issues: Array<{ kind: string; id: string; field: string; severity: string; note?: string }>;
};

export async function runValidate(): Promise<ValidateSummary> {
  assertDev();
  const mod = await import('../../../../scripts/lib/validate-go.mjs');
  const r = await mod.validateAll();
  return {
    ok: r.critical === 0,
    critical: r.critical,
    warn: r.warn,
    issues: r.issues,
  };
}

export type ExportResult = { ok: boolean; output: string; durationMs: number };

export async function runExport(): Promise<ExportResult> {
  assertDev();
  const t0 = Date.now();
  const script = path.join(ROOT, 'scripts/export-go.mjs');
  let output = '';
  let ok = true;
  try {
    const buf = execSync(`node "${script}"`, { stdio: 'pipe' });
    output = buf.toString();
  } catch (err: any) {
    ok = false;
    output = (err?.stdout?.toString() ?? '') + (err?.stderr?.toString() ?? '') + (err?.message ?? '');
  }
  return { ok, output, durationMs: Date.now() - t0 };
}

export type DekhubSyncResult = {
  ok: boolean;
  output: string;
  durationMs: number;
  syncedAt: string;
  memberCount: number;
};

export async function runDekhubSync(): Promise<DekhubSyncResult> {
  assertDev();
  const t0 = Date.now();
  const script = path.join(ROOT, 'scripts/sync-dekhub.mjs');
  const cachePath = path.join(ROOT, 'src/app/go/data/dekhub-cache.json');
  let output = '';
  let ok = true;
  try {
    const buf = execSync(`node "${script}"`, { stdio: 'pipe' });
    output = buf.toString();
  } catch (err: any) {
    ok = false;
    output = (err?.stdout?.toString() ?? '') + (err?.stderr?.toString() ?? '') + (err?.message ?? '');
  }
  let syncedAt = '';
  let memberCount = 0;
  try {
    const raw = await fs.readFile(cachePath, 'utf8');
    const snap = JSON.parse(raw);
    syncedAt = snap.syncedAt ?? '';
    memberCount = Object.keys(snap.byDiscordId ?? {}).length;
  } catch {
    // cache missing — leave defaults
  }
  revalidateAll();
  return { ok, output, durationMs: Date.now() - t0, syncedAt, memberCount };
}

// ── Submitted Projects bridge ───────────────────────────────────

const NUUTOR_API_BASE = (
  process.env.NUUTOR_API_BASE_URL ||
  process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
  'https://api.hamsterquest.com/api/nuutor/api'
).replace(/\/+$/, '');

function getAdminApiKey(): string {
  return process.env.NUUTOR_ADMIN_API_KEY || process.env.ADMIN_API_KEY || '';
}

function adminHeaders(): Record<string, string> {
  const key = getAdminApiKey();
  if (!key) throw new Error('NUUTOR_ADMIN_API_KEY is not configured');
  return { 'X-Admin-Token': key };
}

function normalizeCourseMembershipMessage(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes('not in course') ||
    lower.includes('not found in course') ||
    lower.includes('not found in sheet') ||
    lower.includes('not enrolled') ||
    lower.includes('not registered') ||
    lower.includes('no matching student') ||
    lower.includes('course member')
  ) {
    return 'น้องไม่มีรายชื่อในคอร์สนี้';
  }
  return message;
}

export type SubmittedTeamMember = {
  discordId: string;
  name: string;
  nickname: string;
  role: string;
  avatarUrl: string;
};

export type SubmittedProjectRow = {
  id: string;
  projectId: string;
  title: string;
  teamName: string;
  description: string;
  courseId: string;
  eventName: string;
  source: string;
  videoFileId: string;
  videoUrl: string;
  posterUrl: string;
  iconUrl: string;
  team: SubmittedTeamMember[];
  createdAt: string | null;
  updatedAt: string | null;
  imported: boolean;
  importedGameId: string | null;
  unmappedTeamMembers: Array<{ discordId: string; name: string }>;
};

function deriveGameIdFromProject(projectId: string, fallbackId: string): string {
  const seed = String(projectId || fallbackId || '').toLowerCase();
  const cleaned = seed.replace(/[^a-z0-9_-]/g, '-').replace(/^-+|-+$/g, '');
  return cleaned || `submit-${Date.now().toString(36)}`;
}

function isSafeSlug(value: string): boolean {
  return /^[a-z0-9_-]+$/.test(value);
}

async function gameInfoExists(gameId: string): Promise<boolean> {
  return exists(path.join(GAMES_DIR, gameId, 'info.json'));
}

async function resolveDiscordIdToUsername(discordId: string): Promise<string> {
  if (!discordId) return '';
  const url = `${NUUTOR_API_BASE}/admin/members?search=${encodeURIComponent(discordId)}&limit=10`;
  const res = await fetch(url, { headers: adminHeaders(), cache: 'no-store' });
  if (!res.ok) return '';
  const data = await res.json().catch(() => null);
  if (!data?.success || !Array.isArray(data.members)) return '';
  const exact = data.members.find((m: any) => String(m.discord_id || '') === discordId);
  const username = String((exact || data.members[0])?.username || '').trim().toLowerCase();
  return isSafeSlug(username) ? username : '';
}

export async function fetchSubmittedProjects(search = ''): Promise<SubmittedProjectRow[]> {
  assertDev();
  const qs = new URLSearchParams({ limit: '150' });
  if (search.trim()) qs.set('search', search.trim());
  const url = `${NUUTOR_API_BASE}/admin/projects?${qs.toString()}`;
  const res = await fetch(url, { headers: adminHeaders(), cache: 'no-store' });
  if (!res.ok) throw new Error(`fetch submitted projects failed (${res.status})`);
  const data = await res.json().catch(() => null);
  if (!data?.success) throw new Error(data?.error || 'fetch submitted projects failed');

  const projects: any[] = Array.isArray(data.projects) ? data.projects : [];

  // Dedupe + parallel resolve discord IDs → usernames
  const allDiscordIds = Array.from(
    new Set(
      projects.flatMap((p) => (p.team || []).map((m: any) => String(m.discordId || '')).filter(Boolean)),
    ),
  );
  const resolved = await Promise.all(
    allDiscordIds.map(async (id) => [id, await resolveDiscordIdToUsername(id)] as const),
  );
  const usernameByDiscord = new Map(resolved);

  const rows: SubmittedProjectRow[] = [];
  for (const p of projects) {
    const gameId = deriveGameIdFromProject(p.projectId, p.id);
    const imported = await gameInfoExists(gameId);
    const team = Array.isArray(p.team) ? p.team : [];

    const unmappedTeamMembers = team
      .filter((m: any) => {
        const id = String(m.discordId || '');
        return !id || !(usernameByDiscord.get(id) || '').trim();
      })
      .map((m: any) => ({
        discordId: String(m.discordId || ''),
        name: m.name || m.nickname || '',
      }));

    rows.push({
      id: p.id || '',
      projectId: p.projectId || '',
      title: p.title || '',
      teamName: p.teamName || '',
      description: p.description || '',
      courseId: p.courseId || '',
      eventName: p.eventName || '',
      source: p.source || '',
      videoFileId: p.video?.driveFileId || '',
      videoUrl: p.video?.url || '',
      posterUrl: p.media?.posterUrl || '',
      iconUrl: p.media?.iconUrl || '',
      team: team.map((m: any) => ({
        discordId: String(m.discordId || ''),
        name: m.name || '',
        nickname: m.nickname || '',
        role: m.role || '',
        avatarUrl: m.avatarUrl || '',
      })),
      createdAt: p.createdAt || null,
      updatedAt: p.updatedAt || null,
      imported,
      importedGameId: imported ? gameId : null,
      unmappedTeamMembers,
    });
  }
  return rows;
}

async function downloadImageToFile(url: string, destFile: string): Promise<boolean> {
  if (!url) return false;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength === 0) return false;
    await fs.mkdir(path.dirname(destFile), { recursive: true });
    await fs.writeFile(destFile, buf);
    return true;
  } catch {
    return false;
  }
}

export type ImportResult = {
  ok: boolean;
  gameId: string;
  alreadyImported?: boolean;
  unmapped?: Array<{ discordId: string; name: string }>;
  error?: string;
};

async function importInternal(projectId: string, options: { allowOverwrite: boolean }): Promise<ImportResult> {
  assertDev();
  if (!projectId) throw new Error('projectId required');

  const url = `${NUUTOR_API_BASE}/admin/projects/${encodeURIComponent(projectId)}`;
  const res = await fetch(url, { headers: adminHeaders(), cache: 'no-store' });
  if (!res.ok) return { ok: false, gameId: '', error: `fetch project failed (${res.status})` };
  const data = await res.json().catch(() => null);
  if (!data?.success || !data.project) return { ok: false, gameId: '', error: data?.error || 'project not found' };

  const project = data.project;
  const gameId = deriveGameIdFromProject(project.projectId, project.id);
  const safeId = safeSegment(gameId);
  const dir = path.join(GAMES_DIR, safeId);
  const fp = path.join(dir, 'info.json');

  if ((await exists(fp)) && !options.allowOverwrite) {
    return { ok: false, gameId: safeId, alreadyImported: true };
  }

  const team = Array.isArray(project.team) ? project.team : [];
  const teamMembers: Array<{ slug: string; name: string; username: string; profileSrc: string; roles: string[] }> = [];
  const unmapped: Array<{ discordId: string; name: string }> = [];

  for (const m of team) {
    const discordId = String(m.discordId || '');
    const username = discordId ? await resolveDiscordIdToUsername(discordId) : '';
    if (!username) {
      unmapped.push({ discordId, name: m.name || m.nickname || '' });
      continue;
    }
    teamMembers.push({
      slug: username,
      name: String(m.name || ''),
      username: String(m.nickname || username),
      profileSrc: `/godang/members/${username}.png`,
      roles: [String(m.role || 'Creator')],
    });
  }

  // 2C — require: block import if any team member is unmapped
  if (unmapped.length > 0) {
    return { ok: false, gameId: safeId, unmapped };
  }

  await fs.mkdir(dir, { recursive: true });
  const publicGameDir = path.join(ROOT, 'public/godang/games', safeId);

  const posterUrl = String(project.media?.posterUrl || '');
  const iconUrl = String(project.media?.iconUrl || '');
  const posterDest = path.join(publicGameDir, 'poster.png');
  const iconDest = path.join(publicGameDir, 'icon.png');
  const posterDownloaded = await downloadImageToFile(posterUrl, posterDest);
  const iconDownloaded = await downloadImageToFile(iconUrl, iconDest);

  const evaluations = Array.isArray(project.evaluations) ? project.evaluations : [];
  const avg = (key: string): number => {
    const nums = evaluations
      .map((e: any) => Number(e[key]))
      .filter((n: number) => Number.isFinite(n));
    if (nums.length === 0) return 0;
    return Math.round((nums.reduce((s: number, n: number) => s + n, 0) / nums.length) * 10) / 10;
  };

  const info = {
    id: safeId,
    title: String(project.title || ''),
    description: String(project.description || ''),
    teamName: String(project.teamName || ''),
    posterSrc: posterDownloaded ? `/godang/games/${safeId}/poster.png` : posterUrl,
    iconSrc: iconDownloaded ? `/godang/games/${safeId}/icon.png` : iconUrl,
    videoUrl: String(project.video?.url || ''),
    gameUrl: '',
    location: '',
    event: String(project.eventName || project.courseId || ''),
    achievements: [] as string[],
    stats: {
      complexity: avg('complexity'),
      creativity: avg('creativity'),
      completeness: avg('completeness'),
      fun: avg('fun'),
    },
    teamMembers,
    sourceProjectId: String(project.projectId || ''),
    sourceFileId: String(project.video?.driveFileId || ''),
  };

  await writeJson(fp, info);
  regenerateRegistries();
  revalidateAll();
  return { ok: true, gameId: safeId };
}

export async function importSubmittedProject(projectId: string): Promise<ImportResult> {
  return importInternal(projectId, { allowOverwrite: false });
}

export async function resyncSubmittedProject(projectId: string): Promise<ImportResult> {
  return importInternal(projectId, { allowOverwrite: true });
}

export type AdminSubmitResult = {
  success: boolean;
  projectId?: string;
  error?: string;
  message?: string;
};

export async function adminSubmitProjectFor(formData: FormData): Promise<AdminSubmitResult> {
  assertDev();
  const url = `${NUUTOR_API_BASE}/admin/submit-project-for`;
  const res = await fetch(url, {
    method: 'POST',
    headers: adminHeaders(),
    body: formData,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success) {
    return {
      success: false,
      error: data?.error || `request_failed_${res.status}`,
      message: normalizeCourseMembershipMessage(data?.message || data?.error || `Request failed (${res.status})`),
    };
  }
  return { success: true, projectId: String(data.projectId || '') };
}

export type AdminMemberHit = {
  id: string;
  realName: string;
  nickname: string;
  username: string;
  discordId: string;
  webProfileUrl: string;
};

export async function searchAdminMembers(query: string): Promise<AdminMemberHit[]> {
  assertDev();
  const q = query.trim();
  if (!q) return [];
  const url = `${NUUTOR_API_BASE}/admin/members?search=${encodeURIComponent(q)}&limit=20`;
  const res = await fetch(url, { headers: adminHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json().catch(() => null);
  if (!data?.success || !Array.isArray(data.members)) return [];
  return data.members.map((m: any) => ({
    id: String(m.id || ''),
    realName: String(m.realName || m.fullname || ''),
    nickname: String(m.nickname || m.nick || ''),
    username: String(m.username || ''),
    discordId: String(m.discord_id || ''),
    webProfileUrl: String(m.webProfileUrl || ''),
  }));
}

export type SubmitCourse = {
  courseId: string;
  courseName: string;
  sheetName: string;
};

export async function fetchSubmitCourses(): Promise<SubmitCourse[]> {
  assertDev();
  const url = `${NUUTOR_API_BASE}/profile/submit-courses`;
  const res = await fetch(url, { headers: adminHeaders(), cache: 'no-store' });
  if (!res.ok) return [];
  const data = await res.json().catch(() => null);
  if (!data?.success || !Array.isArray(data.courses)) return [];
  return data.courses.map((c: any) => ({
    courseId: String(c.courseId || c.id || ''),
    courseName: String(c.courseName || c.name || ''),
    sheetName: String(c.sheetName || c.sheet || ''),
  }));
}

export async function fetchSubmitCourseVisibility(): Promise<SubmitCourseVisibilityConfig> {
  assertDev();
  return readSubmitCourseVisibility();
}

export async function saveSubmitCourseVisibility(
  visibleSheetNames: string[],
): Promise<SubmitCourseVisibilityConfig> {
  assertDev();
  const next = {
    visibleSheetNames: Array.from(
      new Set(visibleSheetNames.map((s) => String(s || '').trim()).filter(Boolean)),
    ),
  };
  await writeSubmitCourseVisibility(next);
  revalidateAll();
  return next;
}
