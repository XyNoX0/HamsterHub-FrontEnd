export type EventKind = "jam" | "workshop" | "showcase" | "competition";

export type EventInfo = {
  id: string;
  name: string;
  kind: EventKind;
  date?: string;
  theme?: string;
  location?: string;
  posterSrc?: string;
};
