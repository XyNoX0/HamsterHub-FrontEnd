// Server-side snapshot of the dekhub /getMemberData response. Written by
// scripts/sync-dekhub.mjs and the admin "Sync" action, read by /profile pages.
//
// The file lives next to the other JSON data so it is naturally scoped to
// /go and gitignored at the data/ level (see .gitignore). This module uses
// node:fs and must only be imported from server code (pages, server actions,
// route handlers — never a "use client" file).

import fs from "node:fs/promises";
import path from "node:path";
import type { DekhubMember } from "./dekhub";

export type DekhubSnapshot = {
  syncedAt: string;
  byDiscordId: Record<string, DekhubMember>;
};

const CACHE_PATH = path.join(
  process.cwd(),
  "src/app/go/data/dekhub-cache.json",
);

const EMPTY: DekhubSnapshot = { syncedAt: "", byDiscordId: {} };

let memo: { mtimeMs: number; snapshot: DekhubSnapshot } | null = null;

async function readSnapshotFromDisk(): Promise<DekhubSnapshot> {
  try {
    const st = await fs.stat(CACHE_PATH);
    if (memo && memo.mtimeMs === st.mtimeMs) return memo.snapshot;
    const raw = await fs.readFile(CACHE_PATH, "utf8");
    const parsed = JSON.parse(raw) as DekhubSnapshot;
    const snapshot: DekhubSnapshot = {
      syncedAt: parsed.syncedAt ?? "",
      byDiscordId: parsed.byDiscordId ?? {},
    };
    memo = { mtimeMs: st.mtimeMs, snapshot };
    return snapshot;
  } catch {
    return EMPTY;
  }
}

export async function readSnapshot(): Promise<DekhubSnapshot> {
  return readSnapshotFromDisk();
}

export async function getCachedMember(
  discordId: string,
): Promise<DekhubMember | undefined> {
  if (!discordId) return undefined;
  const snap = await readSnapshotFromDisk();
  return snap.byDiscordId[discordId];
}

export async function writeSnapshot(members: DekhubMember[]): Promise<DekhubSnapshot> {
  const byDiscordId: Record<string, DekhubMember> = {};
  for (const m of members) byDiscordId[m.discordId] = m;
  const snapshot: DekhubSnapshot = {
    syncedAt: new Date().toISOString(),
    byDiscordId,
  };
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  memo = null;
  return snapshot;
}
