import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'es', 'fr', 'de'];
export const defaultLocale = 'en';

export async function getTranslations(namespace: string, locale: string = defaultLocale) {
  try {
    return import(`../messages/${locale}/${namespace}.json`);
  } catch (error) {
    console.error(`Translation file not found for namespace: ${namespace}, locale: ${locale}`);
    return import(`../messages/${defaultLocale}/${namespace}.json`);
  }
}

export function formatCurrency(amount: number, currency: string = 'USD', locale: string = defaultLocale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export default getRequestConfig(async (params: GetRequestConfigParams) => {
  const { locale } = params;
  if (!locales.includes(locale || defaultLocale)) notFound();

  return {
    locale: locale || defaultLocale,
    messages: (await import(`../messages/${locale || defaultLocale}.json`)).default
  };
});