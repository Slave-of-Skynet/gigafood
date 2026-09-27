import { useTranslation } from '../i18n';
import type { ProductArchetype, ProductId } from '../api/contracts';

interface ProductSelectorProps {
  products: ProductArchetype[];
  selectedProductId: ProductId;
  onSelectProduct: (id: ProductId) => void;
  disabled?: boolean;
}

const PRODUCT_METADATA: Record<
  ProductId,
  { label: string; icon: string; portionSize: string; example: string }
> = {
  P1: {
    label: 'Whole Rotisserie Chicken',
    icon: '🍗',
    portionSize: 'Test size: 1.0–1.4 kg. Actual size needs confirmation.',
    example: 'Pui la rotisor întreg (high hot grease / headspace)',
  },
  P2: {
    label: 'Chicken Wings & Thighs',
    icon: '🍖',
    portionSize: 'Portion size needs confirmation.',
    example: 'Aripioare & pulpe rumenite',
  },
  P3: {
    label: 'Hot Potatoes & Vegetables',
    icon: '🥔',
    portionSize: 'Portion size needs confirmation.',
    example: 'Cartofi wedges & legume coapte',
  },
  P4: {
    label: 'Prepared Hot Meat Portions',
    icon: '🥩',
    portionSize: 'Portion size needs confirmation.',
    example: 'Ceafă, șnițel & friptură caldă',
  },
};

export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
  disabled = false,
}: ProductSelectorProps) {
  const t = useTranslation();
  return (
    <section className="product-selector-deck" aria-label={t("Select Food Archetype")}>
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">{t("Step 1")}</span>
          <h2 className="control-section-heading">{t("What food are you packing?")}</h2>
        </div>
        <span className="selected-product-badge">{t("Selected: ")}<strong>{t(PRODUCT_METADATA[selectedProductId]?.label || selectedProductId)}{t(" (")}{selectedProductId}{t(")")}</strong>
        </span>
      </div>

      <div className="product-archetype-grid">
        {t(products.map((prod) => {
          const meta = PRODUCT_METADATA[prod.product_id] || {
            label: prod.name,
            icon: '🍱',
            portionSize: 'Portion pack',
            example: '',
          };
          const isSelected = prod.product_id === selectedProductId;

          return (
            <button
              key={prod.product_id}
              type="button"
              className={`product-select-card ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectProduct(prod.product_id)}
              disabled={disabled}
              aria-pressed={isSelected}
            >
              <div className="product-card-top">
                <span className="product-id-tag">{prod.product_id}</span>
                <span className="product-icon" aria-hidden="true">
                  {t(meta.icon)}
                </span>
              </div>

              <div className="product-card-body">
                <strong className="product-name-title">{t(meta.label)}</strong>
                <span className="product-portion-note">{t(meta.portionSize)}</span>
                <small className="product-example-note">{t(meta.example)}</small>
              </div>

              {t(isSelected && (
                <div className="selected-active-marker">
                  <span>{t("Selected Product")}</span>
                </div>
              ))}
            </button>
          );
        }))}
      </div>
    </section>
  );
}
