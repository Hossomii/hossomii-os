import { useAchievementStore } from "../../stores/achievementStore";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

function resolveNavigationUrl(rawUrl: string): URL | null {
  try {
    const url = new URL(rawUrl, window.location.href);

    if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function isExternalUrl(rawUrl: string) {
  const url = resolveNavigationUrl(rawUrl);

  if (!url) {
    return false;
  }

  return url.origin !== window.location.origin;
}

export function registerExternalNavigation(rawUrl: string) {
  if (!isExternalUrl(rawUrl)) {
    return;
  }

  useAchievementStore.getState().unlockAchievement("first-external-link");
}

export function openExternalUrl(rawUrl: string) {
  const url = resolveNavigationUrl(rawUrl);

  if (!url) {
    return false;
  }

  registerExternalNavigation(url.href);

  window.open(url.href, "_blank", "noopener,noreferrer");

  return true;
}
