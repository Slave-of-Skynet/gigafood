import type { ProductArchetype, ProductId } from '../api/contracts';

interface ProductSelectorProps {
  products: ProductArchetype[];
  selectedProductId: ProductId;
  onSelectProduct: (id: ProductId) => void;
  disabled?: boolean;
}

const PRODUCT_VISUAL_META: Record<
  ProductId,
  { label: string; icon: string; portionSize: string; example: string }
> = {
  P1: {
    label: 'Целая курица-гриль',
    icon: '🍗',
    portionSize: '1.0–1.3 кг · тушка',
    example: 'Profi: Pui la rotisor întreg',
  },
  P2: {
    label: 'Крылышки и бедра',
    icon: '🍖',
    portionSize: '350–600 г · 6–20 шт.',
    example: 'Profi: Aripioare & pulpe rumenite',
  },
  P3: {
    label: 'Картофель и гарниры',
    icon: '🥔',
    portionSize: '250–450 г · порция',
    example: 'Profi: Cartofi wedges & legume',
  },
  P4: {
    label: 'Горячие мясные блюда',
    icon: '🥩',
    portionSize: '300–500 г · порция',
    example: 'Profi: Ceafă, șnițel & friptură',
  },
};

export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
  disabled = false,
}: ProductSelectorProps) {
  return (
    <section className="product-selector-deck" id="recommendation-archetypes" aria-label="Select Food Archetype">
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">Выбор блюда</span>
          <h2 className="control-section-heading">Какое горячее блюдо упаковываем?</h2>
        </div>
        <span className="selected-product-badge">
          Выбрано: <strong>{PRODUCT_VISUAL_META[selectedProductId]?.label || selectedProductId}</strong>
        </span>
      </div>

      <div className="product-archetype-grid">
        {products.map((prod) => {
          const meta = PRODUCT_VISUAL_META[prod.product_id] || {
            label: prod.name,
            icon: '🍱',
            portionSize: 'Standard portion',
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
                <span className="product-icon" aria-hidden="true">
                  {meta.icon}
                </span>
              </div>

              <div className="product-card-body">
                <strong className="product-name-title">{meta.label}</strong>
                <span className="product-portion-note">{meta.portionSize}</span>
                <small className="product-example-note">{meta.example}</small>
              </div>

              {isSelected && (
                <div className="selected-active-marker">
                  <span>Выбрано для оценки</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
