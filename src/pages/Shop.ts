import { mockProducts } from '../data/mockProducts.ts';
import { cartState } from '../shopify.ts';

export function renderShopPage(container: HTMLElement, initialCategory = 'all') {
  container.innerHTML = `
    <div class="bg-surface-pink py-16">
      <div class="container text-center max-w-2xl mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary tracking-tight mb-4 uppercase">The Shop</h1>
        <p class="text-muted text-lg">Indulge in our luxurious selection of beauty and raw hair essentials.</p>
      </div>
    </div>
    
    <div class="container py-12 flex flex-col md:flex-row gap-8 min-h-screen">
      <!-- Filter Sidebar -->
      <aside class="w-full md:w-64 flex-shrink-0">
        <h3 class="font-bold uppercase tracking-widest text-sm mb-4 border-b border-border pb-2">Filter By Category</h3>
        <div class="flex flex-col gap-3" id="category-filters">
          <button class="filter-btn text-left text-muted hover:text-primary transition-colors ${initialCategory === 'all' ? 'text-primary font-bold' : ''}" data-category="all">All Products</button>
          <button class="filter-btn text-left text-muted hover:text-primary transition-colors ${initialCategory === 'makeup' ? 'text-primary font-bold' : ''}" data-category="makeup">Makeup Kits</button>
          <button class="filter-btn text-left text-muted hover:text-primary transition-colors ${initialCategory === 'hair' ? 'text-primary font-bold' : ''}" data-category="hair">Raw Hair Units</button>
        </div>
      </aside>
      
      <!-- Product Grid -->
      <div class="flex-1">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6" id="shop-product-grid">
          <!-- Rendered dynamically -->
        </div>
      </div>
    </div>
  `;

  const renderGrid = (category: string) => {
    const gridEl = container.querySelector('#shop-product-grid')!;
    const filteredProducts = category === 'all'
      ? mockProducts
      : mockProducts.filter(p => p.category === category);

    if (filteredProducts.length === 0) {
      gridEl.innerHTML = '<div class="col-span-full py-12 text-center text-muted">No products found in this category.</div>';
      return;
    }

    gridEl.innerHTML = filteredProducts.map((product, index) => `
      <div class="product-card group cursor-pointer delayed-slide" style="transition-delay: ${index * 50}ms">
        <div class="relative bg-surface rounded-lg overflow-hidden mb-4 aspect-4/5 shadow-sm group-hover:shadow-md transition-shadow">
          ${product.badge ? `<div class="absolute top-2 left-2 z-10 bg-primary text-text-inverse text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">${product.badge}</div>` : ''}
          <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105" />
          
          <div class="absolute bottom-0 left-0 w-full p-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 pb-4">
            <button class="shop-add-btn btn btn-primary w-full shadow-lg text-sm m-0 py-2" data-id="${product.id}">Add to Bag</button>
          </div>
        </div>
        <div class="text-center">
          <h4 class="font-bold text-sm mb-1 group-hover:text-primary transition-colors">${product.title}</h4>
          <p class="text-muted font-medium text-sm">$${product.price.toFixed(2)} USD</p>
        </div>
      </div>
    `).join('');

    // Bind buttons
    gridEl.querySelectorAll('.shop-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute('data-id');
        const prod = mockProducts.find(p => p.id === id);
        if (prod) cartState.addItem(prod);
      });
    });
  };

  // Initial render
  renderGrid(initialCategory);

  // Filter logic
  const filterBtns = container.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('text-primary', 'font-bold');
        b.classList.add('text-muted');
      });
      const target = e.currentTarget as HTMLElement;
      target.classList.remove('text-muted');
      target.classList.add('text-primary', 'font-bold');

      const newCategory = target.getAttribute('data-category')!;
      renderGrid(newCategory);
    });
  });
}
