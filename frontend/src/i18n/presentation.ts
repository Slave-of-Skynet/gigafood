/** Display-only prose normalization. Never use for domain data or identifiers. */
export function humanizePresentationText(text: string, language: 'en' | 'ru' | 'ro'): string {
  const action = language === 'ru' ? 'требует проверки' : language === 'ro' ? 'necesită verificare' : 'needs verification';
  return text
    .replace(/\bUnknown\s*\(N\/A\)/gi, action)
    .replace(/\b(?:remains?|is|are)\s+unknown\b/gi, action)
    .replace(/\bunknown\b/gi, action)
    .replace(/\bN\/A\b/g, action);
}

/** Context comes from a presentation label, never from a rewritten API field. */
export function missingEvidenceAction(label: string): string {
  if (/price|cost|RON|quote/i.test(label)) return 'Supplier quote needed';
  if (/temperature|thermal/i.test(label)) return 'Temperature limit needs verification';
  if (/food.contact|migration/i.test(label)) return 'Supplier / lab verification needed';
  if (/mass|dimension|capacity/i.test(label)) return 'Measurement needed';
  if (/availability|supply route/i.test(label)) return 'Availability needs confirmation';
  return 'Supplier confirmation needed';
}
