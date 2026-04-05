import { cartState, createCheckoutUrl } from '../shopify.ts';

export function renderCartDrawer(container: HTMLElement) {
  container.innerHTML = `
    <!-- Overlay -->
    <div id="cart-overlay" class="cart-overlay-fixed hidden transition-opacity opacity-0 backdrop-blur-sm"></div>
    
    <!-- Drawer -->
    <div id="cart-drawer" class="cart-drawer-fixed flex flex-col shadow-2xl bg-background translate-x-full drawer-transition">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-pink">
        <h2 class="text-xl font-bold uppercase tracking-tight text-primary">Your Bag</h2>
        <button id="close-cart-btn" class="btn btn-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Items Container -->
      <div id="cart-items" class="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
        <div class="empty-state flex flex-col items-center justify-center h-full text-center text-muted py-16">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="mb-6 opacity-20 inline-block">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="text-lg mb-2 text-primary font-bold">Your bag is empty</p>
          <p class="text-sm">Time to treat yourself!</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="p-8 border-t border-border bg-surface">
        <div class="flex justify-between mb-4 font-semibold text-lg">
          <span>Subtotal</span>
          <span id="cart-subtotal">$0.00</span>
        </div>
        <p class="text-xs text-muted mb-6">Shipping and taxes calculated at checkout.</p>
        <button id="checkout-btn" class="btn btn-primary w-full py-4 text-base font-bold shadow-pink disabled:opacity-50" disabled>
          Checkout
        </button>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .cart-overlay-fixed {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 9998;
    }
    .cart-drawer-fixed {
      position: fixed;
      top: 0; right: 0;
      height: 100vh;
      width: 100%;
      max-width: 28rem;
      z-index: 9999;
      background-color: var(--color-background, #fff);
    }
    .translate-x-full { transform: translateX(100%); }
    .translate-x-0 { transform: translateX(0); }
    .drawer-transition { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .disabled\\:opacity-50:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .cart-item {
      display: flex;
      gap: 1rem;
      align-items: stretch;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--color-border);
    }
    .cart-item:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .cart-item-image {
      width: 5.5rem;
      height: 7rem;
      object-fit: cover;
      flex-shrink: 0;
    }
    .cart-item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
    .cart-item-actions {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
    }
  `;
  document.head.appendChild(style);

  // Logic bindings
  const overlay = container.querySelector('#cart-overlay')!;
  const drawer = container.querySelector('#cart-drawer')!;
  const closeBtn = container.querySelector('#close-cart-btn')!;
  const itemsContainer = container.querySelector('#cart-items')!;
  const subtotalEl = container.querySelector('#cart-subtotal')!;
  const checkoutBtnEl = container.querySelector<HTMLButtonElement>('#checkout-btn')!;

  const closeCart = () => cartState.toggleCart();
  closeBtn.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  checkoutBtnEl.addEventListener('click', async () => {
    const originalText = checkoutBtnEl.textContent || 'Checkout';
    checkoutBtnEl.disabled = true;
    checkoutBtnEl.textContent = 'Secure Checkout...';

    try {
      const lineItemsToAdd = cartState.items.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }));

      const checkoutUrl = await createCheckoutUrl(lineItemsToAdd);
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout Failed. Make sure you have products added properly.');
      checkoutBtnEl.disabled = false;
      checkoutBtnEl.textContent = originalText;
    }
  });

  const renderItems = (items: any[]) => {
    if (items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="empty-state flex flex-col items-center justify-center h-full text-center text-muted py-16">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="mb-6 opacity-20 inline-block">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="text-lg mb-2 text-primary font-bold">Your bag is empty</p>
          <p class="text-sm">Time to treat yourself!</p>
        </div>
      `;
      subtotalEl.textContent = '$0.00';
      checkoutBtnEl.disabled = true;
      return;
    }

    checkoutBtnEl.disabled = false;
    let subtotal = 0;

    itemsContainer.innerHTML = items.map((item, id) => {
      subtotal += (item.price * item.quantity);
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-image rounded shadow-sm bg-surface" />
          <div class="cart-item-details">
            <div>
              <h4 class="font-bold text-sm mb-1 leading-tight">${item.title}</h4>
              <p class="text-muted text-xs font-medium uppercase tracking-wider">Qty: ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
              <span class="font-bold text-primary">$${(item.price * item.quantity).toFixed(2)}</span>
              <button onclick="window.removeCartItem(${id})" class="text-xs text-muted hover:text-error hover:underline transition-colors uppercase font-bold tracking-widest">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    subtotalEl.textContent = '$' + subtotal.toFixed(2);
  };

  // Bind to global for onclick inline
  (window as any).removeCartItem = (id: number) => {
    cartState.removeItem(id);
  };

  document.addEventListener('cart:toggled', (e: any) => {
    const isOpen = e.detail;
    if (isOpen) {
      overlay.classList.remove('hidden');
      // small delay to allow display:block to apply before animating opacity
      setTimeout(() => overlay.classList.remove('opacity-0'), 10);
      drawer.classList.remove('translate-x-full');
    } else {
      overlay.classList.add('opacity-0');
      drawer.classList.add('translate-x-full');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
  });

  document.addEventListener('cart:updated', (e: any) => {
    renderItems(e.detail);
    // update cart badge if it exists
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = e.detail.length.toString();
  });
}
