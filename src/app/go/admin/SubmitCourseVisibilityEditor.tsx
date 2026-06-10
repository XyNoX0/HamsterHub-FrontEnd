"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  saveSubmitCourseVisibility,
  type SubmitCourse,
} from "./actions";

type Props = {
  courses: SubmitCourse[];
  initialVisibleSheetNames: string[] | null;
};

export function SubmitCourseVisibilityEditor({
  courses,
  initialVisibleSheetNames,
}: Props) {
  const allSheetNames = useMemo(
    () => Array.from(new Set(courses.map((course) => course.sheetName).filter(Boolean))),
    [courses],
  );
  const [visible, setVisible] = useState<string[]>(
    initialVisibleSheetNames === null ? allSheetNames : initialVisibleSheetNames,
  );
  const [savedVisible, setSavedVisible] = useState<string[]>(
    initialVisibleSheetNames === null ? allSheetNames : initialVisibleSheetNames,
  );
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const visibleSet = useMemo(() => new Set(visible), [visible]);
  const savedSet = useMemo(() => new Set(savedVisible), [savedVisible]);
  const visibleCount = courses.filter((course) => visibleSet.has(course.sheetName)).length;
  const hiddenCount = Math.max(0, courses.length - visibleCount);
  const hasChanges = useMemo(() => {
    if (visibleSet.size !== savedSet.size) return true;
    return Array.from(visibleSet).some((sheetName) => !savedSet.has(sheetName));
  }, [savedSet, visibleSet]);
  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((course) =>
      [course.courseName, course.sheetName, course.courseId]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [courses, query]);

  function toggleSheet(sheetName: string) {
    setMessage("");
    setVisible((prev) =>
      prev.includes(sheetName)
        ? prev.filter((name) => name !== sheetName)
        : [...prev, sheetName],
    );
  }

  function setSheetOpen(sheetName: string, open: boolean) {
    setMessage("");
    const nextVisible = open
      ? Array.from(new Set([...visible, sheetName]))
      : visible.filter((name) => name !== sheetName);

    setVisible(nextVisible);
    startTransition(async () => {
      try {
        const next = await saveSubmitCourseVisibility(nextVisible);
        const nextVisibleSheets = next.visibleSheetNames === null ? allSheetNames : next.visibleSheetNames;
        setVisible(nextVisibleSheets);
        setSavedVisible(nextVisibleSheets);
        setMessage(open ? `เปิดคอร์ส ${sheetName} แล้ว` : `ปิดคอร์ส ${sheetName} แล้ว`);
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Save failed");
        setVisible(visible);
      }
    });
  }

  function save() {
    setMessage("");
    startTransition(async () => {
      try {
        const next = await saveSubmitCourseVisibility(visible);
        const nextVisibleSheets = next.visibleSheetNames === null ? allSheetNames : next.visibleSheetNames;
        setVisible(nextVisibleSheets);
        setSavedVisible(nextVisibleSheets);
        setMessage("Saved");
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  return (
    <section className="adm-section adm-configPanel" id="upload-config">
      <div className="adm-configHead">
        <div>
          <span className="adm-kicker">Primary Config</span>
          <h2 className="adm-sectionTitle">Profile Upload Course Visibility</h2>
          <p className="adm-configLead">
            เลือก Google Sheet ที่จะแสดงใน dropdown ตอน user อัปโหลด project จากหน้า <code>/profile</code>
          </p>
        </div>
        <div className="adm-configStats" aria-label="Upload visibility summary">
          <span>
            <strong>{visibleCount}</strong>
            Open
          </span>
          <span>
            <strong>{hiddenCount}</strong>
            Hidden
          </span>
          <span>
            <strong>{courses.length}</strong>
            Sheets
          </span>
        </div>
      </div>

      <div className="adm-configToolbar">
        <label className="adm-configSearch">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search course, sheet, or course ID"
          />
        </label>
        <div className="adm-permRow">
          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={() => setVisible(allSheetNames)}
            disabled={pending || allSheetNames.length === 0}
          >
            Open all
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={() => setVisible([])}
            disabled={pending}
          >
            Hide all
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--primary"
            onClick={save}
            disabled={pending || !hasChanges}
          >
            {pending ? "Saving..." : hasChanges ? "Save config" : "Saved"}
          </button>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="adm-emptyState">
          <SlidersHorizontal size={18} aria-hidden />
          <span>ไม่พบรายการ Sheet จาก API</span>
        </div>
      ) : (
        <div className="adm-sheetList">
          {filteredCourses.map((course) => {
            const checked = visibleSet.has(course.sheetName);
            const saved = savedSet.has(course.sheetName);
            const changed = checked !== saved;
            return (
              <div
                key={`${course.sheetName}-${course.courseId}`}
                className={`adm-sheetToggle${checked ? " adm-sheetToggle--on" : ""}${changed ? " adm-sheetToggle--changed" : ""}`}
              >
                <label className="adm-sheetToggleMain">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSheet(course.sheetName)}
                    disabled={pending}
                  />
                  <span className="adm-switchTrack" aria-hidden />
                  <span>
                    <strong>{course.courseName || course.sheetName}</strong>
                    <small>
                      {checked
                        ? "Visible in the /profile upload course picker"
                        : "Hidden from user uploads"}
                    </small>
                  </span>
                </label>
                <div className="adm-sheetMeta">
                  <code>{course.sheetName}</code>
                  {course.courseId ? <span>{course.courseId}</span> : null}
                </div>
                <span className={`adm-statusPill ${checked ? "adm-statusPill--open" : "adm-statusPill--closed"}`}>
                  {checked ? "Open" : "Hidden"}
                </span>
                <button
                  type="button"
                  className={`adm-btn ${checked ? "adm-btn--danger" : "adm-btn--ghost"} adm-sheetAction`}
                  onClick={() => setSheetOpen(course.sheetName, !checked)}
                  disabled={pending}
                >
                  {checked ? "ปิดคอร์ส" : "เปิดคอร์ส"}
                </button>
              </div>
            );
          })}
        </div>
      )}
      {filteredCourses.length === 0 && courses.length > 0 ? (
        <div className="adm-emptyState">
          <Search size={18} aria-hidden />
          <span>ไม่เจอ Sheet ที่ตรงกับคำค้นหา</span>
        </div>
      ) : null}
      {message && (
        <p className="adm-saveMessage">
          {message}
        </p>
      )}
    </section>
  );
}
