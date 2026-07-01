"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Review } from "./types";

/**
 * User-submitted reviews persist to localStorage only — the demo has no backend.
 * Shape: { [communitySlug]: Review[] }
 */
const KEY = "fenceline:reviews:v1";

function parseStore(raw: string): Record<string, Review[]> {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

/**
 * SSR-safe live view of the local review store. The server (and hydration
 * pass) sees an empty store; the client snapshot takes over after mount.
 */
export function useLocalReviewStore(): Record<string, Review[]> {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "{}");
  return useMemo(() => parseStore(raw), [raw]);
}

export function useLocalReviews(slug: string): Review[] {
  const store = useLocalReviewStore();
  return useMemo(
    () => (Array.isArray(store[slug]) ? store[slug] : []),
    [store, slug]
  );
}

export function addLocalReview(slug: string, review: Review): void {
  const store = parseStore(getSnapshot());
  store[slug] = [review, ...(store[slug] ?? [])];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // Storage full or blocked — the review simply won't persist.
  }
  listeners.forEach((l) => l());
}
