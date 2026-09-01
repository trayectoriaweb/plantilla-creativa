/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * Controladores: Carrusel Deslizable + Efecto Telón Rojo (Curtain Reveal) + Ventana "HABLEMOS"
 */

document.addEventListener('DOMContentLoaded', () => {
  initPanoramaSlider();
  initDraggableCarousel();
  initFloatingTalkWidget();
});

/* =========================================================================
   1. Slider de Fotografías Panorámicas (Serie Ultra-Wide de 5 Obras)
   ========================================================================= */
function initPanoramaSlider() {
  const track = document.getElementById('panoramaTrack');
  const slides = document.querySelectorAll('.panorama-slide');
  const prevBtn = document.getElementById('panoramaPrevBtn');
  const nextBtn = document.getElementById('panoramaNextBtn');
  const titleLabel = document.getElementById('panoramaTitleLabel');
  const descLabel = document.getElementById('panoramaDescLabel');
  const counterLabel = document.getElementById('panoramaCounterLabel');
  const viewport = document.getElementById('panoramaViewport');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;

  function updateSlide(index) {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    const activeSlide = slides[currentIndex];
    const title = activeSlide.getAttribute('data-title') || '';
    const desc = activeSlide.getAttribute('data-desc') || '';
    const num = String(currentIndex + 1).padStart(2, '0');
    const totalNum = String(total).padStart(2, '0');

    if (titleLabel) titleLabel.textContent = title;
    if (descLabel) descLabel.textContent = desc;
    if (counterLabel) counterLabel.textContent = `${num} / ${totalNum}`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }

  // Swipe táctil en móviles para la panorámica
  if (viewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        updateSlide(currentIndex + 1);
      } else if (touchEndX - touchStartX > 50) {
        updateSlide(currentIndex - 1);
      }
    }, { passive: true });
  }

  // Inicializar primera slide
  updateSlide(0);
}

/* =========================================================================
   2. Carrusel Deslizable Horizontal (Drag to Scroll con Mouse & Touch)
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
