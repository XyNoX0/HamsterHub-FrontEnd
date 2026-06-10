"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  importSubmittedProject,
  resyncSubmittedProject,
  type SubmittedProjectRow,
  type ImportResult,
} from "./actions";
import { CreateProjectForUserButton } from "./EditModals";

type SortKey = "title" | "team" | "event" | "members" | "status" | "updatedAt";

function statusBadge(row: SubmittedProjectRow) {
  if (row.imported) {
    return <span className="adm-badge adm-badge--ok">IMPORTED</span>;
  }
  if (row.unmappedTeamMembers.length > 0) {
    return <span className="adm-badge adm-badge--miss">BLOCKED</span>;
  }
  return <span className="adm-badge adm-badge--warn">PENDING</span>;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return iso.slice(0, 16).replace("T", " ");
}

export function SubmittedProjectsTable({ rows }: { rows: SubmittedProjectRow[] }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("updatedAt");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [result, setResult] = useState<{ id: string; data: ImportResult } | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows;
    if (q) {
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.projectId.toLowerCase().includes(q) ||
          r.teamName.toLowerCase().includes(q) ||
          r.eventName.toLowerCase().includes(q) ||
          r.team.some((m) =>
            (m.name + m.nickname + m.discordId).toLowerCase().includes(q),
          ),
      );
    }
    const statusRank = (r: SubmittedProjectRow): number => {
      if (r.imported) return 2;
      if (r.unmappedTeamMembers.length > 0) return 0;
      return 1;
    };
    const cmp = (a: SubmittedProjectRow, b: SubmittedProjectRow) => {
      let av: string | number = "";
      let bv: string | number = "";
      switch (sortBy) {
        case "title": av = a.title; bv = b.title; break;
        case "team": av = a.teamName; bv = b.teamName; break;
        case "event": av = a.eventName; bv = b.eventName; break;
        case "members": av = a.team.length; bv = b.team.length; break;
        case "status": av = statusRank(a); bv = statusRank(b); break;
        case "updatedAt": av = a.updatedAt || ""; bv = b.updatedAt || ""; break;
      }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    };
    return [...list].sort(cmp);
  }, [rows, query, sortBy, dir]);

  function toggleSort(k: SortKey) {
    if (sortBy === k) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSortBy(k);
      setDir(k === "updatedAt" || k === "members" ? "desc" : "asc");
    }
  }

  function arrow(k: SortKey) {
    if (sortBy !== k) return "";
    return dir === "asc" ? " ↑" : " ↓";
  }

  function handleImport(row: SubmittedProjectRow) {
    if (row.unmappedTeamMembers.length > 0) return;
    setPendingId(row.id);
    setResult(null);
    startTransition(async () => {
      try {
        const data = await importSubmittedProject(row.id);
        setResult({ id: row.id, data });
      } catch (err) {
        setResult({
          id: row.id,
          data: { ok: false, gameId: "", error: err instanceof Error ? err.message : "Import failed" },
        });
      } finally {
        setPendingId(null);
      }
    });
  }

  function handleResync(row: SubmittedProjectRow) {
    if (!row.imported) return;
    if (!confirm(`Re-sync "${row.title}" จาก MongoDB เขียนทับ /go ?`)) return;
    setPendingId(row.id);
    setResult(null);
    startTransition(async () => {
      try {
        const data = await resyncSubmittedProject(row.id);
        setResult({ id: row.id, data });
      } catch (err) {
        setResult({
          id: row.id,
          data: { ok: false, gameId: "", error: err instanceof Error ? err.message : "Re-sync failed" },
        });
      } finally {
        setPendingId(null);
      }
    });
  }

  const totalPending = rows.filter((r) => !r.imported).length;
  const totalImported = rows.filter((r) => r.imported).length;
  const totalBlocked = rows.filter((r) => !r.imported && r.unmappedTeamMembers.length > 0).length;

  return (
    <section className="adm-section">
      <div className="adm-sectionHeader">
        <h2 className="adm-sectionTitle">
          Submitted Projects{" "}
          <span className="adm-issueCount">
            {totalImported} imported · {totalPending - totalBlocked} ready · {totalBlocked} blocked
          </span>
        </h2>
        <div className="adm-headerActions">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, team, members…"
            className="adm-input adm-searchInput"
          />
          <CreateProjectForUserButton />
        </div>
      </div>

      {result && result.data.unmapped && result.data.unmapped.length > 0 && (
        <div className="adm-allClear" style={{ background: "#fff4d6", borderColor: "#ffcb47" }}>
          <span className="adm-allClearIcon">⚠</span>
          <span>
            Import blocked: missing /go profile for{" "}
            <strong>
              {result.data.unmapped.map((u) => u.name || u.discordId).join(", ")}
            </strong>
            . สร้าง member ใน /go ก่อนหรือเชื่อม Discord ID ให้กับ member ที่มีอยู่
          </span>
        </div>
      )}

      {result && result.data.error && (
        <div className="adm-allClear" style={{ background: "#ffe4e1", borderColor: "#e05b30" }}>
          <span className="adm-allClearIcon">✗</span>
          <span>Error: {result.data.error}</span>
        </div>
      )}

      {result && result.data.ok && (
        <div className="adm-allClear">
          <span className="adm-allClearIcon">✓</span>
          <span>Imported as game <code>{result.data.gameId}</code></span>
        </div>
      )}

      <div className="adm-tableWrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("status")}>
                  Status{arrow("status")}
                </button>
              </th>
              <th>
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("title")}>
                  Title{arrow("title")}
                </button>
              </th>
              <th>
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("team")}>
                  Team{arrow("team")}
                </button>
              </th>
              <th>
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("event")}>
                  Event{arrow("event")}
                </button>
              </th>
              <th title="Total members / blocked">
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("members")}>
                  Members{arrow("members")}
                </button>
              </th>
              <th>Source</th>
              <th>
                <button type="button" className="adm-sortBtn" onClick={() => toggleSort("updatedAt")}>
                  Updated{arrow("updatedAt")}
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const blocked = r.unmappedTeamMembers.length > 0;
              const isRowPending = isPending && pendingId === r.id;
              const blockedHint = blocked
                ? r.unmappedTeamMembers.map((u) => u.name || u.discordId).join(", ")
                : "";
              return (
                <tr key={r.id}>
                  <td>{statusBadge(r)}</td>
                  <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <strong>{r.title}</strong>
                      <code className="adm-dimText" style={{ fontSize: 11 }}>{r.projectId}</code>
                    </div>
                  </td>
                  <td>{r.teamName || <span className="adm-dimText">—</span>}</td>
                  <td>{r.eventName || <span className="adm-dimText">—</span>}</td>
                  <td className="adm-num" title={blocked ? `Blocked: ${blockedHint}` : ""}>
                    {r.team.length}
                    {blocked && (
                      <span style={{ color: "#e05b30", fontSize: 11, marginLeft: 4 }}>
                        ⚠{r.unmappedTeamMembers.length}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="adm-dimText" style={{ fontSize: 11 }}>{r.source || "—"}</span>
                  </td>
                  <td className="adm-mono adm-dimText">{formatDate(r.updatedAt)}</td>
                  <td>
                    <div className="adm-rowActions">
                      {r.imported && r.importedGameId && (
                        <Link
                          href={`/go?game=${r.importedGameId}`}
                          className="adm-viewBtn"
                          title="Open in arena"
                        >
                          ↗
                        </Link>
                      )}
                      {!r.imported && (
                        <button
                          type="button"
                          className="adm-viewBtn"
                          disabled={blocked || isRowPending}
                          onClick={() => handleImport(r)}
                          title={blocked ? `Blocked: ${blockedHint}` : "Import to /go"}
                        >
                          {isRowPending ? "…" : "Import"}
                        </button>
                      )}
                      {r.imported && (
                        <button
                          type="button"
                          className="adm-viewBtn"
                          disabled={isRowPending}
                          onClick={() => handleResync(r)}
                          title="Re-sync from MongoDB (overwrite)"
                        >
                          {isRowPending ? "…" : "Re-sync"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="adm-tableEmpty">No submitted projects match the filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
