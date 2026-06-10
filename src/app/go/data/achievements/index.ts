export type AchievementKind = "top" | "team" | "fast" | "custom";

export type Achievement = {
  id: string;
  label: string;
  sublabel?: string;
  kind?: AchievementKind;
  icon?: string;
};

import catalog from "./catalog.json";

export const ACHIEVEMENT_CATALOG: Achievement[] = (catalog.achievements as Achievement[]) ?? [];
