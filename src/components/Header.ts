import { cartState } from '../shopify.ts';

export function renderHeader(container: HTMLElement) {
  container.innerHTML = `
    <div class="header-inner container flex justify-between items-center glass">
      <div class="mobile-menu-toggle flex items-center md:hidden">
        <button id="menu-btn" aria-label="Menu" class="btn btn-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <div class="logo-container">
        <a href="/" class="logo text-primary font-bold uppercase z-50 relative">The Pink Principal</a>
      </div>
      
      <nav class="desktop-nav hidden md:flex items-center gap-6">
        <a href="#lips" class="nav-link font-semibold uppercase text-sm text-muted slide-up" style="animation-delay: 100ms">Makeup Kits</a>
        <a href="#eyes" class="nav-link font-semibold uppercase text-sm text-muted slide-up" style="animation-delay: 200ms">Hair Units</a>
        <a href="#bestsellers" class="nav-link font-semibold uppercase text-sm text-muted slide-up" style="animation-delay: 300ms">Best Sellers</a>
      </nav>
      
      <div class="cart-toggle-container">
        <button id="cart-btn" aria-label="Cart" class="btn btn-icon flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 01-8 0"></path>
          </svg>
          <span class="cart-count badge">0</span>
        </button>
      </div>
    </div>
    
    <!-- Mobile Navigation Overlay (hidden by default) -->
    <div id="mobile-menu" class="mobile-menu bg-surface-pink hidden fade-in">
      <nav class="flex flex-col gap-6 p-8">
        <a href="#lips" class="mobile-nav-link text-xl font-bold">Makeup Kits</a>
        <a href="#eyes" class="mobile-nav-link text-xl font-bold">Hair Units</a>
        <a href="#bestsellers" class="mobile-nav-link text-xl font-bold">Best Sellers</a>
      </nav>
    </div>
  `;

  // Styling specific to the header
  const style = document.createElement('style');
  style.textContent = `
    #header-container {
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
    }
    .header-inner {
      padding-top: var(--spacing-4);
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--color-border);
    }
    .logo {
      font-size: var(--font-size-xl);
      letter-spacing: -0.05em;
    }
    .nav-link:hover {
      color: var(--color-primary);
    }
    .btn-icon {
      padding: var(--spacing-2);
      border-radius: var(--border-radius-full);
      color: var(--color-text-main);
    }
    .btn-icon:hover {
      background-color: var(--color-primary-light);
      color: var(--color-primary-dark);
    }
    .badge {
      background-color: var(--color-primary);
      color: white;
      font-size: var(--font-size-xs);
      padding: 2px 6px;
      border-radius: var(--border-radius-full);
      margin-left: 4px;
    }
    .mobile-menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100vh;
      border-top: 1px solid var(--color-border);
      z-index: 40;
    }
    .hidden {
      display: none !important;
    }
    @media (min-width: 768px) {
      .md\\:hidden { display: none !important; }
      .md\\:flex { display: flex !important; }
    }
  `;
  document.head.appendChild(style);

  const cartBtn = container.querySelector('#cart-btn')!;
  cartBtn.addEventListener('click', () => {
    cartState.toggleCart();
  });

  // Mobile menu toggle logic
  const menuBtn = container.querySelector('#menu-btn')!;
  const mobileMenu = container.querySelector('#mobile-menu')!;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // Toggle icon (hamburger to close)
    const svg = menuBtn.querySelector('svg')!;
    if (mobileMenu.classList.contains('hidden')) {
      svg.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
    } else {
      svg.innerHTML = '<path d="M18 6L6 18M6 6l12 12"></path>';
    }
  });
}
