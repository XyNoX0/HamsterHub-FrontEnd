"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ArrowRight, Sparkles, Search, X } from "lucide-react";
import type { AggregateMember } from "../../lib/members";
import { getMemberVibe, publicProfileHeadline } from "../../lib/members";
import { renderableImageSrc } from "../../lib/image-src";
import "./ProDirectory.css";

function DirectoryAvatar({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageSrc = renderableImageSrc(src);
  if (!imageSrc || error) {
    return (
      <div className="directory-avatarFallback">
        <User strokeWidth={2} aria-hidden />
      </div>
    );
  }
  return (
    <>
      {!loaded && <span className="skel skel-imageFill" aria-hidden />}
      <Image
        src={imageSrc}
        alt={alt}
        width={120}
        height={120}
        className="directory-avatarImg skel-imageFade"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        unoptimized
      />
    </>
  );
}

function MemberCard({ m, index }: { m: AggregateMember; index: number }) {
  const vibe = getMemberVibe(m);
  const href = `/profile/${m.slug}`;
  return (
    <li className="directory-cardWrap" style={{ ["--i" as string]: index } as React.CSSProperties}>
      <Link
        href={href}
        className="directory-card"
        aria-label={`ดูโปรไฟล์ของ ${publicProfileHeadline(m)}`}
      >
        <div className="directory-avatarFrame">
          <DirectoryAvatar src={m.profileSrc} alt={publicProfileHeadline(m)} />
        </div>
        <div className="directory-cardBody">
          <h3 className="directory-name">{publicProfileHeadline(m)}</h3>
          {m.username ? (
            <p className="directory-nickname">ชื่อเล่น · {m.username}</p>
          ) : null}
          <span className="directory-roleChip">{m.rank}</span>
          <p className={`directory-vibe directory-vibe-${vibe.tone}`}>
            <Sparkles className="directory-vibeIcon" strokeWidth={2.4} aria-hidden />
            <span>{vibe.text}</span>
          </p>
          <p className="directory-projects">
            <span className="directory-projectsNum">{m.games.length}</span>
            <span className="directory-projectsLabel">
              {m.games.length === 1 ? "project" : "projects"}
            </span>
            <ArrowRight className="directory-arrow" strokeWidth={2.4} aria-hidden />
          </p>
        </div>
      </Link>
    </li>
  );
}

function buildSearchHaystack(m: AggregateMember): string {
  const parts = [
    m.name,
    m.username,
    m.slug,
    m.rank,
    ...m.roles,
    ...m.games.map((g) => `${g.title} ${g.event} ${g.teamName} ${g.role}`),
  ];
  return parts.join(" ").toLowerCase();
}

type DirectoryPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

function pageHref(page: number, limit: number) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  return `/profile?${params.toString()}`;
}

export function ProDirectory({
  members,
  pagination,
}: {
  members: AggregateMember[];
  pagination?: DirectoryPagination;
}) {
  const [query, setQuery] = useState("");
  const ranks: Array<[string, number]> = [];
  const rankFilter = null;
  const setRankFilter = (_rank: string | null) => {};

  const haystacks = useMemo(() => {
    const map = new Map<string, string>();
    for (const m of members) map.set(m.slug, buildSearchHaystack(m));
    return map;
  }, [members]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return members.filter((m) => {
      if (!q) return true;
      return (haystacks.get(m.slug) ?? "").includes(q);
    });
  }, [members, query, haystacks]);

  const isFiltering = query.trim().length > 0;
  const totalProfiles = pagination?.total ?? members.length;
  const clearAll = () => {
    setQuery("");
  };

  return (
    <section className="page-zone page-zone--sea-soft directory-section">
      <div className="directory-container">
        <header className="directory-header">
          <div className="directory-titleRow">
            <h1 className="directory-title">
              <span className="directory-goWord">Go</span>
              <span className="directory-proWord">Pro</span>
              <Sparkles className="directory-titleSpark" strokeWidth={2.2} aria-hidden />
            </h1>
          </div>
          <p className="directory-subtitle">
            โปรไฟล์ของเด็กเก่งทุกคนใน Go Dang — กดเข้าไปดูผลงานของพวกเขา
          </p>
          <p className="directory-count">
            <span className="directory-countNum">
              {isFiltering ? `${filtered.length}/${members.length}` : totalProfiles}
            </span>
            <span className="directory-countLabel">
              {isFiltering ? "Matches" : "Creators"}
            </span>
          </p>
        </header>

        <div className="directory-toolbar" role="search">
          <label className="directory-searchField">
            <Search className="directory-searchIcon" strokeWidth={2.4} aria-hidden />
            <input
              type="search"
              className="directory-searchInput"
              placeholder="ค้นหาชื่อ ชื่อเล่น role หรือชื่อเกม…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="ค้นหาโปรไฟล์"
            />
            {query && (
              <button
                type="button"
                className="directory-searchClear"
                onClick={() => setQuery("")}
                aria-label="ล้างคำค้นหา"
              >
                <X strokeWidth={2.6} aria-hidden />
              </button>
            )}
          </label>

          {ranks.length > 1 && (
            <div className="directory-rankChips" role="group" aria-label="กรองตาม rank">
              <button
                type="button"
                className={`directory-rankChip${rankFilter === null ? " is-active" : ""}`}
                onClick={() => setRankFilter(null)}
              >
                ทั้งหมด <span className="directory-rankChipNum">{members.length}</span>
              </button>
              {ranks.map(([rank, count]) => (
                <button
                  key={rank}
                  type="button"
                  className={`directory-rankChip${rankFilter === rank ? " is-active" : ""}`}
                  onClick={() => setRankFilter(rankFilter === rank ? null : rank)}
                >
                  {rank} <span className="directory-rankChipNum">{count}</span>
                </button>
              ))}
            </div>
          )}

          {isFiltering && (
            <button type="button" className="directory-clearAll" onClick={clearAll}>
              ล้างตัวกรอง
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="directory-empty" role="status">
            <p className="directory-emptyTitle">ไม่พบโปรไฟล์ที่ตรงกับการค้นหา</p>
            <p className="directory-emptyHint">ลองพิมพ์คำอื่น หรือกดปุ่ม “ล้างตัวกรอง”</p>
            <button type="button" className="directory-emptyReset" onClick={clearAll}>
              ล้างตัวกรอง
            </button>
          </div>
        ) : (
          <ul className="directory-grid is-staggered">
            {filtered.map((m, i) => (
              <MemberCard key={m.slug} m={m} index={i} />
            ))}
          </ul>
        )}

        {pagination && pagination.totalPages > 1 && !isFiltering ? (
          <nav className="directory-pagination" aria-label="Profile pages">
            <Link
              className={`directory-pageLink${pagination.hasPrev ? "" : " is-disabled"}`}
              href={pageHref(Math.max(1, pagination.page - 1), pagination.limit)}
              aria-disabled={!pagination.hasPrev}
              tabIndex={pagination.hasPrev ? 0 : -1}
            >
              Previous
            </Link>
            <span className="directory-pageStatus">
              Page {pagination.page} / {pagination.totalPages}
            </span>
            <Link
              className={`directory-pageLink${pagination.hasNext ? "" : " is-disabled"}`}
              href={pageHref(Math.min(pagination.totalPages, pagination.page + 1), pagination.limit)}
              aria-disabled={!pagination.hasNext}
              tabIndex={pagination.hasNext ? 0 : -1}
            >
              Next
            </Link>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
