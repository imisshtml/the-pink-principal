export function renderAbout(container: HTMLElement) {
  container.innerHTML = `
    <section class="about-section py-24 bg-surface-pink">
      <div class="container relative">
        <div class="glass about-card max-w-3xl mx-auto p-8 md:p-16 rounded-2xl text-center shadow-lg relative z-10 slide-up border border-background">
          <h2 class="text-primary font-bold mb-6 text-3xl">The Story of <br class="md:hidden">The Pink Principal</h2>
          <p class="about-copy text-muted text-lg leading-relaxed mb-8">
            We believe that everyone should have access to high-quality beauty essentials that are practical, 
            luxurious, and entirely empowering. Our passion is to inspire individuals to build their self-love 
            through self-care, providing carefully curated makeup kits and premium raw hair units that elevate 
            your everyday look into something royal.
          </p>
          <a href="#" class="font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest text-sm border-b-2 border-primary pb-1">
            Read Our Full Story
          </a>
        </div>
        
        <!-- Decorative Elements -->
        <div class="absolute -top-12 -left-12 w-48 h-48 bg-primary opacity-10 rounded-full blur-3xl z-0"></div>
        <div class="absolute -bottom-12 -right-12 w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl z-0"></div>
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .mx-auto { margin-left: auto; margin-right: auto; }
    .max-w-3xl { max-width: 48rem; }
    .rounded-2xl { border-radius: 1rem; }
    .leading-relaxed { line-height: 1.625; }
    .tracking-widest { letter-spacing: 0.1em; }
    .border-b-2 { border-bottom-width: 2px; border-bottom-style: solid; }
    .pb-1 { padding-bottom: 0.25rem; }
    .blur-3xl { filter: blur(64px); }
    .-top-12 { top: -3rem; }
    .-left-12 { left: -3rem; }
    .-bottom-12 { bottom: -3rem; }
    .-right-12 { right: -3rem; }
    .w-48 { width: 12rem; }
    .h-48 { height: 12rem; }
    .w-64 { width: 16rem; }
    .h-64 { height: 16rem; }
    .opacity-10 { opacity: 0.1; }
    .p-8 { padding: 2rem; }
    .about-section {
      overflow-x: clip;
    }
    @media (max-width: 640px) {
      .about-section {
        padding-top: 4rem;
        padding-bottom: 4rem;
      }
      .about-card {
        padding: 1.5rem;
      }
      .about-card h2 {
        font-size: 2.15rem;
      }
      .about-copy {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }
    }
    @media (min-width: 768px) {
      .md\\:p-16 { padding: 4rem; }
    }
  `;
  document.head.appendChild(style);
}
