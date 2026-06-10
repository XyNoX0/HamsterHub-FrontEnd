"use client";

import { useEffect, useState } from "react";
import { Star, Eye, UserPlus, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AggregateMember } from "../../lib/members";
import { useCountUp } from "../../lib/motion";
import { getLocalVisits } from "../../lib/stats-tracker";
import "./ProStatsBar.css";

function StatCell({
  icon: Icon,
  image,
  num,
  label,
  tone,
  delay,
}: {
  icon?: LucideIcon;
  image?: string;
  num: number;
  label: string;
  tone: "sun" | "dang" | "sea" | "mint";
  delay: number;
}) {
  const value = useCountUp(num, 700 + delay);
  return (
    <div className={`statsbar-cell statsbar-cell-${tone}`}>
      <span className="statsbar-iconBox">
        {image ? (
          <img src={image} alt="" className="statsbar-icon-img" aria-hidden />
        ) : Icon ? (
          <Icon className="statsbar-icon" strokeWidth={2.4} aria-hidden />
        ) : null}
      </span>
      <span className="statsbar-textCol">
        <span className="statsbar-num">{value}</span>
        <span className="statsbar-label">{label}</span>
      </span>
    </div>
  );
}

export function ProStatsBar({ member }: { member: AggregateMember }) {
  const [localVisits, setLocalVisits] = useState(0);

  useEffect(() => {
    // ดึงยอดจาก LocalStorage มาแสดงผล
    setLocalVisits(getLocalVisits(member.slug));

    // ฟัง Event กรณีมีการกดบวกเลขเพิ่มในหน้านี้ (จาก VisitsIncrementer)
    const handleIncrement = (e: any) => {
      if (e.detail?.slug === member.slug) {
        setLocalVisits(getLocalVisits(member.slug));
      }
    };
    window.addEventListener("hh_visit_incremented", handleIncrement);
    return () => window.removeEventListener("hh_visit_incremented", handleIncrement);
  }, [member.slug]);

  const stats = [
    { icon: Star, num: member.projectsCount, label: "Projects", tone: "sun" },
    { icon: Eye, num: member.visitsCount + localVisits, label: "Visits", tone: "dang" },
    { icon: UserPlus, num: member.invitedCount, label: "Invited", tone: "sea" },
    { image: "/godang/coin.png", num: member.coins, label: "HamsterCoin", tone: "mint" },
  ] as const;

  return (
    <div className="statsbar-wrapper">
      <div className="statsbar-pill" role="group" aria-label="Profile stats">
        {stats.map((s, i) => (
          <StatCell key={s.label} {...s} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}
