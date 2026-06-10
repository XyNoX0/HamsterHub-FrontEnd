"use client";

import { useState, useTransition, useEffect, useRef, type ReactNode, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  saveGame,
  saveMember,
  saveEvent,
  createGame,
  createMember,
  createEvent,
  saveCatalogAchievement,
  deleteCatalogAchievement,
  adminSubmitProjectFor,
  searchAdminMembers,
  fetchSubmitCourses,
  type GamePatch,
  type MemberPatch,
  type EventPatch,
  type CatalogAchievement,
  type AdminMemberHit,
  type SubmitCourse,
} from "./actions";
import { SKILL_NAMES } from "../lib/members";
import { AssetUploader } from "./AssetUploader";
import { TeamMembersEditor, type RosterEntry, type TeamMember } from "./TeamMembersEditor";
import { AchievementsEditor, type Achievement } from "./AchievementsEditor";

// ── Generic helpers ────────────────────────────────────────────

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="adm-modalOverlay" onClick={onClose}>
      <div className="adm-modalCard" onClick={(e) => e.stopPropagation()}>
        <header className="adm-modalHeader">
          <h3 className="adm-modalTitle">{title}</h3>
          <button type="button" onClick={onClose} className="adm-modalClose" aria-label="Close">
            ×
          </button>
        </header>
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  span2,
}: {
  label: string;
  children: ReactNode;
  span2?: boolean;
}) {
  return (
    <label className={`adm-formField${span2 ? " adm-formField--span2" : ""}`}>
      <span className="adm-formLabel">{label}</span>
      {children}
    </label>
  );
}

