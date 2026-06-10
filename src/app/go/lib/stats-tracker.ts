"use client";

/**
 * ระบบจำลองการนับยอดเข้าชม (Mock Visit Tracker)
 * บันทึกลง LocalStorage เพื่อแสดงผลการนับเลขจริงในระดับเครื่องผู้ใช้
 * พร้อมรองรับการเชื่อมต่อ API จริงในอนาคต
 */

const STORAGE_KEY_PREFIX = "hh_profile_visits_";

export function getLocalVisits(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${slug}`);
    return stored ? parseInt(stored, 10) : 0;
  } catch (e) {
    return 0;
  }
}

export function incrementLocalVisits(slug: string): number {
  if (typeof window === "undefined") return 0;
  try {
    const current = getLocalVisits(slug);
    const next = current + 1;
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${slug}`, next.toString());
    return next;
  } catch (e) {
    return 0;
  }
}
