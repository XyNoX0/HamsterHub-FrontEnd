"use client";

import { Award, BarChart3, ExternalLink, FileText } from "lucide-react";
import type { MemberCertificateRecord, MemberReportRecord } from "../../lib/members";
import "./ProRecords.css";

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(date);
}

function numericStats(report: MemberReportRecord) {
  const stats = report.stats ?? {};
  return [
    ["Spirit", stats.spirit],
    ["Power", stats.power],
    ["Creative", stats.creative],
    ["Empathy", stats.empathy],
    ["Communicate", stats.communicate],
    ["Complexity", stats.complexity],
    ["Creativity", stats.creativity],
    ["Completeness", stats.completeness],
    ["Fun", stats.fun],
  ].filter(([, value]) => value != null && Number.isFinite(Number(value))) as Array<[string, number]>;
}

export function ProRecords({
  reports = [],
  certificates = [],
}: {
  reports?: MemberReportRecord[];
  certificates?: MemberCertificateRecord[];
}) {
  if (reports.length === 0 && certificates.length === 0) return null;

  return (
    <section className="page-zone page-zone--sea-soft records-section" id="records">
      <div className="records-container">
        {reports.length > 0 ? (
          <section className="records-panel" id="reports" aria-label="Reports">
            <header className="records-header">
              <BarChart3 aria-hidden />
              <h2>Reports</h2>
            </header>
            <div className="records-grid">
              {reports.map((report) => {
                const stats = numericStats(report);
                return (
                  <article className="records-card" key={report.id}>
                    <div className="records-cardHead">
                      <h3>{report.eventName || report.courseId || "Course report"}</h3>
                      {report.evaluatedAt ? <span>{formatDate(report.evaluatedAt)}</span> : null}
                    </div>
                    {stats.length > 0 ? (
                      <dl className="records-stats">
                        {stats.map(([label, value]) => (
                          <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                    {report.report ? <p className="records-copy">{report.report}</p> : null}
                    <div className="records-links">
                      {report.projectUrl ? (
                        <a href={report.projectUrl} target="_blank" rel="noopener noreferrer">
                          <FileText aria-hidden /> Project <ExternalLink aria-hidden />
                        </a>
                      ) : null}
                      {report.reportChartUrl ? (
                        <a href={report.reportChartUrl} target="_blank" rel="noopener noreferrer">
                          <BarChart3 aria-hidden /> Graph <ExternalLink aria-hidden />
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {certificates.length > 0 ? (
          <section className="records-panel" id="certificates" aria-label="Certificates">
            <header className="records-header">
              <Award aria-hidden />
              <h2>Certificates</h2>
            </header>
            <div className="records-certList">
              {certificates.map((certificate) => (
                <a
                  className="records-cert"
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={certificate.id}
                >
                  <span>
                    <strong>{certificate.eventName || certificate.courseId || certificate.fileName || "Certificate"}</strong>
                    {certificate.issuedAt ? <small>{formatDate(certificate.issuedAt)}</small> : null}
                  </span>
                  <ExternalLink aria-hidden />
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
