"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { runValidate, runExport, runDekhubSync, type ValidateSummary, type ExportResult, type DekhubSyncResult } from "./actions";

type ResultState =
  | { kind: "validate"; data: ValidateSummary }
  | { kind: "export"; data: ExportResult }
  | { kind: "sync"; data: DekhubSyncResult }
  | null;

export function ToolsBar() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<ResultState>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function doValidate() {
    setResult(null);
    start(async () => {
      const r = await runValidate();
      setResult({ kind: "validate", data: r });
      setOpen(true);
      router.refresh();
    });
  }

  function doExport() {
    setResult(null);
    start(async () => {
      const r = await runExport();
      setResult({ kind: "export", data: r });
      setOpen(true);
      router.refresh();
    });
  }

  function doSync() {
    setResult(null);
    start(async () => {
      const r = await runDekhubSync();
      setResult({ kind: "sync", data: r });
      setOpen(true);
      router.refresh();
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={doSync}
        disabled={pending}
        className="adm-quickChip adm-quickChip--action"
        title="Pull latest member data from nj.dekhub.com/getMemberData"
      >
        <span className="adm-quickChipLabel">{pending ? "…" : "Sync dekhub"}</span>
        <span className="adm-quickChipPath">refresh cache</span>
      </button>
      <button
        type="button"
        onClick={doValidate}
        disabled={pending}
        className="adm-quickChip adm-quickChip--action"
        title="Re-run all validators"
      >
        <span className="adm-quickChipLabel">{pending ? "…" : "Validate"}</span>
        <span className="adm-quickChipPath">check now</span>
      </button>
      <button
        type="button"
        onClick={doExport}
        disabled={pending}
        className="adm-quickChip adm-quickChip--action"
        title="Run scripts/export-go.mjs"
      >
        <span className="adm-quickChipLabel">{pending ? "…" : "Export"}</span>
        <span className="adm-quickChipPath">build module</span>
      </button>

      {open && result && (
        <div className="adm-modalOverlay" onClick={() => setOpen(false)}>
          <div className="adm-modalCard adm-modalCard--wide" onClick={(e) => e.stopPropagation()}>
            <header className="adm-modalHeader">
              <h3 className="adm-modalTitle">
                {result.kind === "validate"
                  ? `Validate — ${result.data.ok ? "OK" : `${result.data.critical} critical / ${result.data.warn} warn`}`
                  : result.kind === "export"
                    ? `Export — ${result.data.ok ? `OK (${result.data.durationMs}ms)` : "FAILED"}`
                    : `Sync dekhub — ${result.data.ok ? `${result.data.memberCount} members (${result.data.durationMs}ms)` : "FAILED"}`}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="adm-modalClose"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            {result.kind === "validate" ? (
              result.data.issues.length === 0 ? (
                <div className="adm-allClear">
                  <span className="adm-allClearIcon">✓</span>
                  <span>All checks passed.</span>
                </div>
              ) : (
                <div className="adm-tableWrap">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Where</th>
                        <th>Field</th>
                        <th>Severity</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.issues.map((it, i) => (
                        <tr key={i}>
                          <td>
                            <code>
                              {it.kind}/{it.id}
                            </code>
                          </td>
                          <td>
                            <code>{it.field}</code>
                          </td>
                          <td>
                            <span
                              className={`adm-badge adm-badge--${it.severity === "critical" ? "miss" : "warn"}`}
                            >
                              {it.severity}
                            </span>
                          </td>
                          <td className="adm-note">{it.note ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : result.kind === "sync" ? (
              <>
                {result.data.syncedAt && (
                  <p className="adm-dimText" style={{ fontSize: 13, marginBottom: 8 }}>
                    Cache synced at <code>{result.data.syncedAt}</code> · {result.data.memberCount} members
                  </p>
                )}
                <pre className="adm-toolsLog">{result.data.output || "(no output)"}</pre>
              </>
            ) : (
              <pre className="adm-toolsLog">{result.data.output || "(no output)"}</pre>
            )}

            <div className="adm-formFoot">
              <div className="adm-formActions">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="adm-btn adm-btn--primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
