/**
 * JULIÁN COSTA — PROYECTO DETALLE
 * Controlador dinámico para renderizar proyectos y galería completa
 */

const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'luz-a-traves-del-cristal',
    category: 'Retratos',
    date: 'Julio 2026',
    title: 'Luz a través del Cristal',
    description: 'Retrato contemplativo con reflejos tenues de la arquitectura urbana fundidos suavemente sobre el rostro. Un diálogo entre la intimidad del sujeto y la ciudad exterior.',
    mainImage: 'img/obra2.webp',
    alt: 'Luz a través del Cristal — Retrato',
    gallery: [
      { src: 'img/projects/la-luz-a-traves-del-cristal-01.webp', title: 'Reflejo Urbano I', tag: 'Retratos', span: 'col-span-2' },
      { src: 'img/projects/la-luz-a-traves-del-cristal-02.webp', title: 'Reflejo Urbano II', tag: 'Retratos', span: 'col-span-1' },
      { src: 'img/projects/la-luz-a-traves-del-cristal-03.webp', title: 'Reflejo Urbano III', tag: 'Retratos', span: 'col-span-1' },
      { src: 'img/projects/la-luz-a-traves-del-cristal-04.webp', title: 'Reflejo Urbano IV', tag: 'Retratos', span: 'col-span-2' },
      { src: 'img/projects/la-luz-a-traves-del-cristal-05.webp', title: 'Reflejo Urbano V', tag: 'Retratos', span: 'col-span-1' },
      { src: 'img/projects/la-luz-a-traves-del-cristal-06.webp', title: 'Reflejo Urbano VI', tag: 'Retratos', span: 'col-span-1' }
    ]
  },
  {
    id: 2,
    slug: 'tailoring-oversized',
    category: 'Moda',
    date: 'Junio 2026',
    title: 'Tailoring Oversized',
    description: 'Sastrería contemporánea sobre cuerpo femenino, pose descontracturada y juego de luces duras contra azulejos. Una exploración visual de textura, volumen y actitud.',
    mainImage: 'img/obra3.webp',
    alt: 'Tailoring Oversized — Moda',
    gallery: [
      { src: 'img/projects/tailoring-oversized-07.webp', title: 'Silueta & Corte I', tag: 'Moda', span: 'col-span-2' },
      { src: 'img/projects/tailoring-oversized-08.webp', title: 'Silueta & Corte II', tag: 'Moda', span: 'col-span-1' },
      { src: 'img/projects/tailoring-oversized-09.webp', title: 'Silueta & Corte III', tag: 'Moda', span: 'col-span-1' }
    ]
  },
  {
    id: 3,
    slug: 'texturas-y-perfil',
    category: 'Moda',
    date: 'Mayo 2026',
    title: 'Texturas & Perfil',
    description: 'Encuadre cerrado de moda. Cuello de lana gruesa y vinilo brillante donde la luz lateral modela el tejido sobre fondo neutro, resaltando el perfil y los relieves materiales.',
    mainImage: 'img/obra6.webp',
    alt: 'Texturas & Perfil — Moda',
    gallery: [
      { src: 'img/projects/texturas-y-perfil-10.webp', title: 'Detalle Textil I', tag: 'Moda', span: 'col-span-2' },
      { src: 'img/projects/texturas-y-perfil-11.webp', title: 'Detalle Textil II', tag: 'Moda', span: 'col-span-1' },
      { src: 'img/projects/texturas-y-perfil-12.webp', title: 'Detalle Textil III', tag: 'Moda', span: 'col-span-1' }
    ]
  },
  {
    id: 4,
    slug: 'after-party-de-galeria',
    category: 'Eventos',
    date: 'Abril 2026',
    title: 'After-Party de Galería',
    description: 'Atmósfera documental en penumbra, copas, risas espontáneas y luz puntual de tungsteno cálida durante la noche de inauguración en un espacio de arte.',
    mainImage: 'img/obra4.webp',
    alt: 'After-Party de Galería — Eventos',
    gallery: [
      { src: 'img/projects/after-party-y-galeria-13.webp', title: 'Crónica Nocturna I', tag: 'Eventos', span: 'col-span-2' },
      { src: 'img/projects/after-party-y-galeria-14.webp', title: 'Crónica Nocturna II', tag: 'Eventos', span: 'col-span-1' },
      { src: 'img/projects/after-party-y-galeria-15.webp', title: 'Crónica Nocturna III', tag: 'Eventos', span: 'col-span-1' },
      { src: 'img/projects/after-party-y-galeria-16.webp', title: 'Crónica Nocturna IV', tag: 'Eventos', span: 'col-span-2' }
    ]
  },
  {
    id: 5,
    slug: 'silla-y-silencio',
    category: 'Arquitectura / Interiores',
    date: 'Marzo 2026',
    title: 'Silla & Silencio',
    description: 'Composición minimalista de interior. El sillón tubular de cuero y el haz de luz solar sobre el parquet crean un espacio de calma, explorando la relación entre geometría, sombra y materiales nobles.',
    mainImage: 'img/obra1.webp',
    alt: 'Silla & Silencio — Interiorismo y Arquitectura',
    gallery: []
  },
  {
    id: 6,
    slug: 'geometria-y-sombra',
    category: 'Arquitectura',
    date: 'Febrero 2026',
    title: 'Geometría & Sombra',
    description: 'Fachada contemporánea en hormigón visto y cristal cortada por una sombra diagonal escultórica. Un estudio sobre la pureza de las líneas arquitectónicas y el paso del sol.',
    mainImage: 'img/obra5.webp',
    alt: 'Geometría & Sombra — Arquitectura',
    gallery: []
  },
  {
    id: 7,
    slug: 'primer-plano-directo',
    category: 'Retratos',
    date: 'Noviembre 2025',
    title: 'Primer Plano Directo',
    description: 'Retrato frontal con flash nítido, textura de piel real sin artificios, mirada penetrante y honestidad gestual. Captura directa sin filtros ni retoques superfluos.',
    mainImage: 'img/obra7.webp',
    alt: 'Primer Plano Directo — Retrato',
    gallery: []
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
});

