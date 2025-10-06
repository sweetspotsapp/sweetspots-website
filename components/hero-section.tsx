"use client";

// import { Button } from "@/components/ui/button";
// import { Heart, Plane, Smartphone, User } from "lucide-react";
import { useTranslations } from "next-intl";
// import { IPhoneFrame } from "./ui/iphone-frame";
// import { SIGNUP_URL } from "@/lib/constants";
import Image from "next/image";
import ScrollDownCta from "./ScrollDownCta";
import { Button } from "./ui/button";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br flex items-end overflow-hidden bg-orange-500"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="container mx-auto text-white flex justify-between items-end h-full flex-1 z-10">
        <div className="text-3xl md:text-6xl line text-shadow">
          <span className="font-bold">{t("heading")}</span>
          <br />
          <span className="text-2xl md:text-3xl">{t("subheading")}</span>
          <br />
          <Button
            className=""
            size="lg"
            onClick={() => {
              const ctaSection = document.getElementById("early-bird-section");
              if (ctaSection) {
                ctaSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Try Now!
          </Button>
        </div>
        <ScrollDownCta />
      </div>
      <video
        src="/web-banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        // className="absolute inset-0 w-full h-full object-cover z-0 rounded-b-[4rem]"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
    </section>
  );
}
