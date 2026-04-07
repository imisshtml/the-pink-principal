export function renderFooter(container: HTMLElement) {
  container.innerHTML = `
    <div class="footer-inner bg-surface-pink py-16">
      <div class="container">
        <div class="footer-top">
          <div class="footer-top-grid">
            <div class="footer-brand">
              <h3 class="logo text-primary font-bold uppercase mb-4">The Pink Principal</h3>
              <p class="text-muted text-sm leading-relaxed">
              Elevating everyday beauty with premium raw hair and curated makeup essentials. 
              Designed for those who demand excellence without compromise.
              </p>
            </div>

            <div class="footer-col">
              <h4 class="font-bold mb-4 uppercase text-sm text-primary tracking-wider">Shop</h4>
              <ul class="footer-link-list">
                <li><a href="#makeup" class="footer-link text-muted text-sm hover:text-primary transition-fast">Makeup Kits</a></li>
                <li><a href="#hair" class="footer-link text-muted text-sm hover:text-primary transition-fast">Hair Units</a></li>
                <li><a href="#bestsellers" class="footer-link text-muted text-sm hover:text-primary transition-fast">Best Sellers</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4 class="font-bold mb-4 uppercase text-sm text-primary tracking-wider">Customer Care</h4>
              <ul class="footer-link-list">
                <li>
                  <button
                    type="button"
                    class="policy-link-button footer-link text-muted text-sm hover:text-primary transition-fast"
                    data-policy-modal="shipping-policy-modal"
                  >
                    Shipping Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="policy-link-button footer-link text-muted text-sm hover:text-primary transition-fast"
                    data-policy-modal="refund-policy-modal"
                  >
                    Refund Policy
                  </button>
                </li>
                <li><a href="#" class="footer-link text-muted text-sm hover:text-primary transition-fast">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="shipping-policy-modal" class="policy-modal hidden" role="dialog" aria-modal="true" aria-labelledby="shipping-policy-title">
        <div class="policy-modal-backdrop" data-policy-close="shipping-policy-modal"></div>
        <div class="policy-modal-card">
          <button type="button" class="policy-modal-close" data-policy-close="shipping-policy-modal" aria-label="Close shipping policy">
            &times;
          </button>
          <h5 id="shipping-policy-title" class="font-bold text-primary mb-3 uppercase tracking-wider text-sm">
            Shipping Policy
          </h5>
          <p class="text-sm text-muted leading-relaxed mb-3">
            We offer local pickups on Saturdays from Nija Faith Salon.
          </p>
          <p class="text-sm text-muted leading-relaxed mb-3">
            Address: 903 Lake Lily Dr # A117, Maitland, FL 32751
          </p>
          <p class="text-sm text-muted leading-relaxed">
            Home delivery is available through USPS Ground. Shipments are mailed on Saturdays.
          </p>
        </div>
      </div>

      <div id="refund-policy-modal" class="policy-modal hidden" role="dialog" aria-modal="true" aria-labelledby="refund-policy-title">
        <div class="policy-modal-backdrop" data-policy-close="refund-policy-modal"></div>
        <div class="policy-modal-card">
          <button type="button" class="policy-modal-close" data-policy-close="refund-policy-modal" aria-label="Close refund policy">
            &times;
          </button>
          <h5 id="refund-policy-title" class="font-bold text-primary mb-3 uppercase tracking-wider text-sm">
            Refund Policy
          </h5>
          <p class="text-sm text-muted leading-relaxed mb-3">
            To protect product quality and hygiene standards, refunds are available only for items that are unopened, unused, and returned in their original condition.
          </p>
          <p class="text-sm text-muted leading-relaxed">
            If there is an issue with your product, including damage, defect, or an incorrect item, we will provide an exchange for the same item (subject to availability). Please contact us promptly so we can resolve it as quickly as possible.
          </p>
        </div>
      </div>
      
      <div class="container">
        <div class="footer-bottom text-sm text-muted">
          <p class="footer-copyright">&copy; ${new Date().getFullYear()} The Pink Principal. All rights reserved.</p>
          <div class="footer-legal-links">
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
    .footer-top {
      padding: 0 0 2.5rem 0;
    }
    .footer-top-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr) minmax(0, 0.75fr);
      gap: 3rem;
      align-items: start;
    }
    .footer-brand {
      padding-right: 2rem;
    }
    .footer-brand .logo {
      font-size: 1.75rem;
      margin-bottom: 0.75rem;
      letter-spacing: -0.03em;
    }
    .footer-brand p {
      max-width: 30rem;
      font-size: 0.98rem;
      line-height: 1.7;
    }
    .footer-col h4 {
      margin-bottom: 1rem;
    }
    .footer-link-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .footer-link {
      font-size: 0.95rem;
      opacity: 0.95;
    }
    .policy-link-button {
      background: transparent;
      border: none;
      padding: 0;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .policy-modal {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .policy-modal.hidden {
      display: none;
    }
    .policy-modal-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
    }
    .policy-modal-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 540px;
      background: #fff;
      border-radius: 0.75rem;
      border: 1px solid var(--color-border);
      padding: 1.25rem;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }
    .policy-modal-close {
      position: absolute;
      top: 0.5rem;
      right: 0.75rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      color: var(--color-text-muted);
      cursor: pointer;
    }
    .footer-bottom {
      border-top: 1px solid var(--color-border);
      padding-top: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .footer-copyright {
      margin: 0;
      font-size: 0.9rem;
    }
    .footer-legal-links {
      display: inline-flex;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.9rem;
    }
    @media (max-width: 900px) {
      .footer-top-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .footer-brand {
        padding-right: 0;
      }
      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
      .footer-legal-links {
        gap: 1rem;
      }
    }
  `;
  document.head.appendChild(style);

  const policyTriggers = container.querySelectorAll<HTMLButtonElement>('[data-policy-modal]');
  const closePolicyElements = container.querySelectorAll<HTMLElement>('[data-policy-close]');

  const closePolicyModal = (modalId: string) => {
    const modal = container.querySelector<HTMLElement>(`#${modalId}`);
    modal?.classList.add('hidden');
    document.body.style.overflow = '';
  };

  policyTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.dataset.policyModal;
      if (!modalId) return;
      const modal = container.querySelector<HTMLElement>(`#${modalId}`);
      modal?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  closePolicyElements.forEach((el) => {
    el.addEventListener('click', () => {
      const modalId = el.dataset.policyClose;
      if (!modalId) return;
      closePolicyModal(modalId);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openModal = container.querySelector<HTMLElement>('.policy-modal:not(.hidden)');
    if (!openModal?.id) return;
    closePolicyModal(openModal.id);
  });
}
