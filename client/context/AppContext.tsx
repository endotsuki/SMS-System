import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/translations';
import { getTranslations } from '@/lib/translations';

export type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
  translations: ReturnType<typeof getTranslations>;
}

const AppContextInternal = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'en';
  });

  const translations = getTranslations(language);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to DOM
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);

    // Apply language to DOM
    document.documentElement.lang = newLanguage;
    document.documentElement.setAttribute('data-lang', newLanguage);

    // Update body class for font switching
    document.body.classList.remove('lang-en', 'lang-km', 'lang-fr');
    document.body.classList.add(`lang-${newLanguage}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Apply theme on mount and when it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Apply language on mount and when it changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-lang', language);
    document.body.classList.remove('lang-en', 'lang-km', 'lang-fr');
    document.body.classList.add(`lang-${language}`);
  }, [language]);

  const value: AppContextType = {
    theme,
    setTheme,
    language,
    setLanguage,
    toggleTheme,
    translations,
  };

  return (
    <AppContextInternal.Provider value={value}>
      {children}
    </AppContextInternal.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContextInternal);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
