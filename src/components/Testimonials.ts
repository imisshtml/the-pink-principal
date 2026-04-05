export function renderTestimonials(container: HTMLElement) {
  const testimonials = [
    {
      quote: "The Rose Gold Glow Kit is my absolute go-to. The pigment is insane and the gloss feels like luxury strictly. I'm obsessed.",
      author: "Jessica T.",
      handle: "@jessglows"
    },
    {
      quote: "Finally found hair units that don't look artificial. The raw Indian hair is so soft and holds curls perfectly. Worth every penny.",
      author: "Amanda K.",
      handle: "@beautybyamanda"
    },
    {
      id: 't1',
      author: 'Brianna M.',
      handle: '@briabeats',
      quote: "A perfectly curated beauty experience. The packaging, the branding, the actual product—everything screams premium Pink Principal.",
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    },
  ];

  const html = testimonials.map((t, index) => `
    <div class="bg-background border border-border rounded-xl p-8 shadow-sm hover:shadow-pink transition-all duration-norm slide-up" style="animation-delay: ${index * 150}ms">
      <div class="flex gap-1 text-primary mb-4">
        ${Array(5).fill('<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}
      </div>
      <p class="text-muted italic mb-6">"${t.quote}"</p>
      <div class="flex items-center gap-3 mt-auto">
        <div class="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
          ${t.author.charAt(0)}
        </div>
        <div>
          <h5 class="font-bold text-sm">${t.author}</h5>
          <span class="text-xs text-muted">${t.handle}</span>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <section class="testimonials-section py-24 bg-surface">
      <div class="container">
        <div class="text-center max-w-2xl mx-auto mb-16 scroll-reveal fade-in delay-slide">
          <h2 class="testimonials-title text-3xl font-bold uppercase tracking-tight text-primary mb-4">The Pink Principal Effect</h2>
          <p class="testimonials-copy text-muted">See how our community wears The Pink Principal, from everyday soft glam to full-on statement moments. This is beauty in real life. Made to be seen.</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          ${html}
        </div>
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .duration-norm { transition-duration: 300ms; }
    .hover\\:shadow-pink:hover {
      box-shadow: 0 10px 15px -3px rgba(255,51,102,0.1), 0 4px 6px -2px rgba(255,51,102,0.05);
      border-color: var(--color-primary-light);
      transform: translateY(-4px);
    }
    .rounded-xl { border-radius: 0.75rem; }
    .max-w-2xl { max-width: 42rem; }
    @media (max-width: 640px) {
      .testimonials-section {
        padding-top: 4rem;
        padding-bottom: 4rem;
      }
      .testimonials-title {
        font-size: 2.1rem;
      }
      .testimonials-copy {
        font-size: 0.95rem;
      }
    }
  `;
  document.head.appendChild(style);
}
