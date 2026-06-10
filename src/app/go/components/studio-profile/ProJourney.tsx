"use client";

import { Sparkles, Sword, Compass } from "lucide-react";
import type { AggregateMember } from "../../lib/members";
import { deriveJourney } from "../../lib/members";
import "./ProJourney.css";

export function ProJourney({ member }: { member: AggregateMember }) {
  const stages = deriveJourney(member);
  if (stages.length === 0) return null;

  return (
    <section className="journey-card">
      <header className="journey-header">
        <Compass className="journey-headerIcon" strokeWidth={2.4} aria-hidden />
        <h2 className="journey-title">MY JOURNEY</h2>
      </header>

      <ol className="journey-list">
        {stages.map((s, i) => {
          const tone = s.tone ?? "muted";
          return (
            <li key={`${s.id}-${i}`} className={`journey-item journey-item-${tone}`}>
              <span className="journey-marker" aria-hidden>
                <span className="journey-dot" />
                {i < stages.length - 1 && <span className="journey-line" />}
              </span>
              <div className="journey-body">
                <p className="journey-itemLabel">
                  {s.label}
                  {tone === "color" && (
                    <Sword className="journey-itemIcon" strokeWidth={2.4} aria-hidden />
                  )}
                  {tone === "glow" && (
                    <Sparkles className="journey-itemIcon" strokeWidth={2.4} aria-hidden />
                  )}
                </p>
                {s.sublabel && <p className="journey-itemSub">{s.sublabel}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
