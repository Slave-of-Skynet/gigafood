import { useTranslation } from '../i18n';
import type { ApiResponse } from '../api/provenance';

export function ProvenanceStatus({ response, pending = false, unavailable = false, compact = false, label }: {
  response?: ApiResponse<unknown>; pending?: boolean; unavailable?: boolean; compact?: boolean; label?: string;
}) {
  const t = useTranslation();
  const origin = pending ? 'LOADING' : unavailable || !response ? 'UNAVAILABLE' : response.origin;
  return <div className="source-status" role="status" aria-live="polite" data-origin={origin}>
    <strong>{t(origin === 'LIVE_API' ? 'LIVE API' : origin === 'STATIC_SNAPSHOT' ? 'RECORDED DEMO' : origin === 'LOADING' ? 'Loading current request' : 'UNAVAILABLE')}</strong>
    {label && <span>{t(label)}</span>}
    {!compact && <span>{t(origin === 'LIVE_API' ? 'Response from the connected backend. Evidence may still be estimated or unverified.' :
      origin === 'STATIC_SNAPSHOT' ? 'Saved example results. No backend computation was performed for this response.' :
      origin === 'LOADING' ? 'Previous results are not the answer to this pending request.' : 'No valid result for this request. Connect the local backend or retry.')}</span>}
    {!compact && !pending && !unavailable && response?.origin === 'STATIC_SNAPSHOT' && <small>
      {t('Recorded file')}: {response.snapshot.file}
      {response.snapshot.datasetId && <> · {response.snapshot.datasetId}</>}
      {response.snapshot.researchCutoff && <> · {t('Research cutoff, not capture date')}: {response.snapshot.researchCutoff}</>}
      {response.snapshot.sourceRevision && <> · {t('Source revision')}: <code>{response.snapshot.sourceRevision}</code></>}
      {' · '}{t('Recording date not provided')}
    </small>}
  </div>;
}
