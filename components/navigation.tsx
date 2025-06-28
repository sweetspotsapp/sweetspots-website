'use client';

import { useState } from 'react';
import { Heart, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English', flag: '🇦🇺' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' }
  ];

  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <img src="/SweetSpots.svg" alt="SweetSpots Logo" className="h-8 w-8 w-auto" />
            <span className="text-xl font-serif font-semibold text-gray-900">SweetSpots</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <a href="#why" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {t('why')}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {t('pricing')}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {t('contact')}
            </a> */}
            <Link href={`/${locale}/about`} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {t('about')}
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm">{languages.find(lang => lang.code === locale)?.flag}</span>
              </Button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={getLocalizedPath(lang.code)}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsLangMenuOpen(false)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#why" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('why')}
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('pricing')}
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </a>
              <Link 
                href={`/${locale}/about`}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about')}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-4 pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Language / ภาษา / Bahasa</p>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={getLocalizedPath(lang.code)}
                      className="flex items-center space-x-3 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}