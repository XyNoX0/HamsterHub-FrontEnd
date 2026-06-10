import { MEMBER_PROFILES } from "./index";

export type MemberSkill = { name: string; level: number };

export type MemberAchievement = {
  id: string;
  label: string;
  sublabel: string;
  kind: "top" | "team" | "fast" | "custom";
  icon?: string;
};

export type JourneyStage = {
  id: string;
  label: string;
  sublabel?: string;
  tone?: "muted" | "color" | "glow";
};

export type MemberOverride = {
  slug?: string;
  /** ชื่อจริง + นามสกุล */
  name?: string;
  /** ชื่อเล่น (คีย์ JSON ยังชื่อ username ตามสคีมาเดิม — ห้ามใส่ Discord handle) */
  username?: string;
  profileSrc?: string;
  description?: string;
  level?: number;
  titleLine?: string;
  motto?: string;
  code?: string;
  aboutText?: string;
  location?: string;
  link?: { label: string; href: string };
  skills?: MemberSkill[];
  achievements?: MemberAchievement[];
  journey?: JourneyStage[];
  featuredGameId?: string | null;
  bannerSrc?: string;
  visits?: number;
  awardsCount?: number;
  coins?: number;
  questsCount?: number;
  invitedCount?: number;
  rank?: string;
};

export const MEMBER_OVERRIDES: Record<string, MemberOverride> = MEMBER_PROFILES;
