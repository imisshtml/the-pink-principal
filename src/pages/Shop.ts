import { fetchAllProducts } from '../shopify.ts';
import { openProductQuickView } from '../components/ProductQuickViewModal.ts';

export async function renderShopPage(container: HTMLElement, initialCategory = 'all') {
  container.innerHTML = `
    <div class="bg-surface-pink py-16">
      <div class="container text-center max-w-2xl mx-auto px-4 fade-in">
        <h1 class="text-4xl font-bold text-primary tracking-tight mb-4 uppercase">The Shop</h1>
        <p class="text-muted text-lg">Indulge in our luxurious selection of beauty and raw hair essentials.</p>
      </div>
    </div>
    
    <div class="container py-12 flex flex-col md:flex-row gap-8 min-h-screen">
      <!-- Filter Sidebar -->
      
      
      <!-- Product Grid -->
      <div class="flex-1">
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6" id="shop-product-grid">
          <!-- Loading state -->
          <div class="col-span-full py-20 text-center flex flex-col items-center">
            <div class="w-10 h-10 border-4 border-surface-pink border-t-primary rounded-full animate-spin mb-4"></div>
            <p class="text-muted">Loading collection...</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Fetch live products
  const products = await fetchAllProducts();

  const renderGrid = (category: string) => {
    const gridEl = container.querySelector('#shop-product-grid')!;
    const filteredProducts = category === 'all'
      ? products
      : products.filter(p => p.productType.toLowerCase() === category.toLowerCase() || p.handle.includes(category));

    if (filteredProducts.length === 0) {
      if (category.toLowerCase() === 'hair') {
        gridEl.innerHTML = `
          <div class="col-span-full py-12 text-center">
            <p class="text-primary font-bold uppercase tracking-widest text-lg mb-2">Coming Soon</p>
            <p class="text-muted">Our premium raw hair collection is on the way. Please check back soon.</p>
          </div>
        `;
      } else {
        gridEl.innerHTML = '<div class="col-span-full py-12 text-center text-muted">No products found in this category.</div>';
      }
      return;
    }

    gridEl.innerHTML = filteredProducts.map((product) => `
      <div class="product-card group">
        <div class="relative bg-surface rounded-lg overflow-hidden mb-4 aspect-4/5 shadow-sm group-hover:shadow-md transition-shadow">
          ${!product.image ? '' : `<img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105" />`}
        </div>
        <div class="text-center">
          <h4 class="font-bold text-sm mb-1 group-hover:text-primary transition-colors">${product.title}</h4>
          <div class="flex items-center justify-between gap-2">
            <p class="text-muted font-medium text-sm">$${product.price.toFixed(2)} USD</p>
            <button class="shop-quick-view-btn btn btn-primary shadow-lg text-sm m-0 py-2" data-id="${product.id}">Add to Bag</button>
          </div>
        </div>
      </div>
    `).join('');

    // Bind buttons
    gridEl.querySelectorAll('.shop-quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLButtonElement).getAttribute('data-id');
        const prod = products.find(p => p.id === id);
        if (prod) openProductQuickView(prod);
      });
    });
  };

  // Initial render once products are loaded
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
      // Need to re-trigger animations somewhat simply
      container.querySelector('#shop-product-grid')!.innerHTML = ''; 
      setTimeout(() => { renderGrid(newCategory); }, 50);
    });
  });
}
