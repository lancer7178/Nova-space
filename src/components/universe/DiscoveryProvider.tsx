"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "nova-space:discoveries:v1";
const LAST_KEY = "nova-space:last:v1";

type DiscoveryContextValue = {
  /** ids of destinations the user has entered */
  discovered: string[];
  /** id of the last destination the user visited (for "Continue exploring") */
  lastId: string | null;
  /** true once local storage has been read (avoids hydration flash) */
  ready: boolean;
  isDiscovered: (id: string) => boolean;
  discover: (id: string) => void;
};

const DiscoveryContext = createContext<DiscoveryContextValue | null>(null);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate from local storage once on mount. No account required — the
  // universe simply remembers where you have been.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setDiscovered(parsed.filter((x) => typeof x === "string"));
      }
      setLastId(localStorage.getItem(LAST_KEY));
    } catch {
      // Private mode / disabled storage — degrade to an in-memory session.
    }
    setReady(true);
  }, []);

  const discover = useCallback((id: string) => {
    setDiscovered((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setLastId(id);
    try {
      localStorage.setItem(LAST_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const isDiscovered = useCallback(
    (id: string) => discovered.includes(id),
    [discovered],
  );

  const value = useMemo(
    () => ({ discovered, lastId, ready, isDiscovered, discover }),
    [discovered, lastId, ready, isDiscovered, discover],
  );

  return (
    <DiscoveryContext.Provider value={value}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export function useDiscovery(): DiscoveryContextValue {
  const ctx = useContext(DiscoveryContext);
  if (!ctx) {
    throw new Error("useDiscovery must be used within a DiscoveryProvider");
  }
  return ctx;
}