function FormActions({
  pending,
  onCancel,
  error,
  submitLabel,
}: {
  pending: boolean;
  onCancel: () => void;
  error: string | null;
  submitLabel: string;
}) {
  return (
    <div className="adm-formFoot">
      {error && <span className="adm-formError">{error}</span>}
      <div className="adm-formActions">
        <button
          type="button"
          onClick={onCancel}
          className="adm-btn adm-btn--ghost"
          disabled={pending}
        >
          Cancel
        </button>
        <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </div>
  );
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

// ── Game ───────────────────────────────────────────────────────

type GameLike = {
  id: string;
  title?: string;
  description?: string;
  teamName?: string;
  event?: string;
  posterSrc?: string;
  iconSrc?: string;
  videoUrl?: string;
  gameUrl?: string;
  location?: string;
  stats?: { complexity?: number; creativity?: number; completeness?: number; fun?: number };
  teamMembers?: TeamMember[];
  achievements?: Achievement[];
};

function buildGamePatch(
  fd: FormData,
  posterSrc: string,
  iconSrc: string,
  teamMembers: TeamMember[],
  achievements: Achievement[],
): GamePatch {
  return {
    title: String(fd.get("title") ?? ""),
    description: String(fd.get("description") ?? ""),
    teamName: String(fd.get("teamName") ?? ""),
    event: String(fd.get("event") ?? ""),
    posterSrc,
    iconSrc,
    videoUrl: String(fd.get("videoUrl") ?? ""),
    gameUrl: String(fd.get("gameUrl") ?? ""),
    location: String(fd.get("location") ?? ""),
    stats: {
      complexity: Number(fd.get("complexity") ?? 0),
      creativity: Number(fd.get("creativity") ?? 0),
      completeness: Number(fd.get("completeness") ?? 0),
      fun: Number(fd.get("fun") ?? 0),
    },
    teamMembers,
    achievements,
  };
}

function GameFormBody({
  mode,
  game,
  roster,
  catalog,
  onClose,
}: {
  mode: "edit" | "create";
  game: GameLike;
  roster: RosterEntry[];
  catalog: Achievement[];
  onClose: () => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [gameId, setGameId] = useState(mode === "create" ? "" : game.id);
  const [posterSrc, setPosterSrc] = useState(game.posterSrc ?? "");
  const [iconSrc, setIconSrc] = useState(game.iconSrc ?? "");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(game.teamMembers ?? []);
  const [achievements, setAchievements] = useState<Achievement[]>(game.achievements ?? []);
  const router = useRouter();
  const effectiveId = mode === "create" ? gameId : game.id;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const patch = buildGamePatch(fd, posterSrc, iconSrc, teamMembers, achievements);
    start(async () => {
      try {
        if (mode === "create") {
          if (!gameId) throw new Error("ID is required.");
          await createGame(gameId, patch);
        } else {
          await saveGame(game.id, patch);
        }
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="adm-modalForm">
      {mode === "create" && (
        <Field label="ID (folder name · lowercase, hyphens)" span2>
          <input
            name="id"
            value={gameId}
            onChange={(e) => setGameId(slugify(e.target.value))}
            className="adm-input adm-mono"
            placeholder="e.g. epic-quest"
            required
            autoFocus
          />
        </Field>
      )}
      <Field label="Title">
        <input
          name="title"
          defaultValue={game.title ?? ""}
          className="adm-input"
          required
        />
      </Field>
      <Field label="Team Name">
        <input name="teamName" defaultValue={game.teamName ?? ""} className="adm-input" />
      </Field>
      <Field label="Description" span2>
        <textarea
          name="description"
          defaultValue={game.description ?? ""}
          className="adm-textarea"
          rows={5}
        />
      </Field>
      <Field label="Event">
        <input name="event" defaultValue={game.event ?? ""} className="adm-input" />
      </Field>
      <Field label="Location">
        <input name="location" defaultValue={game.location ?? ""} className="adm-input" />
      </Field>
      <Field label="Poster Src" span2>
        <div className="adm-inputWithUpload">
          <input
            name="posterSrc"
            value={posterSrc}
            onChange={(e) => setPosterSrc(e.target.value)}
            className="adm-input adm-mono"
            placeholder="/godang/games/.../poster.png"
          />
          <AssetUploader
            kind="game"
            id={effectiveId}
            field="poster"
            value={posterSrc}
            onChange={setPosterSrc}
          />
        </div>
      </Field>
      <Field label="Icon Src" span2>
        <div className="adm-inputWithUpload">
          <input
            name="iconSrc"
            value={iconSrc}
            onChange={(e) => setIconSrc(e.target.value)}
            className="adm-input adm-mono"
            placeholder="/godang/games/.../icon.png"
          />
          <AssetUploader
            kind="game"
            id={effectiveId}
            field="icon"
            value={iconSrc}
            onChange={setIconSrc}
          />
        </div>
      </Field>
      <Field label="Video URL">
        <input name="videoUrl" defaultValue={game.videoUrl ?? ""} className="adm-input" />
      </Field>
      <Field label="Game URL">
        <input name="gameUrl" defaultValue={game.gameUrl ?? ""} className="adm-input" />
      </Field>

      <div className="adm-formField adm-formField--span2">
        <span className="adm-formLabel">Stats (0–5)</span>
        <div className="adm-statsGrid">
          <label className="adm-statSub">
            <span>Complexity</span>
            <input
              name="complexity"
              type="number"
              min={0}
              max={5}
              step={1}
              defaultValue={game.stats?.complexity ?? 0}
              className="adm-input adm-input--num"
            />
          </label>
          <label className="adm-statSub">
            <span>Creativity</span>
            <input
              name="creativity"
              type="number"
              min={0}
              max={5}
              step={1}
              defaultValue={game.stats?.creativity ?? 0}
              className="adm-input adm-input--num"
            />
          </label>
          <label className="adm-statSub">
            <span>Completeness</span>
            <input
              name="completeness"
              type="number"
              min={0}
              max={5}
              step={1}
              defaultValue={game.stats?.completeness ?? 0}
              className="adm-input adm-input--num"
            />
          </label>
          <label className="adm-statSub">
            <span>Fun</span>
            <input
              name="fun"
              type="number"
              min={0}
              max={5}
              step={1}
              defaultValue={game.stats?.fun ?? 0}
              className="adm-input adm-input--num"
            />
          </label>
        </div>
      </div>

      <div className="adm-formField adm-formField--span2">
        <span className="adm-formLabel">Team Members</span>
        <TeamMembersEditor value={teamMembers} onChange={setTeamMembers} roster={roster} />
      </div>

      <div className="adm-formField adm-formField--span2">
        <span className="adm-formLabel">Achievements</span>
        <AchievementsEditor value={achievements} onChange={setAchievements} catalog={catalog} />
      </div>

      <FormActions
        pending={pending}
        onCancel={onClose}
        error={error}
        submitLabel={mode === "create" ? "Create" : "Save"}
      />
    </form>
  );
}

export function EditGameButton({
  game,
  roster,
  catalog,
}: {
  game: GameLike;
  roster: RosterEntry[];
  catalog: Achievement[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-editBtn">
        Edit
      </button>
      {open && (
        <Modal title={`Edit Game · ${game.id}`} onClose={() => setOpen(false)}>
          <GameFormBody
            mode="edit"
            game={game}
            roster={roster}
            catalog={catalog}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export function CreateGameButton({
  roster,
  catalog,
}: {
  roster: RosterEntry[];
  catalog: Achievement[];
}) {
  const [open, setOpen] = useState(false);
  const empty: GameLike = { id: "", title: "", stats: {}, teamMembers: [], achievements: [] };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-createBtn">
        + New Game
      </button>
      {open && (
        <Modal title="Create Game" onClose={() => setOpen(false)}>
          <GameFormBody
            mode="create"
            game={empty}
            roster={roster}
            catalog={catalog}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

// ── Member ─────────────────────────────────────────────────────

type MemberLike = {
  slug: string;
  name: string;
  hasOverride: boolean;
  override: {
    titleLine?: string;
    motto?: string;
    aboutText?: string;
    location?: string;
    rank?: string;
    coins?: number;
    profileSrc?: string;
    skills?: { name: string; level: number }[];
    achievements?: Achievement[];
  };
};

function buildMemberPatch(
  fd: FormData,
  profileSrc: string,
  skills: { name: string; level: number }[],
  achievements: Achievement[],
): MemberPatch {
  return {
    titleLine: String(fd.get("titleLine") ?? ""),
    motto: String(fd.get("motto") ?? ""),
    aboutText: String(fd.get("aboutText") ?? ""),
    location: String(fd.get("location") ?? ""),
    rank: String(fd.get("rank") ?? ""),
    coins: Number(fd.get("coins") ?? 0),
    profileSrc,
    skills,
    achievements,
  };
}

function MemberFormBody({
  mode,
  member,
  catalog,
  onClose,
}: {
  mode: "edit" | "create";
  member: MemberLike;
  catalog: Achievement[];
  onClose: () => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(mode === "create" ? "" : member.slug);
  const [profileSrc, setProfileSrc] = useState(member.override.profileSrc ?? "");
  const [achievements, setAchievements] = useState<Achievement[]>(
    member.override.achievements ?? [],
  );
  const router = useRouter();
  const effectiveId = mode === "create" ? slug : member.slug;

  const skillLevelMap = new Map<string, number>();
  for (const s of member.override.skills ?? []) skillLevelMap.set(s.name, s.level);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const skills = SKILL_NAMES.map((name) => ({
      name,
      level: Number(fd.get(`skill__${name}`) ?? 0),
    })).filter((s) => s.level > 0);
    const patch = buildMemberPatch(fd, profileSrc, skills, achievements);
    start(async () => {
      try {
        if (mode === "create") {
          if (!slug) throw new Error("Slug is required.");
          await createMember(slug, patch);
        } else {
          await saveMember(member.slug, patch);
        }
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="adm-modalForm">
      {mode === "create" && (
        <Field label="Slug (lowercase, hyphens)" span2>
          <input
            name="slug"
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            className="adm-input adm-mono"
            placeholder="e.g. troy"
            required
            autoFocus
          />
        </Field>
      )}
      <Field label="Title Line">
        <input
          name="titleLine"
          defaultValue={member.override.titleLine ?? ""}
          className="adm-input"
          placeholder="HamsterHub Creator"
        />
      </Field>
      <Field label="Motto">
        <input
          name="motto"
          defaultValue={member.override.motto ?? ""}
          className="adm-input"
        />
      </Field>
      <Field label="About Text" span2>
        <textarea
          name="aboutText"
          defaultValue={member.override.aboutText ?? ""}
          className="adm-textarea"
          rows={4}
        />
      </Field>
      <Field label="Location">
        <input
          name="location"
          defaultValue={member.override.location ?? ""}
          className="adm-input"
        />
      </Field>
      <Field label="Profile Src" span2>
        <div className="adm-inputWithUpload">
          <input
            name="profileSrc"
            value={profileSrc}
            onChange={(e) => setProfileSrc(e.target.value)}
            className="adm-input adm-mono"
            placeholder="/godang/members/{slug}.png"
          />
          <AssetUploader
            kind="member"
            id={effectiveId}
            field="profile"
            value={profileSrc}
            onChange={setProfileSrc}
          />
        </div>
      </Field>
      <Field label="Rank">
        <input
          name="rank"
          defaultValue={member.override.rank ?? ""}
          className="adm-input"
          placeholder="Warrior (default)"
        />
      </Field>
      <Field label="Coins">
        <input
          name="coins"
          type="number"
          min={0}
          step={1}
          defaultValue={member.override.coins ?? 0}
          className="adm-input adm-input--num"
        />
      </Field>

      <div className="adm-formField adm-formField--span2">
        <span className="adm-formLabel">Skills (0–5)</span>
        <div className="adm-skillsGrid">
          {SKILL_NAMES.map((name) => (
            <label key={name} className="adm-statSub">
              <span>{name}</span>
              <input
                name={`skill__${name}`}
                type="number"
                min={0}
                max={5}
                step={1}
                defaultValue={skillLevelMap.get(name) ?? 0}
                className="adm-input adm-input--num"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="adm-formField adm-formField--span2">
        <span className="adm-formLabel">Achievements</span>
        <AchievementsEditor value={achievements} onChange={setAchievements} catalog={catalog} />
      </div>

      <FormActions
        pending={pending}
        onCancel={onClose}
        error={error}
        submitLabel={mode === "create" ? "Create" : "Save"}
      />
    </form>
  );
}

export function EditMemberButton({
  member,
  catalog,
}: {
  member: MemberLike;
  catalog: Achievement[];
}) {
  const [open, setOpen] = useState(false);
  const verb = member.hasOverride ? "Edit" : "Create";
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-editBtn">
        {verb}
      </button>
      {open && (
        <Modal title={`${verb} Member · ${member.slug}`} onClose={() => setOpen(false)}>
          <MemberFormBody
            mode="edit"
            member={member}
            catalog={catalog}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export function CreateMemberButton({ catalog }: { catalog: Achievement[] }) {
  const [open, setOpen] = useState(false);
  const empty: MemberLike = { slug: "", name: "", hasOverride: false, override: {} };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-createBtn">
        + New Member
      </button>
      {open && (
        <Modal title="Create Member" onClose={() => setOpen(false)}>
          <MemberFormBody
            mode="create"
            member={empty}
            catalog={catalog}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

// ── Event ──────────────────────────────────────────────────────

type EventLike = {
  id: string;
  name?: string;
  kind?: string;
  date?: string;
  theme?: string;
  location?: string;
  posterSrc?: string;
};

function buildEventPatch(fd: FormData, posterSrc: string): EventPatch {
  return {
    name: String(fd.get("name") ?? ""),
    kind: String(fd.get("kind") ?? "jam") as EventPatch["kind"],
    date: String(fd.get("date") ?? ""),
    theme: String(fd.get("theme") ?? ""),
    location: String(fd.get("location") ?? ""),
    posterSrc,
  };
}

function EventFormBody({
  mode,
  event,
  onClose,
}: {
  mode: "edit" | "create";
  event: EventLike;
  onClose: () => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [eventId, setEventId] = useState(mode === "create" ? "" : event.id);
  const [posterSrc, setPosterSrc] = useState(event.posterSrc ?? "");
  const router = useRouter();
  const effectiveId = mode === "create" ? eventId : event.id;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const patch = buildEventPatch(fd, posterSrc);
    start(async () => {
      try {
        if (mode === "create") {
          if (!eventId) throw new Error("ID is required.");
          await createEvent(eventId, patch);
        } else {
          await saveEvent(event.id, patch);
        }
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="adm-modalForm">
      {mode === "create" && (
        <Field label="ID (lowercase, hyphens)" span2>
          <input
            name="id"
            value={eventId}
            onChange={(e) => setEventId(slugify(e.target.value))}
            className="adm-input adm-mono"
            placeholder="e.g. gamejamx-2026"
            required
            autoFocus
          />
        </Field>
      )}
      <Field label="Name">
        <input name="name" defaultValue={event.name ?? ""} className="adm-input" required />
      </Field>
      <Field label="Kind">
        <select name="kind" defaultValue={event.kind ?? "jam"} className="adm-input">
          <option value="jam">jam</option>
          <option value="workshop">workshop</option>
          <option value="showcase">showcase</option>
          <option value="competition">competition</option>
        </select>
      </Field>
      <Field label="Date">
        <input
          name="date"
          defaultValue={event.date ?? ""}
          className="adm-input"
          placeholder="YYYY-MM"
        />
      </Field>
      <Field label="Location">
        <input name="location" defaultValue={event.location ?? ""} className="adm-input" />
      </Field>
      <Field label="Theme" span2>
        <input name="theme" defaultValue={event.theme ?? ""} className="adm-input" />
      </Field>
      <Field label="Poster Src" span2>
        <div className="adm-inputWithUpload">
          <input
            name="posterSrc"
            value={posterSrc}
            onChange={(e) => setPosterSrc(e.target.value)}
            className="adm-input adm-mono"
          />
          <AssetUploader
            kind="event"
            id={effectiveId}
            field="poster"
            value={posterSrc}
            onChange={setPosterSrc}
          />
        </div>
      </Field>

      <FormActions
        pending={pending}
        onCancel={onClose}
        error={error}
        submitLabel={mode === "create" ? "Create" : "Save"}
      />
    </form>
  );
}

export function EditEventButton({ event }: { event: EventLike }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-editBtn">
        Edit
      </button>
      {open && (
        <Modal title={`Edit Event · ${event.id}`} onClose={() => setOpen(false)}>
          <EventFormBody mode="edit" event={event} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export function CreateEventButton() {
  const [open, setOpen] = useState(false);
  const empty: EventLike = { id: "" };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-createBtn">
        + New Event
      </button>
      {open && (
        <Modal title="Create Event" onClose={() => setOpen(false)}>
          <EventFormBody mode="create" event={empty} onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}

// ── Achievement (catalog entry) ────────────────────────────────

function AchievementFormBody({
  mode,
  achievement,
  onClose,
}: {
  mode: "edit" | "create";
  achievement: CatalogAchievement;
  onClose: () => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState(achievement.id ?? "");
  const router = useRouter();
  const prevId = mode === "edit" ? achievement.id : null;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const patch: CatalogAchievement = {
      id,
      label: String(fd.get("label") ?? ""),
      sublabel: String(fd.get("sublabel") ?? ""),
      kind: String(fd.get("kind") ?? "custom") as CatalogAchievement["kind"],
      icon: String(fd.get("icon") ?? ""),
    };
    start(async () => {
      try {
        await saveCatalogAchievement(prevId, patch);
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  function onDelete() {
    if (mode !== "edit" || !prevId) return;
    if (!confirm(`Delete badge "${prevId}"?`)) return;
    start(async () => {
      try {
        await deleteCatalogAchievement(prevId);
        onClose();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Delete failed");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="adm-modalForm">
      <Field label="ID (kebab-case)" span2>
        <input
          name="id"
          value={id}
          onChange={(e) => setId(slugify(e.target.value))}
          className="adm-input adm-mono"
          placeholder="e.g. first-jam"
          required
          autoFocus={mode === "create"}
        />
      </Field>
      <Field label="Label">
        <input
          name="label"
          defaultValue={achievement.label ?? ""}
          className="adm-input"
          required
        />
      </Field>
      <Field label="Sublabel">
        <input
          name="sublabel"
          defaultValue={achievement.sublabel ?? ""}
          className="adm-input"
        />
      </Field>
      <Field label="Kind">
        <select
          name="kind"
          defaultValue={achievement.kind ?? "custom"}
          className="adm-input"
        >
          <option value="top">top</option>
          <option value="team">team</option>
          <option value="fast">fast</option>
          <option value="custom">custom</option>
        </select>
      </Field>
      <Field label="Icon (emoji or path)">
        <input name="icon" defaultValue={achievement.icon ?? ""} className="adm-input" />
      </Field>

      <div className="adm-formFoot">
        {error && <span className="adm-formError">{error}</span>}
        <div className="adm-formActions">
          {mode === "edit" && (
            <button
              type="button"
              onClick={onDelete}
              className="adm-btn adm-btn--ghost adm-btn--danger"
              disabled={pending}
            >
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="adm-btn adm-btn--ghost"
            disabled={pending}
          >
            Cancel
          </button>
          <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
            {pending ? "Saving…" : mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export function EditAchievementButton({ achievement }: { achievement: CatalogAchievement }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-editBtn">
        Edit
      </button>
      {open && (
        <Modal title={`Edit Badge · ${achievement.id}`} onClose={() => setOpen(false)}>
          <AchievementFormBody
            mode="edit"
            achievement={achievement}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

export function CreateAchievementButton() {
  const [open, setOpen] = useState(false);
  const empty: CatalogAchievement = { id: "", label: "" };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-createBtn">
        + New Badge
      </button>
      {open && (
        <Modal title="Create Badge" onClose={() => setOpen(false)}>
          <AchievementFormBody
            mode="create"
            achievement={empty}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

// ── Submit Project For User (admin) ─────────────────────────────

function CreateProjectForUserBody({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  // ── target user ──────────────────────────────────────────────
  const [target, setTarget] = useState<AdminMemberHit | null>(null);
  const [memberQuery, setMemberQuery] = useState("");
  const [memberHits, setMemberHits] = useState<AdminMemberHit[]>([]);
  const [memberSearching, setMemberSearching] = useState(false);

  // ── teammates ────────────────────────────────────────────────
  const [teammates, setTeammates] = useState<AdminMemberHit[]>([]);
  const [teammateQuery, setTeammateQuery] = useState("");
  const [teammateHits, setTeammateHits] = useState<AdminMemberHit[]>([]);
  const [teammateSearching, setTeammateSearching] = useState(false);

  // ── courses ──────────────────────────────────────────────────
  const [courses, setCourses] = useState<SubmitCourse[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number>(-1);
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [sheetName, setSheetName] = useState("");

  // ── fields ───────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // ── upload state ─────────────────────────────────────────────
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // load courses on mount
  useEffect(() => {
    setCoursesLoading(true);
    fetchSubmitCourses()
      .then((c) => setCourses(c))
      .catch(() => setCourses([]))
      .finally(() => setCoursesLoading(false));
  }, []);

  // ── member search (target) ───────────────────────────────────
  const memberTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function searchTarget(q: string) {
    setMemberQuery(q);
    if (memberTimerRef.current) clearTimeout(memberTimerRef.current);
    if (q.trim().length < 2) { setMemberHits([]); return; }
    memberTimerRef.current = setTimeout(() => {
      setMemberSearching(true);
      searchAdminMembers(q)
        .then((hits) => {
          const taken = new Set([...teammates.map((t) => t.discordId)].filter(Boolean));
          setMemberHits(hits.filter((m) => !taken.has(m.discordId)));
        })
        .catch(() => setMemberHits([]))
        .finally(() => setMemberSearching(false));
    }, 180);
  }

  function pickTarget(m: AdminMemberHit) {
    setTarget(m);
    setMemberQuery("");
    setMemberHits([]);
  }

  // ── teammate search ──────────────────────────────────────────
  const teammateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function searchTeammate(q: string) {
    setTeammateQuery(q);
    if (teammateTimerRef.current) clearTimeout(teammateTimerRef.current);
    if (q.trim().length < 2) { setTeammateHits([]); return; }
    teammateTimerRef.current = setTimeout(() => {
      setTeammateSearching(true);
      searchAdminMembers(q)
        .then((hits) => {
          const taken = new Set([target?.discordId, ...teammates.map((t) => t.discordId)].filter(Boolean));
          setTeammateHits(hits.filter((m) => !taken.has(m.discordId)));
        })
        .catch(() => setTeammateHits([]))
        .finally(() => setTeammateSearching(false));
    }, 180);
  }

  function addTeammate(m: AdminMemberHit) {
    if (!m.discordId || m.discordId === target?.discordId) return;
    setTeammates((prev) => (prev.find((t) => t.discordId === m.discordId) ? prev : [...prev, m]));
    setTeammateQuery("");
    setTeammateHits([]);
  }

  function removeTeammate(discordId: string) {
    setTeammates((prev) => prev.filter((t) => t.discordId !== discordId));
  }

  // ── course selection ─────────────────────────────────────────
  function handleCourseChange(idx: number) {
    setSelectedCourseIdx(idx);
    if (idx >= 0 && courses[idx]) {
      const c = courses[idx];
      setCourseId(c.courseId);
      setCourseName(c.courseName);
      setSheetName(c.sheetName);
    } else {
      setCourseId("");
      setCourseName("");
      setSheetName("");
    }
  }

  // ── progress bar ─────────────────────────────────────────────
  function startProgress() {
    setProgress(0);
    setUploading(true);
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 8;
        return next >= 92 ? 92 : next;
      });
    }, 600);
  }

  function finishProgress() {
    if (progressRef.current) { clearInterval(progressRef.current); progressRef.current = null; }
    setProgress(100);
    setTimeout(() => setUploading(false), 400);
  }

  function resetProgress() {
    if (progressRef.current) { clearInterval(progressRef.current); progressRef.current = null; }
    setProgress(0);
    setUploading(false);
  }

  // ── submit ───────────────────────────────────────────────────
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!target?.discordId) { setError("เลือก Target user ก่อน"); return; }
    if (!title.trim()) { setError("กรอกชื่อโปรเจค"); return; }
    if (!videoFile) { setError("แนบไฟล์วีดีโอ"); return; }
    if (!sheetName.trim() && !courseName.trim() && !courseId.trim()) {
      setError("เลือก Course หรือกรอก sheetName / courseId อย่างน้อย 1 ช่อง");
      return;
    }

    const fd = new FormData();
    fd.append("targetDiscordId", target.discordId);
    fd.append("title", title.trim());
    fd.append("teamName", teamName.trim());
    fd.append("description", description.trim());
    fd.append("courseId", courseId.trim());
    fd.append("courseName", courseName.trim());
    fd.append("sheetName", sheetName.trim());
    fd.append("video", videoFile);
    if (coverFile) fd.append("cover", coverFile);
    if (teammates.length > 0) {
      fd.append("teamDiscordIds", JSON.stringify(teammates.map((t) => t.discordId)));
    }

    startProgress();
    startTransition(async () => {
      try {
        const res = await adminSubmitProjectFor(fd);
        finishProgress();
        if (!res.success) {
          setError(res.message || res.error || "Submit failed");
          resetProgress();
          return;
        }
        setSuccessId(String(res.projectId || ""));
        router.refresh();
      } catch (err) {
        resetProgress();
        setError(err instanceof Error ? err.message : "Submit failed");
      }
    });
  }

  // ── success screen ────────────────────────────────────────────
  if (successId !== null) {
    return (
      <div style={{ padding: "32px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 40 }}>✅</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>อัปโหลดสำเร็จ!</div>
          {successId && (
            <div className="adm-dimText" style={{ fontSize: 12 }}>
              Project ID: <code style={{ userSelect: "all" }}>{successId}</code>
            </div>
          )}
          <div className="adm-dimText" style={{ fontSize: 12, marginTop: 4 }}>
            ไฟล์ถูกส่งไปยัง Google Drive แล้ว — ใช้ปุ่ม Import ในตาราง Submitted Projects เพื่อนำเข้าระบบ
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={() => {
              setSuccessId(null);
              setTarget(null);
              setTitle("");
              setTeamName("");
              setDescription("");
              setVideoFile(null);
              setCoverFile(null);
              setTeammates([]);
              setSelectedCourseIdx(-1);
              setCourseId("");
              setCourseName("");
              setSheetName("");
              setError(null);
            }}
          >
            อัปโหลดอีกครั้ง
          </button>
          <button type="button" className="adm-btn adm-btn--primary" onClick={onClose}>
            ปิด
          </button>
        </div>
      </div>
    );
  }

  const isSubmitting = uploading;

  return (
    <form className="adm-form" onSubmit={handleSubmit}>
      {/* progress bar */}
      {uploading && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ height: 6, background: "#e8eff5", borderRadius: 999, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#FFCB47,#e05b30)",
                borderRadius: 999,
                transition: "width 0.5s ease",
              }}
            />
          </div>
          <span className="adm-dimText" style={{ fontSize: 11, marginTop: 3, display: "block" }}>
            กำลังอัปโหลด… {Math.round(progress)}%
          </span>
        </div>
      )}

      <div className="adm-formGrid">
        {/* ── target user ── */}
        <Field label="Target user (Discord ID required)" span2>
          {target ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, border: "1.5px solid #9FD2EC", borderRadius: 10, background: "#fff" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                <strong>{target.realName || target.nickname || target.username}</strong>
                <code className="adm-dimText" style={{ fontSize: 11 }}>
                  @{target.username || "—"} · discord:{target.discordId || "—"}
                </code>
              </div>
              <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setTarget(null)} disabled={isSubmitting}>
                Change
              </button>
            </div>
          ) : (
            <input
              type="text"
              className="adm-input"
              placeholder="Search by real name, nickname, Discord ID, username…"
              value={memberQuery}
              onChange={(e) => searchTarget(e.target.value)}
              disabled={isSubmitting}
            />
          )}
          {!target && memberHits.length > 0 && (
            <ul style={{ listStyle: "none", padding: 6, margin: "6px 0 0", border: "1.5px solid #FFCB47", borderRadius: 10, background: "#fff", maxHeight: 200, overflowY: "auto" }}>
              {memberHits.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => pickTarget(m)}
                    style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent", padding: "6px 8px", borderRadius: 6, cursor: "pointer" }}
                  >
                    <strong>{m.realName || m.nickname || m.username}</strong>{" "}
                    <span className="adm-dimText" style={{ fontSize: 11 }}>
                      · @{m.username || "—"} · {m.discordId || "no-discord"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {!target && memberSearching && <span className="adm-dimText" style={{ fontSize: 12 }}>Searching…</span>}
        </Field>

        {/* ── project title ── */}
        <Field label="Project title" span2>
          <input
            type="text"
            className="adm-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            disabled={isSubmitting}
            required
          />
        </Field>

        {/* ── team name ── */}
        <Field label="Team name">
          <input
            type="text"
            className="adm-input"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            maxLength={80}
            disabled={isSubmitting}
          />
        </Field>

        {/* ── course dropdown ── */}
        <Field label="Course / Event" span2>
          {coursesLoading ? (
            <span className="adm-dimText" style={{ fontSize: 12 }}>Loading courses…</span>
          ) : courses.length > 0 ? (
            <select
              className="adm-input"
              value={selectedCourseIdx}
              onChange={(e) => handleCourseChange(Number(e.target.value))}
              disabled={isSubmitting}
            >
              <option value={-1}>— เลือก course —</option>
              {courses.map((c, i) => (
                <option key={i} value={i}>
                  {c.courseName}{c.sheetName ? ` (${c.sheetName})` : ""}
                </option>
              ))}
            </select>
          ) : (
            <span className="adm-dimText" style={{ fontSize: 12 }}>ไม่พบ course (API ไม่ตอบสนอง — กรอกด้วยตนเองด้านล่าง)</span>
          )}
        </Field>

        {/* ── manual override fields ── */}
        <Field label="Course ID (override)">
          <input
            type="text"
            className="adm-input"
            value={courseId}
            onChange={(e) => { setCourseId(e.target.value); setSelectedCourseIdx(-1); }}
            disabled={isSubmitting}
            placeholder="จาก dropdown หรือกรอกเอง"
          />
        </Field>

        <Field label="Sheet name (override)">
          <input
            type="text"
            className="adm-input"
            value={sheetName}
            onChange={(e) => { setSheetName(e.target.value); setSelectedCourseIdx(-1); }}
            disabled={isSubmitting}
            placeholder="e.g. IC2 Roblox"
          />
        </Field>

        <Field label="Course name (override)" span2>
          <input
            type="text"
            className="adm-input"
            value={courseName}
            onChange={(e) => { setCourseName(e.target.value); setSelectedCourseIdx(-1); }}
            disabled={isSubmitting}
          />
        </Field>

        {/* ── description ── */}
        <Field label="Description" span2>
          <textarea
            className="adm-input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 600))}
            disabled={isSubmitting}
          />
        </Field>

        {/* ── video ── */}
        <Field label="Video file (required)" span2>
          <input
            type="file"
            accept="video/mp4,video/quicktime,video/webm,video/x-msvideo,video/x-matroska,video/x-m4v"
            onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
            disabled={isSubmitting}
            required
          />
          {videoFile && (
            <span className="adm-dimText" style={{ fontSize: 11 }}>
              {videoFile.name} · {(videoFile.size / 1024 / 1024).toFixed(1)} MB
            </span>
          )}
        </Field>

        {/* ── cover ── */}
        <Field label="Cover image (optional)" span2>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            disabled={isSubmitting}
          />
          {coverFile && (
            <span className="adm-dimText" style={{ fontSize: 11 }}>
              {coverFile.name} · {(coverFile.size / 1024 / 1024).toFixed(1)} MB
            </span>
          )}
        </Field>

        {/* ── teammates ── */}
        <Field label="Add teammates (optional)" span2>
          <input
            type="text"
            className="adm-input"
            placeholder={target ? "Search teammates to add…" : "เลือก target user ก่อน"}
            value={teammateQuery}
            onChange={(e) => searchTeammate(e.target.value)}
            disabled={isSubmitting || !target}
          />
          {teammateHits.length > 0 && (
            <ul style={{ listStyle: "none", padding: 6, margin: "6px 0 0", border: "1.5px solid #FFCB47", borderRadius: 10, background: "#fff", maxHeight: 160, overflowY: "auto" }}>
              {teammateHits.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => addTeammate(m)}
                    style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent", padding: "6px 8px", borderRadius: 6, cursor: "pointer" }}
                  >
                    + {m.realName || m.nickname || m.username}{" "}
                    <span className="adm-dimText" style={{ fontSize: 11 }}>
                      · {m.discordId || "no-discord"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {teammateSearching && <span className="adm-dimText" style={{ fontSize: 12 }}>Searching…</span>}
          {teammates.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {teammates.map((t) => (
                <li
                  key={t.discordId}
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: "#FFF4D6", border: "1px solid rgba(224,91,48,0.34)", fontSize: 12 }}
                >
                  <strong>{t.nickname || t.realName || t.username}</strong>
                  <button
                    type="button"
                    onClick={() => removeTeammate(t.discordId)}
                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "#e05b30" }}
                    aria-label={`Remove ${t.realName}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Field>
      </div>

      <FormActions
        pending={isSubmitting}
        onCancel={onClose}
        error={error}
        submitLabel={isSubmitting ? `กำลังอัปโหลด… ${Math.round(progress)}%` : "Submit project"}
      />
    </form>
  );
}

export function CreateProjectForUserButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="adm-createBtn">
        + Create Project for User
      </button>
      {open && (
        <Modal title="Submit project on behalf of a user" onClose={() => setOpen(false)}>
          <CreateProjectForUserBody onClose={() => setOpen(false)} />
        </Modal>
      )}
    </>
  );
}
