'use client';

import { Users, Smartphone, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProblemSection() {
  const t = useTranslations('problem');

  const problems = [
    {
      icon: <Smartphone className="h-12 w-12 text-emerald-500" />,
      titleKey: 'tabs.title',
      statKey: 'tabs.stat',
      descriptionKey: 'tabs.description'
    },
    {
      icon: <Users className="h-12 w-12 text-rose-500" />,
      titleKey: 'group.title',
      statKey: 'group.stat',
      descriptionKey: 'group.description'
    },
    {
      icon: <Eye className="h-12 w-12 text-emerald-500" />,
      titleKey: 'mismatch.title',
      statKey: 'mismatch.stat',
      descriptionKey: 'mismatch.description'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-8">
            {t('title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="text-center space-y-6 animate-fade-in hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Illustration placeholder */}
              <div className="relative mx-auto w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 hover:shadow-lg">
                {problem.icon}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Illustration Placeholder</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-semibold text-gray-900 whitespace-pre-line leading-tight">
                  {t(problem.titleKey)}
                </h3>
                
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-gray-900">
                    {t(problem.statKey)}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {t(problem.descriptionKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}