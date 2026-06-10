import path from "node:path";
import fs from "node:fs/promises";
import Link from "next/link";
import { Prompt, Poppins } from "next/font/google";
import { ALL_GAMES } from "../data/games/registry";
import { ALL_EVENTS } from "../data/events";
import { getAllMembers } from "../lib/members";
import { MEMBER_OVERRIDES } from "../data/members/overrides";
import { EditEventButton, CreateEventButton, EditAchievementButton, CreateAchievementButton } from "./EditModals";
import { NewJamWizard } from "./NewJamWizard";
import { GamesTable, type GameRow } from "./GamesTable";
import { MembersTable, type MemberRow } from "./MembersTable";
import { SubmittedProjectsTable } from "./SubmittedProjectsTable";
import {
  fetchSubmitCourses,
  fetchSubmitCourseVisibility,
  fetchSubmittedProjects,
  type SubmittedProjectRow,
  type SubmitCourse,
} from "./actions";
import { SubmitCourseVisibilityEditor } from "./SubmitCourseVisibilityEditor";
import { GoAdminAuthGate } from "./GoAdminAuthGate";
import { ToolsBar } from "./ToolsBar";
import { getGoAdminAuth } from "./auth";
import { validateAll } from "../../../../scripts/lib/validate-go.mjs";
import { ACHIEVEMENT_CATALOG } from "../data/achievements";
import { readSnapshot } from "../lib/dekhub-cache";
import "../page.css";
import "./page.css";

const ROOT = process.cwd();
const GAMES_DIR = path.join(ROOT, "src/app/go/data/games");
const PROFILES_DIR = path.join(ROOT, "src/app/go/data/members/profiles");

async function safeMtime(fp: string): Promise<string> {
  try {
    const st = await fs.stat(fp);
    return st.mtime.toISOString().slice(0, 16).replace("T", " ");
  } catch {
    return "";
  }
}

export const dynamic = "force-dynamic";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

type Severity = "ok" | "warn" | "miss";

function badge(sev: Severity, label: string) {
  return <span className={`adm-badge adm-badge--${sev}`}>{label}</span>;
}

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