function renderProjectDetail() {
  const params = new URLSearchParams(window.location.search);
  let idParam = parseInt(params.get('id'), 10);
  
  if (isNaN(idParam) || idParam < 1 || idParam > PROJECTS_DATA.length) {
    idParam = 1;
  }

  const currentProject = PROJECTS_DATA.find(p => p.id === idParam) || PROJECTS_DATA[0];

  // Actualizar Título de pestaña
  document.title = currentProject.title + ' — Julián Costa · Fotógrafo';

  // Elementos DOM
  const catDateEl = document.getElementById('projectCategoryDate');
  const titleEl = document.getElementById('projectTitle');
  const descEl = document.getElementById('projectDescription');
  const featuredImgEl = document.getElementById('projectFeaturedImg');
  const gridEl = document.getElementById('projectMosaicGrid');
  const countLabel = document.getElementById('galleryCountLabel');
  const gallerySection = document.querySelector('.project-archive-gallery-section');

  if (catDateEl) catDateEl.textContent = currentProject.category + ' · ' + currentProject.date;
  if (titleEl) titleEl.textContent = currentProject.title;
  if (descEl) descEl.textContent = currentProject.description;
  if (featuredImgEl) {
    featuredImgEl.src = currentProject.mainImage;
    featuredImgEl.alt = currentProject.alt;
  }

  // Paginación anterior / siguiente
  const prevId = idParam === 1 ? PROJECTS_DATA.length : idParam - 1;
  const nextId = idParam === PROJECTS_DATA.length ? 1 : idParam + 1;

  const prevProject = PROJECTS_DATA.find(p => p.id === prevId);
  const nextProject = PROJECTS_DATA.find(p => p.id === nextId);

  const prevLink = document.getElementById('prevProjectLink');
  const prevTitle = document.getElementById('prevProjectTitle');
  const nextLink = document.getElementById('nextProjectLink');
  const nextTitle = document.getElementById('nextProjectTitle');

  if (prevLink && prevProject) {
    prevLink.href = 'proyecto.html?id=' + prevProject.id;
    if (prevTitle) prevTitle.textContent = prevProject.title;
  }

  if (nextLink && nextProject) {
    nextLink.href = 'proyecto.html?id=' + nextProject.id;
    if (nextTitle) nextTitle.textContent = nextProject.title;
  }

  // Renderizar Grilla de Fotos según disponibilidad
  if (currentProject.gallery && currentProject.gallery.length > 0) {
    if (gallerySection) gallerySection.style.display = '';
    if (countLabel) {
      countLabel.textContent = currentProject.gallery.length + ' Fotografías de la serie';
    }

    if (gridEl) {
      gridEl.innerHTML = '';
      currentProject.gallery.forEach(function(item) {
        const card = document.createElement('article');
        card.className = 'gallery-mosaic-card ' + item.span;
        
        const box = document.createElement('div');
        box.className = 'mosaic-img-box';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;
        img.className = 'mosaic-img';
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'mosaic-overlay';

        const tag = document.createElement('span');
        tag.className = 'mosaic-tag';
        tag.textContent = item.tag;

        const heading = document.createElement('h4');
        heading.className = 'mosaic-title';
        heading.textContent = item.title;

        overlay.appendChild(tag);
        overlay.appendChild(heading);

        box.appendChild(img);
        box.appendChild(overlay);

        card.appendChild(box);
        gridEl.appendChild(card);
      });
    }
  } else {
    // Si no tiene galería adicional, ocultar completamente la sección
    if (gallerySection) gallerySection.style.display = 'none';
    if (gridEl) gridEl.innerHTML = '';
  }
}
