"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

type Buyer = { name: string | null; email: string | null };

export default function EarlyBirdSuccessPage({
    searchParams,
}: {
    searchParams: { session_id?: string };
}) {
    const [buyer, setBuyer] = useState<Buyer | null>(null);
    const [loading, setLoading] = useState(true);

    const firstName = useMemo(() => {
        const full = buyer?.name?.trim();
        if (!full || full.length === 0) return "there";
        return full.split(/\s+/)[0];
    }, [buyer]);

    useEffect(() => {
        const cached = typeof window !== "undefined" ? localStorage.getItem("buyer") : null;
        if (cached) {
            setBuyer(JSON.parse(cached));
            setLoading(false);
            return;
        }

        const sessionId = searchParams?.session_id;
        if (!sessionId) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`);
                const data = await res.json();
                const nextBuyer: Buyer = {
                    name: data?.name ?? null,
                    email: data?.email ?? null,
                };
                setBuyer(nextBuyer);
                localStorage.setItem("buyer", JSON.stringify(nextBuyer));
            } catch (e) {
                // ignore; show generic thanks
            } finally {
                setLoading(false);
            }
        })();
    }, [searchParams?.session_id]);

    return (
        <main className="container mx-auto max-w-2xl px-4 py-16 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold">
                {loading ? "Thanks for your pre-order!" : `Thank you, ${firstName}!`}
            </h1>
            <p className="mt-4 text-muted-foreground">
                Your pre-order was received! Keep an eye out on your email for an invite to our early alpha launch in <strong>mid October</strong>!
            </p>
            <p className="mt-4">We're still building and testing! <strong className="text-orange-500">SweetSpots</strong> will come in <strong>Early 2026</strong>.</p>
            <p className="mt-4 text-muted-foreground">
                In the meantime, you can follow our journey on
            </p>
            <div className="flex gap-4 mt-2 justify-center">
                <a
                    href="https://instagram.com/sweetspotsai"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button size="lg" className="flex items-center gap-2 text-base px-6 py-4">
                        <FaInstagram size={24} />
                        Instagram
                    </Button>
                </a>
                <a
                    href="https://tiktok.com/@sweetspotsai"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Button size="lg" className="flex items-center gap-2 text-base px-6 py-4">
                        <FaTiktok size={24} />
                        TikTok
                    </Button>
                </a>
            </div>
            <div className="mt-8 flex gap-3 justify-center">
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </div>
        </main>
    );
}
