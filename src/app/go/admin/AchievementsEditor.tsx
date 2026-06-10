"use client";

import { useState } from "react";

export type Achievement = {
  id: string;
  label: string;
  sublabel?: string;
  kind?: string;
  icon?: string;
};

const KIND_OPTIONS = ["top", "team", "fast", "custom"];

export function AchievementsEditor({
  value,
  onChange,
  catalog,
}: {
  value: Achievement[];
  onChange: (next: Achievement[]) => void;
  catalog: Achievement[];
}) {
  const [showCustom, setShowCustom] = useState(false);
  const [draft, setDraft] = useState<Achievement>({
    id: "",
    label: "",
    sublabel: "",
    kind: "custom",
  });

  const usedIds = new Set(value.map((a) => a.id));
  const pickable = catalog.filter((a) => !usedIds.has(a.id));

  function addFromCatalog(id: string) {
    if (id === "") return;
    const found = catalog.find((a) => a.id === id);
    if (!found) return;
    onChange([...value, { ...found }]);
  }

  function addCustom() {
    if (!draft.id || !draft.label) return;
    if (usedIds.has(draft.id)) return;
    onChange([...value, { ...draft }]);
    setDraft({ id: "", label: "", sublabel: "", kind: "custom" });
    setShowCustom(false);
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div className="adm-achEditor">
      <ul className="adm-achList">
        {value.map((a, i) => (
          <li key={`${a.id}-${i}`} className="adm-achChip">
            <span className={`adm-achKind adm-achKind--${a.kind ?? "custom"}`}>
              {a.kind ?? "custom"}
            </span>
            <span className="adm-achText">
              <strong>{a.label}</strong>
              {a.sublabel && <span className="adm-achSub">{a.sublabel}</span>}
              <span className="adm-achId">id: {a.id}</span>
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="adm-tmRemove"
              aria-label={`Remove ${a.label}`}
            >
              ×
            </button>
          </li>
        ))}
        {value.length === 0 && (
          <li className="adm-tmEmpty">No achievements yet.</li>
        )}
      </ul>

      <div className="adm-achActions">
        <select
          className="adm-input"
          value=""
          onChange={(e) => addFromCatalog(e.target.value)}
          disabled={pickable.length === 0}
        >
          <option value="">
            {pickable.length === 0 ? "Catalog empty / all picked" : "Pick from catalog…"}
          </option>
          {pickable.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label} ({a.id})
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="adm-btn adm-btn--ghost adm-achToggle"
        >
          {showCustom ? "Cancel" : "+ Custom"}
        </button>
      </div>

      {showCustom && (
        <div className="adm-achCustom">
          <input
            value={draft.id}
            onChange={(e) =>
              setDraft({ ...draft, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") })
            }
            className="adm-input adm-mono"
            placeholder="id (kebab-case)"
          />
          <input
            value={draft.label}
            onChange={(e) => setDraft({ ...draft, label: e.target.value })}
            className="adm-input"
            placeholder="Label"
          />
          <input
            value={draft.sublabel ?? ""}
            onChange={(e) => setDraft({ ...draft, sublabel: e.target.value })}
            className="adm-input"
            placeholder="Sublabel (optional)"
          />
          <select
            value={draft.kind ?? "custom"}
            onChange={(e) => setDraft({ ...draft, kind: e.target.value })}
            className="adm-input"
          >
            {KIND_OPTIONS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addCustom}
            className="adm-btn adm-btn--primary"
            disabled={!draft.id || !draft.label}
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
