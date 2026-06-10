// Hand-maintained domain logic. Raw list lives in index.generated.ts.
// Re-run `node scripts/gen-go-registries.mjs` after adding an event JSON.
import { ALL_EVENTS_RAW } from "./index.generated";
import type { EventInfo, EventKind } from "./types";

export type { EventInfo, EventKind };

export const ALL_EVENTS: EventInfo[] = ALL_EVENTS_RAW;

const BY_ID = new Map<string, EventInfo>();
for (const e of ALL_EVENTS) BY_ID.set(e.id.toLowerCase(), e);

export function getEvent(idOrName: string): EventInfo | null {
  if (!idOrName) return null;
  const k = idOrName.toLowerCase();
  return BY_ID.get(k) ?? ALL_EVENTS.find((e) => e.name.toLowerCase() === k) ?? null;
}
