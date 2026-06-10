"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, ExternalLink, Loader2, LogIn, LogOut, UserPlus } from "lucide-react";
import { consumeProfileLoginStarted, getDiscordProfileAuthUrl, getNuUtorApiBase } from "@/utils/profileAuth";
import "./GoProAuthPanel.css";

type AuthUser = {
  id: string;
  username: string;
  globalName?: string;
  avatarUrl?: string;
};

type AuthProfile = {
  identity?: {
    discordId?: string;
    username?: string;
    displayName?: string;
    realName?: string;
    nickname?: string;
    school?: string;
    mobile?: string;
  };
};

type ProfileSeed = {
  realName?: string;
  fullname?: string;
  name?: string;
  nickname?: string;
  nick?: string;
  school?: string;
  mobile?: string;
  phone?: string;
};

type SessionPayload = {
  success?: boolean;
  error?: string;
  missingFields?: string[];
  user?: AuthUser | null;
  profile?: AuthProfile | null;
  member?: ProfileSeed | null;
  seed?: ProfileSeed | null;
  profileSeed?: ProfileSeed | null;
  hasMemberData?: boolean;
  memberExists?: boolean;
  dataExists?: boolean;
  hasProfile?: boolean;
  profileCreated?: boolean;
  profileExists?: boolean;
  needsProfile?: boolean;
  created?: boolean;
  existing?: boolean;
  profileUsername?: string;
  username?: string;
};

type SessionState = {
  loading: boolean;
  token: string;
  user: AuthUser | null;
  profile: AuthProfile | null;
  seed: ProfileSeed | null;
  hasMemberData: boolean;
  hasProfile: boolean;
  missingFields: string[];
  error: string;
};

const TOKEN_KEY = "hh_go_pro_profile_token";

