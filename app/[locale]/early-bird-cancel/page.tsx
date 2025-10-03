"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function EarlyBirdCancelPage() {
  const [loading, setLoading] = useState(false);
  const locale = useLocale()

  const retryCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ locale }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
      alert("Couldn't start checkout. Please try again.");
    }
  };

  return (
    <main className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Changed your mind? No worries!</h1>
      <p className="mt-3 text-muted-foreground">
        Your pre-order isn&apos;t lost. If you&apos;d like to give it another go, you can
        restart the checkout below — early-bird pricing is still waiting for you ✨
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          onClick={retryCheckout}
          disabled={loading}
        >
          {loading ? "Redirecting…" : "Try again"}
        </Button>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}