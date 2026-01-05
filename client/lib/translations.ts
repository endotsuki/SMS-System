import { english } from './translations/en';
import { khmer } from './translations/km';
import { french } from './translations/fr';

/**
 * Supported languages
 */
export type Language = 'en' | 'km' | 'fr';

export type Translations = typeof english;

export const translations: Record<Language, Translations> = {
  en: english,
  km: khmer,
  fr: french,
};

export function getTranslations(language: Language): Translations {
  return translations[language] ?? english;
}
