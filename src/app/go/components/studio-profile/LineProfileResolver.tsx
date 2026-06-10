"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ExternalLink, Loader2, UserPlus } from "lucide-react";
import "./LineProfileResolver.css";

declare global {
  interface Window {
    liff?: {
      init(config: { liffId: string }): Promise<void>;
      isLoggedIn(): boolean;
      login(options?: { redirectUri?: string }): void;
      getIDToken(): string | null;
    };
  }
}

type LineSession = {
  success?: boolean;
  error?: string;
  linked?: boolean;
  hasProfile?: boolean;
  needsDiscord?: boolean;
  needsProfile?: boolean;
  authUrl?: string;
  profileLink?: string;
  missingFields?: string[];
  seed?: {
    realName?: string;
    fullname?: string;
    nickname?: string;
    nick?: string;
    school?: string;
    mobile?: string;
  };
};

const PROFILE_NOT_FOUND_MESSAGE =
  "ไม่พบหน้า Profile ของน้อง! น้องอาจยังไม่เคยสร้างโปรไฟล์หรือยังไม่ได้เชื่อม discord กับ Line ของน้อง แจ้งพี่ๆ Admin ได้เลยนะ";

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    "https://api.hamsterquest.com/api/nuutor/api"
  ).replace(/\/+$/, "");
}

function getLiffId() {
  return process.env.NEXT_PUBLIC_LINE_PROFILE_LIFF_ID || process.env.NEXT_PUBLIC_LINE_LIFF_ID || "";
}

function seedValue(seed: LineSession["seed"], keys: Array<keyof NonNullable<LineSession["seed"]>>) {
  for (const key of keys) {
    const value = String(seed?.[key] || "").trim();
    if (value) return value;
  }
  return "";
}

export function LineProfileResolver({ tab = "profile" }: { tab?: string }) {
  const apiBase = useMemo(() => getApiBase(), []);
  const liffId = useMemo(() => getLiffId(), []);
  const [sdkReady, setSdkReady] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [session, setSession] = useState<LineSession | null>(null);
  const [status, setStatus] = useState("Opening LINE profile...");
  const [error, setError] = useState("");
  const [realName, setRealName] = useState("");
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [mobile, setMobile] = useState("");
  const [creating, setCreating] = useState(false);
  const isProfileTab = tab === "profile";

  useEffect(() => {
    const src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (window.liff) {
      setSdkReady(true);
      return;
    }

    if (existing) {
      existing.addEventListener("load", () => setSdkReady(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setSdkReady(true);
    script.onerror = () => setError("LINE LIFF SDK failed to load");
    document.head.appendChild(script);
  }, []);

  const loadSession = useCallback(async (token: string) => {
    setStatus("Checking your LINE account...");
    const response = await fetch(`${apiBase}/profile/line/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token, tab }),
    });
    const payload = (await response.json()) as LineSession;
    if (!response.ok || !payload.success) throw new Error(payload.error || "LINE profile session failed");

    if (payload.profileLink && payload.hasProfile) {
      window.location.replace(payload.profileLink);
      return;
    }

    setSession(payload);
    setRealName(seedValue(payload.seed, ["realName", "fullname"]));
    setNickname(seedValue(payload.seed, ["nickname", "nick"]));
    setSchool(seedValue(payload.seed, ["school"]));
    setMobile(seedValue(payload.seed, ["mobile"]));
    setStatus(isProfileTab ? PROFILE_NOT_FOUND_MESSAGE : (payload.needsDiscord ? "Link Discord before opening your profile." : "Create your profile to continue."));
  }, [apiBase, isProfileTab, tab]);

  useEffect(() => {
    if (!sdkReady) return;
    let cancelled = false;
    async function start() {
      try {
        if (!liffId) throw new Error("LINE LIFF ID is not configured");
        if (!window.liff) throw new Error("LINE LIFF SDK is not ready");
        await window.liff.init({ liffId });
        if (!window.liff.isLoggedIn()) {
          window.liff.login({ redirectUri: window.location.href });
          return;
        }
        const token = window.liff.getIDToken();
        if (!token) throw new Error("LINE id token is missing. Enable openid scope on the LIFF app.");
        if (cancelled) return;
        setIdToken(token);
        await loadSession(token);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "LINE profile failed");
      }
    }
    start();
    return () => {
      cancelled = true;
    };
  }, [liffId, loadSession, sdkReady]);

  async function createProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!idToken || !realName.trim() || !nickname.trim() || !school.trim()) return;
    setCreating(true);
    setError("");
    try {
      const response = await fetch(`${apiBase}/profile/line/self-service`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, tab, realName, nickname, school, mobile }),
      });
      const payload = (await response.json()) as LineSession;
      if (!response.ok || !payload.success) throw new Error(payload.error || "Create profile failed");
      if (payload.profileLink) {
        window.location.replace(payload.profileLink);
        return;
      }
      await loadSession(idToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create profile failed");
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="lineProfileShell">
      <div className="lineProfileModal">
        <p className="lineProfileKicker">LINE Profile</p>
        <h1>Open your Hamster Hub profile</h1>
        <p className="lineProfileStatus">
          {!error && !session ? <Loader2 className="lineProfileSpin" aria-hidden /> : null}
          {error || status}
        </p>

        {session && isProfileTab && !session.hasProfile ? (
          <p className="lineProfileHelpText">
            หากน้องมั่นใจว่าเคยสร้างโปรไฟล์แล้ว ให้แจ้งพี่ๆ Admin เพื่อช่วยตรวจสอบการเชื่อม LINE กับ Discord
          </p>
        ) : null}

        {!isProfileTab && session?.needsDiscord ? (
          <a className="lineProfileButton" href={session.authUrl || "/profile"}>
            Link Discord <ExternalLink aria-hidden />
          </a>
        ) : null}

        {!isProfileTab && session?.needsProfile && !session.needsDiscord ? (
          <form className="lineProfileForm" onSubmit={createProfile}>
            <input value={realName} onChange={(event) => setRealName(event.target.value)} placeholder="Full name" required />
            <input value={nickname} onChange={(event) => setNickname(event.target.value)} placeholder="Nickname" required />
            <input value={school} onChange={(event) => setSchool(event.target.value)} placeholder="School" required />
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Mobile (optional)"
              pattern="0\d{8,9}"
            />
            <button className="lineProfileButton" type="submit" disabled={creating}>
              {creating ? <Loader2 className="lineProfileSpin" aria-hidden /> : <UserPlus aria-hidden />}
              Create profile
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
