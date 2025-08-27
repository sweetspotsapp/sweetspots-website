'use client';

import { Button } from '@/components/ui/button';
import { SIGNUP_URL } from '@/lib/constants';
import { useLocale, useTranslations } from 'next-intl';
import SwipeMock from './SwipeMock';

export function SolutionSection() {
  const t = useTranslations('solution');
  const lang = useLocale();

  const features = [
    { titleKey: 'features.discover.title', descriptionKey: 'features.discover.description' },
    { titleKey: 'features.trust.title', descriptionKey: 'features.trust.description' },
    { titleKey: 'features.build.title', descriptionKey: 'features.build.description' },
    { titleKey: 'features.vote.title', descriptionKey: 'features.vote.description' },
    { titleKey: 'features.extras.title', descriptionKey: 'features.extras.description' }
  ];

  const currentMonthText = t('currentMonth', { month: new Date().toLocaleString(lang, { month: 'long' }) });

  return (
    <section className='overflow-hidden'>
      <section className="pt-20 -mb-24 px-4 sm:px-6 lg:px-8 bg-orange-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div className="space-y-2 animate-slide-in-left items-center ld:items-start lg:mt-20 text-white">
              <p className='text-xl font-bold'>{t('tripStarts')}</p>
              <p className='text-3xl font-bold'>{currentMonthText}</p>
              <p className='text-lg'>{t('swipeRight')}</p>
            </div>

            {/* Right Phone Mockup */}
            <div className="relative animate-slide-in-right">
              <div className="relative mx-auto max-w-sm">
                {/* Phone Frame */}
                <SwipeMock />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}