import fs from "node:fs/promises";
import path from "node:path";

export type SubmitCourseVisibilityConfig = {
  visibleSheetNames: string[] | null;
};

export type SubmitCourseLike = {
  sheetName: string;
  courseId?: string;
  courseName?: string;
};

const CONFIG_PATH = path.join(
  process.cwd(),
  "src/app/go/data/submit-course-visibility.json",
);

function normalizeSheetName(value: string): string {
  return value.trim().toLowerCase();
}

export async function readSubmitCourseVisibility(): Promise<SubmitCourseVisibilityConfig> {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      visibleSheetNames: parsed?.visibleSheetNames === null
        ? null
        : Array.isArray(parsed?.visibleSheetNames)
        ? parsed.visibleSheetNames.map((s: unknown) => String(s || "").trim()).filter(Boolean)
        : null,
    };
  } catch {
    return { visibleSheetNames: null };
  }
}

export async function writeSubmitCourseVisibility(config: SubmitCourseVisibilityConfig): Promise<void> {
  const unique = config.visibleSheetNames
    ? Array.from(new Set(config.visibleSheetNames.map((s) => s.trim()).filter(Boolean)))
    : null;
  await fs.writeFile(
    CONFIG_PATH,
    JSON.stringify({ visibleSheetNames: unique }, null, 2) + "\n",
    "utf8",
  );
}

export function filterVisibleSubmitCourses<T extends SubmitCourseLike>(
  courses: T[],
  config: SubmitCourseVisibilityConfig,
): T[] {
  if (config.visibleSheetNames === null) return courses;
  const visible = new Set(config.visibleSheetNames.map(normalizeSheetName));
  return courses.filter((course) => visible.has(normalizeSheetName(course.sheetName)));
}
