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
    portionSize: '1.0–1.4 kg modeled test scenario assumption (actual Profi chicken mass/geometry remains UNKNOWN)',
    example: 'Pui la rotisor întreg (high hot grease / headspace)',
  },
  P2: {
    label: 'Chicken Wings & Thighs',
    icon: '🍖',
    portionSize: 'Exact portion geometry/weight requiring confirmation',
    example: 'Aripioare & pulpe rumenite',
  },
  P3: {
    label: 'Hot Potatoes & Vegetables',
    icon: '🥔',
    portionSize: 'Exact portion geometry/weight requiring confirmation',
    example: 'Cartofi wedges & legume coapte',
  },
  P4: {
    label: 'Prepared Hot Meat Portions',
    icon: '🥩',
    portionSize: 'Exact portion geometry/weight requiring confirmation',
    example: 'Ceafă, șnițel & friptură caldă',
  },
};

export function ProductSelector({
  products,
  selectedProductId,
  onSelectProduct,
  disabled = false,
}: ProductSelectorProps) {
  return (
    <section className="product-selector-deck" aria-label="Select Food Archetype">
      <div className="selector-title-row">
        <div>
          <span className="control-step-tag">Stage A · Product Context</span>
          <h2 className="control-section-heading">Select Hot-Food Product Archetype</h2>
        </div>
        <span className="selected-product-badge">
          Selected: <strong>{PRODUCT_METADATA[selectedProductId]?.label || selectedProductId} ({selectedProductId})</strong>
        </span>
      </div>

      <div className="product-archetype-grid">
        {products.map((prod) => {
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
                  <span>Selected Product</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
