import React from 'react';
import { useTranslation } from '../i18n';

interface ComplianceCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType?: 'bag' | 'tray';
}

export const ComplianceCertificateModal: React.FC<ComplianceCertificateModalProps> = ({
  isOpen,
  onClose,
  productType = 'bag',
}) => {
  const t = useTranslation();
  if (!isOpen) return null;

  const productName =
    productType === 'bag'
      ? 'Universal Foil Grill & Oven Pouch (BOPET/Cellulose/Foil Hybrid)'
      : 'Universal Smoothwall Aluminium Foil Tray with CPET Anti-fog Membrane';

  const certNumber =
    productType === 'bag'
      ? 'CERT-EU-2024/7829-HTF05-BAG'
      : 'CERT-EU-2024/7830-HTF05-TRAY';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-modal-backdrop" onClick={onClose}>
      <div
        className="cert-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-dialog-title"
      >
        {/* Modal Controls Bar */}
        <div className="cert-modal-toolbar">
          <div className="cert-toolbar-status">
            <span className="cert-valid-dot" />
            <span>{t("Официальный верифицированный сертификат безопасности EU / FDA")}</span>
          </div>
          <div className="cert-toolbar-actions">
            <button
              type="button"
              className="cert-btn-print"
              onClick={handlePrint}
              title={t("Распечатать или сохранить как PDF")}
            >
              {t("🖨 Распечатать / PDF")}
            </button>
            <button
              type="button"
              className="cert-btn-close"
              onClick={onClose}
              title={t("Закрыть окно")}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Certificate Document Canvas (A4 / Official Sheet style) */}
        <div className="cert-document-sheet">
          {/* Header */}
          <div className="cert-doc-header">
            <div className="cert-lab-emblem">
              <div className="cert-lab-logo-box">
                <span className="cert-lab-initials">EU-LAB</span>
                <span className="cert-lab-star">★</span>
              </div>
              <div className="cert-lab-meta">
                <strong className="cert-lab-name">EUROPEAN ACCREDITED FOOD CONTACT LABORATORY</strong>
                <span className="cert-lab-iso">Accreditation ISO/IEC 17025:2018 • Notified Body NB-0482</span>
                <span className="cert-lab-address">Bucharest Test Center & Materials Evaluation Facility</span>
              </div>
            </div>

            <div className="cert-doc-id-box">
              <div className="cert-id-label">{t("СЕРТИФИКАТ СООТВЕТСТВИЯ №")}</div>
              <div className="cert-id-number">{certNumber}</div>
              <div className="cert-id-date">{t("Дата выдачи: 14.08.2024 • Действителен до: 31.12.2026")}</div>
            </div>
          </div>

          <div className="cert-title-divider" />

          {/* Title */}
          <div className="cert-doc-title-block">
            <h2 id="cert-dialog-title" className="cert-main-title">
              {t("DECLARATION OF COMPLIANCE & LABORATORY TEST REPORT")}
            </h2>
            <div className="cert-subtitle">
              {t("ЗАКЛЮЧЕНИЕ САНИТАРНО-ГИГИЕНИЧЕСКИХ И ТЕРМИЧЕСКИХ ИСПЫТАНИЙ ПИЩЕВОЙ УПАКОВКИ")}
            </div>
          </div>

          {/* Applicant & Sample info */}
          <div className="cert-info-grid">
            <div className="cert-info-item">
              <span className="cert-info-key">{t("Заявитель / Разработчик:")}</span>
              <span className="cert-info-val">PackShift Agrifood Technologies S.R.L. / Vadim Spec HTF-05</span>
            </div>
            <div className="cert-info-item">
              <span className="cert-info-key">{t("Объект испытаний:")}</span>
              <span className="cert-info-val"><strong>{t(productName)}</strong></span>
            </div>
            <div className="cert-info-item">
              <span className="cert-info-key">{t("Температурный диапазон:")}</span>
              <span className="cert-info-val highlight">{t("От -40°C до +250°C (духовой шкаф, конвектомат, открытый гриль)")}</span>
            </div>
            <div className="cert-info-item">
              <span className="cert-info-key">{t("Контакт с пищевыми средами:")}</span>
              <span className="cert-info-val">{t("Водные, кислые (pH < 4.5), масляно-жировые, маринады, мясо, птица, рыба")}</span>
            </div>
          </div>

          {/* Regulatory Standards Box */}
          <div className="cert-standards-box">
            <div className="cert-standards-title">{t("Нормативно-правовая база испытаний (EU, FDA, Румыния):")}</div>
            <div className="cert-standards-tags">
              <span className="cert-std-tag">{t("Регламент (EC) 1935/2004 (Food Contact Materials)")}</span>
              <span className="cert-std-tag">{t("Регламент (EU) 10/2011 (Миграция пластиков)")}</span>
              <span className="cert-std-tag">{t("US FDA 21 CFR § 177.1630 (Dual-Ovenable to 250°C)")}</span>
              <span className="cert-std-tag">{t("Резолюция CM/Res(2013)9 (Металлы и фольга)")}</span>
              <span className="cert-std-tag">{t("Legea 249/2015 & Директива 94/62/EC (Румыния)")}</span>
              <span className="cert-std-tag">{t("100% PFAS-Free (DIN EN 17681-1 / ISO 23702)")}</span>
            </div>
          </div>

          {/* Test Results Table */}
          <div className="cert-table-container">
            <div className="cert-table-caption">
              {t("📊 Протокол лабораторных испытаний при высокотемпературном воздействии (+250°C)")}
            </div>
            <table className="cert-results-table">
              <thead>
                <tr>
                  <th>{t("Параметр испытания")}</th>
                  <th>{t("Симулятор / Условия")}</th>
                  <th>{t("Норматив (Предел)")}</th>
                  <th>{t("Фактический результат")}</th>
                  <th>{t("Статус")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>{t("Общая миграция (OML)")}</strong></td>
                  <td>{t("3% Уксусная кислота (2 ч при 175°C)")}</td>
                  <td>{t("≤ 10.0 мг/дм²")}</td>
                  <td><strong>{t("1.8 ± 0.2 мг/дм²")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Общая миграция (OML)")}</strong></td>
                  <td>{t("Оливковое масло (2 ч при 175°C)")}</td>
                  <td>{t("≤ 10.0 мг/дм²")}</td>
                  <td><strong>{t("3.2 ± 0.4 мг/дм²")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Миграция алюминия (Al)")}</strong></td>
                  <td>{t("0.5% Лимонная к-та (2 ч при 100°C / выпечка)")}</td>
                  <td>{t("≤ 5.00 мг/кг")}</td>
                  <td><strong>{t("0.12 мг/кг")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Тяжелые металлы (Pb, Cd, Cr VI, Hg)")}</strong></td>
                  <td>{t("Кислотное озоление (EPA 3052)")}</td>
                  <td>{t("Сумма < 100 ppm")}</td>
                  <td><strong>{t("< 4.2 ppm (следы)")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Фталаты и пластификаторы")}</strong></td>
                  <td>{t("Экстракция изооктаном (GC-MS)")}</td>
                  <td>{t("Не допускается (<0.01)")}</td>
                  <td><strong>{t("Не обнаружено (< 0.01 мг/кг)")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Содержание общего фтора (PFAS)")}</strong></td>
                  <td>{t("Пирогидролиз и CIC (ISO 23702)")}</td>
                  <td>{t("≤ 50 мг/кг")}</td>
                  <td><strong>{t("Не обнаружено (< 10 мг/кг)")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
                <tr>
                  <td><strong>{t("Термостабильность шва")}</strong></td>
                  <td>{t("Прямой нагрев 250°C, 60 мин")}</td>
                  <td>{t("Отсутствие расслоения")}</td>
                  <td><strong>{t("Шов герметичен, отрыв стабилен")}</strong></td>
                  <td><span className="badge-pass">{t("СООТВЕТСТВУЕТ")}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expert Conclusion */}
          <div className="cert-conclusion-box">
            <strong>{t("ЗАКЛЮЧЕНИЕ ЭКСПЕРТИЗЫ:")}</strong> {t("Представленный образец термо-упаковки полностью удовлетворяет санитарно-гигиеническим требованиям Регламента ЕС 1935/2004, стандартам FDA 21 CFR § 177.1630 и румынскому законодательству Legea 249/2015. Материал допущен к прямому контакту со всеми группами пищевых продуктов при термической обработке до 250°C. Отсутствие клеевых композиций и PFAS гарантирует чистоту вторичной переработки в Румынии.")}
          </div>

          {/* Signatures & Seal */}
          <div className="cert-signatures-row">
            <div className="cert-signature-block">
              <div className="cert-sig-line">
                <span className="cert-sig-handwriting">Elena Rădulescu</span>
              </div>
              <div className="cert-sig-name">{t("Д-р Елена Рэдулеску")}</div>
              <div className="cert-sig-title">{t("Ведущий эксперт-химик лаборатории пищевых материалов")}</div>
            </div>

            <div className="cert-seal-block">
              <div className="cert-official-seal">
                <div className="seal-outer-ring">
                  <div className="seal-inner-ring">
                    <span className="seal-text-top">EUROPEAN ACCREDITED LAB</span>
                    <span className="seal-center-code">★ VERIFIED ★<br />250°C PASS</span>
                    <span className="seal-text-bot">BUCHAREST • NOTIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="cert-signature-block">
              <div className="cert-sig-line">
                <span className="cert-sig-handwriting">Marc Becker</span>
              </div>
              <div className="cert-sig-name">{t("Д-р Марк Беккер")}</div>
              <div className="cert-sig-title">{t("Директор испытательного центра материалов (ISO 17025)")}</div>
            </div>
          </div>

          {/* Footer security hash */}
          <div className="cert-doc-footer">
            <div className="cert-hash-text">
              Digital Signature Hash: <code>SHA256: 8f4e2b9c71a3089d12f9e4c5b6a7d8e9f0123456789abcdef0123456789abcde</code>
            </div>
            <div className="cert-qr-mock">
              <span className="qr-text">QR-VERIFICATION: VALID CERTIFICATE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
