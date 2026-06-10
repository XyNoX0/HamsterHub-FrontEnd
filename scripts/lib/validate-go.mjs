/**
 * Go Dang data validator — used by /go/admin (page + ToolsBar).
 * Reads JSON from disk so it stays in sync with gen-go-registries / export scripts.
 */
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const GAMES_DIR = path.join(ROOT, "src/app/go/data/games");
const PROFILES_DIR = path.join(ROOT, "src/app/go/data/members/profiles");
const EVENTS_DIR = path.join(ROOT, "src/app/go/data/events");
const REGISTRY_GENERATED = path.join(GAMES_DIR, "registry.generated.ts");
const PUBLIC_DIR = path.join(ROOT, "public");

const RESERVED_MEMBER_SLUGS = new Set(["_debug_member_", "template"]);
const EVENT_KINDS = new Set(["jam", "workshop", "showcase", "competition"]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** @typedef {{ kind: 'game'|'member'|'event'; id: string; field: string; severity: 'critical'|'warn'; note?: string }} ValidationIssue */

/** @param {ValidationIssue[]} issues @param {ValidationIssue} issue */
function add(issues, issue) {
  issues.push(issue);
}

/** @param {string} src */
async function publicAssetExists(src) {
  if (!src || typeof src !== "string" || !src.startsWith("/")) return false;
  try {
    await fs.access(path.join(PUBLIC_DIR, src.replace(/^\//, "")));
    return true;
  } catch {
    return false;
  }
}

/** @param {string} fp */
async function readJson(fp) {
  try {
    const raw = await fs.readFile(fp, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** @param {string} dir @returns {Promise<string[]>} */
async function listDirs(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}

/** @param {string} dir @returns {Promise<string[]>} */
async function listJsonFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter((e) => e.isFile() && e.name.endsWith(".json")).map((e) => e.name);
  } catch {
    return [];
  }
}

/** @param {Array<{ id: string; name: string }>} events */
function buildEventIndex(events) {
  const index = new Map();
  for (const e of events) {
    if (e.id) index.set(String(e.id).toLowerCase(), e);
    if (e.name) index.set(String(e.name).toLowerCase(), e);
  }
  return index;
}

/** @param {string} registryText @returns {Set<string>} */
function parseRegistryGameIds(registryText) {
  const ids = new Set();
  const re = /from '\.\/([^/]+)\/info\.json'/g;
  let m;
  while ((m = re.exec(registryText)) !== null) {
    ids.add(m[1]);
  }
  return ids;
}

export async function validateAll() {
  /** @type {ValidationIssue[]} */
  const issues = [];

  // ── Events ──────────────────────────────────────────────────────
  const eventFiles = (await listJsonFiles(EVENTS_DIR)).filter(
    (f) => f !== "package.json",
  );
  /** @type {Array<{ id: string; name: string; kind?: string; posterSrc?: string }>} */
  const events = [];
  for (const file of eventFiles) {
    const id = file.replace(/\.json$/, "");
    const data = await readJson(path.join(EVENTS_DIR, file));
    if (!data) {
      add(issues, {
        kind: "event",
        id,
        field: "file",
        severity: "critical",
        note: "Could not read or parse JSON",
      });
      continue;
    }
    events.push(data);
    if (data.id !== id) {
      add(issues, {
        kind: "event",
        id,
        field: "id",
        severity: "critical",
        note: `JSON id "${data.id}" does not match filename`,
      });
    }
    if (!data.name?.trim()) {
      add(issues, {
        kind: "event",
        id,
        field: "name",
        severity: "critical",
        note: "Missing event name",
      });
    }
    if (!data.kind || !EVENT_KINDS.has(data.kind)) {
      add(issues, {
        kind: "event",
        id,
        field: "kind",
        severity: "critical",
        note: `kind must be one of: ${[...EVENT_KINDS].join(", ")}`,
      });
    }
    if (data.posterSrc && !(await publicAssetExists(data.posterSrc))) {
      add(issues, {
        kind: "event",
        id,
        field: "posterSrc",
        severity: "warn",
        note: `Asset not found: ${data.posterSrc}`,
      });
    }
  }

  const eventIndex = buildEventIndex(events);

  // ── Member profiles ─────────────────────────────────────────────
  const profileFiles = await listJsonFiles(PROFILES_DIR);
  const profileSlugs = new Set();
  for (const file of profileFiles) {
    const slug = file.replace(/\.json$/, "");
    profileSlugs.add(slug);
    const data = await readJson(path.join(PROFILES_DIR, file));
    if (!data) {
      add(issues, {
        kind: "member",
        id: slug,
        field: "file",
        severity: "critical",
        note: "Could not read or parse JSON",
      });
      continue;
    }
    if (RESERVED_MEMBER_SLUGS.has(slug)) {
      add(issues, {
        kind: "member",
        id: slug,
        field: "slug",
        severity: "warn",
        note: "Reserved slug — should not appear in public listings",
      });
    }
    if (!SLUG_RE.test(slug)) {
      add(issues, {
        kind: "member",
        id: slug,
        field: "slug",
        severity: "warn",
        note: "Slug should be lowercase ASCII with hyphens only",
      });
    }
    if (data.slug && data.slug !== slug) {
      add(issues, {
        kind: "member",
        id: slug,
        field: "slug",
        severity: "warn",
        note: `JSON slug "${data.slug}" does not match filename`,
      });
    }
  }

  // ── Games ───────────────────────────────────────────────────────
  const gameDirs = await listDirs(GAMES_DIR);
  const gameIdsFromDisk = new Set();
  const memberAppearances = new Set();
  const seenGameIds = new Set();

  for (const dir of gameDirs) {
    if (dir.startsWith(".") || dir === "node_modules") continue;
    const infoPath = path.join(GAMES_DIR, dir, "info.json");
    let data;
    try {
      data = JSON.parse(await fs.readFile(infoPath, "utf8"));
    } catch {
      add(issues, {
        kind: "game",
        id: dir,
        field: "info.json",
        severity: "critical",
        note: "Missing or invalid info.json",
      });
      continue;
    }

    const id = data.id ?? dir;
    gameIdsFromDisk.add(id);

    if (seenGameIds.has(id)) {
      add(issues, {
        kind: "game",
        id,
        field: "id",
        severity: "critical",
        note: "Duplicate game id",
      });
    }
    seenGameIds.add(id);

    if (id !== dir) {
      add(issues, {
        kind: "game",
        id,
        field: "id",
        severity: "warn",
        note: `Folder "${dir}" does not match id "${id}"`,
      });
    }

    for (const field of ["title", "teamName", "event"]) {
      if (!data[field]?.toString?.().trim?.()) {
        add(issues, {
          kind: "game",
          id,
          field,
          severity: "critical",
          note: "Required field is empty",
        });
      }
    }

    if (data.event && !eventIndex.has(String(data.event).toLowerCase())) {
      add(issues, {
        kind: "game",
        id,
        field: "event",
        severity: "critical",
        note: `Unknown event "${data.event}" — add data/events/<id>.json`,
      });
    }

    for (const assetField of ["posterSrc", "iconSrc"]) {
      const src = data[assetField];
      if (!src) {
        add(issues, {
          kind: "game",
          id,
          field: assetField,
          severity: "warn",
          note: "Missing asset path",
        });
      } else if (!(await publicAssetExists(src))) {
        add(issues, {
          kind: "game",
          id,
          field: assetField,
          severity: "warn",
          note: `Asset not found under public/: ${src}`,
        });
      }
    }

    if (data.stats) {
      for (const key of ["complexity", "creativity", "completeness", "fun"]) {
        const v = data.stats[key];
        if (v != null && (typeof v !== "number" || v < 1 || v > 5)) {
          add(issues, {
            kind: "game",
            id,
            field: `stats.${key}`,
            severity: "warn",
            note: "Stat should be a number from 1 to 5",
          });
        }
      }
    }

    const members = Array.isArray(data.teamMembers) ? data.teamMembers : [];
    if (members.length === 0) {
      add(issues, {
        kind: "game",
        id,
        field: "teamMembers",
        severity: "warn",
        note: "No team members listed",
      });
    }

    for (const [i, m] of members.entries()) {
      const slug = (m.slug ?? m.username ?? "").toString().toLowerCase().trim();
      if (!slug) {
        add(issues, {
          kind: "game",
          id,
          field: `teamMembers[${i}]`,
          severity: "warn",
          note: "Member missing slug and username",
        });
        continue;
      }
      if (RESERVED_MEMBER_SLUGS.has(slug)) {
        add(issues, {
          kind: "game",
          id,
          field: `teamMembers[${i}].slug`,
          severity: "critical",
          note: `Reserved slug "${slug}" must not appear in teamMembers`,
        });
        continue;
      }
      memberAppearances.add(slug);
      if (!profileSlugs.has(slug)) {
        add(issues, {
          kind: "game",
          id,
          field: `teamMembers[${i}].slug`,
          severity: "warn",
          note: `No profile at data/members/profiles/${slug}.json`,
        });
      }
      if (m.profileSrc && !(await publicAssetExists(m.profileSrc))) {
        add(issues, {
          kind: "game",
          id,
          field: `teamMembers[${i}].profileSrc`,
          severity: "warn",
          note: `Asset not found: ${m.profileSrc}`,
        });
      }
    }
  }

  // Profiles with no game appearance (informational)
  for (const slug of profileSlugs) {
    if (RESERVED_MEMBER_SLUGS.has(slug)) continue;
    if (!memberAppearances.has(slug)) {
      add(issues, {
        kind: "member",
        id: slug,
        field: "appearances",
        severity: "warn",
        note: "Profile exists but member does not appear on any game team",
      });
    }
  }

  // Registry.generated.ts sync
  try {
    const registryText = await fs.readFile(REGISTRY_GENERATED, "utf8");
    const registryIds = parseRegistryGameIds(registryText);
    for (const id of gameIdsFromDisk) {
      if (!registryIds.has(id)) {
        add(issues, {
          kind: "game",
          id,
          field: "registry.generated.ts",
          severity: "critical",
          note: "Game folder exists but is not imported — run node scripts/gen-go-registries.mjs",
        });
      }
    }
    for (const id of registryIds) {
      if (!gameIdsFromDisk.has(id)) {
        add(issues, {
          kind: "game",
          id,
          field: "registry.generated.ts",
          severity: "critical",
          note: "Listed in registry.generated.ts but folder/info.json is missing",
        });
      }
    }
  } catch {
    add(issues, {
      kind: "game",
      id: "(registry)",
      field: "registry.generated.ts",
      severity: "critical",
      note: "Could not read registry.generated.ts",
    });
  }

  const critical = issues.filter((i) => i.severity === "critical").length;
  const warn = issues.filter((i) => i.severity === "warn").length;

  return { issues, critical, warn };
}
