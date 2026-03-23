"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "luno_cookie_consent";

export type ConsentState = "accepted" | "rejected" | null;

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    setConsent(stored);
    setHydrated(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  }, []);

  return {
    consent,
    hydrated,
    accepted: consent === "accepted",
    showBanner: hydrated && consent === null,
    accept,
    reject,
  };
}
