/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * Controladores: Ventana Flotante "HABLEMOS" + Filtros de Obras
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initFloatingTalkWidget();
});

/* =========================================================================
   1. Filtro Dinámico de Series
   ========================================================================= */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const countEl = document.querySelector('.series-count');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

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
        countEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'SERIE' : 'SERIES'}`;
      }
    });
  });
}

/* =========================================================================
   2. Ventana Flotante Rectangular "HABLEMOS"
   ========================================================================= */
function initFloatingTalkWidget() {
  const btnOpen = document.getElementById('btnOpenTalkModal');
  const btnClose = document.getElementById('btnCloseTalkModal');
  const panel = document.getElementById('floatingTalkPanel');
  const backdrop = document.getElementById('talkBackdrop');
  const form = document.getElementById('contactTalkForm');
  const extraTriggers = document.querySelectorAll('.open-talk-trigger');
  const selectType = document.getElementById('talkType');

  if (!btnOpen || !panel) return;

  function openPanel(prefillService = '') {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('open');

    if (prefillService && selectType) {
      for (let i = 0; i < selectType.options.length; i++) {
        if (selectType.options[i].text.toLowerCase().includes(prefillService.toLowerCase())) {
          selectType.selectedIndex = i;
          break;
        }
      }
    }

    const firstInput = document.getElementById('talkName');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }

  function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    if (backdrop) backdrop.classList.remove('open');
  }

  btnOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      openPanel();
    }
  });

  btnClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closePanel();
  });

  backdrop?.addEventListener('click', closePanel);

  // Triggers adicionales en la web
  extraTriggers.forEach(t => {
    t.addEventListener('click', () => {
      const service = t.getAttribute('data-service') || '';
      openPanel(service);
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closePanel();
    }
  });

  // Envío del formulario
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('talkName')?.value || '';
    const email = document.getElementById('talkEmail')?.value || '';
    const type = document.getElementById('talkType')?.value || '';
    const message = document.getElementById('talkMessage')?.value || '';

    // Enviar a WhatsApp preconfigurado
    const text = encodeURIComponent(
      `Hola Julián, mi nombre es ${name} (${email}). Te escribo para consultar por un proyecto de ${type}:\n\n"${message}"`
    );
    const waUrl = `https://wa.me/5493410000000?text=${text}`;

    window.open(waUrl, '_blank');

    alert(`¡Gracias ${name}! Tu consulta fue preparada para enviar.`);
    form.reset();
    closePanel();
  });
}
