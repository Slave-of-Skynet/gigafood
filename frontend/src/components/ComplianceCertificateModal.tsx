import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../i18n';

// Historical filename retained for callers; this component renders no certificate.
export function ComplianceCertificateModal({ isOpen, onClose, productType = 'bag' }: {
  isOpen: boolean; onClose: () => void; productType?: 'bag' | 'tray';
}) {
  const t = useTranslation();
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('qualification-print');
    dialog.current?.focus();
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') close.current(); };
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('keydown', escape);
      document.body.style.overflow = bodyOverflow;
      document.body.classList.remove('qualification-print');
      previous?.focus();
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const checks = [
    'Material identity, coatings and seam construction',
    'Temperature mapping, duration and failure limits',
    'Food-contact migration and chemical assessment',
    'Leakage, puncture resistance and steam pressure',
    'Cleaning, reuse durability and collection acceptance',
  ];
  const content = <div className="cert-modal-backdrop" onClick={onClose}>
    <div className="cert-modal-dialog qualification-dialog" ref={dialog} tabIndex={-1}
      onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="qualification-title"
      onKeyDown={e => {
        if (e.key === 'Tab') {
          const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
          if (!items?.length) return;
          const first = items[0], last = items[items.length - 1];
          if (e.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && (document.activeElement === last || document.activeElement === dialog.current)) { e.preventDefault(); first.focus(); }
        }
      }}>
      <div className="cert-modal-toolbar">
        <strong>{t('ILLUSTRATIVE CONCEPT')}</strong>
        <div className="cert-toolbar-actions">
          <button className="cert-btn-print" onClick={() => window.print()}>{t('Print checklist / PDF')}</button>
          <button className="cert-btn-close" onClick={onClose} aria-label={t('Close checklist')}>×</button>
        </div>
      </div>
      <div className="qualification-sheet">
        <h2 id="qualification-title">{t('Engineering Qualification Checklist — Concept Only')}</h2>
        <p className="disclosure-banner"><strong>{t('NOT A CERTIFICATE · NO CONFORMITY APPROVAL ESTABLISHED')}</strong></p>
        <h3>{t('Proposed configuration')}</h3>
        <p>{t(productType === 'bag' ? 'Foil pouch concept' : 'Aluminium tray + LSR lid concept')}</p>
        <p>{t('No configuration-specific thermal, food-contact or conformity approval has been established in this showcase.')}</p>
        <h3>{t('Measurement / document status')}</h3>
        <dl className="qualification-checks">{checks.map(check => <div key={check}>
          <dt>{t(check)}</dt><dd>{t('Not provided for this configuration')}</dd>
        </div>)}</dl>
        <p>{t('Next steps: freeze the configuration and intended use; obtain supplier documentation; commission appropriate testing; review results before any qualification decision.')}</p>
        <a href="https://github.com/Slave-of-Skynet/gigafood/blob/main/docs/demo-modes.md">{t('Evidence and demo boundaries')}</a>
      </div>
    </div>
  </div>;
  // A body-level portal also lets print remove the app layout, avoiding blank trailing pages.
  return typeof document === 'undefined' ? content : createPortal(content, document.body);
}
