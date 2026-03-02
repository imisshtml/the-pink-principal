export function renderHero(container: HTMLElement, imagePath: string) {
  container.innerHTML = `
    <section class="hero-section relative w-full flex items-center justify-center bg-surface-pink overflow-hidden">
      
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img src="${imagePath}" alt="The Pink Principal Collection" class="w-full h-full object-cover opacity-80" />
        <div class="absolute inset-0 bg-gradient-to-r from-surface-pink/90 to-transparent"></div>
      </div>
      
      <!-- Content Stack -->
      <div class="container relative z-10 py-16 md:py-32 flex flex-col items-start justify-center">
        <div class="hero-content max-w-lg fade-in">
          <h1 class="text-primary font-bold mb-4 uppercase tracking-tight slide-up" style="animation-delay: 100ms">
            Release Your Inner <br><span class="text-primary-dark">Royalty</span>
          </h1>
          <p class="text-muted text-lg mb-8 slide-up" style="animation-delay: 200ms">
            Discover our premium collection of highly-pigmented makeup kits and luxurious, raw hair units. Real Results. Real Remedy.
          </p>
          <div class="flex gap-4 slide-up" style="animation-delay: 300ms">
            <a href="#makeup" class="btn btn-primary">Shop Makeup</a>
            <a href="#hair" class="btn btn-outline bg-background/50 backdrop-blur-sm">Shop Hair</a>
          </div>
        </div>
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .hero-section {
      min-height: 80vh;
    }
    .absolute { position: absolute; }
    .relative { position: relative; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .z-0 { z-index: 0; }
    .z-10 { z-index: 10; }
    .object-cover { object-fit: cover; }
    .opacity-80 { opacity: 0.8; }
    .max-w-lg { max-width: 32rem; }
    .tracking-tight { letter-spacing: -0.025em; }
    .bg-gradient-to-r {
      background: linear-gradient(to right, rgba(255, 240, 245, 0.95), rgba(255, 240, 245, 0.4), transparent);
    }
    .backdrop-blur-sm { backdrop-filter: blur(4px); }
    .bg-background\\/50 { background-color: rgba(255, 255, 255, 0.5); }
    @media (max-width: 768px) {
      .bg-gradient-to-r {
        background: linear-gradient(to bottom, rgba(255, 240, 245, 0.9), rgba(255, 240, 245, 0.8));
      }
      .hero-content { text-align: center; margin: 0 auto; }
      .flex.gap-4 { justify-content: center; }
    }
  `;
  document.head.appendChild(style);
}
