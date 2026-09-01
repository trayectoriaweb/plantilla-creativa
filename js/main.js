/**
 * JULIÁN COSTA — PORTFOLIO EDITORIAL
 * JavaScript Controller & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initProjectModals();
  initLiveClock();
  initActiveNav();
});

/* ==========================================
   1. Datos de los Proyectos Destacados
   ========================================== */
const projectsData = {
  'nomade': {
    tag: 'Moda & Fotografía Editorial',
    title: 'Editorial Nómade',
    heroImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    desc: 'Editorial Nómade nace de la búsqueda de fusionar texturas textiles contemporáneas con la aridez y calidez lumínica de la hora dorada en exteriores. Una producción integral de 3 jornadas con estilismo vanguardista y dirección de arte orientada a medios de diseño.',
    client: 'Revista Nómade & Studio Vanguard',
    year: '2026',
    role: 'Dirección Fotográfica y Retoque',
    gallery: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'casa-m': {
    tag: 'Campaña de Marca & Arquitectura',
    title: 'Campaña Casa M',
    heroImg: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    desc: 'Dirección fotográfica para el lanzamiento del nuevo catálogo de Casa M, firma de diseño de mobiliario y arquitectura de autor. El objetivo fue resaltar la nobleza de los materiales, los juegos de sombras arquitectónicas y la calidez espacial.',
    client: 'Casa M Arquitectura',
    year: '2025 / 2026',
    role: 'Fotografía de Espacios & Producto',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'retratos': {
    tag: 'Estudio & Retratos Cinematográficos',
    title: 'Retratos — Colección 2026',
    heroImg: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    desc: 'Una serie continua de retratos individuales en estudio, explorando la relación entre el sujeto y los esquemas de iluminación de un solo punto y claroscuro cinematográfico. Una búsqueda de verdad gestual y carácter.',
    client: 'Serie Autoral',
    year: '2026',
    role: 'Iluminación y Producción de Estudio',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'festival-sur': {
    tag: 'Eventos Culturales & Cobertura en Vivo',
    title: 'Festival Sur',
    heroImg: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    desc: 'Cobertura fotográfica oficial del Festival Sur, capturando la energía de los escenarios principales, el público, momentos de backstage íntimos y la atmósfera nocturna del encuentro cultural más convocante de la región.',
    client: 'Producción Festival Sur',
    year: '2025',
    role: 'Fotografía Documental & Cobertura Live',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ]
  }
};

/* ==========================================
   2. Modal de Detalle de Proyectos
   ========================================== */
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const workCards = document.querySelectorAll('.work-card');

  if (!modal || !modalContent) return;

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-inner-header">
        <img src="${data.heroImg}" alt="${data.title}" class="modal-inner-img" />
      </div>
      <div class="modal-inner-body">
        <span class="modal-tag">${data.tag}</span>
        <h3 class="modal-project-title">${data.title}</h3>
        <p class="modal-project-desc">${data.desc}</p>
        
        <div class="modal-meta-grid">
          <div class="meta-col">
            <span class="meta-title">Cliente</span>
            <span class="meta-data">${data.client}</span>
          </div>
          <div class="meta-col">
            <span class="meta-title">Año</span>
            <span class="meta-data">${data.year}</span>
          </div>
          <div class="meta-col">
            <span class="meta-title">Rol</span>
            <span class="meta-data">${data.role}</span>
          </div>
        </div>

        <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 14px; font-weight: 700;">Tomas adicionales de la serie:</h4>
        <div class="modal-gallery-preview">
          ${data.gallery.map(imgUrl => `<img src="${imgUrl}" alt="Foto adicional de ${data.title}" loading="lazy" />`).join('')}
        </div>

        <div class="modal-cta-row">
          <a href="https://wa.me/5493410000000?text=Hola%20Julián,%20vi%20tu%20proyecto%20'${encodeURIComponent(data.title)}'%20y%20me%20gustaría%20hacer%20algo%20similar." target="_blank" class="btn-primary-whatsapp" style="font-size: 0.95rem; padding: 12px 24px;">
            <span>Consultar por un proyecto similar →</span>
          </a>
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================
   3. Menú Móvil
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================
   4. Reloj en Tiempo Real (Rosario, Argentina GMT-3)
   ========================================== */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function updateClock() {
    try {
      const options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      clockEl.textContent = formatter.format(new Date());
    } catch (e) {
      const now = new Date();
      clockEl.textContent = now.toTimeString().substring(0, 5);
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================
   5. Active Nav Highlight on Scroll
   ========================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
