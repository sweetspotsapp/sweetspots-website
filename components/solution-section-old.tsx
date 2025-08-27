'use client';

import { Button } from '@/components/ui/button';
import { SIGNUP_URL } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import SwipeMock from './SwipeMock';

export function SolutionSectionOld() {
  const t = useTranslations('solution');

  const features = [
    { titleKey: 'features.discover.title', descriptionKey: 'features.discover.description' },
    { titleKey: 'features.trust.title', descriptionKey: 'features.trust.description' },
    { titleKey: 'features.build.title', descriptionKey: 'features.build.description' },
    { titleKey: 'features.vote.title', descriptionKey: 'features.vote.description' },
    { titleKey: 'features.extras.title', descriptionKey: 'features.extras.description' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-100 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
                {t('title')}
              </h2>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-3"></div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">{t(feature.titleKey as any)}</span>{" "}
                      <span className="text-gray-600">{t(feature.descriptionKey as any)}</span>
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t('description')}
                </p>
                
                <Button 
                  size="lg" 
                  variant="orange"
                  className="text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200"
                  onClick={() => window.open(SIGNUP_URL, '_blank')}
                >
                  {t('signUp')}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="relative animate-slide-in-right">
            <div className="relative mx-auto max-w-sm">
              {/* Phone Frame */}
              <SwipeMock/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}