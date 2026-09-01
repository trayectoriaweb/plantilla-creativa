/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL (ESTILO ÉLODIE MOREAU)
 * Controlador de Filtros y Navegación
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
});

/* =========================================================================
   Filtro Dinámico de Series / Obras
   ========================================================================= */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const countEl = document.querySelector('.series-count');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleCount = 0;

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (countEl) {
        countEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'serie' : 'series'}`;
      }
    });
  });
}
