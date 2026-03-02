import './styles/style.css'
import { renderHeader } from './components/Header.ts'
import { renderFooter } from './components/Footer.ts'
import { renderHero } from './components/Hero.ts'
import { renderCategoryCards } from './components/CategoryCards.ts'
import { renderProductCarousel } from './components/ProductCarousel.ts'
import { mockProducts } from './data/mockProducts.ts'
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

// Inject static layout components
renderHeader(document.getElementById('header-container')!)
renderFooter(document.getElementById('footer-container')!)
renderCartDrawer(document.getElementById('cart-drawer-container')!)

const mainContent = document.getElementById('main-content')!;

// Basic Hash Router
function router() {
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
      <div id="featured-products-container"></div>
      <div id="about-container"></div>
      <div id="testimonials-container"></div>
    `;

    renderHero(document.getElementById('hero-container')!, '/images/hero_banner_1772433292440.png')
    const categories = [
      { title: 'Makeup Kits', image: '/images/makeup_category_1772433307003.png', link: '#makeup' },
      { title: 'Raw Hair Units', image: '/images/hair_category_1772433319731.png', link: '#hair' }
    ]
    renderCategoryCards(document.getElementById('categories-container')!, categories)
    renderProductCarousel(document.getElementById('featured-products-container')!, "Ari's Top Picks", mockProducts)
    renderAbout(document.getElementById('about-container')!)
    renderTestimonials(document.getElementById('testimonials-container')!)
  }
}

window.addEventListener('hashchange', router);
router(); // initial load

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

// Intercept routing to re-initialize observers
const originalRouter = router;
// @ts-ignore - overriding internal router function
window.router = function () {
  originalRouter();
  setTimeout(() => {
    initScrollAnimations();
  }, 50);
};
// Setup event listener to use the new router
window.removeEventListener('hashchange', originalRouter);
window.addEventListener('hashchange', (window as any).router);

// Initial initialization
setTimeout(() => {
  initScrollAnimations();
}, 50);

