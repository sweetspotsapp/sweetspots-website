import React from "react";
import BenefitCard, { Benefit } from "./BenefitCard";
import { Clock, ListCheck, RefreshCcwDot } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BenefitsSection() {
  const t = useTranslations('benefits')
  const benefits: Benefit[] = [
    {
      icon: Clock,
      title: t('saveTime.title'),
      description: t('saveTime.description'),
    },
    {
      icon: ListCheck,
      title: t('planTogether.title'),
      description: t('planTogether.description'),
    },
    {
      icon: RefreshCcwDot,
      title: t('liveUpdates.title'),
      description: t('liveUpdates.description'),
    },
  ];
  return (
    <div className="bg-orange-400">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  );
}
