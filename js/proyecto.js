/**
 * JULIÁN COSTA — PROYECTO DETALLE
 * Controlador dinámico para renderizar proyectos y galería completa
 */

const PROJECTS_DATA = [
  {
    id: 1,
    slug: 'silla-y-silencio',
    category: 'Arquitectura / Interiores',
    date: 'Julio 2026',
    title: 'Silla & Silencio',
    description: 'Composición minimalista de interior. El sillón tubular de cuero y el haz de luz solar sobre el parquet crean un espacio de calma, explorando la relación entre geometría, sombra y materiales nobles.',
    mainImage: 'img/obra1.webp',
    alt: 'Silla & Silencio — Interiorismo y Arquitectura'
  },
  {
    id: 2,
    slug: 'luz-a-traves-del-cristal',
    category: 'Retratos',
    date: 'Junio 2026',
    title: 'Luz a través del Cristal',
    description: 'Retrato contemplativo con reflejos tenues de la arquitectura urbana fundidos suavemente sobre el rostro. Un diálogo entre la intimidad del sujeto y la ciudad exterior.',
    mainImage: 'img/obra2.webp',
    alt: 'Luz a través del Cristal — Retrato'
  },
  {
    id: 3,
    slug: 'tailoring-oversized',
    category: 'Moda',
    date: 'Mayo 2026',
    title: 'Tailoring Oversized',
    description: 'Sastrería contemporánea sobre cuerpo femenino, pose descontracturada y juego de luces duras contra azulejos. Una exploración visual de textura, volumen y actitud.',
    mainImage: 'img/obra3.webp',
    alt: 'Tailoring Oversized — Moda'
  },
  {
    id: 4,
    slug: 'after-party-de-galeria',
    category: 'Eventos',
    date: 'Abril 2026',
    title: 'After-Party de Galería',
    description: 'Atmósfera documental en penumbra, copas, risas espontáneas y luz puntual de tungsteno cálida durante la noche de inauguración en un espacio de arte.',
    mainImage: 'img/obra4.webp',
    alt: 'After-Party de Galería — Eventos'
  },
  {
    id: 5,
    slug: 'geometria-y-sombra',
    category: 'Arquitectura',
    date: 'Marzo 2026',
    title: 'Geometría & Sombra',
    description: 'Fachada contemporánea en hormigón visto y cristal cortada por una sombra diagonal escultórica. Un estudio sobre la pureza de las líneas arquitectónicas y el paso del sol.',
    mainImage: 'img/obra5.webp',
    alt: 'Geometría & Sombra — Arquitectura'
  },
  {
    id: 6,
    slug: 'texturas-y-perfil',
    category: 'Moda',
    date: 'Febrero 2026',
    title: 'Texturas & Perfil',
    description: 'Encuadre cerrado de moda. Cuello de lana gruesa y vinilo brillante donde la luz lateral modela el tejido sobre fondo neutro, resaltando el perfil y los relieves materiales.',
    mainImage: 'img/obra6.webp',
    alt: 'Texturas & Perfil — Moda'
  },
  {
    id: 7,
    slug: 'primer-plano-directo',
    category: 'Retratos',
    date: 'Noviembre 2025',
    title: 'Primer Plano Directo',
    description: 'Retrato frontal con flash nítido, textura de piel real sin artificios, mirada penetrante y honestidad gestual. Captura directa sin filtros ni retoques superfluos.',
    mainImage: 'img/obra7.webp',
    alt: 'Primer Plano Directo — Retrato'
  }
];

// Archivo completo de fotografías del catálogo
const ALL_GALLERY_PHOTOS = [
  { src: 'img/hero.webp', title: 'Retrato de Estudio', tag: 'Retratos', span: 'col-span-2' },
  { src: 'img/pano1.webp', title: 'Secuencia Editorial 01', tag: 'Panorama', span: 'col-span-1' },
  { src: 'img/obra1.webp', title: 'Silla & Silencio', tag: 'Arquitectura', span: 'col-span-1' },
  { src: 'img/pano2.webp', title: 'Secuencia Editorial 02', tag: 'Panorama', span: 'col-span-2' },
  { src: 'img/obra2.webp', title: 'Luz a través del Cristal', tag: 'Retratos', span: 'col-span-1' },
  { src: 'img/obra3.webp', title: 'Tailoring Oversized', tag: 'Moda', span: 'col-span-1' },
  { src: 'img/pano3.webp', title: 'Secuencia Editorial 03', tag: 'Panorama', span: 'col-span-2' },
  { src: 'img/obra4.webp', title: 'After-Party de Galería', tag: 'Eventos', span: 'col-span-1' },
  { src: 'img/obra5.webp', title: 'Geometría & Sombra', tag: 'Arquitectura', span: 'col-span-1' },
  { src: 'img/pano4.webp', title: 'Secuencia Editorial 04', tag: 'Panorama', span: 'col-span-2' },
  { src: 'img/obra6.webp', title: 'Texturas & Perfil', tag: 'Moda', span: 'col-span-1' },
  { src: 'img/obra7.webp', title: 'Primer Plano Directo', tag: 'Retratos', span: 'col-span-1' },
  { src: 'img/pano5.webp', title: 'Secuencia Editorial 05', tag: 'Panorama', span: 'col-span-2' }
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

  // Renderizar Grilla Completa de Fotos
  if (gridEl) {
    gridEl.innerHTML = '';
    
    if (countLabel) {
      countLabel.textContent = ALL_GALLERY_PHOTOS.length + ' Fotografías en archivo';
    }

    ALL_GALLERY_PHOTOS.forEach(function(item) {
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
}
