'use client';

import { Button } from '@/components/ui/button';
import { SIGNUP_URL } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import EarlyAccessForm from './early-user/EarlyUserForm';

export function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id='cta-section'>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900">
          {t('title')}
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
          {t('description')}
        </p>
        
        <EarlyAccessForm />
        {/* <div className="pt-8">
          <Button 
            size="lg" 
            variant="orange"
            className="text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-200 shadow-lg"
            onClick={() => window.open(SIGNUP_URL, '_blank')}
          >
            {t('signUp')}
          </Button>
        </div> */}
      </div>
    </section>
  );
}