function getProfileUsername(profile: AuthProfile | null) {
  return profile?.identity?.username || "";
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function pickSeed(payload: SessionPayload): ProfileSeed | null {
  return payload.profileSeed || payload.seed || payload.member || null;
}

function getSeedValue(seed: ProfileSeed | null, keys: Array<keyof ProfileSeed>) {
  if (!seed) return "";
  for (const key of keys) {
    const value = text(seed[key]);
    if (value) return value;
  }
  return "";
}

function normalizeProfile(payload: SessionPayload, hasProfile = true): AuthProfile | null {
  if (payload.profile) return payload.profile;
  if (!hasProfile) return null;

  const username = text(payload.profileUsername) || text(payload.username);
  if (!username) return null;

  return { identity: { username } };
}

function booleanFlag(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function deriveHasProfile(payload: SessionPayload, profile: AuthProfile | null) {
  const explicit =
    booleanFlag(payload.hasProfile) ??
    booleanFlag(payload.profileCreated) ??
    booleanFlag(payload.profileExists) ??
    booleanFlag(payload.existing) ??
    booleanFlag(payload.created);
  if (explicit !== null) return explicit;
  if (booleanFlag(payload.needsProfile) === false) return true;
  if (text(payload.profileUsername) || text(payload.username)) return true;
  return Boolean(getProfileUsername(profile));
}

function deriveHasMemberData(payload: SessionPayload, seed: ProfileSeed | null) {
  const explicit =
    booleanFlag(payload.hasMemberData) ??
    booleanFlag(payload.memberExists) ??
    booleanFlag(payload.dataExists);
  if (explicit !== null) return explicit;
  return Boolean(seed);
}

function translateError(error: string): string {
  if (!error) return "";
  if (
    error.includes("profile_already_exists") ||
    error.includes("profile_exists") ||
    error.includes("discord_already_has_profile")
  ) {
    return "บัญชี Discord นี้มี profile อยู่แล้ว ระบบกำลังโหลดข้อมูลล่าสุด";
  }
  if (error.includes("mobile_owned_by_another_discord")) {
    return "เบอร์นี้ถูกผูกกับบัญชี Discord อื่นแล้ว กรุณาติดต่อแอดมิน";
  }
  if (error.includes("invalid_mobile")) {
    return "รูปแบบเบอร์มือถือไม่ถูกต้อง กรุณากรอกเลข 10 หลัก เช่น 0812345678";
  }
  if (error.includes("realName_required") || error.includes("real_name_required")) {
    return "กรุณากรอกชื่อ-นามสกุลจริง";
  }
  if (error.includes("profile_required_fields_missing")) {
    return "กรุณากรอกชื่อ-นามสกุล ชื่อเล่น และโรงเรียนให้ครบก่อนสร้างโปรไฟล์";
  }
  return error;
}

export function GoProAuthPanel() {
  const apiBase = useMemo(() => getNuUtorApiBase(), []);
  const [session, setSession] = useState<SessionState>({
    loading: true,
    token: "",
    user: null,
    profile: null,
    seed: null,
    hasMemberData: false,
    hasProfile: false,
    missingFields: [],
    error: "",
  });
  const [realName, setRealName] = useState("");
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [mobile, setMobile] = useState("");
  const [creating, setCreating] = useState(false);

  const loadSession = useCallback(async (token: string) => {
    if (!token) {
      setSession({
        loading: false,
        token: "",
        user: null,
        profile: null,
        seed: null,
        hasMemberData: false,
        hasProfile: false,
        missingFields: [],
        error: "",
      });
      return;
    }

    setSession((current) => ({ ...current, loading: true, token, error: "" }));
    try {
      const response = await fetch(`${apiBase}/profile/session`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const payload = (await response.json()) as SessionPayload;
      if (!response.ok || !payload.success) throw new Error(payload.error || "Session failed");
      const explicitHasProfile = deriveHasProfile(payload, payload.profile || null);
      const profile = normalizeProfile(payload, explicitHasProfile);
      const seed = pickSeed(payload);
      const hasProfile = deriveHasProfile(payload, profile);
      const hasMemberData = deriveHasMemberData(payload, seed);
      setSession({
        loading: false,
        token,
        user: payload.user || null,
        profile,
        seed,
        hasMemberData,
        hasProfile,
        missingFields: payload.missingFields || [],
        error: "",
      });

      setRealName(getSeedValue(seed, ["realName", "fullname", "name"]));
      setNickname(getSeedValue(seed, ["nickname", "nick"]));
      setSchool(getSeedValue(seed, ["school"]));
      setMobile(getSeedValue(seed, ["mobile", "phone"]));
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      setSession({
        loading: false,
        token: "",
        user: null,
        profile: null,
        seed: null,
        hasMemberData: false,
        hasProfile: false,
        missingFields: [],
        error: error instanceof Error ? error.message : "Session failed",
      });
    }
  }, [apiBase]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenFromCallback = url.searchParams.get("profileToken") || "";
    if (tokenFromCallback) {
      const loginStartedHere = consumeProfileLoginStarted();
      url.searchParams.delete("profileToken");
      window.history.replaceState({}, "", url.toString());
      if (!loginStartedHere) {
        localStorage.removeItem(TOKEN_KEY);
        loadSession("");
        return;
      }
      localStorage.setItem(TOKEN_KEY, tokenFromCallback);
      loadSession(tokenFromCallback);
      return;
    }

    loadSession(localStorage.getItem(TOKEN_KEY) || "");
  }, [loadSession]);

  function startDiscordLogin() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = getDiscordProfileAuthUrl();
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setSession({
      loading: false,
      token: "",
      user: null,
      profile: null,
      seed: null,
      hasMemberData: false,
      hasProfile: false,
      missingFields: [],
      error: "",
    });
    setRealName("");
    setNickname("");
    setSchool("");
    setMobile("");
  }

  function handleSwitchDiscord() {
    localStorage.removeItem(TOKEN_KEY);
    startDiscordLogin();
  }

  async function createProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session.token || session.hasProfile || !realName.trim() || !nickname.trim() || !school.trim()) return;

    setCreating(true);
    setSession((current) => ({ ...current, error: "" }));
    await loadSession(session.token);
    try {
      const response = await fetch(`${apiBase}/profile/self-service`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: JSON.stringify({ realName, nickname, school, mobile }),
      });
      const payload = (await response.json()) as SessionPayload;
      if (!response.ok || !payload.success) {
        const error = payload.error || "Create profile failed";
        if (
          error.includes("profile_already_exists") ||
          error.includes("profile_exists") ||
          error.includes("discord_already_has_profile")
        ) {
          await loadSession(session.token);
          return;
        }
        throw new Error(error);
      }
      const hasProfile = deriveHasProfile(payload, payload.profile || null);
      const profile = normalizeProfile(payload, hasProfile);
      const seed = pickSeed(payload) || session.seed;
      setSession((current) => ({
        ...current,
        profile,
        seed,
        hasMemberData: current.hasMemberData || deriveHasMemberData(payload, seed),
        hasProfile,
        missingFields: payload.missingFields || [],
        error: "",
      }));
    } catch (error) {
      setSession((current) => ({
        ...current,
        missingFields: error instanceof Error && error.message.includes("profile_required_fields_missing")
          ? ["realName", "nickname", "school"]
          : current.missingFields,
        error: error instanceof Error ? error.message : "Create profile failed",
      }));
    } finally {
      setCreating(false);
    }
  }

  const username = getProfileUsername(session.profile);
  const profileReady = session.hasProfile;
  const hasPrefill = session.hasMemberData || Boolean(session.seed);
  const hasMissingFields = session.missingFields.length > 0;
  const displayName =
    session.profile?.identity?.displayName ||
    session.profile?.identity?.realName ||
    session.user?.globalName ||
    session.user?.username ||
    "Creator";

  if (!session.loading && !session.user) {
    return (
      <section className="goProAuth goProAuth--loginOnly" aria-label="Discord profile login">
        {session.error ? <p className="goProAuth-error">{translateError(session.error)}</p> : null}
        <button type="button" className="goProAuth-button" onClick={startDiscordLogin}>
          <LogIn aria-hidden /> Login with Discord
        </button>
      </section>
    );
  }

  return (
    <section className="goProAuth" aria-label="My Go Pro profile">
      <div className="goProAuth-main">
        <p className="goProAuth-kicker">My profile</p>
        <h2 className="goProAuth-title">
          {session.user ? `Hi, ${displayName}` : "Login to manage your Go Pro profile"}
        </h2>
        {session.loading ? (
          <p className="goProAuth-text">
            <Loader2 className="goProAuth-spin" aria-hidden /> Checking Discord session...
          </p>
        ) : profileReady ? (
          <p className="goProAuth-text">
            <CheckCircle2 aria-hidden /> Your public profile is ready.
          </p>
        ) : hasPrefill ? (
          <p className="goProAuth-text">
            {hasMissingFields
              ? "We found your Discord in the database. Fill the missing details to create your profile."
              : "We found your Discord in the database. Review the imported details and create your profile."}
          </p>
        ) : session.user ? (
          <p className="goProAuth-text">
            No existing data was found for this Discord account. Fill in your details to create a profile.
          </p>
        ) : null}
        {session.error ? <p className="goProAuth-error">{translateError(session.error)}</p> : null}
      </div>

      <div className="goProAuth-action">
        {session.loading ? null : profileReady ? (
          <div className="goProAuth-actions">
            {username ? (
              <Link className="goProAuth-button" href={`/profile/${username}`}>
                <ExternalLink aria-hidden /> My profile
              </Link>
            ) : null}
            <button type="button" className="goProAuth-button goProAuth-button--secondary" onClick={handleLogout}>
              <LogOut aria-hidden /> Logout
            </button>
          </div>
        ) : session.user ? (
          <form className="goProAuth-form" onSubmit={createProfile}>
            <input
              value={realName}
              onChange={(event) => setRealName(event.target.value)}
              placeholder="Full name"
              required
            />
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Nickname"
              required
            />
            <input
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              placeholder="School"
              required
            />
            <input
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="Mobile (optional, e.g. 0812345678)"
              pattern="0\d{8,9}"
              title="เบอร์มือถือ 10 หลัก เช่น 0812345678"
            />
            <button type="submit" className="goProAuth-button" disabled={creating}>
              {creating ? <Loader2 className="goProAuth-spin" aria-hidden /> : <UserPlus aria-hidden />}
              Create profile
            </button>
            <button type="button" className="goProAuth-button goProAuth-button--secondary" onClick={handleLogout} disabled={creating}>
              <LogOut aria-hidden /> Logout
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
