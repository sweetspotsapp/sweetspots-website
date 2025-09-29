// app/PasswordProtect.tsx
"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordGate } from "@/store/usePasswordGate";

// Use NEXT_PUBLIC_ so it's available in the browser
const PASSWORD_HASH = process.env.NEXT_PUBLIC_PASSWORD_HASH || "";

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function PasswordProtect({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entered, setEntered] = useState("");
  const [error, setError] = useState("");
  const authed = usePasswordGate((s) => s.isValid());
  const unlock = usePasswordGate((s) => s.unlock);

  const tryAuth = useCallback(async () => {
    const hash = await sha256Hex(entered);
    if (PASSWORD_HASH && timingSafeEqual(hash, PASSWORD_HASH)) {
      unlock();
      setError("");
    } else {
      setError("Wrong password. Try again.");
    }
  }, [entered, unlock]);

  if (!authed) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          <p className="mb-4 text-2xl font-bold">🔒 Enter Password</p>
          <Input
            type="password"
            placeholder="Password"
            value={entered}
            onChange={(e) => {
              setEntered(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") void tryAuth();
            }}
            autoFocus
            className="mb-3 w-full"
          />
          {error ? <p className="mb-2 text-red-500">{error}</p> : null}
          <Button className="w-full" onClick={tryAuth}>
            Unlock
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}