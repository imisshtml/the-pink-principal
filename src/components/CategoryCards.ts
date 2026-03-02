export function renderCategoryCards(container: HTMLElement, categories: { title: string, image: string, link: string }[]) {
  const cardsHtml = categories.map((cat, index) => `
    <a href="${cat.link}" class="category-card group relative block overflow-hidden rounded-lg shadow-md slide-up" style="animation-delay: ${index * 150}ms">
      <div class="aspect-w-4 aspect-h-5 w-full">
        <img src="${cat.image}" alt="${cat.title}" class="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
        <h3 class="text-text-inverse font-bold text-2xl group-hover:text-primary transition-colors">${cat.title}</h3>
        <span class="text-text-inverse text-sm font-medium mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          Shop Collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </span>
      </div>
    </a>
  `).join('');

  container.innerHTML = `
    <section class="py-16 container">
      <div class="grid md:grid-cols-2 gap-8">
        ${cardsHtml}
      </div>
    </section>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .category-card {
      border-radius: var(--border-radius-lg);
    }
    .aspect-w-4 { position: relative; padding-bottom: 125%; }
    .aspect-w-4 img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    .group:hover .group-hover\\:scale-105 { transform: scale(1.05); }
    .group:hover .group-hover\\:text-primary { color: var(--color-primary); }
    .group:hover .group-hover\\:opacity-100 { opacity: 1; }
    .group:hover .group-hover\\:translate-y-0 { transform: translateY(0); }
    .transition-transform { transition-property: transform; }
    .transition-colors { transition-property: color; }
    .transition-opacity { transition-property: opacity; }
    .duration-slow { transition-duration: 500ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
    .bg-gradient-to-t { background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); }
    .opacity-0 { opacity: 0; }
    .translate-y-2 { transform: translateY(0.5rem); }
  `;
  document.head.appendChild(style);
}
