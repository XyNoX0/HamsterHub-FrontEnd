"use client";

import { useState, useMemo } from "react";

export type RosterEntry = {
  slug: string;
  name: string;
  username: string;
  profileSrc: string;
};

export type TeamMember = {
  slug?: string;
  name: string;
  username: string;
  profileSrc: string;
  roles: string[];
};

export function TeamMembersEditor({
  value,
  onChange,
  roster,
}: {
  value: TeamMember[];
  onChange: (next: TeamMember[]) => void;
  roster: RosterEntry[];
}) {
  const [query, setQuery] = useState("");

  const usedSlugs = useMemo(
    () => new Set(value.map((m) => m.slug ?? m.username.toLowerCase())),
    [value],
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];
    return roster
      .filter((r) => !usedSlugs.has(r.slug))
      .filter(
        (r) =>
          r.slug.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          r.username.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, roster, usedSlugs]);

  function add(entry: RosterEntry) {
    const next: TeamMember = {
      slug: entry.slug,
      name: entry.name,
      username: entry.username,
      profileSrc: entry.profileSrc,
      roles: ["Developer"],
    };
    onChange([...value, next]);
    setQuery("");
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function setRole(idx: number, role: string) {
    onChange(value.map((m, i) => (i === idx ? { ...m, roles: [role] } : m)));
  }

  return (
    <div className="adm-tmEditor">
      <ul className="adm-tmList">
        {value.map((m, i) => (
          <li key={`${m.slug ?? m.username}-${i}`} className="adm-tmChip">
            {m.profileSrc ? (
              <img
                src={m.profileSrc}
                alt=""
                className="adm-tmAvatar"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                }}
              />
            ) : (
              <span className="adm-tmAvatar adm-tmAvatar--empty" aria-hidden />
            )}
            <span className="adm-tmName">
              {m.name}
              <span className="adm-tmSlug"> · {m.slug ?? m.username}</span>
            </span>
            <input
              type="text"
              className="adm-input adm-tmRole"
              value={m.roles[0] ?? ""}
              onChange={(e) => setRole(i, e.target.value)}
              placeholder="Role"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="adm-tmRemove"
              aria-label={`Remove ${m.name}`}
            >
              ×
            </button>
          </li>
        ))}
        {value.length === 0 && (
          <li className="adm-tmEmpty">No members yet — search below to add.</li>
        )}
      </ul>

      <div className="adm-tmPicker">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="adm-input adm-tmQuery"
          placeholder="ค้นหา (ชื่อจริง / ชื่อเล่น / slug)…"
        />
        {matches.length > 0 && (
          <ul className="adm-tmResults">
            {matches.map((r) => (
              <li key={r.slug}>
                <button
                  type="button"
                  className="adm-tmResult"
                  onClick={() => add(r)}
                >
                  {r.profileSrc && (
                    <img
                      src={r.profileSrc}
                      alt=""
                      className="adm-tmAvatar"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                      }}
                    />
                  )}
                  <span className="adm-tmName">
                    {r.name}
                    <span className="adm-tmSlug"> · {r.slug}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
