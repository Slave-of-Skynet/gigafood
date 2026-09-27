import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { messages } from './messages';

export type Language = 'en' | 'ru' | 'ro';
const locales = { en: 'en-GB', ru: 'ru-RU', ro: 'ro-RO' };
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try { const saved = localStorage.getItem('packshift.language'); return saved === 'md' ? 'ro' : saved === 'ru' || saved === 'ro' ? saved : 'en'; } catch { return 'en'; }
  });
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'ru' ? 'PackShift — Подбор упаковки' : language === 'ro' ? 'PackShift — Alegerea ambalajului' : 'PackShift — Find better packaging';
    try { localStorage.setItem('packshift.language', language); } catch { /* Language switching works without storage. */ }
  }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export const useLocale = () => locales[useLanguage().language];
const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patterns = Object.entries(messages).filter(([key]) => /\{\d+\}/.test(key)).map(([key, value]) => ({
  re: new RegExp('^' + key.split(/\{\d+\}/).map(escape).join('(.+?)') + '$'), value,
}));
/** Translate presentation strings only. API values, identifiers and calculations stay unchanged. */
export function translate<T>(value: T, language: Language): T {
  if (language === 'en' || typeof value !== 'string' || !value.trim()) return value;
  const key = normalize(value);
  const entry = messages[key];
  let result = entry?.[language];
  if (!result) {
    for (const { re, value: translations } of patterns) {
      const match = key.match(re);
      if (match) { result = translations[language].replace(/\{(\d+)\}/g, (_, i) => String(translate(match[Number(i) + 1], language))); break; }
    }
  }
  // Joined backend assumptions and independently authored sentences use the same catalogue.
  if (!result && key.includes(' · ')) result = key.split(' · ').map(part => translate(part, language)).join(' · ');
  if (!result && /[.!?] /.test(key)) {
    const parts = key.match(/[^.!?]+(?:[.!?](?= |$)|$)/g);
    if (parts && parts.length > 1) result = parts.map(part => translate(part.trim(), language)).join(' ');
  }
  if (!result && /[:(]$/.test(key)) {
    const base = key.slice(0,-1).trimEnd();
    if (messages[base]) result = messages[base][language] + key.slice(-1);
  }
  if (!result) return value;
  return (value.match(/^\s*/)?.[0] + result + value.match(/\s*$/)?.[0]) as T;
}
export function useTranslation() { const { language } = useLanguage(); return <T,>(value: T): T => translate(value, language); }
