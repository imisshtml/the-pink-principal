import './styles/style.css'
import { renderHeader } from './components/Header.ts'
import { renderFooter } from './components/Footer.ts'
import { renderHero } from './components/Hero.ts'
import { renderProductCarousel } from './components/ProductCarousel.ts'
import { fetchAllProducts } from './shopify.ts'
import type { ShopifyProduct } from './shopify.ts'
import { renderAbout } from './components/About.ts'
import { renderTestimonials } from './components/Testimonials.ts'
import { renderCartDrawer } from './components/CartDrawer.ts'
import { renderShopPage } from './pages/Shop.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app-shell flex flex-col min-h-screen">
    <header id="header-container"></header>
    <main id="main-content" class="flex-1 flex flex-col">
    </main>
    <footer id="footer-container"></footer>
    <div id="cart-drawer-container"></div>
  </div>
`

function renderFatalError(message: string) {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;
  app.innerHTML = `
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:#fff0f5;color:#cc0044;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:760px;width:100%;background:#fff;border:1px solid #ffd6e0;border-radius:12px;padding:1rem 1.25rem;box-shadow:0 10px 30px rgba(255,51,102,0.12);">
        <h2 style="margin:0 0 .5rem 0;font-size:1.1rem;">App startup error</h2>
        <pre style="white-space:pre-wrap;word-break:break-word;margin:0;font-size:.9rem;line-height:1.5;">${message}</pre>
      </div>
    </div>
  `;
}

function formatError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

// Inject static layout components
renderHeader(document.getElementById('header-container')!)
renderFooter(document.getElementById('footer-container')!)
renderCartDrawer(document.getElementById('cart-drawer-container')!)

const mainContent = document.getElementById('main-content')!;

const hairMockProducts: ShopifyProduct[] = [
  {
    id: 'mock-hair-1',
    variantId: '',
    title: 'Raw Body Wave Unit',
    price: 299,
    compareAtPrice: 349,
    image: '/images/hair_category_1772433319731.png',
    images: ['/images/hair_category_1772433319731.png'],
    productType: 'hair',
    handle: 'raw-body-wave-unit-mock',
    description: 'Mock hair product while hair collection is being finalized.',
    variants: []
  },
  {
    id: 'mock-hair-2',
    variantId: '',
    title: 'Raw Straight Lace Unit',
    price: 319,
    compareAtPrice: 369,
    image: '/images/hair_category_1772433319731.png',
    images: ['/images/hair_category_1772433319731.png'],
    productType: 'hair',
    handle: 'raw-straight-lace-unit-mock',
    description: 'Mock hair product while hair collection is being finalized.',
    variants: []
  }
];

// Basic Hash Router
async function router() {
  const hash = window.location.hash;
  mainContent.innerHTML = '';
  window.scrollTo(0, 0);

  if (hash === '#shop' || hash === '#makeup' || hash === '#hair') {
    const category = hash === '#shop' ? 'all' : hash.replace('#', '');
    renderShopPage(mainContent, category);
  } else {
    // Render Homepage
    mainContent.innerHTML = `
      <div id="hero-container"></div>
      <div id="categories-container"></div>
      <div id="makeup-products-container">
        <div class="py-20 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
      </div>
      <div id="hair-products-container">
        <div class="py-20 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
      </div>
      <div id="about-container"></div>
      <div id="testimonials-container"></div>
    `;

    renderHero(document.getElementById('hero-container')!)
    // Category cards intentionally hidden for this layout revision.

    // Featured products on home:
    // primary section = Makeup (live Shopify), secondary = Hair (Coming Soon).
    const products = await fetchAllProducts();
    const makeupProducts = products
      .filter((product) => product.productType !== 'hair')
      .slice(0, 8);
    renderProductCarousel(
      document.getElementById('makeup-products-container')!,
      'Makeup',
      makeupProducts
    )
    renderProductCarousel(
      document.getElementById('hair-products-container')!,
      'Hair (Coming Soon)',
      hairMockProducts
    )
    
    renderAbout(document.getElementById('about-container')!)
    renderTestimonials(document.getElementById('testimonials-container')!)
  }

  // Initialize scroll animations after render
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
}

window.addEventListener('error', (event) => {
  renderFatalError(formatError(event.error || event.message));
});

window.addEventListener('unhandledrejection', (event) => {
  renderFatalError(formatError(event.reason));
});

window.addEventListener('hashchange', () => {
  router().catch((error) => {
    console.error('Router error:', error);
    renderFatalError(formatError(error));
  });
});

router().catch((error) => {
  console.error('Initial route render error:', error);
  renderFatalError(formatError(error));
});

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Unobserve once animated to keep it visible
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Utility function to initialize scroll observers
export function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .delayed-slide');
  elements.forEach(el => observer.observe(el));
}
