export function renderFooter(container: HTMLElement) {
  container.innerHTML = `
    <div class="footer-inner bg-surface-pink py-16">
      <div class="container pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- Brand Info -->
          <div class="space-y-4">
            <h3 class="logo text-primary font-bold uppercase mb-4">The Pink Principal</h3>
            <p class="text-muted text-sm leading-relaxed max-w-xs">
              Elevating everyday beauty with premium raw hair and curated makeup essentials. 
              Designed for those who demand excellence without compromise.
            </p>
          </div>

          <div class="footer-col">
            <h4 class="font-bold mb-4 uppercase text-sm text-primary tracking-wider">Shop</h4>
            <ul class="flex flex-col gap-3">
              <li><a href="#makeup" class="text-muted text-sm hover:text-primary transition-fast">Makeup Kits</a></li>
              <li><a href="#hair" class="text-muted text-sm hover:text-primary transition-fast">Hair Units</a></li>
              <li><a href="#bestsellers" class="text-muted text-sm hover:text-primary transition-fast">Best Sellers</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="font-bold mb-4 uppercase text-sm text-primary tracking-wider">Customer Care</h4>
            <ul class="flex flex-col gap-3">
              <li><a href="#" class="text-muted text-sm hover:text-primary transition-fast">Order Status</a></li>
              <li><a href="#" class="text-muted text-sm hover:text-primary transition-fast">Shipping Policy</a></li>
              <li><a href="#" class="text-muted text-sm hover:text-primary transition-fast">Refund Policy</a></li>
              <li><a href="#" class="text-muted text-sm hover:text-primary transition-fast">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-col lg:pl-4">
            <h4 class="font-bold mb-4 uppercase text-sm text-primary tracking-wider">Join The Club</h4>
            <p class="text-muted text-sm mb-4 leading-relaxed">Be the first to know about the latest drops, exclusive offers, & more!</p>
            <form class="newsletter-form flex gap-2 w-full max-w-sm">
              <input type="email" placeholder="Enter your email" class="input-primary flex-1" required>
              <button type="submit" class="btn btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          </div>

        </div>
      </div>
      
      <div class="container">
        <div class="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>&copy; ${new Date().getFullYear()} The Pink Principal. All rights reserved.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .footer-inner {
      margin-top: auto;
    }
    .input-primary {
      padding: var(--spacing-3) var(--spacing-4);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-full);
      font-family: inherit;
      font-size: var(--font-size-sm);
      outline: none;
      transition: border-color var(--transition-fast);
    }
    .input-primary:focus {
      border-color: var(--color-primary);
    }
  `;
  document.head.appendChild(style);
}
