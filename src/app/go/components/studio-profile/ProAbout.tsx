"use client";

import { Edit3, Loader2, Save, Star, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { AggregateMember } from "../../lib/members";
import { deriveAboutText, deriveSkills } from "../../lib/members";
import { useInView } from "../../lib/motion";
import "./ProAbout.css";

function StarRow({ level, rowIndex }: { level: number; rowIndex: number }) {
  const full = Math.floor(level);
  const half = level - full >= 0.5;
  return (
    <span className="about-stars" aria-label={`${level} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFull = i < full;
        const isHalf = !isFull && i === full && half;
        const delay = rowIndex * 80 + i * 60;
        return (
          <span
            key={i}
            className="about-starSlot"
            style={{ ["--star-delay" as string]: `${delay}ms` } as React.CSSProperties}
          >
            <Star className="about-starBg" strokeWidth={1.6} aria-hidden />
            {isFull && <Star className="about-starFill about-starFillFull" strokeWidth={1.6} aria-hidden />}
            {isHalf && <Star className="about-starFill about-starFillHalf" strokeWidth={1.6} aria-hidden />}
          </span>
        );
      })}
    </span>
  );
}

export function ProAbout({
  member,
  canEdit = false,
  aboutOverride,
  onSaveAbout,
}: {
  member: AggregateMember;
  canEdit?: boolean;
  aboutOverride?: string;
  onSaveAbout?: (about: string) => Promise<void>;
}) {
  const aboutText = aboutOverride ?? deriveAboutText(member);
  const skills = deriveSkills(member);
  const [skillsRef, skillsInView] = useInView<HTMLElement>({ threshold: 0.25 });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(aboutText);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!editing) setDraft(aboutText);
  }, [aboutText, editing]);

  async function saveAbout() {
    if (!onSaveAbout || saving) return;
    setSaving(true);
    setError("");
    try {
      await onSaveAbout(draft);
      setEditing(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="about-stack">
      <article className="about-card about-card--me">
        {canEdit ? (
          <div className="about-editActions">
            {editing ? (
              <>
                <button type="button" className="about-iconButton about-iconButton--save" onClick={saveAbout} disabled={saving} aria-label="Save about me">
                  {saving ? <Loader2 className="about-spin" aria-hidden /> : <Save aria-hidden />}
                </button>
                <button type="button" className="about-iconButton about-iconButton--cancel" onClick={() => { setEditing(false); setError(""); setDraft(aboutText); }} disabled={saving} aria-label="Cancel editing about me">
                  <X aria-hidden />
                </button>
              </>
            ) : (
              <button type="button" className="about-iconButton about-iconButton--edit" onClick={() => setEditing(true)} aria-label="Edit about me">
                <Edit3 aria-hidden />
              </button>
            )}
          </div>
        ) : null}
        <header className="about-cardHeader">
          <div className="about-cardTitleGroup about-cardTitleGroup--me">
            <Sparkles className="about-headerIcon about-headerIcon-mint" strokeWidth={2.4} aria-hidden />
            <h2 className="about-cardTitle">ABOUT ME</h2>
          </div>
        </header>
        {editing ? (
          <>
            <textarea
              className="about-editor"
              value={draft}
              onChange={(event) => setDraft(event.target.value.slice(0, 1200))}
              rows={7}
              placeholder="เขียนเกี่ยวกับตัวเองที่นี่..."
            />
            {error ? <p className="about-error">{error}</p> : null}
          </>
        ) : (
          <p className="about-bodyText">{aboutText}</p>
        )}
      </article>

      <article
        ref={skillsRef}
        className={`about-card ${skillsInView ? "about-card--skills-revealed" : ""}`}
      >
        <header className="about-cardHeader">
          <div className="about-cardTitleGroup">
            <Star className="about-headerIcon about-headerIcon-sun" strokeWidth={2.4} aria-hidden />
            <h2 className="about-cardTitle">SKILLS</h2>
          </div>
        </header>

        <ul className="about-skillsList">
          {skills.map((s, idx) => (
            <li key={`${s.name}-${idx}`} className="about-skillRow">
              <span className="about-skillName">{s.name}</span>
              <StarRow level={s.level} rowIndex={idx} />
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
