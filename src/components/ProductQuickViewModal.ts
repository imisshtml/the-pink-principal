import { cartState, type ShopifyProduct, type ShopifyVariant } from '../shopify.ts';

function getVariantLabel(variant: ShopifyVariant): string {
  const colorOption = variant.selectedOptions.find((opt) => opt.name.toLowerCase() === 'color');
  return colorOption?.value || variant.title || 'Default';
}

function getImageLabel(product: ShopifyProduct, image: string, index: number): string {
  const matchingVariant = product.variants.find((variant) => variant.image === image);
  if (matchingVariant) return getVariantLabel(matchingVariant);
  return `Image ${index + 1}`;
}

function ensureQuickViewStyles() {
  if (document.getElementById('quick-view-styles')) return;
  const style = document.createElement('style');
  style.id = 'quick-view-styles';
  style.textContent = `
    .quick-view-overlay {
      position: fixed;
      inset: 0;
      z-index: 12000;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .quick-view-modal {
      width: min(960px, 100%);
      max-height: 92vh;
      overflow: auto;
      background: var(--color-background, #fff);
      border-radius: 12px;
      border: 1px solid var(--color-border, #e5e5e5);
      box-shadow: 0 20px 50px rgba(0,0,0,0.25);
      padding: 1rem;
    }
    .quick-view-grid {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 1rem;
    }
    .quick-view-image-wrap {
      background: var(--color-surface, #fafafa);
      border-radius: 10px;
      overflow: hidden;
      min-height: 420px;
    }
    .quick-view-main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .quick-view-thumbs {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.75rem;
      overflow-x: auto;
      padding-bottom: 0.25rem;
    }
    .quick-view-thumb-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.35rem;
      flex: 0 0 auto;
    }
    .quick-view-thumb {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      border: 1px solid var(--color-border, #e5e5e5);
      object-fit: cover;
      cursor: pointer;
      background: #fff;
    }
    .quick-view-thumb.is-selected {
      border-color: var(--color-primary, #ff3366);
      box-shadow: 0 0 0 2px rgba(255, 51, 102, 0.2);
    }
    .quick-view-thumb-label {
      font-size: 0.72rem;
      color: var(--color-text-muted, #666);
      max-width: 72px;
      text-align: center;
      line-height: 1.2;
    }
    .quick-view-title {
      margin: 0 0 .5rem 0;
      font-size: 1.5rem;
      line-height: 1.2;
    }
    .quick-view-price {
      margin: 0 0 .75rem 0;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .quick-view-compare {
      margin-left: 0.5rem;
      text-decoration: line-through;
      color: var(--color-text-muted, #666);
      font-weight: 500;
      font-size: 0.95rem;
    }
    .quick-view-description {
      color: var(--color-text-muted, #666);
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      max-height: 180px;
      overflow: auto;
    }
    .quick-view-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
      margin-top: 0.75rem;
    }
    .quick-view-variant-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    .quick-view-variant-option {
      width: 100%;
      border: 1px solid var(--color-border, #e5e5e5);
      border-radius: 10px;
      padding: 0.55rem;
      background: #fff;
      color: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-align: left;
    }
    .quick-view-variant-option:hover {
      border-color: var(--color-primary, #ff3366);
    }
    .quick-view-variant-option.is-selected {
      border-color: var(--color-primary, #ff3366);
      box-shadow: 0 0 0 2px rgba(255, 51, 102, 0.2);
      background: rgba(255, 240, 245, 0.8);
    }
    .quick-view-variant-image {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid var(--color-border, #e5e5e5);
      flex: 0 0 auto;
      background: var(--color-surface, #fafafa);
    }
    .quick-view-variant-meta {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .quick-view-variant-name {
      font-size: 0.92rem;
      font-weight: 600;
      color: #111111;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .quick-view-variant-price {
      font-size: 0.82rem;
      color: #3f3f46;
    }
    .quick-view-variant-option.is-selected .quick-view-variant-name {
      color: #111111;
    }
    .quick-view-variant-option.is-selected .quick-view-variant-price {
      color: #27272a;
    }
    .quick-view-close {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 9999px;
      border: 1px solid var(--color-border, #e5e5e5);
      background: #fff;
      cursor: pointer;
      font-size: 1.1rem;
      line-height: 1;
    }
    .quick-view-header {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.5rem;
    }
    @media (max-width: 900px) {
      .quick-view-grid {
        grid-template-columns: 1fr;
      }
      .quick-view-image-wrap {
        min-height: 320px;
      }
    }
  `;
  document.head.appendChild(style);
}

