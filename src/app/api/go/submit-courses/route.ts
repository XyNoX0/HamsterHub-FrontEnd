import { NextRequest, NextResponse } from "next/server";
import {
  filterVisibleSubmitCourses,
  readSubmitCourseVisibility,
} from "@/app/go/lib/submit-course-visibility";

const NUUTOR_API_BASE = (
  process.env.NUUTOR_API_BASE_URL ||
  process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
  "https://api.hamsterquest.com/api/nuutor/api"
).replace(/\/+$/, "");

function mapCourse(c: any) {
  return {
    courseId: String(c.courseId || c.id || ""),
    courseName: String(c.courseName || c.name || ""),
    sheetName: String(c.sheetName || c.sheet || ""),
  };
}

export async function GET(req: NextRequest) {
  const authorization = req.headers.get("authorization") || "";
  try {
    const res = await fetch(`${NUUTOR_API_BASE}/profile/submit-courses`, {
      headers: authorization ? { Authorization: authorization } : undefined,
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success || !Array.isArray(data.courses)) {
      return NextResponse.json(
        {
          success: false,
          courses: [],
          error: data?.error || `request_failed_${res.status}`,
          message: data?.message || data?.error || "Could not load courses.",
        },
        { status: res.ok ? 502 : res.status },
      );
    }

    const config = await readSubmitCourseVisibility();
    const courses = filterVisibleSubmitCourses(data.courses.map(mapCourse), config);
    return NextResponse.json({ success: true, courses });
  } catch {
    return NextResponse.json(
      { success: false, courses: [], message: "Could not load courses." },
      { status: 502 },
    );
  }
}
