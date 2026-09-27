import { useTranslation } from '../i18n';
interface NextActionsProps {
  actions: string[];
  limitations?: string[];
}

export function NextActions({ actions, limitations = [] }: NextActionsProps) {
  const t = useTranslation();
  if (actions.length === 0 && limitations.length === 0) return null;

  return (
    <div className="next-actions-container">
      {t(limitations.length > 0 && (
        <div className="limitations-box">
          <strong className="box-mini-title">{t("⚠️ Known Evidence Gaps & Limitations:")}</strong>
          <ul className="evidence-limitations-list">
            {t(limitations.map((lim, idx) => (
              <li key={idx}>{t(lim)}</li>
            )))}
          </ul>
        </div>
      ))}

      {t(actions.length > 0 && (
        <div className="actions-box">
          <strong className="box-mini-title">{t("📋 Recommended Physical Qualification Actions:")}</strong>
          <ul className="qualification-actions-list">
            {t(actions.map((act, idx) => (
              <li key={idx} className="action-item">
                <span className="action-bullet">{t("→")}</span>
                <span>{t(act)}</span>
              </li>
            )))}
          </ul>
        </div>
      ))}
    </div>
  );
}
