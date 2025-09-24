"use client";

// import { Button } from "@/components/ui/button";
// import { Heart, Plane, Smartphone, User } from "lucide-react";
import { useTranslations } from "next-intl";
// import { IPhoneFrame } from "./ui/iphone-frame";
// import { SIGNUP_URL } from "@/lib/constants";
import Image from "next/image";
import ScrollDownCta from "./ScrollDownCta";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br flex items-end overflow-hidden bg-orange-500"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="container mx-auto text-white flex justify-between items-end h-full flex-1 z-10">
        <div className="text-3xl md:text-6xl line text-shadow">
          {/* Oh to roadtrip
        <br />
        in the Alpines */}
          <span className="font-bold">
          {t('heading')}
          </span>
          <br />
          <span className="text-2xl md:text-3xl">{t('subheading')}</span>
        </div>
        <ScrollDownCta />
      </div>
      {/* TODO:
       - Pictures should be in Aussie
       - Hidden gems
       - Copywriting: Make it authentic
        - Too corpo
        - Places too touristy
        - Focus on experiences over landmarks
      */}
      {/* <Image
        src="https://images.unsplash.com/photo-1670279079691-3fb4ed1e6e43?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Background"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-10"
        priority
      /> */}
      <video
        src="/web-banner.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 rounded-b-[4rem]"
      />
      {/* <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative animate-slide-in-right">
        <div className="relative mx-auto max-w-sm lg:max-w-md">
          <Image
          src="/images/hero.png"
          alt="Sweetspots app on iPhone"
          width={400}
          height={800}
          className="w-full h-auto"
          priority
          />
          <div className="absolute -left-12 top-12 bg-white rounded-full p-6 shadow-lg animate-float">
          <User className="h-8 w-8 text-orange-500" />
          </div>
          <div className="absolute left-12 top-24 bg-white rounded-full p-6 shadow-lg animate-float">
          <Heart className="h-8 w-8 text-orange-500" />
          </div>
          <div className="absolute -left-6 top-48 bg-white rounded-full p-6 shadow-lg animate-float">
          <Plane className="h-8 w-8 text-orange-500" />
          </div>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-100 rounded-full opacity-60"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-orange-100 rounded-full opacity-40"></div>
        </div>
        </div>
        <div className="space-y-8 animate-slide-in-left">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 leading-tight">
          {t("title")}
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 leading-relaxed">
          {t("subtitle")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
          {t("description")}
          </p>
        </div>
        <div className="pt-4 flex-col flex items-center">
          <small className="text-sm font-semibold mb-3">
            {t("earlyAccess")}
          </small>
          <Button
          size="lg"
          variant="orange"
          className="text-lg w-full flex-col px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
          onClick={() => window.open(SIGNUP_URL, "_blank")}
          >
          {t("signUp")}
          </Button>
        </div>

        </div>
      </div>
      </div> */}
    </section>
  );
}
