"use client";

import { useCallback, useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { Loader2, Plus, Search, Upload, X } from "lucide-react";
import "./SubmitProjectPanel.css";

const TOKEN_KEY = "hh_go_pro_profile_token";

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    "https://api.hamsterquest.com/api/nuutor/api"
  ).replace(/\/+$/, "");
}

type TeamCandidate = {
  _id: string;
  discordId: string;
  name: string;
  nickname: string;
  username: string;
  discordUsername: string;
  discordGlobalName: string;
  avatarUrl: string;
};

type SubmitCourse = {
  courseId: string;
  courseName: string;
  sheetName: string;
};

type UploadState = "idle" | "uploading" | "done" | "error";

type PresignedUpload = {
  key: string;
  uploadUrl: string;
  publicUrl: string;
  method: "PUT";
  headers?: Record<string, string>;
};

function MemberAvatar({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <span className="submit-avatar submit-avatar--fallback" aria-hidden>
        {(name || "?")[0].toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="submit-avatar"
      src={src}
      alt={name}
      onError={() => setErr(true)}
    />
  );
}

async function requestUploadUrl(token: string, kind: "video" | "cover", file: File): Promise<PresignedUpload> {
  const res = await fetch(`${getApiBase()}/profile/project-upload-url`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kind,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.success || !data.upload?.uploadUrl) {
    throw new Error(data?.message || data?.error || `Could not prepare ${kind} upload`);
  }
  return data.upload as PresignedUpload;
}

function putFileToSignedUrl(file: File, upload: PresignedUpload, onProgress: (loaded: number, total: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(upload.method || "PUT", upload.uploadUrl);
    const headers = upload.headers || {};
    Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
    if (!headers["Content-Type"]) xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(event.loaded, event.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`R2 upload failed (${xhr.status})`));
    };
    xhr.onerror = () => reject(new Error("R2 upload failed"));
    xhr.send(file);
  });
}

function normalizeSubmitError(message: string) {
  const lower = message.toLowerCase();
  if (
    lower.includes("not in course") ||
    lower.includes("not found in course") ||
    lower.includes("not found in sheet") ||
    lower.includes("not enrolled") ||
    lower.includes("not registered") ||
    lower.includes("no matching student") ||
    lower.includes("course member")
  ) {
    return "น้องไม่มีรายชื่อในคอร์สนี้";
  }
  return message;
}

