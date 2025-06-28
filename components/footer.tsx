import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <img
                src="/SweetSpots.svg"
                alt="SweetSpots Logo"
                className="h-8 w-8 w-auto"
              />

              <span className="text-xl font-serif font-semibold text-gray-900">
                SweetSpots
              </span>
            </Link>
            <p className="text-gray-600 leading-relaxed max-w-md">
              {t("description")}
            </p>
          </div>

          {/* Links */}
          {/* <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">{t('product')}</h3>
            <div className="space-y-2">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('features')}
              </a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('howItWorks')}
              </a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('pricing')}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">{t('company')}</h3>
            <div className="space-y-2">
              <Link href={`/${locale}/about`} className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('about')}
              </Link>
              <a href="#contact" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('contact')}
              </a>
              <a href="#privacy" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('privacy')}
              </a>
              <a href="#terms" className="block text-gray-600 hover:text-gray-900 transition-colors">
                {t('terms')}
              </a>
            </div>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">{t("copyright")}</p>
            <p className="text-gray-500 text-sm">{t("madeWith")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
