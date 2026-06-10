"use client";

import { useEffect, useState } from "react";
import { Loader2, LogIn, ShieldAlert } from "lucide-react";
import {
  consumeProfileLoginStarted,
  getDiscordProfileAuthUrl,
} from "@/utils/profileAuth";
import { GO_ADMIN_TOKEN_COOKIE } from "./auth-constants";
import type { GoAdminAuthResult } from "./auth";

const TOKEN_KEY = "hh_go_pro_profile_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function writeTokenCookie(token: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${GO_ADMIN_TOKEN_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${GO_ADMIN_TOKEN_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

function authMessage(auth: GoAdminAuthResult) {
  if (auth.reason === "forbidden") {
    return auth.rank
      ? `บัญชีนี้ rank เป็น ${auth.rank} ต้องเป็น Ace หรือ Admin เท่านั้นถึงจะเข้า Go Manage ได้`
      : "บัญชีนี้ยังไม่มี rank Ace หรือ Admin";
  }
  if (auth.reason === "invalid") return "Session หมดอายุหรือ token ไม่ถูกต้อง กรุณา login Discord ใหม่";
  return "กรุณา login Discord ก่อนเข้า Go Manage";
}

export function GoAdminAuthGate({ auth }: { auth: GoAdminAuthResult }) {
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenFromCallback = url.searchParams.get("profileToken") || "";
    if (tokenFromCallback) {
      const loginStartedHere = consumeProfileLoginStarted();
      url.searchParams.delete("profileToken");
      if (!loginStartedHere) {
        clearToken();
        window.history.replaceState({}, "", url.toString());
        setSyncing(false);
        return;
      }
      localStorage.setItem(TOKEN_KEY, tokenFromCallback);
      writeTokenCookie(tokenFromCallback);
      window.location.replace(url.toString());
      return;
    }

    const existingToken = localStorage.getItem(TOKEN_KEY) || "";
    if (existingToken && auth.reason === "missing") {
      writeTokenCookie(existingToken);
      window.location.reload();
      return;
    }

    if (auth.reason === "invalid") clearToken();
    setSyncing(false);
  }, [auth.reason]);

  function startDiscordLogin() {
    clearToken();
    const returnTo = window.location.href;
    const url = getDiscordProfileAuthUrl(returnTo);
    if (window.top && window.top !== window.self) {
      window.top.location.href = url;
      return;
    }
    window.location.href = url;
  }

  return (
    <div className="adm-authShell">
      <section className="adm-authCard" aria-live="polite">
        <span className="adm-authIcon">
          {syncing ? <Loader2 className="adm-spin" size={22} aria-hidden /> : <ShieldAlert size={22} aria-hidden />}
        </span>
        <span className="adm-kicker">Protected Area</span>
        <h1>Go Manage requires Discord admin access.</h1>
        <p>{syncing ? "กำลังตรวจ session..." : authMessage(auth)}</p>
        {auth.userLabel ? (
          <p className="adm-authMeta">
            Logged in as <strong>{auth.userLabel}</strong>
          </p>
        ) : null}
        <button
          type="button"
          className="adm-btn adm-btn--primary adm-authButton"
          onClick={startDiscordLogin}
          disabled={syncing}
        >
          <LogIn size={16} aria-hidden />
          Login with Discord
        </button>
      </section>
    </div>
  );
}
