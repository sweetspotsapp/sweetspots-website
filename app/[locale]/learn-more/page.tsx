import { useState } from "react";
import {
  MapPin,
  Sparkles,
  PhoneCall,
  Users2,
  Clock,
  Wallet,
  Train,
  Share2,
  Route,
  Star,
  CheckCircle2,
  MessageCircle,
  Compass,
  CloudSun,
  NavigationIcon,
  Download,
  CreditCard,
  CalendarSearch,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import PreSubscribeButton from "@/components/buttons/PreSubscribeButton";
import Image from "next/image";
import TryTheAlphaButton from "@/components/buttons/TryTheAlphaButton";

// NOTE: Replace placeholder images with your own assets when ready.
// Tailwind is available by default. Keep copy short, punchy, and Gen‑Z friendly.

export default function SweetSpotsLanding() {
  return (
    <>
      <Navigation />
      <div className="text-stone-900">
        <section
          id="product"
          className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 py-12 md:py-16 items-center"
        >
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-b from-orange-100 to-orange-200 shadow-inner relative">
            {/* Replace with real image of app mock / phone-in-hand */}
            <Image
              src="/images/learn-more/hero.png"
              alt="App preview"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
            {/* <div className="h-full w-full grid place-items-center text-center p-8">
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-xl">
                <div className="text-sm font-medium text-stone-500">
                  Preview
                </div>
                <div className="mt-2 text-xl font-semibold">
                  Plan a day in 60s
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-stone-600 text-sm">
                  <Badge icon={<Users2 className="h-4 w-4" />} label="Group" />
                  <Badge icon={<Wallet className="h-4 w-4" />} label="Budget" />
                  <Badge icon={<Sparkles className="h-4 w-4" />} label="Vibe" />
                  <Badge
                    icon={<MapPin className="h-4 w-4" />}
                    label="Hidden gems"
                  />
                  <Badge
                    icon={<Train className="h-4 w-4" />}
                    label="Transport"
                  />
                  <Badge icon={<Share2 className="h-4 w-4" />} label="Vote" />
                </div>
              </div>
            </div> */}
          </div>

          <div className="pt-16">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              Find spots that match your vibe & budget.
            </h1>
            <p className="mt-4 text-lg text-stone-600 max-w-prose">
              SweetSpots plans your day in seconds. Discover hidden places in
              Melbourne, build a collaborative itinerary with friends, and stop
              wasting weekends doing nothing.
            </p>

            {/* Pricing / CTA */}
            <div id="cta" className="mt-6 flex flex-wrap items-center gap-4">
              <PreSubscribeButton />
              <TryTheAlphaButton/>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Risk-free, no spam
              </div>
              <div className="flex items-center gap-2">
                <CalendarSearch className="h-4 w-4" /> Launching Nov 2025
              </div>
            </div>

            {/* Key features quick list */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <KeyItem
                icon={<Compass className="h-5 w-5" />}
                title="Curated hidden gems"
                desc="Local picks under 100 reviews."
              />
              <KeyItem
                icon={<Users2 className="h-5 w-5" />}
                title="Plan together"
                desc="Invite friends, vote, assign roles."
              />
              <KeyItem
                icon={<Wallet className="h-5 w-5" />}
                title="Budget smart"
                desc="Live cost tally & split."
              />
              <KeyItem
                icon={<Route className="h-5 w-5" />}
                title="Logistics handled"
                desc="Open hours, travel time, maps."
              />
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="bg-orange-500 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold text-white">How it works</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <StepCard
                n={1}
                title="Tell us your vibe"
                desc="Dates, budget, group size, energy level."
                imageUrl="/images/learn-more/step1.png"
              />
              <StepCard
                n={2}
                title="Get a 60‑second plan"
                desc="Spots + route + cost. Swap with one tap."
                imageUrl="/images/learn-more/step2.png"
              />
              <StepCard
                n={3}
                title="Go out & make memories"
                desc="Share with friends, book, and have fun."
                imageUrl="/images/learn-more/step3.png"
              />
            </div>
          </div>
        </section>

        {/* ESSENTIAL APPS / UTILITIES */}
        {/* <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-orange-100 to-orange-200 shadow-inner grid place-items-center">
            <div className="grid grid-cols-4 gap-3">
              <Tile icon={<MapPin className="h-6 w-6" />} label="Maps" />
              <Tile icon={<Train className="h-6 w-6" />} label="PTV" />
              <Tile icon={<Wallet className="h-6 w-6" />} label="Budget" />
              <Tile icon={<CloudSun className="h-6 w-6" />} label="Weather" />
              <Tile
                icon={<NavigationIcon className="h-6 w-6" />}
                label="Route"
              />
              <Tile
                icon={<MessageCircle className="h-6 w-6" />}
                label="Group Chat"
              />
              <Tile icon={<Share2 className="h-6 w-6" />} label="Share" />
              <Tile icon={<Star className="h-6 w-6" />} label="Saves" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-tight">
              Everything you need for a perfect day out.
            </h3>
            <p className="mt-4 text-stone-600">
              Keep the essentials: maps, hours, budgets, and backup options. No
              doomscrolling—just go.
            </p>
            <ul className="mt-6 space-y-3 text-stone-700">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" /> Your plan syncs with
                friends in real time
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" /> Replace indecision with a
                clear route
              </li>
            </ul>
          </div>
        </section> */}
        <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold">Plan in 60 seconds.</h3>
            <p className="mt-4 text-stone-600">
              Tell us who&apos;s going, your budget, and the vibe. We generate a
              route with opening hours, travel time, and a live cost tally—swap
              anything with one tap.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <MiniStat label="Avg. time to first plan" value="<60s" />
              <MiniStat label="Collab adds" value="2-5 friends" />
              <MiniStat label="Hidden gems / city" value="250+" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-tight">
              Everything you need for a perfect day out.
            </h3>
            <p className="mt-4 text-stone-600">
              Keep the essentials: maps, hours, budgets, and backup options. No
              doomscrolling—just go.
            </p>
            <ul className="mt-6 space-y-3 text-stone-700">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" /> Your plan syncs with
                friends in real time
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5" /> Replace indecision with a
                clear route
              </li>
            </ul>
          </div>
        </section>

        {/* PRESENCE / BENEFITS */}
        {/* <section className="bg-orange-500 py-16">
          <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold">
                Stop planning loops. Start exploring.
              </h3>
              <ul className="mt-6 space-y-4 text-stone-700">
                <li className="flex gap-3 items-start">
                  <NoIcon /> Zero endless threads choosing where to go
                </li>
                <li className="flex gap-3 items-start">
                  <NoIcon /> No hidden costs—live spend tracker
                </li>
                <li className="flex gap-3 items-start">
                  <NoIcon /> No FOMO—picks that fit your vibe
                </li>
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1520975624749-406b6ced1f88?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center" />
          </div>
        </section> */}

        {/* FAST / LIGHT SECTION */}
        {/* <section className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold">Plan in 60 seconds.</h3>
            <p className="mt-4 text-stone-600">
              Tell us who&apos;s going, your budget, and the vibe. We generate a
              route with opening hours, travel time, and a live cost tally—swap
              anything with one tap.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <MiniStat label="Avg. time to first plan" value="<60s" />
              <MiniStat label="Collab adds" value="2-5 friends" />
              <MiniStat label="Hidden gems / city" value="250+" />
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center order-1 md:order-2" />
        </section> */}

        {/* MEMBERSHIP */}
        <section
          id="membership"
          className="bg-white py-16 border-t border-orange-200"
        >
          <div className="mx-auto max-w-7xl px-4">
            <h3 className="text-3xl font-bold">SweetSpots Membership</h3>
            <p className="mt-2 text-stone-600">
              Six-month beta on us, then{" "}
              <span className="font-semibold">$4.90</span> per personalised
              itinerary or <span className="font-semibold">$5/mo</span> for
              unlimited plans.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <IncludedCard
                title="What you get"
                items={[
                  "Hidden-gem picks that match your vibe",
                  "Day-by-day plan with times & travel",
                  "Live budget & split costs",
                  "Export to Google Maps & PDF",
                ]}
              />
              <IncludedCard
                title="Perfect for"
                items={[
                  "Uni groups & flatmates",
                  "Date days & visiting friends",
                  "Solo explorers on a budget",
                  "Weekend micro-trips",
                ]}
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PreSubscribeButton />
              {/* <Button size='lg' variant={"outline"}>
                <Download className="h-4 w-4 mr-2"/> Sample itinerary (PDF)
              </Button> */}
            </div>
          </div>
        </section>

        {/* WHAT'S INCLUDED (box-like carousel mimic) */}
        {/* <section className="bg-orange-50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">What’s in your plan?</h3>
            </div>
            <div className="mt-6 grid md:grid-cols-4 sm:grid-cols-2 gap-6">
              <BoxItem
                title="Curated Spots"
                desc="Handpicked hidden gems & must‑tries."
              />
              <BoxItem
                title="Route & Timing"
                desc="Opening hours + travel buffer."
              />
              <BoxItem title="Budget Guide" desc="Estimated spend + split." />
              <BoxItem title="Pro Tips" desc="Local hacks to dodge crowds." />
            </div>
          </div>
        </section> */}
        <Footer />
      </div>
    </>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 border border-orange-200">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function KeyItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3 items-start rounded-2xl bg-white/70 p-4 border border-orange-200">
      <div className="h-10 w-10 rounded-xl bg-orange-100 grid place-items-center">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-stone-600">{desc}</div>
      </div>
    </div>
  );
}

function StepCard({
  n,
  title,
  desc,
  imageUrl,
}: {
  n: number;
  title: string;
  desc: string;
  imageUrl?: string;
}) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white border border-orange-200">
      <div className="relative aspect-[4/3] bg-gradient-to-tr from-orange-50 to-orange-100 grid place-items-center">
        <Image
          src={imageUrl as any}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {/* <div className="h-16 w-16 rounded-full bg-orange-500 text-white grid place-items-center text-xl font-bold shadow">
          {n}
        </div> */}
      </div>
      <div className="p-5">
        <div className="font-semibold">{title}</div>
        <div className="text-stone-600 text-sm mt-1">{desc}</div>
      </div>
    </div>
  );
}

function Tile({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="h-20 w-20 rounded-2xl bg-white/80 border border-orange-200 grid place-items-center text-xs font-medium shadow-sm">
      {icon}
      <span className="mt-1">{label}</span>
    </div>
  );
}

function NoIcon() {
  return (
    <div className="h-5 w-5 rounded-full bg-stone-900 text-orange-50 grid place-items-center text-xs mt-0.5">
      ✕
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-orange-200 bg-white/70 p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-stone-600">{label}</div>
    </div>
  );
}

function IncludedCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-orange-200 bg-orange-50 p-6">
      <div className="font-semibold text-lg">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-stone-700">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 mt-0.5" /> {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BoxItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl p-6 border border-orange-200 bg-white">
      <div className="aspect-square rounded-2xl bg-gradient-to-tr from-orange-50 to-orange-100 mb-4" />
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-stone-600">{desc}</div>
    </div>
  );
}
