// Admin-scoped type shim for the shared JS validator under scripts/lib/.
// This file is excluded from the export pipeline (admin/** is excluded).
declare module "*/scripts/lib/validate-go.mjs" {
  export type ValidationIssue = {
    kind: "game" | "member" | "event";
    id: string;
    field: string;
    severity: "critical" | "warn";
    note?: string;
  };
  export function validateAll(): Promise<{
    issues: ValidationIssue[];
    critical: number;
    warn: number;
  }>;
}
