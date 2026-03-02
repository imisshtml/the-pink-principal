import type { Product } from '../data/mockProducts.ts';
import { cartState } from '../shopify.ts';

export function renderProductCarousel(container: HTMLElement, title: string, products: Product[]) {
  const productCardsHtml = products.map(product => `
    <div class="product-card min-w-[280px] w-[280px] md:w-[320px] flex-shrink-0 group cursor-pointer snap-start">
      <div class="relative bg-surface rounded-lg overflow-hidden mb-4 aspect-4/5">
        ${product.badge ? `<div class="absolute top-3 left-3 z-10 bg-primary text-text-inverse text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">${product.badge}</div>` : ''}
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105" />
        
        <div class="absolute bottom-0 left-0 w-full p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 pb-6">
          <button class="add-to-cart-btn btn btn-primary w-full shadow-lg" data-id="${product.id}">Quick Add</button>
        </div>
      </div>
      <div>
        <h4 class="font-bold text-lg mb-1 group-hover:text-primary transition-colors">${product.title}</h4>
        <p class="text-muted font-medium">$${product.price.toFixed(2)} USD</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="py-16 bg-background">
      <div class="container mb-8 flex justify-between items-end">
        <h2 class="text-3xl font-bold uppercase tracking-tight">${title}</h2>
        <a href="#" class="text-primary font-semibold hover:underline flex items-center gap-1">
          Shop All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      <div class="container relative w-full overflow-hidden">
        <div class="carousel-track flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4">
          ${productCardsHtml}
        </div>
        
        <!-- Optional gradient fades for the edges -->
        <div class="pointer-events-none absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-background to-transparent"></div>
        <div class="pointer-events-none absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  `;

  // Add event listeners after HTML is set
  const quickAddBtns = container.querySelectorAll('.add-to-cart-btn');
  quickAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const id = target.getAttribute('data-id');
      const product = products.find(p => p.id === id);
      if (product) {
        cartState.addItem(product);
      }
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    .aspect-4\\/5 {
      aspect-ratio: 4/5;
    }
    .min-w-\\[280px\\] { min-width: 280px; }
    .w-\\[280px\\] { width: 280px; }
    .md\\:w-\\[320px\\] { @media (min-width: 768px) { width: 320px; } }
    .flex-shrink-0 { flex-shrink: 0; }
    .cursor-pointer { cursor: pointer; }
    .snap-x { scroll-snap-type: x mandatory; }
    .snap-start { scroll-snap-align: start; }
    .snap-mandatory { scroll-snap-type: x mandatory; }
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .overflow-x-auto { overflow-x: auto; }
    .pointer-events-none { pointer-events: none; }
    .bg-gradient-to-l { background: linear-gradient(to left, var(--color-background), transparent); }
    .bg-gradient-to-r { background: linear-gradient(to right, var(--color-background), transparent); }
    @media (min-width: 768px) {
      .md\\:pl-24 { padding-left: 6rem; }
    }
  `;
  document.head.appendChild(style);
}
