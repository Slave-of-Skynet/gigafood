interface NextActionsProps {
  actions: string[];
  limitations?: string[];
}

export function NextActions({ actions, limitations = [] }: NextActionsProps) {
  if (actions.length === 0 && limitations.length === 0) return null;

  return (
    <div className="next-actions-container">
      {limitations.length > 0 && (
        <div className="limitations-box">
          <strong className="box-mini-title">⚠️ Known Evidence Gaps & Limitations:</strong>
          <ul className="evidence-limitations-list">
            {limitations.map((lim, idx) => (
              <li key={idx}>{lim}</li>
            ))}
          </ul>
        </div>
      )}

      {actions.length > 0 && (
        <div className="actions-box">
          <strong className="box-mini-title">📋 Recommended Physical Qualification Actions:</strong>
          <ul className="qualification-actions-list">
            {actions.map((act, idx) => (
              <li key={idx} className="action-item">
                <span className="action-bullet">→</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
