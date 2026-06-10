const PROFILE_LOGIN_PENDING_KEY = "hh_go_pro_profile_login_pending";

export function getNuUtorApiBase() {
  return (
    process.env.NEXT_PUBLIC_NUUTOR_API_BASE_URL ||
    "https://api.hamsterquest.com/api/nuutor/api"
  ).replace(/\/+$/, "");
}

export function getCurrentProfileReturnTo() {
  const url = new URL(window.location.href);
  url.searchParams.delete("profileToken");
  return url.toString();
}

export function markProfileLoginStarted() {
  try {
    sessionStorage.setItem(PROFILE_LOGIN_PENDING_KEY, "1");
  } catch {
    // Ignore storage failures; the callback will still strip unsafe tokens.
  }
}

export function consumeProfileLoginStarted() {
  try {
    const started = sessionStorage.getItem(PROFILE_LOGIN_PENDING_KEY) === "1";
    sessionStorage.removeItem(PROFILE_LOGIN_PENDING_KEY);
    return started;
  } catch {
    return false;
  }
}

export function getDiscordProfileAuthUrl(returnTo = getCurrentProfileReturnTo()) {
  markProfileLoginStarted();
  return `${getNuUtorApiBase()}/profile/auth/discord/start?returnTo=${encodeURIComponent(returnTo)}`;
}
