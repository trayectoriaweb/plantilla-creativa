/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * Controladores: Carrusel Deslizable + Efecto Telón Rojo (Curtain Reveal) + Ventana "HABLEMOS"
 */

document.addEventListener('DOMContentLoaded', () => {
  initDraggableCarousel();
  initCurtainRevealAnimation();
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
   2. Experiencia Unveil: Rectángulo Rojo Quieto + Información que sale por detrás
   ========================================================================= */
function initCurtainRevealAnimation() {
  const wrapper = document.querySelector('.unveil-stage-wrapper');
  const redPanel = document.querySelector('.unveil-red-panel');
  const tray = document.querySelector('.unveil-content-tray');
  const header = document.querySelector('.site-header');

  if (!wrapper || !redPanel || !tray) return;

  function calibrate() {
    const redH = redPanel.offsetHeight;
    const trayH = tray.offsetHeight;
    const headerH = header ? header.offsetHeight : 60;
    const winH = window.innerHeight;
    const visibleH = winH - headerH - redH;

    document.documentElement.style.setProperty('--red-panel-height', `${redH}px`);
    document.documentElement.style.setProperty('--tray-height', `${trayH}px`);

    // Altura del wrapper = espacio físico para que la bandeja emerja y se lea completa
    const scrollTravel = trayH + Math.max(0, trayH - visibleH) + 160;
    wrapper.style.height = `${winH + scrollTravel}px`;
  }

  calibrate();
  window.addEventListener('resize', calibrate, { passive: true });
  window.addEventListener('load', calibrate);
  if (document.fonts) document.fonts.ready.then(calibrate);

  let ticking = false;

  function updateUnveil() {
    const headerH = header ? header.offsetHeight : 60;
    const winH = window.innerHeight;
    const redH = redPanel.offsetHeight;
    const trayH = tray.offsetHeight;
    const visibleH = winH - headerH - redH;

    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperTop = wrapperRect.top - headerH;
    const wrapperH = wrapper.offsetHeight;
    const travel = wrapperH - (winH - headerH);

    if (travel <= 0) {
      ticking = false;
      return;
    }

    // scrolled: distancia recorrida desde que el marco se clava en el tope
    const scrolled = -wrapperTop;
    const progress = Math.min(Math.max(scrolled / travel, 0), 1);

    // Al inicio (0): la bandeja está 100% metida detrás del panel rojo
    const yStart = -trayH;
    // Al final (1): la bandeja bajó y se posiciona para que todo se lea cómodo
    const yEnd = -(Math.max(0, trayH - visibleH + 40));

    const currentY = yStart + progress * (yEnd - yStart);
    tray.style.transform = `translateY(${currentY.toFixed(1)}px)`;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateUnveil);
      ticking = true;
    }
  }, { passive: true });

  updateUnveil();
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
