"use client";

import "./Stamp.css";

export type StampTone = "sun" | "dang" | "mint";

export function Stamp({
  label,
  tone = "sun",
  rotate = -8,
  className,
}: {
  label: string;
  tone?: StampTone;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`stamp stamp-${tone}${className ? ` ${className}` : ""}`}
      style={{ ["--stamp-rotate" as never]: `${rotate}deg` }}
      aria-hidden
    >
      <span className="stamp-inner">{label}</span>
    </span>
  );
}
