import headerImage from '../assets/header.png';

export function renderHero(container: HTMLElement) {
  container.innerHTML = `
    <section class="hero-section hero-fullbleed">
      
      <!-- Background Image -->
      <div class="hero-image-layer">
        <img src="${headerImage}" alt="The Pink Principal - Makeup & Hair" class="hero-image" />
        <!-- Subtle gradient at the bottom for button visibility -->
        <div class="hero-gradient"></div>
      </div>
      
      <!-- Content Stack (Just CTAs at the bottom now) -->
      <div class="hero-content-wrap container">
        <div class="hero-content flex gap-4 slide-up" style="animation-delay: 300ms">
          <a href="#makeup" class="btn btn-primary shadow-pink hero-cta font-bold">Shop Makeup</a>
          <a href="#hair" class="btn btn-outline bg-background/80 backdrop-blur-sm hero-cta font-bold border-2">Shop Hair</a>
        </div>
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .hero-section {
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
      background: var(--color-surface-pink);
      min-height: clamp(420px, 72vh, 900px);
    }
    .hero-fullbleed {
      width: 100%;
      max-width: 1800px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-image-layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .hero-gradient {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 8rem;
      background: linear-gradient(to top, var(--color-surface-pink), transparent);
    }
    .hero-content-wrap {
      position: relative;
      z-index: 1;
      width: 100%;
      min-height: inherit;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-top: 3rem;
      padding-bottom: 2rem;
    }
    .hero-content {
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
    }
    .hero-cta {
      min-width: 132px;
      padding: 0.7rem 1.1rem;
      font-size: 0.95rem;
    }
    @media (max-width: 640px) {
      .hero-section {
        min-height: 62vh;
      }
      .hero-content-wrap {
        padding-top: 2rem;
        padding-bottom: 1.25rem;
      }
      .hero-content {
        gap: 0.75rem;
      }
      .hero-cta {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 0.9rem;
        padding: 0.65rem 0.8rem;
      }
    }
  `;
  document.head.appendChild(style);

}
