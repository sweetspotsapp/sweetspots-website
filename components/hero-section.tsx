"use client";

import { Button } from "@/components/ui/button";
import { Heart, Plane, Smartphone, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { IPhoneFrame } from "./ui/iphone-frame";
import { SIGNUP_URL } from "@/lib/constants";
import Image from "next/image";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-100 via-rose-50 to-rose-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight">
                {t("title")}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-gray-800 leading-relaxed">
                {t("subtitle")}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                {t("description")}
              </p>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                variant="emerald"
                className="text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => window.open(SIGNUP_URL, "_blank")}
              >
                {t("signUp")}
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-slide-in-right">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Phone Mockup */}
              <Image
                src="/images/hero.png"
                alt="Sweetspots app on iPhone"
                width={400}
                height={800}
                className="w-full h-auto"
                priority
              />
              {/* <IPhoneFrame/> */}

              {/* Floating illustration of person with luggage */}
              <div className="absolute -left-12 top-12 bg-white rounded-full p-6 shadow-lg animate-float">
                <User className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="absolute left-12 top-24 bg-white rounded-full p-6 shadow-lg animate-float">
                <Heart className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="absolute -left-6 top-48 bg-white rounded-full p-6 shadow-lg animate-float">
                <Plane className="h-8 w-8 text-emerald-500" />
              </div>
              {/* <div className="absolute -left-12 top-12 bg-white rounded-full p-6 shadow-lg animate-float">
                <User className="h-8 w-8 text-emerald-500" />
              </div> */}

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-rose-100 rounded-full opacity-60"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-emerald-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
