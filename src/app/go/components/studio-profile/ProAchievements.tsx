"use client";

import { Trophy, Star, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AggregateMember } from "../../lib/members";
import { deriveAchievements } from "../../lib/members";
import { useInView } from "../../lib/motion";
import { Stamp, type StampTone } from "./Stamp";
import "./ProAchievements.css";

const KIND_ICON: Record<string, LucideIcon> = {
  top: Star,
  team: Users,
  fast: Zap,
  custom: Star,
};

const KIND_STAMP: Record<string, { label: string; tone: StampTone }> = {
  top: { label: "TOP", tone: "sun" },
  team: { label: "TEAM MADE", tone: "dang" },
  fast: { label: "LV UP", tone: "mint" },
  custom: { label: "RARE", tone: "dang" },
};

const KIND_RIBBON: Record<string, string> = {
  top: "GOLD",
  team: "BOND",
  fast: "GROWTH",
  custom: "RARE",
};

export function ProAchievements({ member }: { member: AggregateMember }) {
  const achievements = deriveAchievements(member);
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref} className={`ach-card ${inView ? "ach-card--revealed" : ""}`}>
      <header className="ach-header">
        <Trophy className="ach-headerIcon" strokeWidth={2.4} aria-hidden />
        <h2 className="ach-title">ACHIEVEMENTS</h2>
        <span className="ach-shelfLabel">collected</span>
      </header>

      <ul className="ach-list">
        {achievements.map((a, i) => {
          const Icon = KIND_ICON[a.kind] ?? Star;
          const stamp = KIND_STAMP[a.kind] ?? KIND_STAMP.custom;
          const ribbon = KIND_RIBBON[a.kind] ?? "RARE";
          return (
            <li
              key={`${a.id}-${i}`}
              className="ach-item"
              style={{ ["--i" as string]: i } as React.CSSProperties}
            >
              <div className="ach-badgeWrap">
                <span className={`ach-ribbon ach-ribbon-${a.kind}`}>{ribbon}</span>
                <span className={`ach-badge ach-badge-${a.kind}`}>
                  <span className="ach-badgeInner">
                    <Icon className="ach-badgeIcon" strokeWidth={2.4} aria-hidden />
                    <span className="ach-badgeLabel">{a.label}</span>
                  </span>
                </span>
                <span className="ach-peel" aria-hidden />
                <span className="ach-stampSlot">
                  <Stamp label={stamp.label} tone={stamp.tone} rotate={-12} />
                </span>
              </div>
              <p className="ach-sublabel">{a.sublabel}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
