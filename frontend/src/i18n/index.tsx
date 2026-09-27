import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { humanizePresentationText } from './presentation';
import { messages } from './messages';
import { universalPouchMessages } from './universalPouchMessages';

export type Language = 'en' | 'ru' | 'ro';
const locales = { en: 'en-GB', ru: 'ru-RU', ro: 'ro-RO' };
const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('packshift.language');
      if (saved === 'md' || saved === 'ro') return 'ro';
      if (saved === 'en') return 'en';
      if (saved === 'ru') return 'ru';
      const nav = typeof navigator !== 'undefined' ? (navigator.language || '').toLowerCase() : '';
      if (nav.startsWith('ro') || nav.startsWith('mo')) return 'ro';
      if (nav.startsWith('en')) return 'en';
      return 'ru';
    } catch {
      return 'ru';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === 'ru'
        ? 'PackShift — Подбор упаковки'
        : language === 'ro'
        ? 'PackShift — Alegerea ambalajului'
        : 'PackShift — Find better packaging';
    try {
      localStorage.setItem('packshift.language', language);
    } catch {
      /* Language switching works without storage. */
    }
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
export const useLocale = () => locales[useLanguage().language];

const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Pre-build bidirectional lookup maps
const toEnMap = new Map<string, string>();
const toRuMap = new Map<string, string>();
const toRoMap = new Map<string, string>();

// 1. Ingest base messages (key is English, entry has ru and ro)
for (const [enKey, entry] of Object.entries(messages)) {
  const normEn = normalize(enKey);
  const normRu = normalize(entry.ru);
  const normRo = normalize(entry.ro);

  toEnMap.set(normEn, enKey);
  toEnMap.set(normRu, enKey);
  toEnMap.set(normRo, enKey);

  toRuMap.set(normEn, entry.ru);
  toRuMap.set(normRu, entry.ru);
  toRuMap.set(normRo, entry.ru);

  toRoMap.set(normEn, entry.ro);
  toRoMap.set(normRu, entry.ro);
  toRoMap.set(normRo, entry.ro);
}

// 2. Ingest universal pouch messages (entry has en, ru, ro)
for (const [key, entry] of Object.entries(universalPouchMessages)) {
  const normKey = normalize(key);
  const normEn = normalize(entry.en);
  const normRu = normalize(entry.ru);
  const normRo = normalize(entry.ro);

  toEnMap.set(normKey, entry.en);
  toEnMap.set(normEn, entry.en);
  toEnMap.set(normRu, entry.en);
  toEnMap.set(normRo, entry.en);

  toRuMap.set(normKey, entry.ru);
  toRuMap.set(normEn, entry.ru);
  toRuMap.set(normRu, entry.ru);
  toRuMap.set(normRo, entry.ru);

  toRoMap.set(normKey, entry.ro);
  toRoMap.set(normEn, entry.ro);
  toRoMap.set(normRu, entry.ro);
  toRoMap.set(normRo, entry.ro);
}

const patterns = Object.entries(messages)
  .filter(([key]) => /\{\d+\}/.test(key))
  .map(([key, value]) => ({
    key,
    re: new RegExp('^' + key.split(/\{\d+\}/).map(escape).join('(.+?)') + '$'),
    value,
  }));

const getDirectTranslation = (k: string, lang: Language): string | undefined => {
  if (lang === 'en') return toEnMap.get(k);
  if (lang === 'ru') return toRuMap.get(k);
  if (lang === 'ro') return toRoMap.get(k);
  return undefined;
};

/** Translate presentation strings only. API values, identifiers and calculations stay unchanged. */
export function translate<T>(value: T, language: Language): T {
  if (typeof value !== 'string' || !value.trim()) return value;
  if (['QUALIFICATION REQUIRED', 'BLOCKED', 'ESTIMATED', 'ASSUMED', 'CONFLICT'].includes(value)) return value;

  const key = normalize(value);

  // 1. Exact match from bidirectional maps
  let result = getDirectTranslation(key, language);

  // 2. Try stripped leading icons / emojis (e.g. "🔥 ", "♻️ ", "📊 ", "✅ ", "✓ ")
  if (!result) {
    const stripped = key.replace(/^[\p{Emoji}\p{Extended_Pictographic}\s•·★✓✗⚠️🔥♻️🇷🇴⭐🔄📜📊🚀🖨📐⚡🧱💨🏷️🛡️]+\s*/u, '').trim();
    if (stripped && stripped !== key) {
      const matchStripped = getDirectTranslation(stripped, language);
      if (matchStripped) {
        const prefix = key.slice(0, key.indexOf(stripped));
        result = prefix + matchStripped;
      }
    }
  }

  // 3. Try trailing colon/punctuation (e.g. "Материал основы:", "Рабочий диапазон:")
  if (!result && /[:(]$/.test(key)) {
    const base = key.slice(0, -1).trimEnd();
    const matchBase = getDirectTranslation(base, language);
    if (matchBase) {
      result = matchBase + key.slice(-1);
    }
  }

  // 4. Pattern-based translations (e.g. parameterized strings)
  if (!result) {
    for (const { key: patternKey, re, value: translations } of patterns) {
      const match = key.match(re);
      if (match) {
        const template = language === 'en' ? patternKey : (translations as Record<string, string>)[language];
        if (template) {
          result = template.replace(/\{(\d+)\}/g, (_: string, i: string) =>
            String(translate(match[Number(i) + 1], language))
          );
          break;
        }
      }
    }
  }

  // 5. Split by bullet or bullet-like delimiters
  if (!result && key.includes(' · ')) {
    result = key.split(' · ').map((part) => translate(part, language)).join(' · ');
  }
  if (!result && key.includes(' • ')) {
    result = key.split(' • ').map((part) => translate(part, language)).join(' • ');
  }

  // 6. Split sentences
  if (!result && /[.!?] /.test(key)) {
    const parts = key.match(/[^.!?]+(?:[.!?](?= |$)|$)/g);
    if (parts && parts.length > 1) {
      result = parts.map((part) => translate(part.trim(), language)).join(' ');
    }
  }

  if (!result) return humanizePresentationText(value, language) as T;
  return (value.match(/^\s*/)?.[0] + humanizePresentationText(result, language) + value.match(/\s*$/)?.[0]) as T;
}

export function useTranslation() {
  const { language } = useLanguage();
  return <T,>(value: T): T => translate(value, language);
}
