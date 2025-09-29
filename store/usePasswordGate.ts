"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const PASSWORD_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

type PasswordGateState = {
  authed: boolean;
  lastAuthTime: number | null;
  unlock: () => void;
  lock: () => void;
  isValid: () => boolean;
};

// Only this subset is persisted
type PersistedPasswordGate = Pick<PasswordGateState, "authed" | "lastAuthTime">;

export const usePasswordGate = create<PasswordGateState>()(
  persist(
    (set, get) => ({
      authed: false,
      lastAuthTime: null,
      unlock: () => set({ authed: true, lastAuthTime: Date.now() }),
      lock: () => set({ authed: false, lastAuthTime: null }),
      isValid: () => {
        const { authed, lastAuthTime } = get();
        if (!authed || !lastAuthTime) return false;
        const expired = Date.now() - lastAuthTime > PASSWORD_TIMEOUT_MS;
        if (expired) {
          set({ authed: false, lastAuthTime: null });
          return false;
        }
        return true;
      },
    }),
    {
      name: "password-gate",
      // Important: storage should be typed to the persisted subset
      storage:
        typeof window !== "undefined"
          ? createJSONStorage<PersistedPasswordGate>(() => window.localStorage)
          : undefined, // SSR: no storage on server
      partialize: (s): PersistedPasswordGate => ({
        authed: s.authed,
        lastAuthTime: s.lastAuthTime,
      }),
    }
  )
);