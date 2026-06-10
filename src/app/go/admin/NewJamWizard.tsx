"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createEvent, createGame } from "./actions";
import { TeamMembersEditor, type RosterEntry, type TeamMember } from "./TeamMembersEditor";

type Step = 1 | 2 | 3;

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9_-]/g, "");
}

export function NewJamWizard({ roster }: { roster: RosterEntry[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // Step 1 — event
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventKind, setEventKind] = useState<"jam" | "workshop" | "showcase" | "competition">("jam");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventTheme, setEventTheme] = useState("");

  // Step 2 — current game draft
  const [createdGames, setCreatedGames] = useState<string[]>([]);
  const [gameId, setGameId] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [gameTeam, setGameTeam] = useState("");
  const [gameDesc, setGameDesc] = useState("");
  const [gameVideoUrl, setGameVideoUrl] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [gameComplexity, setGameComplexity] = useState(3);
  const [gameCreativity, setGameCreativity] = useState(3);
  const [gameCompleteness, setGameCompleteness] = useState(3);
  const [gameFun, setGameFun] = useState(3);
  const [gameMembers, setGameMembers] = useState<TeamMember[]>([]);

  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function reset() {
    setOpen(false);
    setStep(1);
    setEventId(""); setEventName(""); setEventKind("jam");
    setEventDate(""); setEventLocation(""); setEventTheme("");
    setCreatedGames([]);
    resetGameDraft();
    setError(null);
  }

  function resetGameDraft() {
    setGameId(""); setGameTitle(""); setGameTeam(""); setGameDesc("");
    setGameVideoUrl(""); setGameUrl("");
    setGameComplexity(3); setGameCreativity(3); setGameCompleteness(3); setGameFun(3);
    setGameMembers([]);
  }

  function submitEvent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    start(async () => {
      try {
        await createEvent(eventId, {
          name: eventName,
          kind: eventKind,
          date: eventDate,
          location: eventLocation,
          theme: eventTheme,
        });
        setStep(2);
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  function submitGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    start(async () => {
      try {
        await createGame(gameId, {
          title: gameTitle,
          teamName: gameTeam,
          description: gameDesc,
          event: eventName,
          videoUrl: gameVideoUrl,
          gameUrl,
          stats: {
            complexity: gameComplexity,
            creativity: gameCreativity,
            completeness: gameCompleteness,
            fun: gameFun,
          },
          teamMembers: gameMembers,
        });
        setCreatedGames((prev) => [...prev, gameId]);
        resetGameDraft();
        router.refresh();
      } catch (err: any) {
        setError(err?.message ?? "Save failed");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="adm-btn adm-btn--primary adm-jamBtn"
      >
        + Start New Jam
      </button>

      {open && (
        <div className="adm-modalOverlay" onClick={reset}>
          <div className="adm-modalCard adm-modalCard--wide" onClick={(e) => e.stopPropagation()}>
            <header className="adm-modalHeader">
              <h3 className="adm-modalTitle">New Jam Wizard · {eventName || "New Event"}</h3>
              <button type="button" onClick={reset} className="adm-modalClose" aria-label="Close">×</button>
            </header>

            <ol className="adm-stepBar">
              <li className={step >= 1 ? "is-active" : ""}>1 · Event</li>
              <li className={step >= 2 ? "is-active" : ""}>2 · Games</li>
              <li className={step >= 3 ? "is-active" : ""}>3 · Done</li>
            </ol>

            {step === 1 && (
              <form onSubmit={submitEvent} className="adm-modalForm">
                <label className="adm-formField adm-formField--span2">
                  <span className="adm-formLabel">Event ID (lowercase, hyphens)</span>
                  <input
                    value={eventId}
                    onChange={(e) => setEventId(slugify(e.target.value))}
                    className="adm-input adm-mono"
                    placeholder="e.g. gamejamx-2026"
                    required
                    autoFocus
                  />
                </label>
                <label className="adm-formField">
                  <span className="adm-formLabel">Name</span>
                  <input
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="adm-input"
                    required
                  />
                </label>
                <label className="adm-formField">
                  <span className="adm-formLabel">Kind</span>
                  <select
                    value={eventKind}
                    onChange={(e) => setEventKind(e.target.value as typeof eventKind)}
                    className="adm-input"
                  >
                    <option value="jam">jam</option>
                    <option value="workshop">workshop</option>
                    <option value="showcase">showcase</option>
                    <option value="competition">competition</option>
                  </select>
                </label>
                <label className="adm-formField">
                  <span className="adm-formLabel">Date</span>
                  <input
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="adm-input"
                    placeholder="YYYY-MM"
                  />
                </label>
                <label className="adm-formField">
                  <span className="adm-formLabel">Location</span>
                  <input
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="adm-input"
                  />
                </label>
                <label className="adm-formField adm-formField--span2">
                  <span className="adm-formLabel">Theme</span>
                  <input
                    value={eventTheme}
                    onChange={(e) => setEventTheme(e.target.value)}
                    className="adm-input"
                  />
                </label>
                <div className="adm-formFoot">
                  {error && <span className="adm-formError">{error}</span>}
                  <div className="adm-formActions">
                    <button type="button" onClick={reset} className="adm-btn adm-btn--ghost" disabled={pending}>Cancel</button>
                    <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
                      {pending ? "Creating…" : "Create event → Games"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="adm-wizardStep">
                <p className="adm-wizardNote">
                  เพิ่มเกมทีละตัว — กด <strong>Add game</strong> ซ้ำได้ตามต้องการ พอเสร็จกด <strong>Done</strong>
                </p>

                {createdGames.length > 0 && (
                  <div className="adm-wizardCreated">
                    <span className="adm-formLabel">Created so far ({createdGames.length})</span>
                    <ul className="adm-wizardChips">
                      {createdGames.map((id) => (
                        <li key={id}>
                          <code>{id}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={submitGame} className="adm-modalForm">
                  <label className="adm-formField">
                    <span className="adm-formLabel">Game ID</span>
                    <input
                      value={gameId}
                      onChange={(e) => setGameId(slugify(e.target.value))}
                      className="adm-input adm-mono"
                      placeholder="e.g. epic-quest"
                      required
                    />
                  </label>
                  <label className="adm-formField">
                    <span className="adm-formLabel">Title</span>
                    <input
                      value={gameTitle}
                      onChange={(e) => setGameTitle(e.target.value)}
                      className="adm-input"
                      required
                    />
                  </label>
                  <label className="adm-formField">
                    <span className="adm-formLabel">Team Name</span>
                    <input
                      value={gameTeam}
                      onChange={(e) => setGameTeam(e.target.value)}
                      className="adm-input"
                    />
                  </label>
                  <label className="adm-formField">
                    <span className="adm-formLabel">Game URL</span>
                    <input
                      value={gameUrl}
                      onChange={(e) => setGameUrl(e.target.value)}
                      className="adm-input"
                    />
                  </label>
                  <label className="adm-formField adm-formField--span2">
                    <span className="adm-formLabel">Description</span>
                    <textarea
                      value={gameDesc}
                      onChange={(e) => setGameDesc(e.target.value)}
                      className="adm-textarea"
                      rows={3}
                    />
                  </label>
                  <label className="adm-formField adm-formField--span2">
                    <span className="adm-formLabel">Video URL</span>
                    <input
                      value={gameVideoUrl}
                      onChange={(e) => setGameVideoUrl(e.target.value)}
                      className="adm-input"
                    />
                  </label>

                  <div className="adm-formField adm-formField--span2">
                    <span className="adm-formLabel">Stats (0–5)</span>
                    <div className="adm-statsGrid">
                      <label className="adm-statSub">
                        <span>Complexity</span>
                        <input type="number" min={0} max={5} value={gameComplexity} onChange={(e) => setGameComplexity(Number(e.target.value))} className="adm-input adm-input--num" />
                      </label>
                      <label className="adm-statSub">
                        <span>Creativity</span>
                        <input type="number" min={0} max={5} value={gameCreativity} onChange={(e) => setGameCreativity(Number(e.target.value))} className="adm-input adm-input--num" />
                      </label>
                      <label className="adm-statSub">
                        <span>Completeness</span>
                        <input type="number" min={0} max={5} value={gameCompleteness} onChange={(e) => setGameCompleteness(Number(e.target.value))} className="adm-input adm-input--num" />
                      </label>
                      <label className="adm-statSub">
                        <span>Fun</span>
                        <input type="number" min={0} max={5} value={gameFun} onChange={(e) => setGameFun(Number(e.target.value))} className="adm-input adm-input--num" />
                      </label>
                    </div>
                  </div>

                  <div className="adm-formField adm-formField--span2">
                    <span className="adm-formLabel">Team Members</span>
                    <TeamMembersEditor value={gameMembers} onChange={setGameMembers} roster={roster} />
                  </div>

                  <div className="adm-formFoot">
                    {error && <span className="adm-formError">{error}</span>}
                    <div className="adm-formActions">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="adm-btn adm-btn--ghost"
                        disabled={pending}
                      >
                        Done ({createdGames.length})
                      </button>
                      <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
                        {pending ? "Adding…" : "Add game"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="adm-wizardStep adm-wizardSummary">
                <div className="adm-allClear">
                  <span className="adm-allClearIcon">✓</span>
                  <span>Jam <strong>{eventName}</strong> created with <strong>{createdGames.length}</strong> game{createdGames.length === 1 ? "" : "s"}.</span>
                </div>
                {createdGames.length > 0 && (
                  <ul className="adm-wizardChips">
                    {createdGames.map((id) => (
                      <li key={id}>
                        <code>{id}</code>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="adm-formFoot">
                  <div className="adm-formActions">
                    <button type="button" onClick={reset} className="adm-btn adm-btn--primary">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
