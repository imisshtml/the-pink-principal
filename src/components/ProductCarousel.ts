import type { ShopifyProduct } from '../shopify.ts';
import { openProductQuickView } from './ProductQuickViewModal.ts';

export function renderProductCarousel(container: HTMLElement, title: string, products: ShopifyProduct[]) {
  const productCardsHtml = products.map((product, index) => {
    // Add a mock badge to the first item for UI purposes
    const badge = index === 0 ? '' : '';
    const canQuickAdd = Boolean(product.variantId);
    return `
    <div class="product-card flex-shrink-0 group snap-start delayed-slide" style="animation-delay: ${index * 100}ms">
      <div class="relative bg-surface rounded-lg overflow-hidden mb-4 aspect-4/5">
        ${badge ? `<div class="absolute top-3 left-3 z-10 bg-primary text-text-inverse text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${badge}</div>` : ''}
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105" />
      </div>
      <div>
        <h4 class="font-bold text-lg mb-1 group-hover:text-primary transition-colors">${product.title}</h4>
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <p class="text-muted font-medium">$${product.price.toFixed(2)} USD</p>
            ${product.compareAtPrice ? `<p class="text-xs text-muted line-through opacity-70">$${product.compareAtPrice.toFixed(2)}</p>` : ''}
          </div>
          ${canQuickAdd
            ? `<button class="quick-view-btn btn btn-primary shadow-lg" data-id="${product.id}">Add</button>`
            : `<button class="btn btn-outline shadow-lg opacity-90 cursor-not-allowed" type="button" disabled>Coming Soon</button>`}
        </div>
      </div>
    </div>
  `}).join('');

  container.innerHTML = `
    <section class="py-16 bg-background">
      <div class="container section-header mb-8 flex justify-between items-end">
        <h2 class="text-3xl font-bold uppercase tracking-tight">${title}</h2>
        <a href="#shop" class="shop-all-link text-primary font-semibold hover:underline flex items-center gap-1">
          Shop All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      <div class="container carousel-shell relative w-full overflow-hidden">
        <div class="carousel-track flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4">
          ${productCardsHtml}
        </div>
        
        <!-- Optional gradient fades for the edges -->
        <div class="pointer-events-none absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-background to-transparent"></div>
        <div class="pointer-events-none absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  `;

  const styleId = 'product-carousel-responsive-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .product-card {
        width: min(72vw, 280px);
        min-width: min(72vw, 280px);
        scroll-snap-align: start;
      }
      .carousel-shell {
        width: 100%;
        overflow: hidden;
      }
      .carousel-track {
        display: flex;
        width: 100%;
        gap: 1.5rem;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        overscroll-behavior-inline: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }
      .carousel-track::-webkit-scrollbar {
        display: none;
      }
      @media (min-width: 768px) {
        .product-card {
          width: 320px;
          min-width: 320px;
        }
      }
      @media (max-width: 640px) {
        .section-header {
          align-items: center;
        }
        .section-header h2 {
          font-size: 2rem;
          margin-bottom: 0;
        }
        .shop-all-link {
          font-size: 0.9rem;
          white-space: nowrap;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const quickViewBtns = container.querySelectorAll('.quick-view-btn');
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const id = target.getAttribute('data-id');
      const product = products.find(p => p.id === id);
      if (product) {
        openProductQuickView(product);
      }
    });
  });

}
