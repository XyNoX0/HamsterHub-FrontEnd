"use client";

import { useState, useTransition, type ChangeEvent } from "react";
import { uploadAsset } from "./actions";

type Kind = "game" | "member" | "event";
type Field = "poster" | "icon" | "profile";

export function AssetUploader({
  kind,
  id,
  field,
  value,
  onChange,
}: {
  kind: Kind;
  id: string;
  field: Field;
  value: string;
  onChange: (next: string) => void;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const idTrimmed = id.trim();
  const blocked = idTrimmed.length === 0;

  function handlePick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset so the same file can be picked twice
    if (!file) return;
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("kind", kind);
    fd.append("id", idTrimmed);
    fd.append("field", field);
    start(async () => {
      try {
        const result = await uploadAsset(fd);
        onChange(result.publicHref);
      } catch (err: any) {
        setError(err?.message ?? "Upload failed");
      }
    });
  }

  return (
    <div className="adm-uploader">
      {value && (
        <span className="adm-uploaderPreview" aria-hidden>
          <img
            src={value}
            alt=""
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </span>
      )}
      <label
        className={`adm-uploaderBtn${blocked || pending ? " adm-uploaderBtn--disabled" : ""}`}
      >
        <input
          type="file"
          accept="image/*"
          className="adm-uploaderInput"
          onChange={handlePick}
          disabled={blocked || pending}
        />
        {pending ? "Uploading…" : "Upload"}
      </label>
      {error && <span className="adm-uploaderError">{error}</span>}
      {!error && blocked && <span className="adm-uploaderHint">enter id first</span>}
    </div>
  );
}
