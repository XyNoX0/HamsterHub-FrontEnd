"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { EditMemberButton, CreateMemberButton } from "./EditModals";
import type { Achievement } from "./AchievementsEditor";

export type MemberRow = {
  member: any;
  hasOverride: boolean;
  override: any;
  health: "ok" | "warn" | "miss";
  mtime: string;
};

type SortKey = "slug" | "name" | "projects" | "rank" | "mtime";

function badge(sev: "ok" | "warn" | "miss", label: string) {
  return <span className={`adm-badge adm-badge--${sev}`}>{label}</span>;
}

function isMissing(v: unknown) {
  if (v === null || v === undefined) return true;
  if (typeof v === "string") return v.trim().length === 0;
  return false;
}

export function MembersTable({
  rows,
  catalog,
}: {
  rows: MemberRow[];
  catalog: Achievement[];
}) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("projects");
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows;
    if (q) {
      list = list.filter(
        ({ member: m }) =>
          m.slug.toLowerCase().includes(q) ||
          (m.name ?? "").toLowerCase().includes(q) ||
          (m.username ?? "").toLowerCase().includes(q),
      );
    }
    const cmp = (a: MemberRow, b: MemberRow) => {
      const am = a.member; const bm = b.member;
      let av: string | number = "";
      let bv: string | number = "";
      switch (sortBy) {
        case "slug": av = am.slug; bv = bm.slug; break;
        case "name": av = am.name ?? ""; bv = bm.name ?? ""; break;
        case "projects": av = am.projectsCount ?? 0; bv = bm.projectsCount ?? 0; break;
        case "rank": av = am.rank ?? ""; bv = bm.rank ?? ""; break;
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
      setDir(k === "mtime" || k === "projects" ? "desc" : "asc");
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
          Members <span className="adm-issueCount">{filtered.length} / {rows.length}</span>
        </h2>
        <div className="adm-headerActions">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search members…"
            className="adm-input adm-searchInput"
          />
          <CreateMemberButton catalog={catalog} />
        </div>
      </div>
      <div className="adm-tableWrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th aria-label="Health" />
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("slug")}>Slug{arrow("slug")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("name")}>Name{arrow("name")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("projects")}>Proj{arrow("projects")}</button></th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("rank")}>Rank{arrow("rank")}</button></th>
              <th>Override</th>
              <th>Img</th>
              <th><button type="button" className="adm-sortBtn" onClick={() => toggleSort("mtime")}>Edited{arrow("mtime")}</button></th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ member: m, hasOverride, override, health, mtime }) => (
              <tr key={m.slug}>
                <td><span className={`adm-healthDot adm-healthDot--${health}`} /></td>
                <td><code>{m.slug}</code></td>
                <td>{m.name}</td>
                <td className="adm-num">{m.projectsCount}</td>
                <td>{m.rank === "Warrior" ? <span className="adm-dimText">Warrior</span> : m.rank}</td>
                <td>{hasOverride ? badge("ok", "yes") : badge("warn", "no")}</td>
                <td>{isMissing(m.profileSrc) ? badge("miss", "—") : badge("ok", "OK")}</td>
                <td className="adm-mono adm-dimText">{mtime || "—"}</td>
                <td>
                  <div className="adm-rowActions">
                    <Link href={`/profile/${m.slug}`} className="adm-viewBtn" title="Open profile">↗</Link>
                    <EditMemberButton
                      member={{
                        slug: m.slug,
                        name: m.name,
                        hasOverride,
                        override: override ?? {},
                      }}
                      catalog={catalog}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="adm-tableEmpty">No members match the filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
