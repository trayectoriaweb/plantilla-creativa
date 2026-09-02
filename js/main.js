/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * Controladores: Carrusel Deslizable + Efecto Telón Rojo (Curtain Reveal) + Ventana "HABLEMOS"
 */

document.addEventListener('DOMContentLoaded', () => {
  initPanoramaSlider();
  initDraggableCarousel();
  initFloatingTalkWidget();
  initScrollReveal();
  initImageTrail();
  initMobileMenu();
  initFloatingWidgetVisibility();
});

/* =========================================================================
   1. Secuencia Panorámica Rápida (Corte Secuencial de Golpe cada 1s)
   ========================================================================= */
function initPanoramaSlider() {
  const slides = document.querySelectorAll('.panorama-slide');
  const prevBtn = document.getElementById('panoramaPrevBtn');
  const nextBtn = document.getElementById('panoramaNextBtn');
  const titleLabel = document.getElementById('panoramaTitleLabel');
  const descLabel = document.getElementById('panoramaDescLabel');
  const counterLabel = document.getElementById('panoramaCounterLabel');
  const viewport = document.getElementById('panoramaViewport');

  if (slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;
  let intervalId = null;

  function showSlide(index) {
    currentIndex = (index + total) % total;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    const activeSlide = slides[currentIndex];
    const title = activeSlide.getAttribute('data-title') || '';
    const desc = activeSlide.getAttribute('data-desc') || '';
    const num = String(currentIndex + 1).padStart(2, '0');
    const totalNum = String(total).padStart(2, '0');

    if (titleLabel) titleLabel.textContent = title;
    if (descLabel) descLabel.textContent = desc;
    if (counterLabel) counterLabel.textContent = `${num} / ${totalNum}`;
  }

  function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 1000); // Salto instantáneo cada 1 segundo (1000ms)
  }

  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  // Swipe táctil en móviles
  if (viewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        showSlide(currentIndex + 1);
        startAutoplay();
      } else if (touchEndX - touchStartX > 50) {
        showSlide(currentIndex - 1);
        startAutoplay();
      }
    }, { passive: true });
  }

  // Arrancar inmediatamente
  showSlide(0);
  startAutoplay();
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
  const inputType = document.getElementById('talkType');

  if (!btnOpen || !panel) return;

  function openPanel(prefillService = '') {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    if (backdrop) backdrop.classList.add('open');

    if (prefillService && inputType) {
      inputType.value = prefillService;
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

  const btnMail = document.getElementById('btnSendMail');
  const btnWa = document.getElementById('btnSendWhatsapp');

  function getFormData() {
    const name = document.getElementById('talkName')?.value.trim() || '';
    const email = document.getElementById('talkEmail')?.value.trim() || '';
    const type = document.getElementById('talkType')?.value.trim() || 'Fotografía';
    const message = document.getElementById('talkMessage')?.value.trim() || '';
    return { name, email, type, message };
  }

  btnWa?.addEventListener('click', () => {
    const { name, email, type, message } = getFormData();
    if (!name || !message) {
      if (!name) document.getElementById('talkName')?.focus();
      else document.getElementById('talkMessage')?.focus();
      return;
    }
    const text = encodeURIComponent(
      `Hola Julián, mi nombre es ${name}${email ? ' (' + email + ')' : ''}. Te escribo para consultar por un proyecto de ${type}:\n\n"${message}"`
    );
    window.open(`https://wa.me/5493410000000?text=${text}`, '_blank');
    form.reset();
    closePanel();
  });

  btnMail?.addEventListener('click', () => {
    const { name, email, type, message } = getFormData();
    if (!name || !message) {
      if (!name) document.getElementById('talkName')?.focus();
      else document.getElementById('talkMessage')?.focus();
      return;
    }
    const subject = encodeURIComponent(`Consulta de Proyecto: ${type} - ${name}`);
    const body = encodeURIComponent(
      `Hola Julián,\n\nMi nombre es ${name}.\nEmail de contacto: ${email}\nTipo de proyecto: ${type}\n\nMensaje:\n${message}\n\nEnviado desde portfolio editorial.`
    );
    window.location.href = `mailto:contacto@juliancosta.com?subject=${subject}&body=${body}`;
    form.reset();
    closePanel();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

/* =========================================================================
   3. Animación de Entrada Suave (Scroll Reveal con IntersectionObserver)
   ========================================================================= */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el) => observer.observe(el));
}

/* =========================================================================
   4. Rastro de Imágenes Interactivo con Cursor (Image Trail)
   ========================================================================= */
function initImageTrail() {
  const canvas = document.getElementById('canvasTrail');
  const container = document.getElementById('trailContainer');
  if (!canvas || !container) return;

  const images = [
    'img/obra1.webp',
    'img/obra2.webp',
    'img/obra3.webp',
    'img/obra4.webp',
    'img/obra5.webp',
    'img/obra6.webp',
    'img/obra7.webp'
  ];

  let currentIndex = 0;
  let lastX = -9999;
  let lastY = -9999;
  const minDistance = 65; // Distancia mínima en píxeles de movimiento para spawnear
  let zCounter = 10;

  const sizePalette = [150, 240, 175, 290, 140, 220, 260, 190];
  let sizeIndex = 0;

  function spawnImage(x, y) {
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.alt = 'Fotografía de archivo';
    img.className = 'trail-image-item';

    // Tamaño variable único por imagen
    const isMobile = window.innerWidth <= 768;
    const baseSize = sizePalette[sizeIndex % sizePalette.length];
    const finalSize = isMobile ? Math.round(baseSize * 0.65) : baseSize;
    sizeIndex++;

    img.style.width = `${finalSize}px`;
    img.style.height = `${finalSize}px`;

    // Rotación sutil aleatoria (-6deg a 6deg) para sensación de collage editorial
    const randomRot = (Math.random() * 12 - 6).toFixed(1) + 'deg';
    img.style.setProperty('--rot', randomRot);

    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = ++zCounter;

    container.appendChild(img);
    currentIndex = (currentIndex + 1) % images.length;

    // Desvanecer después de 1.2s y remover limpiamente del DOM
    setTimeout(() => {
      img.classList.add('fading');
      setTimeout(() => {
        if (img.parentNode) {
          img.remove();
        }
      }, 700);
    }, 1200);
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist > minDistance) {
      lastX = x;
      lastY = y;
      spawnImage(x, y);
    }
  });

  // Soporte para dispositivos táctiles (Touch)
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > minDistance) {
        lastX = x;
        lastY = y;
        spawnImage(x, y);
      }
    }
  }, { passive: true });
}

/* =========================================================================
   5. Menú Hamburguesa & Navegación Móvil
   ========================================================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileNavOverlay');
  const links = document.querySelectorAll('.mobile-nav-link');
  const talkBtn = document.querySelector('.mobile-talk-btn');

  if (!toggleBtn || !overlay) return;

  function toggleMenu() {
    const isOpen = overlay.classList.toggle('is-open');
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  talkBtn?.addEventListener('click', () => {
    closeMenu();
  });
}

/* =========================================================================
   6. Ocultar Widget Flotante al Llegar al Bloque de Contacto / Footer
   ========================================================================= */
function initFloatingWidgetVisibility() {
  const widget = document.getElementById('floatingTalkWidget');
  const contactSection = document.getElementById('contacto');

  if (!widget || !contactSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        widget.classList.add('is-hidden');
      } else {
        widget.classList.remove('is-hidden');
      }
    });
  }, {
    threshold: 0.12
  });

  observer.observe(contactSection);
}
