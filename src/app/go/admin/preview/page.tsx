import path from "node:path";
import fs from "node:fs/promises";
import Link from "next/link";
import "./preview.css";

const PROFILES_DIR = path.join(process.cwd(), "src/app/go/data/members/profiles");
const RESERVED_SLUGS = new Set(["_debug_member_", "template"]);

export const dynamic = "force-dynamic";

type ProfileEntry = {
  slug: string;
  name: string;
  isReserved: boolean;
};

async function listProfiles(): Promise<ProfileEntry[]> {
  let entries;
  try {
    entries = await fs.readdir(PROFILES_DIR, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: ProfileEntry[] = [];
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".json")) continue;
    const slug = e.name.replace(/\.json$/, "");
    if (slug === "TEMPLATE") continue;
    let name = slug;
    try {
      const raw = await fs.readFile(path.join(PROFILES_DIR, e.name), "utf8");
      const data = JSON.parse(raw);
      if (typeof data?.name === "string" && data.name.trim()) {
        name = data.name.trim();
      }
    } catch {
      // Keep slug as fallback name on parse error.
    }
    out.push({ slug, name, isReserved: RESERVED_SLUGS.has(slug) });
  }
  out.sort((a, b) => {
    if (a.isReserved !== b.isReserved) return a.isReserved ? -1 : 1;
    return a.slug.localeCompare(b.slug);
  });
  return out;
}

export default async function PreviewIndex() {
  const profiles = await listProfiles();

  return (
    <div className="preview-index">
      <div className="preview-indexInner">
        <header className="preview-indexHeader">
          <div>
            <h1 className="preview-indexTitle">Profile Preview · Dev Only</h1>
            <p className="preview-indexSubtitle">
              อ่านไฟล์ JSON ตรงๆ ไม่ผ่าน registry filter — เห็นได้ทุก profile รวม reserved slugs
            </p>
          </div>
          <Link href="/go/admin" className="preview-indexBackLink">
            ← Back to admin
          </Link>
        </header>

        {profiles.length === 0 ? (
          <p>No profile JSON files found.</p>
        ) : (
          <div className="preview-indexGrid">
            {profiles.map((p) => (
              <Link
                key={p.slug}
                href={`/go/admin/preview/${p.slug}`}
                className="preview-indexCard"
              >
                <span
                  className={
                    p.isReserved
                      ? "preview-indexCardSlug preview-indexCardSlug--reserved"
                      : "preview-indexCardSlug"
                  }
                >
                  {p.slug}
                </span>
                <span className="preview-indexCardName">{p.name}</span>
                {p.isReserved && (
                  <span className="preview-indexCardBadge">Reserved</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
