"use client";

import { GraduationCap, Award, ExternalLink } from "lucide-react";
import type { DekhubMember } from "../../lib/dekhub";
import "./ProAcademic.css";

function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

function hasAnyScore(e: DekhubMember["evaluations"][number]): boolean {
  return (
    e.complexity != null ||
    e.creativity != null ||
    e.completeness != null ||
    e.fun != null
  );
}

export function ProAcademic({ dekhub }: { dekhub: DekhubMember }) {
  const evaluated = dekhub.evaluations.filter(hasAnyScore);
  const certs = dekhub.certificates;

  if (dekhub.courses.length === 0 && evaluated.length === 0 && certs.length === 0) {
    return null;
  }

  return (
    <section className="page-zone page-zone--sea-soft acad-section">
      <header className="acad-header">
        <GraduationCap className="acad-headerIcon" strokeWidth={2.4} aria-hidden />
        <h2 className="acad-title">Academic Record</h2>
        <span className="acad-sub">จาก dekhub</span>
      </header>

      {dekhub.courses.length > 0 && (
        <div className="acad-chipsRow">
          {dekhub.courses.map((c, i) => (
            <span key={`${c}-${i}`} className="acad-chip">
              {c}
            </span>
          ))}
        </div>
      )}

      {evaluated.length > 0 && (
        <div className="acad-evalGrid">
          {evaluated.map((e, i) => (
            <article key={`${e.courseId}-${i}`} className="acad-evalCard">
              <header className="acad-evalHead">
                <h3 className="acad-evalName">{e.courseId || "Course"}</h3>
                {e.evaluatedAt && (
                  <span className="acad-evalDate">{formatDate(e.evaluatedAt)}</span>
                )}
              </header>
              <dl className="acad-stats">
                {e.complexity != null && (
                  <div className="acad-stat">
                    <dt>Complexity</dt>
                    <dd>{e.complexity}</dd>
                  </div>
                )}
                {e.creativity != null && (
                  <div className="acad-stat">
                    <dt>Creativity</dt>
                    <dd>{e.creativity}</dd>
                  </div>
                )}
                {e.completeness != null && (
                  <div className="acad-stat">
                    <dt>Completeness</dt>
                    <dd>{e.completeness}</dd>
                  </div>
                )}
                {e.fun != null && (
                  <div className="acad-stat">
                    <dt>Fun</dt>
                    <dd>{e.fun}</dd>
                  </div>
                )}
              </dl>
              {e.report && <p className="acad-evalReport">{e.report}</p>}
              {e.projectUrl && (
                <a
                  className="acad-evalLink"
                  href={e.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Project <ExternalLink size={12} strokeWidth={2.4} aria-hidden />
                </a>
              )}
            </article>
          ))}
        </div>
      )}

      {certs.length > 0 && (
        <div className="acad-certList">
          <h3 className="acad-certHead">
            <Award size={16} strokeWidth={2.4} aria-hidden />
            Certificates
          </h3>
          <ul>
            {certs.map((c, i) => (
              <li key={`${c.courseId}-${i}`} className="acad-certItem">
                <a
                  href={c.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="acad-certLink"
                >
                  <span className="acad-certName">{c.eventName || c.courseId}</span>
                  {c.issuedAt && (
                    <span className="acad-certDate">{formatDate(c.issuedAt)}</span>
                  )}
                  <ExternalLink size={12} strokeWidth={2.4} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
