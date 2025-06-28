'use client';

import { useTranslations } from 'next-intl';

export function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    {
      number: 1,
      titleKey: 'steps.swipe.title',
      descriptionKey: 'steps.swipe.description'
    },
    {
      number: 2,
      titleKey: 'steps.build.title',
      descriptionKey: 'steps.build.description'
    },
    {
      number: 3,
      titleKey: 'steps.share.title',
      descriptionKey: 'steps.share.description'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-100 to-rose-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 italic">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-bold text-gray-900">
                    Step {step.number}: {t(step.titleKey)}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''} animate-fade-in`} style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                <div className="relative mx-auto max-w-xs">
                  <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-xl hover-lift">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      <div className="relative h-[500px] bg-white">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-900">
                          <span className="font-semibold">SweetSpots</span>
                          <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse-soft"></div>
                            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse-soft stagger-1"></div>
                          </div>
                        </div>
                        
                        {/* Step-specific content */}
                        {step.number === 1 && (
                          <div className="px-3 py-4 space-y-3">
                            <div className="bg-gray-200 rounded-xl h-40 flex items-center justify-center hover-lift">
                              <span className="text-gray-500 text-xs">Swipe Interface</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-serif text-base font-semibold">Brunetti Oro Flinders Lane</h4>
                              <p className="text-xs text-gray-600">Italian Restaurant with 4.2★ rating...</p>
                              <div className="flex justify-center space-x-4 pt-2">
                                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center hover-lift">
                                  <span className="text-white text-lg">✕</span>
                                </div>
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover-lift">
                                  <span className="text-white text-lg">✓</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {step.number === 2 && (
                          <div className="px-3 py-4 space-y-3">
                            <div className="bg-gray-200 rounded-xl h-40 flex items-center justify-center hover-lift">
                              <span className="text-gray-500 text-xs">Itinerary Builder</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-serif text-base font-semibold">Your Saved Spots</h4>
                              <div className="space-y-2">
                                <div className="bg-emerald-50 p-2 rounded-lg hover-lift">
                                  <p className="text-xs font-medium">Brunetti Oro</p>
                                </div>
                                <div className="bg-emerald-50 p-2 rounded-lg hover-lift">
                                  <p className="text-xs font-medium">Central Park</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {step.number === 3 && (
                          <div className="px-3 py-4 space-y-3">
                            <div className="bg-gray-200 rounded-xl h-32 flex items-center justify-center hover-lift">
                              <span className="text-gray-500 text-xs">Shared Itinerary</span>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-serif text-sm font-semibold">Saved Places</h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg hover-lift">
                                  <span className="text-xs">Sunday Park Storehouse</span>
                                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                </div>
                                <div className="flex items-center justify-between bg-green-50 p-2 rounded-lg hover-lift">
                                  <span className="text-xs">Brunetti's Pizza</span>
                                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                </div>
                              </div>
                              <div className="pt-2">
                                <button className="w-full bg-emerald-500 text-white text-xs py-2 rounded-lg hover-lift">
                                  Build Itinerary
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Bottom Navigation */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100">
                          <div className="flex justify-around py-2">
                            <div className="text-center">
                              <div className="w-4 h-4 mx-auto mb-1 bg-emerald-100 rounded"></div>
                              <span className="text-xs text-gray-600">Discover</span>
                            </div>
                            <div className="text-center">
                              <div className="w-4 h-4 mx-auto mb-1 bg-gray-200 rounded"></div>
                              <span className="text-xs text-gray-600">Saved</span>
                            </div>
                            <div className="text-center">
                              <div className="w-4 h-4 mx-auto mb-1 bg-gray-200 rounded"></div>
                              <span className="text-xs text-gray-600">Profile</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}