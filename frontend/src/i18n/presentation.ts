const CANONICAL_PASSTHROUGH = new Set([
  'QUALIFICATION REQUIRED',
  'BLOCKED',
  'ESTIMATED',
  'ASSUMED',
  'CONFLICT',
]);

const IDENTIFIER_OR_URL = /^(?:https?:\/\/\S+|SOURCE-[A-Za-z0-9_.-]+|CALC-[A-Za-z0-9_.-]+|[A-Za-z0-9_.-]+-[A-Za-z0-9_.-]+|[a-f0-9]{32,64})$/i;

/** Display-only prose normalization. Never use for domain data or identifiers. */
export function humanizePresentationText(text: string, language: 'en' | 'ru' | 'ro'): string {
  const trimmed = text.trim();
  if (CANONICAL_PASSTHROUGH.has(trimmed) || IDENTIFIER_OR_URL.test(trimmed)) {
    return text;
  }

  const action =
    language === 'ru'
      ? 'требует проверки'
      : language === 'ro'
      ? 'necesită verificare'
      : 'needs verification';

  // Protect URLs, hashes, and machine/source identifiers during prose replacement
  const savedTokens: string[] = [];
  let res = text.replace(/https?:\/\/[^\s)]+|SOURCE-[A-Za-z0-9_.-]+|CALC-[A-Za-z0-9_.-]+|[a-f0-9]{32,64}/gi, match => {
    savedTokens.push(match);
    return `___PASSTHROUGH_${savedTokens.length - 1}___`;
  });

  res = res
    .replace(/\bUnknown\s*\(N\/A\)/gi, action)
    .replace(/\b(?:remains?|is|are)\s+unknown\b/gi, action)
    .replace(/\bunknown\b/gi, action)
    .replace(/\bN\/A\b/g, action);

  if (language === 'ru' || /неизвест/i.test(res)) {
    const ruAction = language === 'ru' ? 'требует проверки' : action;
    res = res
      .replace(/оста[её]тся\s+неизвестн[а-яёА-ЯЁ]*/gi, 'требует подтверждения')
      .replace(/остаются\s+неизвестн[а-яёА-ЯЁ]*/gi, 'требуют подтверждения')
      .replace(/(?<![а-яёА-ЯЁ])неизвестно(?![а-яёА-ЯЁ])/gi, 'не подтверждено')
      .replace(/(?<![а-яёА-ЯЁ])неизвестен(?![а-яёА-ЯЁ])/gi, 'не подтверждён')
      .replace(/(?<![а-яёА-ЯЁ])неизвестна(?![а-яёА-ЯЁ])/gi, 'не подтверждена')
      .replace(/(?<![а-яёА-ЯЁ])неизвестны(?![а-яёА-ЯЁ])/gi, 'не подтверждены')
      .replace(/(?<![а-яёА-ЯЁ])неизвестная(?![а-яёА-ЯЁ])/gi, 'неподтверждённая')
      .replace(/(?<![а-яёА-ЯЁ])неизвестный(?![а-яёА-ЯЁ])/gi, 'неподтверждённый')
      .replace(/(?<![а-яёА-ЯЁ])неизвестное(?![а-яёА-ЯЁ])/gi, 'неподтверждённое')
      .replace(/(?<![а-яёА-ЯЁ])неизвестные(?![а-яёА-ЯЁ])/gi, 'неподтверждённые')
      .replace(/(?<![а-яёА-ЯЁ])неизвестной(?![а-яёА-ЯЁ])/gi, 'неподтверждённой')
      .replace(/(?<![а-яёА-ЯЁ])неизвестного(?![а-яёА-ЯЁ])/gi, 'неподтверждённого')
      .replace(/(?<![а-яёА-ЯЁ])неизвестном(?![а-яёА-ЯЁ])/gi, 'неподтверждённом')
      .replace(/(?<![а-яёА-ЯЁ])неизвестному(?![а-яёА-ЯЁ])/gi, 'неподтверждённому')
      .replace(/(?<![а-яёА-ЯЁ])неизвестных(?![а-яёА-ЯЁ])/gi, 'неподтверждённых')
      .replace(/(?<![а-яёА-ЯЁ])неизвестными(?![а-яёА-ЯЁ])/gi, 'неподтверждёнными')
      .replace(/(?<![а-яёА-ЯЁ])неизвестную(?![а-яёА-ЯЁ])/gi, 'неподтверждённую')
      .replace(/неизвест[а-яёА-ЯЁ]*/gi, ruAction);
  }

  if (language === 'ro' || /necunosc/i.test(res)) {
    const roAction = language === 'ro' ? 'necesită verificare' : action;
    res = res
      .replace(/rămâne\s+necunoscut[ăa]?/gi, 'necesită confirmare')
      .replace(/rămân\s+necunoscut[ei]/gi, 'necesită confirmare')
      .replace(/\bnecunoscută\b/gi, 'neconfirmată')
      .replace(/\bnecunoscut\b/gi, 'neconfirmat')
      .replace(/\bnecunoscute\b/gi, 'neconfirmate')
      .replace(/\bnecunoscuți\b/gi, 'neconfirmați')
      .replace(/\bnecunoscutul\b/gi, 'neconfirmatul')
      .replace(/\bnecunoscuta\b/gi, 'neconfirmata')
      .replace(/\bnecunoscutului\b/gi, 'neconfirmatului')
      .replace(/\bnecunoscutei\b/gi, 'neconfirmatei')
      .replace(/\bnecunoscutelor\b/gi, 'neconformatelor')
      .replace(/\bnecunoscuților\b/gi, 'neconfirmaților')
      .replace(/necunosc[a-zăâîșț]*/gi, roAction);
  }

  if (savedTokens.length > 0) {
    res = res.replace(/___PASSTHROUGH_(\d+)___/g, (_, i) => savedTokens[Number(i)]);
  }

  return res;
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
