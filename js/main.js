/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * Controladores: Carrusel Deslizable Horizontal (Drag-to-Scroll) + Parallax de Sobre Mí + Ventana "HABLEMOS"
 */

document.addEventListener('DOMContentLoaded', () => {
  initDraggableCarousel();
  initScrollParallax();
  initFloatingTalkWidget();
});

/* =========================================================================
   1. Carrusel Deslizable Horizontal (Drag to Scroll con Mouse & Touch)
   ========================================================================= */
function initDraggableCarousel() {
  const viewport = document.getElementById('worksCarouselViewport');
  const track = document.getElementById('worksCarouselTrack');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.carousel-card');

  if (!viewport || !track) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  viewport.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    viewport.classList.add('is-dragging');
    startX = e.pageX - viewport.offsetLeft;
    scrollLeft = viewport.scrollLeft;
  });

  viewport.addEventListener('mouseleave', () => {
    isDown = false;
    viewport.classList.remove('is-dragging');
  });

  viewport.addEventListener('mouseup', () => {
    isDown = false;
    viewport.classList.remove('is-dragging');
  });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.8;
    viewport.scrollLeft = scrollLeft - walk;
  });

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });

      viewport.scrollTo({ left: 0, behavior: 'smooth' });
    });
  });
}

/* =========================================================================
   2. Efecto de Movimiento Parallax al Scrollear (Sobre Mí Naranja)
   ========================================================================= */
function initScrollParallax() {
  const quoteWrapper = document.getElementById('orangeParallaxQuote');
  const section = document.getElementById('sobre-mi');

  if (!quoteWrapper || !section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = (progress - 0.5) * 60; // Desplazamiento suave hacia abajo
      quoteWrapper.style.transform = `translateY(${translateY}px)`;
    }
  }, { passive: true });
}

/* =========================================================================
   3. Ventana Flotante Rectangular "HABLEMOS"
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

  extraTriggers.forEach(t => {
    t.addEventListener('click', () => {
      const service = t.getAttribute('data-service') || '';
      openPanel(service);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closePanel();
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('talkName')?.value || '';
    const email = document.getElementById('talkEmail')?.value || '';
    const type = document.getElementById('talkType')?.value || '';
    const message = document.getElementById('talkMessage')?.value || '';

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
