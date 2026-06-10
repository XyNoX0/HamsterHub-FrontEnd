import { NextResponse } from "next/server";

const RAW_BOT_API_BASE = (
  process.env.NUUTOR_API_BASE_URL ||
  process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
  "https://api.hamsterquest.com/api/nuutor"
).replace(/\/+$/, "");

export const revalidate = 60;

function projectApiCandidates() {
  const base = RAW_BOT_API_BASE.replace(/\/+$/, "");
  const withoutTrailingApi = base.replace(/\/api$/i, "");
  return Array.from(new Set([
    `${withoutTrailingApi}/api/public/projects?limit=200`,
    `${base}/public/projects?limit=200`,
    `${base}/api/public/projects?limit=200`,
  ]));
}

export async function GET() {
  try {
    for (const url of projectApiCandidates()) {
      const res = await fetch(url, { next: { revalidate: 60 } });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        return NextResponse.json({ success: true, projects: data.projects });
      }
    }
    return NextResponse.json({ success: false, projects: [] }, { status: 502 });
  } catch {
    return NextResponse.json({ success: false, projects: [] }, { status: 502 });
  }
}