export function SubmitProjectPanel({ onDone }: { onDone?: () => void }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [courses, setCourses] = useState<SubmitCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [teamSearch, setTeamSearch] = useState("");
  const [teamResults, setTeamResults] = useState<TeamCandidate[]>([]);
  const [teamSearching, setTeamSearching] = useState(false);
  const [teamSearched, setTeamSearched] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamCandidate[]>([]);
  const [highlightedIdx, setHighlightedIdx] = useState(-1);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadError, setUploadError] = useState("");
  const [progress, setProgress] = useState(0);
  const [resultProjectId, setResultProjectId] = useState("");

  const videoRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const reset = useCallback(() => {
    setTitle(""); setTeamName(""); setDescription("");
    setCourseId(""); setCourseName(""); setSheetName("");
    setVideoFile(null); setCoverFile(null);
    setTeamSearch(""); setTeamResults([]); setSelectedTeam([]);
    setTeamSearched(false); setHighlightedIdx(-1);
    setUploadState("idle"); setUploadError(""); setProgress(0);
    setResultProjectId("");
    if (videoRef.current) videoRef.current.value = "";
    if (coverRef.current) coverRef.current.value = "";
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    reset();
  }, [reset]);

  useEffect(() => {
    if (!open) return;
    const token = localStorage.getItem(TOKEN_KEY) || "";
    if (!token || courses.length > 0 || coursesLoading) return;
    setCoursesLoading(true);
    fetch("/api/go/submit-courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
          if (data.courses.length === 0) {
            setUploadError("No course sheets with a Discord ID column were found.");
          }
        } else {
          setUploadError(normalizeSubmitError(data?.message || data?.error || "Could not load courses from Google Sheet."));
        }
      })
      .catch(() => {
        setUploadError("โหลดรายการคอร์สไม่สำเร็จ กรุณาลองใหม่");
      })
      .finally(() => setCoursesLoading(false));
  }, [open, courses.length, coursesLoading]);

  const selectedTeamRef = useRef(selectedTeam);
  useEffect(() => { selectedTeamRef.current = selectedTeam; }, [selectedTeam]);

  useEffect(() => {
    if (!teamSearch.trim() || teamSearch.trim().length < 2) {
      setTeamResults([]);
      setTeamSearched(false);
      return;
    }
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(async () => {
      const token = localStorage.getItem(TOKEN_KEY) || "";
      if (!token) return;
      setTeamSearching(true);
      try {
        const res = await fetch(
          `${getApiBase()}/profile/members/search?q=${encodeURIComponent(teamSearch.trim())}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json().catch(() => null);
        if (data?.success) {
          const alreadyIds = new Set(selectedTeamRef.current.map((m) => m.discordId));
          setTeamResults((data.members as TeamCandidate[]).filter((m) => !alreadyIds.has(m.discordId)));
        }
      } finally {
        setTeamSearching(false);
        setTeamSearched(true);
      }
    }, 180);
  }, [teamSearch]);

  const addTeamMember = useCallback((m: TeamCandidate) => {
    setSelectedTeam((prev) => {
      if (prev.find((p) => p.discordId === m.discordId)) return prev;
      return [...prev, m];
    });
    setTeamSearch("");
    setTeamResults([]);
    setTeamSearched(false);
    setHighlightedIdx(-1);
    searchInputRef.current?.focus();
  }, []);

  const removeTeamMember = useCallback((discordId: string) => {
    setSelectedTeam((prev) => prev.filter((m) => m.discordId !== discordId));
  }, []);

  useEffect(() => { setHighlightedIdx(-1); }, [teamResults]);

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (teamResults.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIdx((i) => {
        const next = i < teamResults.length - 1 ? i + 1 : 0;
        requestAnimationFrame(() => {
          dropdownRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
        });
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIdx((i) => {
        const next = i > 0 ? i - 1 : teamResults.length - 1;
        requestAnimationFrame(() => {
          dropdownRef.current?.children[next]?.scrollIntoView({ block: "nearest" });
        });
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIdx >= 0 && teamResults[highlightedIdx]) {
        addTeamMember(teamResults[highlightedIdx]);
      }
    } else if (e.key === "Escape") {
      setTeamResults([]);
      setTeamSearched(false);
      setHighlightedIdx(-1);
    }
  }, [teamResults, highlightedIdx, addTeamMember]);

  const handleSubmit = useCallback(async () => {
    if (!videoFile || !title.trim() || !sheetName.trim()) return;
    const token = localStorage.getItem(TOKEN_KEY) || "";
    if (!token) { setUploadError("กรุณา Login Discord ก่อน"); return; }

    setUploadState("uploading");
    setUploadError("");
    setProgress(0);

    try {
      const totalBytes = videoFile.size + (coverFile?.size || 0);
      let uploadedBytes = 0;
      const updateProgress = (fileBase: number, loaded: number) => {
        setProgress(Math.min(92, ((fileBase + loaded) / totalBytes) * 92));
      };

      const videoUpload = await requestUploadUrl(token, "video", videoFile);
      await putFileToSignedUrl(videoFile, videoUpload, (loaded) => updateProgress(0, loaded));
      uploadedBytes += videoFile.size;

      let coverUpload: PresignedUpload | null = null;
      if (coverFile) {
        coverUpload = await requestUploadUrl(token, "cover", coverFile);
        await putFileToSignedUrl(coverFile, coverUpload, (loaded) => updateProgress(uploadedBytes, loaded));
      }

      setProgress(94);
      const res = await fetch(`${getApiBase()}/profile/submit-project-r2`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          teamName: teamName.trim(),
          description: description.trim(),
          courseId: courseId.trim(),
          courseName: courseName.trim(),
          sheetName: sheetName.trim(),
          teamDiscordIds: selectedTeam.map((m) => m.discordId),
          video: {
            key: videoUpload.key,
            url: videoUpload.publicUrl,
            fileName: videoFile.name,
            mimeType: videoFile.type,
            sizeBytes: videoFile.size,
          },
          cover: coverUpload && coverFile ? {
            key: coverUpload.key,
            url: coverUpload.publicUrl,
            fileName: coverFile.name,
            mimeType: coverFile.type,
            sizeBytes: coverFile.size,
          } : null,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(normalizeSubmitError(data?.message || data?.error || `Upload failed (${res.status})`));
      }
      setProgress(100);
      setResultProjectId(data.projectId || "");
      setUploadState("done");
      onDone?.();
    } catch (err) {
      setUploadError(normalizeSubmitError(err instanceof Error ? err.message : "Upload failed"));
      setUploadState("error");
    }
  }, [videoFile, coverFile, title, teamName, description, courseId, courseName, sheetName, selectedTeam, onDone]);

  if (!open) {
    return (
      <button type="button" className="submit-trigger" onClick={() => setOpen(true)}>
        <Plus className="submit-triggerIcon" strokeWidth={2.8} aria-hidden />
        อัปโหลดผลงาน
      </button>
    );
  }

  const panel = (
    <div className="submit-overlay" role="dialog" aria-modal aria-label="อัปโหลดผลงาน">
      <div className="submit-panel">
        <header className="submit-header">
          <h2 className="submit-heading">อัปโหลดผลงาน</h2>
          <button type="button" className="submit-closeBtn" onClick={handleClose} aria-label="ปิด">
            <X strokeWidth={2.4} aria-hidden />
          </button>
        </header>

        {uploadState === "done" ? (
          <div className="submit-success">
            <span className="submit-successIcon" aria-hidden>🎉</span>
            <p className="submit-successTitle">อัปโหลดสำเร็จ!</p>
            {resultProjectId && (
              <p className="submit-successId">Project ID: <code>{resultProjectId}</code></p>
            )}
            <p className="submit-successNote">วีดีโออาจใช้เวลาสักครู่ก่อนแสดงบน profile</p>
            <button type="button" className="submit-btn submit-btn--primary" onClick={handleClose}>
              ปิด
            </button>
          </div>
        ) : (
          <div className="submit-body">
            <div className="submit-field">
              <label className="submit-label" htmlFor="sp-title">ชื่อโปรเจค <span aria-hidden className="submit-required">*</span></label>
              <input
                id="sp-title"
                className="submit-input"
                type="text"
                placeholder="ชื่อผลงานของคุณ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                disabled={uploadState === "uploading"}
              />
            </div>

            <div className="submit-row">
              <div className="submit-field">
                <label className="submit-label" htmlFor="sp-course">Course / Activity <span aria-hidden className="submit-required">*</span></label>
                <select
                  id="sp-course"
                  className="submit-input submit-select"
                  value={sheetName}
                  onChange={(e) => {
                    const selected = courses.find((course) => course.sheetName === e.target.value);
                    setSheetName(selected?.sheetName || "");
                    setCourseId(selected?.courseId || "");
                    setCourseName(selected?.courseName || "");
                  }}
                  disabled={uploadState === "uploading" || coursesLoading}
                  required
                >
                  <option value="">{coursesLoading ? "Loading courses..." : "Select Course / Activity"}</option>
                  {courses.map((course) => (
                    <option key={`${course.sheetName}-${course.courseId}`} value={course.sheetName}>
                      {course.courseName || course.sheetName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="submit-field">
                <label className="submit-label" htmlFor="sp-team">ชื่อทีม</label>
                <input
                  id="sp-team"
                  className="submit-input"
                  type="text"
                  placeholder="ชื่อทีม (ถ้ามี)"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  maxLength={80}
                  disabled={uploadState === "uploading"}
                />
              </div>
            </div>

            <div className="submit-field">
              <label className="submit-label" htmlFor="sp-desc">รายละเอียด</label>
              <textarea
                id="sp-desc"
                className="submit-input submit-textarea"
                placeholder="อธิบายผลงานโดยย่อ..."
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 600))}
                rows={3}
                disabled={uploadState === "uploading"}
              />
            </div>

            <div className="submit-field">
              <label className="submit-label">สมาชิกในทีม</label>
              <div className="submit-teamSearch">
                <div className="submit-searchBox">
                  <Search className="submit-searchIcon" strokeWidth={2} aria-hidden />
                  <input
                    ref={searchInputRef}
                    className="submit-searchInput"
                    type="text"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={teamResults.length > 0}
                    aria-controls={listboxId}
                    aria-activedescendant={highlightedIdx >= 0 ? `${listboxId}-opt-${highlightedIdx}` : undefined}
                    placeholder="ค้นหาด้วยชื่อ, ชื่อเล่น, Discord name, Discord ID"
                    value={teamSearch}
                    onChange={(e) => setTeamSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    disabled={uploadState === "uploading"}
                    autoComplete="off"
                  />
                  {teamSearching && <Loader2 className="submit-searchSpinner" strokeWidth={2} aria-hidden />}
                </div>
                {teamSearching && teamResults.length === 0 && (
                  <ul className="submit-teamDropdown" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="submit-teamOption submit-teamSkeleton">
                        <span className="submit-avatar skel-pulse" />
                        <span className="submit-teamOptionInfo">
                          <span className="submit-teamOptionName skel-pulse" style={{ width: `${60 + i * 20}px`, height: "12px", borderRadius: "6px", display: "block" }} />
                          <span className="submit-teamOptionSub skel-pulse" style={{ width: "80px", height: "10px", borderRadius: "6px", display: "block", marginTop: "4px" }} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {!teamSearching && teamSearched && teamResults.length === 0 && teamSearch.trim().length >= 2 && (
                  <div className="submit-teamEmpty">ไม่พบสมาชิก</div>
                )}
                {teamResults.length > 0 && (
                  <ul
                    ref={dropdownRef}
                    id={listboxId}
                    role="listbox"
                    className="submit-teamDropdown"
                  >
                    {teamResults.map((m, idx) => (
                      <li key={m.discordId} role="option" aria-selected={idx === highlightedIdx} id={`${listboxId}-opt-${idx}`}>
                        <button
                          type="button"
                          className={`submit-teamOption${idx === highlightedIdx ? " is-highlighted" : ""}`}
                          onMouseEnter={() => setHighlightedIdx(idx)}
                          onClick={() => addTeamMember(m)}
                          tabIndex={-1}
                        >
                          <MemberAvatar src={m.avatarUrl} name={m.name || m.nickname || m.discordGlobalName} />
                          <span className="submit-teamOptionInfo">
                            <span className="submit-teamOptionName">{m.name || m.discordGlobalName || m.nickname}</span>
                            <span className="submit-teamOptionSub">@{m.discordUsername || m.username}</span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {selectedTeam.length > 0 && (
                <ul className="submit-teamChips">
                  {selectedTeam.map((m) => (
                    <li key={m.discordId} className="submit-teamChip">
                      <MemberAvatar src={m.avatarUrl} name={m.name || m.nickname} />
                      <span className="submit-teamChipName">{m.nickname || m.name || m.discordGlobalName}</span>
                      <button
                        type="button"
                        className="submit-teamChipRemove"
                        onClick={() => removeTeamMember(m.discordId)}
                        aria-label={`ลบ ${m.nickname || m.name}`}
                      >
                        <X strokeWidth={2.8} width={12} height={12} aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="submit-row">
              <div className="submit-field">
                <label className="submit-label">
                  วีดีโอ <span aria-hidden className="submit-required">*</span>
                  <span className="submit-fileHint">MP4, MOV, WEBM — max 500 MB</span>
                </label>
                <input
                  ref={videoRef}
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska,video/x-m4v"
                  className="submit-fileInput"
                  id="sp-video"
                  onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                  disabled={uploadState === "uploading"}
                />
                <label htmlFor="sp-video" className={`submit-fileLabel${videoFile ? " has-file" : ""}`}>
                  <Upload strokeWidth={2} width={16} height={16} aria-hidden />
                  {videoFile ? videoFile.name : "เลือกไฟล์วีดีโอ"}
                </label>
              </div>

              <div className="submit-field">
                <label className="submit-label">
                  ภาพ Cover
                  <span className="submit-fileHint">PNG, JPG, WEBP — max 20 MB</span>
                </label>
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="submit-fileInput"
                  id="sp-cover"
                  onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                  disabled={uploadState === "uploading"}
                />
                <label htmlFor="sp-cover" className={`submit-fileLabel${coverFile ? " has-file" : ""}`}>
                  <Upload strokeWidth={2} width={16} height={16} aria-hidden />
                  {coverFile ? coverFile.name : "เลือกภาพ cover"}
                </label>
              </div>
            </div>

            {uploadState === "uploading" && (
              <div className="submit-progressWrap" role="status" aria-label={`กำลังอัปโหลด ${Math.round(progress)}%`}>
                <div className="submit-progressBar">
                  <div className="submit-progressFill" style={{ width: `${progress}%` }} />
                </div>
                <span className="submit-progressLabel">
                  <Loader2 className="submit-spin" strokeWidth={2} width={14} height={14} aria-hidden />
                  กำลังอัปโหลด... {Math.round(progress)}%
                </span>
              </div>
            )}

            {uploadState === "error" && uploadError && (
              <p className="submit-error" role="alert">{uploadError}</p>
            )}

            <div className="submit-actions">
              <button
                type="button"
                className="submit-btn submit-btn--ghost"
                onClick={handleClose}
                disabled={uploadState === "uploading"}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                className="submit-btn submit-btn--primary"
                onClick={handleSubmit}
                disabled={!videoFile || !title.trim() || !sheetName || uploadState === "uploading"}
              >
                {uploadState === "uploading" ? (
                  <><Loader2 className="submit-spin" strokeWidth={2} width={16} height={16} aria-hidden /> กำลังอัปโหลด...</>
                ) : "ส่งผลงาน"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return mounted ? createPortal(panel, document.body) : panel;
}