export function openProductQuickView(product: ShopifyProduct) {
  ensureQuickViewStyles();

  const variants = product.variants.length > 0
    ? product.variants
    : [{
      id: product.variantId,
      title: 'Default',
      price: product.price,
      compareAtPrice: product.compareAtPrice ?? null,
      availableForSale: true,
      selectedOptions: []
    }];

  let selectedVariant = variants[0];

  const imageSet = new Set<string>([product.image, ...product.images, ...(variants.map(v => v.image || ''))].filter(Boolean));
  const imageList = Array.from(imageSet);
  let selectedImage = selectedVariant?.image || imageList[0] || '';

  const overlay = document.createElement('div');
  overlay.className = 'quick-view-overlay';
  overlay.innerHTML = `
    <div class="quick-view-modal" role="dialog" aria-modal="true" aria-label="Product details">
      <div class="quick-view-header">
        <button class="quick-view-close" type="button" aria-label="Close modal">×</button>
      </div>
      <div class="quick-view-grid">
        <div>
          <div class="quick-view-image-wrap">
            <img class="quick-view-main-image" src="${selectedImage}" alt="${product.title}" />
          </div>
          <div class="quick-view-thumbs">
            ${imageList.map((image, index) => `
              <div class="quick-view-thumb-wrap">
                <img class="quick-view-thumb ${image === selectedImage ? 'is-selected' : ''}" src="${image}" alt="${product.title} image" data-image="${image}" />
                <span class="quick-view-thumb-label">${getImageLabel(product, image, index)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <h3 class="quick-view-title">${product.title}</h3>
          <p class="quick-view-price">
            <span id="quick-view-price">$${selectedVariant?.price.toFixed(2) || product.price.toFixed(2)} USD</span>
            <span class="quick-view-compare" id="quick-view-compare" ${selectedVariant?.compareAtPrice ? '' : 'style="display:none;"'}>
              ${selectedVariant?.compareAtPrice ? `$${selectedVariant.compareAtPrice.toFixed(2)}` : ''}
            </span>
          </p>
          <div class="quick-view-description">${product.description || 'No description available.'}</div>
          ${variants.length > 1 ? `
            <label class="text-sm font-semibold">Color / Variant</label>
            <div class="quick-view-variant-list">
              ${variants.map((variant) => `
                <button
                  type="button"
                  class="quick-view-variant-option ${variant.id === selectedVariant.id ? 'is-selected' : ''}"
                  data-variant-id="${variant.id}"
                >
                  <img
                    class="quick-view-variant-image"
                    src="${variant.image || product.image || imageList[0] || ''}"
                    alt="${getVariantLabel(variant)}"
                  />
                  <span class="quick-view-variant-meta">
                    <span class="quick-view-variant-name">${getVariantLabel(variant)}</span>
                    <span class="quick-view-variant-price">$${variant.price.toFixed(2)} USD</span>
                  </span>
                </button>
              `).join('')}
            </div>
          ` : ''}
          <div class="quick-view-actions">
            <button type="button" class="btn btn-primary w-full" id="quick-view-add-btn">Add to Bag</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const closeModal = () => {
    document.body.style.overflow = '';
    overlay.remove();
  };

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeModal();
  });

  const closeBtn = overlay.querySelector('.quick-view-close') as HTMLButtonElement;
  closeBtn.addEventListener('click', closeModal);

  const mainImage = overlay.querySelector('.quick-view-main-image') as HTMLImageElement;
  const thumbNodes = overlay.querySelectorAll('.quick-view-thumb');
  thumbNodes.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const image = (thumb as HTMLImageElement).dataset.image || selectedImage;
      selectedImage = image;
      mainImage.src = selectedImage;
      thumbNodes.forEach((node) => node.classList.remove('is-selected'));
      thumb.classList.add('is-selected');
    });
  });

  const variantButtons = overlay.querySelectorAll('.quick-view-variant-option');
  const priceEl = overlay.querySelector('#quick-view-price') as HTMLElement;
  const compareEl = overlay.querySelector('#quick-view-compare') as HTMLElement;

  if (variantButtons.length > 0) {
    variantButtons.forEach((button) => {
      button.addEventListener('click', () => {
      const variantId = (button as HTMLButtonElement).dataset.variantId || '';
      selectedVariant = variants.find((variant) => variant.id === variantId) || variants[0];
      priceEl.textContent = `$${selectedVariant.price.toFixed(2)} USD`;
      if (selectedVariant.compareAtPrice) {
        compareEl.style.display = '';
        compareEl.textContent = `$${selectedVariant.compareAtPrice.toFixed(2)}`;
      } else {
        compareEl.style.display = 'none';
        compareEl.textContent = '';
      }
      if (selectedVariant.image) {
        selectedImage = selectedVariant.image;
        mainImage.src = selectedImage;
      }
      variantButtons.forEach((node) => node.classList.remove('is-selected'));
      button.classList.add('is-selected');
      thumbNodes.forEach((node) => {
        const img = node as HTMLImageElement;
        node.classList.toggle('is-selected', img.dataset.image === selectedImage);
      });
    });
    });
  }

  const addBtn = overlay.querySelector('#quick-view-add-btn') as HTMLButtonElement;
  addBtn.addEventListener('click', () => {
    const productToAdd: ShopifyProduct = {
      ...product,
      variantId: selectedVariant.id,
      price: selectedVariant.price,
      compareAtPrice: selectedVariant.compareAtPrice ?? null,
      image: selectedVariant.image || selectedImage || product.image,
      title: selectedVariant.title && selectedVariant.title !== 'Default Title'
        ? `${product.title} - ${getVariantLabel(selectedVariant)}`
        : product.title
    };
    cartState.addItem(productToAdd);
    closeModal();
  });

  document.body.style.overflow = 'hidden';
  document.body.appendChild(overlay);
}