export default async function DevConsole(_props: AdminPageProps) {
  const auth = await getGoAdminAuth();
  if (!auth.allowed) {
    return (
      <div className={`page-layout ${prompt.variable} ${poppins.variable}`}>
        <main className="page-main adm-root">
          <GoAdminAuthGate auth={auth} />
        </main>
      </div>
    );
  }

  const games = ALL_GAMES;
  const events = ALL_EVENTS;
  const members = getAllMembers();
  const validation = await validateAll();
  const dekhubSnap = await readSnapshot();
  const dekhubMembers = Object.values(dekhubSnap.byDiscordId);
  const dekhubEvaluated = dekhubMembers.filter((m) =>
    m.evaluations.some((e) => e.evaluatedAt),
  ).length;
  const dekhubCerts = dekhubMembers.filter((m) => m.certificates.length > 0).length;
  const dekhubSyncedDisplay = dekhubSnap.syncedAt
    ? dekhubSnap.syncedAt.slice(0, 16).replace("T", " ")
    : "never";

  // Bucket issues by (kind, id) so each row can render a health dot.
  const bucket = new Map<string, { critical: number; warn: number }>();
  for (const i of validation.issues) {
    const k = `${i.kind}:${i.id}`;
    const cur = bucket.get(k) ?? { critical: 0, warn: 0 };
    if (i.severity === "critical") cur.critical++;
    else cur.warn++;
    bucket.set(k, cur);
  }
  const healthFor = (kind: string, id: string): Severity => {
    const h = bucket.get(`${kind}:${id}`);
    if (!h) return "ok";
    return h.critical > 0 ? "miss" : h.warn > 0 ? "warn" : "ok";
  };

  const totalAppearances = games.reduce(
    (sum: number, g: any) => sum + (g.teamMembers?.length ?? 0),
    0,
  );
  const overrideCount = members.filter((m) => MEMBER_OVERRIDES[m.slug]).length;

  const roster = members.map((m) => ({
    slug: m.slug,
    name: m.name,
    username: m.username,
    profileSrc: m.profileSrc,
  }));
  const catalog = ACHIEVEMENT_CATALOG;

  const memberWithOverride =
    members.find((m) => MEMBER_OVERRIDES[m.slug])?.slug ?? members[0]?.slug ?? "troy";
  const memberWithoutOverride =
    members.find((m) => !MEMBER_OVERRIDES[m.slug])?.slug ?? memberWithOverride;

  const gameRows: GameRow[] = await Promise.all(
    games.map(async (g: any) => ({
      game: g,
      health: healthFor("game", g.id),
      mtime: await safeMtime(path.join(GAMES_DIR, g.id, "info.json")),
    })),
  );
  const memberRows: MemberRow[] = await Promise.all(
    members.map(async (m) => {
      const override = MEMBER_OVERRIDES[m.slug];
      return {
        member: m,
        hasOverride: !!override,
        override: override ?? {},
        health: healthFor("member", m.slug),
        mtime: await safeMtime(path.join(PROFILES_DIR, `${m.slug}.json`)),
      };
    }),
  );

  let submittedRows: SubmittedProjectRow[] = [];
  let submittedError = "";
  let submitCourses: SubmitCourse[] = [];
  let visibleSubmitSheets: string[] | null = null;
  try {
    submittedRows = await fetchSubmittedProjects("");
  } catch (err) {
    submittedError = err instanceof Error ? err.message : "Failed to load submitted projects";
  }
  try {
    [submitCourses, { visibleSheetNames: visibleSubmitSheets }] = await Promise.all([
      fetchSubmitCourses(),
      fetchSubmitCourseVisibility(),
    ]);
  } catch {
    submitCourses = [];
    visibleSubmitSheets = null;
  }
  const visibleSubmitCount =
    visibleSubmitSheets === null
      ? submitCourses.length
      : submitCourses.filter((course) => visibleSubmitSheets?.includes(course.sheetName)).length;
  const submittedImported = submittedRows.filter((row) => row.imported).length;
  const submittedBlocked = submittedRows.filter(
    (row) => !row.imported && row.unmappedTeamMembers.length > 0,
  ).length;
  const submittedReady = submittedRows.length - submittedImported - submittedBlocked;

  return (
    <div className={`page-layout ${prompt.variable} ${poppins.variable}`}>
      <main className="page-main adm-root">
        <header className="adm-header adm-shellHeader">
          <div>
            <span className="adm-eyebrow">Hamster Hub Operations</span>
            <h1 className="adm-title">Go Manage</h1>
            <p className="adm-subtitle">
              ตั้งค่า upload access ก่อน แล้วค่อยตรวจ project, catalog, members, events และ public display data
            </p>
          </div>
          <nav className="adm-quickChips" aria-label="Jump to">
            <NewJamWizard roster={roster} />
            <ToolsBar />
            <a href="#upload-config" className="adm-quickChip">
              <span className="adm-quickChipLabel">Upload Config</span>
              <span className="adm-quickChipPath">/profile picker</span>
            </a>
            <a href="#submitted-projects" className="adm-quickChip">
              <span className="adm-quickChipLabel">Projects Queue</span>
              <span className="adm-quickChipPath">{submittedReady} ready</span>
            </a>
            <Link href="/go" className="adm-quickChip">
              <span className="adm-quickChipLabel">Arena</span>
              <span className="adm-quickChipPath">/go</span>
            </Link>
            <Link href="/profile" className="adm-quickChip">
              <span className="adm-quickChipLabel">Directory</span>
              <span className="adm-quickChipPath">/profile</span>
            </Link>
            <Link href="/go/admin/preview" className="adm-quickChip">
              <span className="adm-quickChipLabel">Preview</span>
              <span className="adm-quickChipPath">profile JSON · dev only</span>
            </Link>
          </nav>
        </header>

        <section className="adm-opsIntro" aria-label="Go Manage overview">
          <div>
            <span className="adm-kicker">Config first</span>
            <h2>Control what users can submit before reviewing what appears on /go.</h2>
          </div>
          <div className="adm-opsMetrics">
            <span>
              <strong>{visibleSubmitCount}/{submitCourses.length}</strong>
              upload sheets open
            </span>
            <span>
              <strong>{submittedReady}</strong>
              projects ready
            </span>
            <span>
              <strong>{validation.critical}</strong>
              critical issues
            </span>
          </div>
        </section>

        <SubmitCourseVisibilityEditor
          courses={submitCourses}
          initialVisibleSheetNames={visibleSubmitSheets}
        />

        <section className="adm-section adm-displaySummary" aria-label="Display data summary">
          <div className="adm-sectionHeader">
            <div>
              <span className="adm-kicker">Display Data</span>
              <h2 className="adm-sectionTitle">Current /go Surface</h2>
            </div>
            <div className="adm-displayLinks">
              <Link href="/go" className="adm-permChip">Open /go</Link>
              <Link href="/profile" className="adm-permChip">Open /profile</Link>
              <Link href="/go/admin/preview" className="adm-permChip">Preview JSON</Link>
            </div>
          </div>
          <div className="adm-summaryGrid">
            <div className="adm-summaryCard">
              <span className="adm-summaryNum">{games.length}</span>
              <span className="adm-summaryLabel">Games</span>
            </div>
            <div className="adm-summaryCard">
              <span className="adm-summaryNum">{members.length}</span>
              <span className="adm-summaryLabel">Members</span>
            </div>
            <div className="adm-summaryCard">
              <span className="adm-summaryNum">{events.length}</span>
              <span className="adm-summaryLabel">Events</span>
            </div>
            <div className="adm-summaryCard">
              <span className="adm-summaryNum">{totalAppearances}</span>
              <span className="adm-summaryLabel">Appearances</span>
            </div>
            <div className="adm-summaryCard">
              <span className="adm-summaryNum">
                {overrideCount} / {members.length}
              </span>
              <span className="adm-summaryLabel">Profiles w/ Override</span>
            </div>
            <div
              className={`adm-summaryCard${validation.critical > 0 ? " adm-summaryCard--alert" : ""}`}
            >
              <span className="adm-summaryNum">
                {validation.critical} <span className="adm-summarySub">/ {validation.warn}</span>
              </span>
              <span className="adm-summaryLabel">Critical / Warn</span>
            </div>
            <div className="adm-summaryCard adm-summaryCard--wide">
              <span className="adm-summaryNum">
                {dekhubMembers.length}{" "}
                <span className="adm-summarySub">
                  · {dekhubEvaluated} eval · {dekhubCerts} cert
                </span>
              </span>
              <span className="adm-summaryLabel">Dekhub cache · {dekhubSyncedDisplay}</span>
            </div>
          </div>
        </section>

        {/* Submitted Projects */}
        {submittedError ? (
          <section className="adm-section" id="submitted-projects">
            <h2 className="adm-sectionTitle">Submitted Projects</h2>
            <p className="adm-dimText" style={{ fontSize: 13 }}>
              ไม่สามารถโหลด submitted projects ได้: <code>{submittedError}</code>
              <br />
              ตรวจสอบว่า <code>NUUTOR_ADMIN_API_KEY</code> และ <code>NUUTOR_API_BASE_URL</code>{" "}
              ตั้งค่าไว้ใน .env แล้ว
            </p>
          </section>
        ) : (
          <div id="submitted-projects">
            <SubmittedProjectsTable rows={submittedRows} />
          </div>
        )}

        {/* Games */}
        <GamesTable rows={gameRows} roster={roster} catalog={catalog} />

        {/* Members */}
        <MembersTable rows={memberRows} catalog={catalog} />

        {/* Health Check */}
        <section className="adm-section">
          <h2 className="adm-sectionTitle">Health Check</h2>
          {validation.issues.length === 0 ? (
            <div className="adm-allClear">
              <span className="adm-allClearIcon">✓</span>
              <span>All checks passed — ready for handover</span>
            </div>
          ) : (
            <div className="adm-tableWrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Where</th>
                    <th>Field</th>
                    <th>Status</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {validation.issues.map((it, i) => (
                    <tr key={i}>
                      <td>
                        <code>
                          {it.kind}/{it.id}
                        </code>
                      </td>
                      <td>
                        <code>{it.field}</code>
                      </td>
                      <td>
                        {badge(
                          it.severity === "critical" ? "miss" : "warn",
                          it.severity === "critical" ? "CRITICAL" : "WARN",
                        )}
                      </td>
                      <td className="adm-note">{it.note ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Component States */}
        <section className="adm-section">
          <h2 className="adm-sectionTitle">Display Preview Shortcuts</h2>
          <div className="adm-componentGrid">
            <article className="adm-componentCard">
              <h3 className="adm-componentName">Discover Arena</h3>
              <p className="adm-componentBlurb">Minesweeper-style package reveal.</p>
              <div className="adm-permRow">
                <Link href="/go" className="adm-permChip">
                  Live arena
                </Link>
              </div>
            </article>
            <article className="adm-componentCard">
              <h3 className="adm-componentName">Game Popup</h3>
              <p className="adm-componentBlurb">
                4-axis stats, hex achievement badge. Open one:
              </p>
              <div className="adm-permRow">
                {games.slice(0, 4).map((g: any) => (
                  <Link key={g.id} href={`/go?game=${g.id}`} className="adm-permChip">
                    {g.title}
                  </Link>
                ))}
              </div>
            </article>
            <article className="adm-componentCard">
              <h3 className="adm-componentName">Studio Profile</h3>
              <p className="adm-componentBlurb">Hero · stats · about · projects · journey.</p>
              <div className="adm-permRow">
                <Link href={`/profile/${memberWithOverride}`} className="adm-permChip">
                  With override
                </Link>
                <Link href={`/profile/${memberWithoutOverride}`} className="adm-permChip">
                  Defaults
                </Link>
                <Link href="/profile/__does_not_exist__" className="adm-permChip">
                  NotFound
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Events */}
        <section className="adm-section">
          <div className="adm-sectionHeader">
            <h2 className="adm-sectionTitle">
              Events <span className="adm-issueCount">{events.length}</span>
            </h2>
            <CreateEventButton />
          </div>
          <div className="adm-tableWrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th aria-label="Health" />
                  <th>ID</th>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Theme</th>
                  <th>Games</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => {
                  const linkedGames = games.filter(
                    (g: any) =>
                      (g.event ?? "").toLowerCase() === e.id.toLowerCase() ||
                      (g.event ?? "").toLowerCase() === e.name.toLowerCase(),
                  );
                  const sev = healthFor("event", e.id);
                  return (
                    <tr key={e.id}>
                      <td>
                        <span className={`adm-healthDot adm-healthDot--${sev}`} />
                      </td>
                      <td>
                        <code>{e.id}</code>
                      </td>
                      <td>{e.name}</td>
                      <td>{e.kind}</td>
                      <td>{e.date ?? "—"}</td>
                      <td>{e.location ?? "—"}</td>
                      <td>{e.theme ?? "—"}</td>
                      <td className="adm-num">{linkedGames.length}</td>
                      <td>
                        <EditEventButton event={e} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Achievement Catalog */}
        <section className="adm-section">
          <div className="adm-sectionHeader">
            <h2 className="adm-sectionTitle">
              Achievement Catalog <span className="adm-issueCount">{catalog.length}</span>
            </h2>
            <CreateAchievementButton />
          </div>
          {catalog.length === 0 ? (
            <p className="adm-dimText" style={{ fontSize: 13 }}>
              No badges defined yet. Click <strong>+ New Badge</strong> to create the first one.
            </p>
          ) : (
            <div className="adm-tableWrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Label</th>
                    <th>Sublabel</th>
                    <th>Kind</th>
                    <th>Icon</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catalog.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <code>{a.id}</code>
                      </td>
                      <td>{a.label}</td>
                      <td>{a.sublabel ?? "—"}</td>
                      <td>
                        <span className={`adm-achKind adm-achKind--${a.kind ?? "custom"}`}>
                          {a.kind ?? "custom"}
                        </span>
                      </td>
                      <td>{a.icon ?? "—"}</td>
                      <td>
                        <EditAchievementButton achievement={a} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="adm-footer">
          Dev-only console · excluded from the export deliverable.
        </footer>
      </main>
    </div>
  );
}
