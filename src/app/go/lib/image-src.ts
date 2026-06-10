export function renderableImageSrc(value: unknown): string {
  const src = typeof value === "string" ? value.trim() : "";
  if (!src) return "";
  if (src.startsWith("/")) return src;

  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:" ? src : "";
  } catch {
    return "";
  }
}
