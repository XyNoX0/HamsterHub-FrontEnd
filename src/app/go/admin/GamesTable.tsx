"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { EditGameButton, CreateGameButton } from "./EditModals";
import type { RosterEntry } from "./TeamMembersEditor";
import type { Achievement } from "./AchievementsEditor";

export type GameRow = {
  game: any;
  health: "ok" | "warn" | "miss";
  mtime: string;
};

type SortKey = "id" | "title" | "team" | "event" | "members" | "mtime";

export function GamesTable({
  rows,
  roster,
  catalog,
}: {
  rows: GameRow[];
  roster: RosterEntry[];
  catalog: Achievement[];
}) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("mtime");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows;
    if (q) {
      list = list.filter(
        ({ game: g }) =>
          g.id.toLowerCase().includes(q) ||
          (g.title ?? "").toLowerCase().includes(q) ||
          (g.teamName ?? "").toLowerCase().includes(q) ||
          (g.event ?? "").toLowerCase().includes(q),
      );
    }
    const cmp = (a: GameRow, b: GameRow) => {
      const ag = a.game; const bg = b.game;
      let av: string | number = "";
      let bv: string | number = "";
      switch (sortBy) {
        case "id": av = ag.id; bv = bg.id; break;
        case "title": av = ag.title ?? ""; bv = bg.title ?? ""; break;
        case "team": av = ag.teamName ?? ""; bv = bg.teamName ?? ""; break;
        case "event": av = ag.event ?? ""; bv = bg.event ?? ""; break;
        case "members": av = ag.teamMembers?.length ?? 0; bv = bg.teamMembers?.length ?? 0; break;
        case "mtime": av = a.mtime; bv = b.mtime; break;
      }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    };
    return [...list].sort(cmp);
  }, [rows, query, sortBy, dir]);

  function toggleSort(k: SortKey) {
    if (sortBy === k) {
      setDir(dir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(k);
      setDir(k === "mtime" ? "desc" : "asc");
    }
  }

  function arrow(k: SortKey) {
    if (sortBy !== k) return "";
    return dir === "asc" ? " ↑" : " ↓";
  }

  return (
    <section className="adm-section">
      <div className="adm-sectionHeader">
        <h2 className="adm-sectionTitle">
          Games <span className="adm-issueCount">{filtered.length} / {rows.length}</span>
        </h2>
        <div className="adm-headerActions">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games…"
            className="adm-input adm-searchInput"
          />
          <CreateGameButton roster={roster} catalog={catalog} />
        </div>
      </div>
      <div className="adm-tableWrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th aria-label="Health" />
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("id")}>ID{arrow("id")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("title")}>Title{arrow("title")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("team")}>Team{arrow("team")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("event")}>Event{arrow("event")}</button></th>
              <th title="Complexity / Creativity / Completeness / Fun">Stats</th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("members")}>Mem{arrow("members")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("mtime")}>Edited{arrow("mtime")}</button></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ game: g, health, mtime }) => {
              const s = g.stats ?? {};
              return (
                <tr key={g.id}>
                  <td><span className={`adm-healthDot adm-healthDot--${health}`} /></td>
                  <td><code>{g.id}</code></td>
                  <td>{g.title}</td>
                  <td>{g.teamName}</td>
                  <td>{g.event ?? "—"}</td>
                  <td className="adm-num adm-mono">
                    {s.complexity ?? "-"}/{s.creativity ?? "-"}/{s.completeness ?? "-"}/{s.fun ?? "-"}
                  </td>
                  <td className="adm-num">{g.teamMembers?.length ?? 0}</td>
                  <td className="adm-mono adm-dimText">{mtime || "—"}</td>
                  <td>
                    <div className="adm-rowActions">
                      <Link href={`/go?game=${g.id}`} className="adm-viewBtn" title="Open in arena">↗</Link>
                      <EditGameButton game={g} roster={roster} catalog={catalog} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="adm-tableEmpty">No games match the filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
