import { WebPdfRepository } from '../data/WebPdfRepository.js';
import { AnalyzeResume }    from '../core/use-cases/AnalyzeResume.js';
import { createATSPanel, enableATSPanel, extractTextFromPDF } from './ats-analyzer.js';
pdfjsLib.GlobalWorkerOptions.workerSrc = '../libs/pdf.worker.min.js';

const repo    = new WebPdfRepository();
const useCase = new AnalyzeResume(repo);

// ═══════════════════════════════════════════════════════════
// DOM
// ═══════════════════════════════════════════════════════════
const dropZone           = document.getElementById('drop-zone');
const fileInput          = document.getElementById('file-input');
const locationSelect     = document.getElementById('location-select');
const resultsPanel       = document.getElementById('results-panel');
const emptyState         = document.getElementById('empty-state');
const matchesGrid        = document.getElementById('matches-grid');
const candidateNameLabel = document.getElementById('candidate-name');
const skillCountLabel    = document.getElementById('skill-count');

// ═══════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════
let lastFile      = null;
let lastResult    = null;
let cardObserver  = null;
let activeFilters = { modality: 'all', search: '', seniority: 'all', skill: 'all', sort: 'default' };

// ═══════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════
const MODALITY_CONFIG = {
  "Remoto":     { color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: "🌐" },
  "Híbrido":    { color: "text-blue-600 bg-blue-50 border-blue-200",           icon: "🏢" },
  "Presencial": { color: "text-orange-600 bg-orange-50 border-orange-200",     icon: "📍" },
};

const PORTAL_META = {
  linkedin:     { label: "LinkedIn"     },
  occ:          { label: "OCC"          },
  indeed:       { label: "Indeed"       },
  computrabajo: { label: "Computrabajo" },
  googleJobs:   { label: "Google Jobs"  },
};

const SENIORITY_KEYWORDS = {
  all:    '',
  jr:     'Junior',
  mid:    'Semi Senior',
  senior: 'Senior',
};

const COMPAT_LEVELS = [
  { min: 80, label: '🔥 Excelente match', color: 'bg-emerald-500 text-white' },
  { min: 60, label: '✅ Buen match',       color: 'bg-emerald-100 text-emerald-700' },
  { min: 40, label: '🟡 Match parcial',    color: 'bg-yellow-100 text-yellow-700' },
  { min: 0,  label: '🔵 Match básico',     color: 'bg-blue-50 text-blue-600' },
];

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
const style = document.createElement('style');
style.textContent = `
  #pdf-preview-panel {
    display: none; background: white; border: 1px solid #e8e2de;
    border-radius: 1.5rem; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.06);
  }
  #pdf-preview-panel.visible { display: block; }
  .pdf-preview-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: .75rem 1.25rem; background: #faf9f8; border-bottom: 1px solid #f0ece8;
  }
  .pdf-preview-header h3 {
    font-size: .75rem; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; color: #6b5d52;
  }
  #pdf-canvas-container {
    max-height: 320px; overflow-y: auto; background: #f5f3f0;
    display: flex; flex-direction: column; align-items: center; padding: 1rem; gap: .75rem;
  }
  #pdf-canvas-container canvas { width: 100%; max-width: 480px; border-radius: .75rem; box-shadow: 0 2px 12px rgba(0,0,0,.12); }
  .pdf-page-nav {
    display: flex; align-items: center; gap: .75rem; padding: .5rem 1.25rem;
    background: #faf9f8; border-top: 1px solid #f0ece8; font-size: .7rem; font-weight: 700; color: #6b5d52;
  }
  .pdf-nav-btn {
    width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
    border-radius: .5rem; border: 1px solid #e8e2de; background: white; cursor: pointer; font-size: .9rem; transition: all .15s;
  }
  .pdf-nav-btn:hover { background: #00875e; color: white; border-color: #00875e; }
  .pdf-nav-btn:disabled { opacity: .3; cursor: not-allowed; }

  #filter-bar {
    display: none; gap: .75rem; flex-wrap: wrap; align-items: center;
    padding: 1rem 1.25rem; background: white; border: 1px solid #e8e2de;
    border-radius: 1.5rem; margin-bottom: 1.5rem;
  }
  #filter-bar.visible { display: flex; }
  .filter-row { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; width: 100%; }
  .filter-label { font-size: .65rem; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; color: #9b8d84; white-space: nowrap; }
  .filter-divider { width: 100%; height: 1px; background: #f0ece8; margin: .25rem 0; }
  .filter-chip {
    font-size: .7rem; font-weight: 700; padding: .3rem .8rem; border-radius: 99px;
    border: 1.5px solid #e8e2de; background: white; color: #6b5d52; cursor: pointer; transition: all .15s; white-space: nowrap;
  }
  .filter-chip:hover  { border-color: #00875e; color: #00875e; }
  .filter-chip.active { background: #00875e; color: white; border-color: #00875e; }
  .filter-chip[data-value="jr"].active    { background: #3b82f6; border-color: #3b82f6; }
  .filter-chip[data-value="mid"].active   { background: #f59e0b; border-color: #f59e0b; }
  .filter-chip[data-value="senior"].active{ background: #8b5cf6; border-color: #8b5cf6; }
  .filter-chip[data-value="jr"]:hover     { border-color: #3b82f6; color: #3b82f6; }
  .filter-chip[data-value="mid"]:hover    { border-color: #f59e0b; color: #f59e0b; }
  .filter-chip[data-value="senior"]:hover { border-color: #8b5cf6; color: #8b5cf6; }
  .filter-search {
    flex: 1; min-width: 160px; padding: .4rem .9rem; border-radius: 99px;
    border: 1.5px solid #e8e2de; font-size: .75rem; font-family: inherit; outline: none; transition: border-color .15s; color: #2d241e;
  }
  .filter-search:focus { border-color: #00875e; }
  .filter-select {
    padding: .35rem .8rem; border-radius: 99px; border: 1.5px solid #e8e2de;
    font-size: .7rem; font-weight: 700; font-family: inherit; color: #6b5d52; background: white; cursor: pointer; outline: none;
  }
  .filter-select:focus { border-color: #00875e; }
  .filter-results-count { margin-left: auto; font-size: .65rem; font-weight: 700; color: #9b8d84; white-space: nowrap; }

  .compat-badge { display: inline-flex; align-items: center; gap: 4px; font-size: .65rem; font-weight: 800; padding: 3px 10px; border-radius: 99px; white-space: nowrap; }
  .compat-bar-bg { width: 100%; height: 4px; background: #f0ece8; border-radius: 99px; overflow: hidden; margin-top: 4px; }
  .compat-bar-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#00875e,#34d399); transition: width 1s cubic-bezier(.4,0,.2,1); }

  .seniority-tag { font-size: .6rem; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; padding: 2px 8px; border-radius: 99px; border: 1.5px solid currentColor; }
  .seniority-tag.jr     { color: #3b82f6; border-color: #bfdbfe; background: #eff6ff; }
  .seniority-tag.mid    { color: #f59e0b; border-color: #fde68a; background: #fffbeb; }
  .seniority-tag.senior { color: #8b5cf6; border-color: #ddd6fe; background: #f5f3ff; }

  .skill-card { position: relative; }
  .card-bookmark {
    position: absolute; top: 1rem; right: 1rem; width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    border-radius: .5rem; border: 1px solid #e8e2de; background: white;
    cursor: pointer; font-size: .9rem; transition: all .15s; z-index: 2;
  }
  .card-bookmark:hover { background: #fff8f0; border-color: #f59e0b; }
  .card-bookmark.saved { background: #fff8f0; border-color: #f59e0b; }
  .share-btn {
    display: inline-flex; align-items: center; gap: .35rem; font-size: .65rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em; color: #9b8d84; cursor: pointer;
    padding: .3rem .6rem; border-radius: .5rem; transition: all .15s; border: none; background: none;
  }
  .share-btn:hover { color: #00875e; background: #f0faf6; }
  .no-results { grid-column: 1 / -1; text-align: center; padding: 3rem; color: #9b8d84; font-size: .85rem; }

  #toast-container { position: fixed; bottom: 1.5rem; right: 1.5rem; display: flex; flex-direction: column; gap: .5rem; z-index: 9999; }
  .toast { padding: .75rem 1.25rem; background: #2d241e; color: white; border-radius: 1rem; font-size: .75rem; font-weight: 600; font-family: inherit; box-shadow: 0 4px 20px rgba(0,0,0,.2); animation: toastIn .25s ease; max-width: 280px; }
  .toast.success { background: #00875e; }
  .toast.error   { background: #dc2626; }
  @keyframes toastIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .stats-bar { display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .stat-item { display: flex; flex-direction: column; gap: .15rem; }
  .stat-value { font-size: 1.5rem; font-weight: 900; color: #2d241e; line-height: 1; }
  .stat-label { font-size: .6rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #9b8d84; }
  :focus-visible { outline: 2.5px solid #00875e; outline-offset: 2px; border-radius: 4px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
  .skip-link { position: absolute; top: -40px; left: 0; background: #00875e; color: white; padding: .5rem 1rem; font-size: .8rem; font-weight: 700; z-index: 10000; border-radius: 0 0 .5rem 0; transition: top .2s; }
  .skip-link:focus { top: 0; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; } }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════════════════════════
// INJECT HTML
// ═══════════════════════════════════════════════════════════
const skipLink = document.createElement('a');
skipLink.href = '#matches-grid'; skipLink.className = 'skip-link';
skipLink.textContent = 'Saltar al contenido principal';
document.body.prepend(skipLink);

const toastContainer = document.createElement('div');
toastContainer.id = 'toast-container';
toastContainer.setAttribute('role','status'); toastContainer.setAttribute('aria-live','polite');
document.body.appendChild(toastContainer);

// PDF Preview mejorado con botón de acceso al ATS
const pdfPreviewPanel = document.createElement('div');
pdfPreviewPanel.id = 'pdf-preview-panel';
pdfPreviewPanel.setAttribute('aria-label','Vista previa del PDF');
pdfPreviewPanel.innerHTML = `
  <div class="pdf-preview-header">
    <h3>Vista previa del CV</h3>
    <div style="display:flex;gap:.5rem;align-items:center;">
      <span id="pdf-filename" style="font-size:.7rem;color:#9b8d84;font-weight:600;"></span>
      <button id="pdf-close-btn" class="pdf-nav-btn" aria-label="Cerrar vista previa">✕</button>
    </div>
  </div>
  <div id="pdf-canvas-container" role="img" aria-label="Páginas del CV"></div>
  <div class="pdf-page-nav">
    <button id="pdf-prev" class="pdf-nav-btn" aria-label="Página anterior" disabled>‹</button>
    <span id="pdf-page-info" aria-live="polite" style="min-width: 80px; text-align: center;">Pág. 1 / 1</span>
    <button id="pdf-next" class="pdf-nav-btn" aria-label="Página siguiente">›</button>
    
    <button id="go-to-ats" class="filter-chip active" 
            style="margin-left: 1.5rem; font-size: 0.6rem; padding: 0.4rem 0.8rem; background: #00875e; color: white; border: none; display: none; align-items: center; gap: 0.4rem; transition: all 0.2s ease;">
       <span style="font-size: 0.8rem;">📊</span> VER ANÁLISIS DE PERFIL
    </button>
    
    <span style="margin-left:auto; font-size:.65rem; color: #9b8d84;"><span id="pdf-size"></span></span>
  </div>`;

dropZone.parentNode.insertBefore(pdfPreviewPanel, dropZone.nextSibling);

// Filter Bar
const filterBar = document.createElement('div');
filterBar.id = 'filter-bar';
filterBar.setAttribute('role','search');
filterBar.setAttribute('aria-label','Filtros de vacantes');
filterBar.innerHTML = `
  <div class="filter-row">
    <span class="filter-label">Buscar:</span>
    <input type="search" class="filter-search" id="filter-search" placeholder="Rol, tecnología..." aria-label="Buscar roles" autocomplete="off">
    <span class="filter-label">Habilidad:</span>
    <select class="filter-select" id="skill-select" aria-label="Filtrar por habilidad del CV">
      <option value="all">Todas las habilidades</option>
    </select>
    <span class="filter-label">Ordenar:</span>
    <select class="filter-select" id="sort-select" aria-label="Ordenar resultados">
      <option value="default">Por relevancia</option>
      <option value="compat-desc">Mayor compatibilidad</option>
      <option value="alpha">A → Z</option>
      <option value="alpha-desc">Z → A</option>
    </select>
    <span class="filter-results-count" id="filter-count" aria-live="polite"></span>
  </div>
  <div class="filter-divider"></div>
  <div class="filter-row">
    <span class="filter-label">Modalidad:</span>
    <div role="group" aria-label="Filtro de modalidad" style="display:flex;gap:.4rem;flex-wrap:wrap;">
      <button class="filter-chip active" data-filter="modality" data-value="all" aria-pressed="true">Todas</button>
      <button class="filter-chip" data-filter="modality" data-value="Remoto" aria-pressed="false">🌐 Remoto</button>
      <button class="filter-chip" data-filter="modality" data-value="Híbrido" aria-pressed="false">🏢 Híbrido</button>
      <button class="filter-chip" data-filter="modality" data-value="Presencial" aria-pressed="false">📍 Presencial</button>
    </div>
    <span class="filter-label" style="margin-left:.5rem;">Seniority:</span>
    <div role="group" aria-label="Filtro de seniority" style="display:flex;gap:.4rem;flex-wrap:wrap;">
      <button class="filter-chip active" data-filter="seniority" data-value="all" aria-pressed="true">Todos</button>
      <button class="filter-chip" data-filter="seniority" data-value="jr" aria-pressed="false">🔵 Junior</button>
      <button class="filter-chip" data-filter="seniority" data-value="mid" aria-pressed="false">🟡 Mid</button>
      <button class="filter-chip" data-filter="seniority" data-value="senior" aria-pressed="false">🟣 Senior</button>
    </div>
  </div>`;
matchesGrid.parentNode.insertBefore(filterBar, matchesGrid);

// Panel ATS — se inserta después de los resultados
const atsPanelWrapper = document.createElement('div');
atsPanelWrapper.id = 'ats-panel-wrapper';
matchesGrid.parentNode.appendChild(atsPanelWrapper);
createATSPanel(atsPanelWrapper);

// ═══════════════════════════════════════════════════════════
// PDF PREVIEW
// ═══════════════════════════════════════════════════════════
let pdfDoc = null, currentPage = 1, totalPages = 0;

async function renderPdfPreview(file) {
  const arrayBuffer = await file.arrayBuffer();
  pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  totalPages = pdfDoc.numPages; currentPage = 1;
  document.getElementById('pdf-filename').textContent = file.name;
  document.getElementById('pdf-size').textContent = `${(file.size/1024).toFixed(0)} KB · ${totalPages} pág.`;
  pdfPreviewPanel.classList.add('visible');
  await renderPage(currentPage); updatePageNav();
}
async function renderPage(n) {
  const container = document.getElementById('pdf-canvas-container');
  container.innerHTML = '';
  const page = await pdfDoc.getPage(n);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = viewport.width; canvas.height = viewport.height;
  canvas.setAttribute('aria-label', `Página ${n} del CV`);
  container.appendChild(canvas);
  await page.render({ canvasContext: ctx, viewport }).promise;
}
function updatePageNav() {
  document.getElementById('pdf-page-info').textContent = `Pág. ${currentPage} / ${totalPages}`;
  document.getElementById('pdf-prev').disabled = currentPage <= 1;
  document.getElementById('pdf-next').disabled = currentPage >= totalPages;
}
document.getElementById('pdf-prev').addEventListener('click', async () => { if (currentPage > 1) { currentPage--; await renderPage(currentPage); updatePageNav(); } });
document.getElementById('pdf-next').addEventListener('click', async () => { if (currentPage < totalPages) { currentPage++; await renderPage(currentPage); updatePageNav(); } });
document.getElementById('pdf-close-btn').addEventListener('click', () => pdfPreviewPanel.classList.remove('visible'));

// ═══════════════════════════════════════════════════════════
// UPLOAD EVENTS
// ═══════════════════════════════════════════════════════════
locationSelect.onchange = () => { if (lastFile) processFile(lastFile); };
dropZone.setAttribute('tabindex','0'); dropZone.setAttribute('role','button');
dropZone.setAttribute('aria-label','Subir CV en PDF. Haz clic o arrastra.');
dropZone.onclick = () => fileInput.click();
dropZone.onkeydown = e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); fileInput.click(); } };
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('border-kwAccent','bg-emerald-50/20'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('border-kwAccent','bg-emerald-50/20'));
dropZone.addEventListener('drop', e => {
  e.preventDefault(); dropZone.classList.remove('border-kwAccent','bg-emerald-50/20');
  const f = e.dataTransfer.files[0];
  if (f?.type==='application/pdf') handleFile(f); else showToast('Solo se aceptan PDFs','error');
});
fileInput.onchange = e => { const f = e.target.files[0]; if (f) handleFile(f); };

async function handleFile(file) {
  if (file.size > 5 * 1024 * 1024) { 
    showToast('El archivo supera los 5MB', 'error'); 
    return; 
  }
  
  lastFile = file;
  showToast(`📄 ${file.name} cargado`, 'success');

  // --- NUEVA LÓGICA: Mostrar el botón de análisis al cargar ---
  const btnAts = document.getElementById('go-to-ats');
  if (btnAts) {
    btnAts.style.display = 'flex';
    // Opcional: añadimos una pequeña animación de entrada
    btnAts.classList.add('animate-up'); 
  }

  // Tres procesos en paralelo: preview PDF, análisis de roles, extracción para ATS
  renderPdfPreview(file).catch(() => {});

  extractTextFromPDF(file)
    .then(text => enableATSPanel(text, file.name))
    .catch(err => console.warn('ATS text extraction failed:', err));

  processFile(file);
}

// ═══════════════════════════════════════════════════════════
// CORE
// ═══════════════════════════════════════════════════════════
async function processFile(file) {
  const location = locationSelect.value;
  if (cardObserver) { cardObserver.disconnect(); cardObserver = null; }
  emptyState.classList.add('hidden');
  resultsPanel.classList.remove('hidden');
  filterBar.classList.remove('visible');
  renderLoadingState();
  try {
    const result = await useCase.execute(file, location);
    lastResult = result;

    const totalSkills = result.matches.length;
    result.matches = result.matches.map((m, i) => ({
      ...m,
      compatPct: Math.min(100, Math.round(((totalSkills - i) / totalSkills) * 100)),
    }));

    renderResults(result);
    filterBar.classList.add('visible');
    populateSkillFilter(result.matches);
    setupFilters(result);
    setupLazyEnrich(result.matches, location);
    announceToScreenReader(`Análisis completado. ${result.matches.length} roles para ${result.candidateName}.`);
  } catch (err) {
    console.error(err);
    showToast('Error al analizar el CV. Verifica que sea un PDF con texto.','error');
    emptyState.classList.remove('hidden'); resultsPanel.classList.add('hidden');
  }
}

// ═══════════════════════════════════════════════════════════
// SKILL FILTER
// ═══════════════════════════════════════════════════════════
function populateSkillFilter(matches) {
  const select = document.getElementById('skill-select');
  if (!select) return;
  select.innerHTML = '<option value="all">Todas las habilidades</option>';
  const skillsSet = new Set();
  matches.forEach(m => { if (m.tech) m.tech.split(',').forEach(s => skillsSet.add(s.trim())); });
  [...skillsSet].sort().forEach(skill => {
    if (!skill) return;
    const opt = document.createElement('option');
    opt.value = skill; opt.textContent = skill;
    select.appendChild(opt);
  });
}

// ═══════════════════════════════════════════════════════════
// FILTERS SETUP
// ═══════════════════════════════════════════════════════════
function setupFilters(result) {
  filterBar.querySelectorAll('[data-filter="modality"]').forEach(chip => {
    chip.addEventListener('click', () => {
      filterBar.querySelectorAll('[data-filter="modality"]').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
      chip.classList.add('active'); chip.setAttribute('aria-pressed','true');
      activeFilters.modality = chip.dataset.value; applyFilters();
    });
  });
  filterBar.querySelectorAll('[data-filter="seniority"]').forEach(chip => {
    chip.addEventListener('click', () => {
      filterBar.querySelectorAll('[data-filter="seniority"]').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
      chip.classList.add('active'); chip.setAttribute('aria-pressed','true');
      activeFilters.seniority = chip.dataset.value;
      updateSeniorityOnCards(); applyFilters();
    });
  });
  document.getElementById('filter-search').addEventListener('input', e => { activeFilters.search = e.target.value.toLowerCase().trim(); applyFilters(); });
  document.getElementById('skill-select').addEventListener('change', e => { activeFilters.skill = e.target.value; applyFilters(); });
  document.getElementById('sort-select').addEventListener('change', e => { activeFilters.sort = e.target.value; applyFilters(); });
  updateFilterCount(result.matches.length, result.matches.length);
}

// ═══════════════════════════════════════════════════════════
// APPLY FILTERS
// ═══════════════════════════════════════════════════════════
function applyFilters() {
  if (!lastResult) return;
  const cards = matchesGrid.querySelectorAll('.skill-card');
  matchesGrid.querySelectorAll('.no-results').forEach(el => el.remove());
  let visible = 0;

  cards.forEach((card, i) => {
    const match = lastResult.matches[i];
    if (!match) return;
    const title = (match.jobTitle || '').toLowerCase();
    const tech  = (match.tech || '').toLowerCase();
    const passSearch   = !activeFilters.search || title.includes(activeFilters.search) || tech.includes(activeFilters.search);
    const modalityText = card.querySelector('.modalities-row')?.textContent || '';
    const passModality = activeFilters.modality === 'all' || modalityText.includes(activeFilters.modality);
    const passSkill    = activeFilters.skill === 'all' || tech.includes(activeFilters.skill.toLowerCase());
    const show = passSearch && passModality && passSkill;
    card.style.display = show ? '' : 'none';
    card.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (show) visible++;
  });

  if (activeFilters.sort !== 'default') {
    const cardsArr = [...matchesGrid.querySelectorAll('.skill-card')].filter(c => c.style.display !== 'none');
    cardsArr.sort((a, b) => {
      const ai = parseInt(a.id.replace('card-','')); const bi = parseInt(b.id.replace('card-',''));
      const am = lastResult.matches[ai]; const bm = lastResult.matches[bi];
      if (activeFilters.sort === 'compat-desc') return (bm?.compatPct||0) - (am?.compatPct||0);
      if (activeFilters.sort === 'alpha')       return (am?.jobTitle||'').localeCompare(bm?.jobTitle||'');
      if (activeFilters.sort === 'alpha-desc')  return (bm?.jobTitle||'').localeCompare(am?.jobTitle||'');
      return 0;
    });
    const frag = document.createDocumentFragment();
    cardsArr.forEach(c => frag.appendChild(c));
    matchesGrid.appendChild(frag);
  }

  if (visible === 0) {
    const noRes = document.createElement('div');
    noRes.className = 'no-results'; noRes.setAttribute('role','status');
    noRes.innerHTML = `<p style="font-size:2rem;margin-bottom:.5rem;">🔍</p><p style="font-weight:700;">Sin resultados</p><p style="font-size:.75rem;opacity:.6;">Intenta con otros términos o cambia los filtros</p>`;
    matchesGrid.appendChild(noRes);
  }
  updateFilterCount(visible, lastResult.matches.length);
}

function updateFilterCount(visible, total) {
  const el = document.getElementById('filter-count');
  if (el) el.textContent = visible === total ? `${total} roles` : `${visible} de ${total} roles`;
}

function updateSeniorityOnCards() {
  const seniority = activeFilters.seniority;
  matchesGrid.querySelectorAll('.seniority-tag-wrapper').forEach(wrapper => {
    wrapper.innerHTML = seniority === 'all' ? '' : renderSeniorityTag(seniority);
  });
  matchesGrid.querySelectorAll('.seniority-hint').forEach(el => {
    const keyword = SENIORITY_KEYWORDS[seniority];
    el.textContent = keyword ? `Buscando vacantes "${keyword}"` : '';
    el.style.display = keyword ? '' : 'none';
  });
}

// ═══════════════════════════════════════════════════════════
// LAZY ENRICHMENT
// ═══════════════════════════════════════════════════════════
function setupLazyEnrich(matches, location) {
  const queue = []; let inFlight = 0; const CONCURRENT = 2;
  function drain() {
    while (queue.length > 0 && inFlight < CONCURRENT) {
      const { cardId, title } = queue.shift(); inFlight++;
      enrichCard(title, location, cardId).finally(() => { inFlight--; drain(); });
    }
  }
  cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      if (card.dataset.enriched === 'true') return;
      card.dataset.enriched = 'true'; cardObserver.unobserve(card);
      queue.push({ cardId: card.id, title: card.dataset.title }); drain();
    });
  }, { rootMargin: '150px', threshold: 0.05 });
  matches.forEach((_, i) => { const card = document.getElementById(`card-${i}`); if (card) cardObserver.observe(card); });
}

// ═══════════════════════════════════════════════════════════
// ENRICHMENT
// ═══════════════════════════════════════════════════════════
async function enrichCard(title, location, cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;
  const portalsSection = card.querySelector('.portals-section');
  if (portalsSection) portalsSection.innerHTML = renderPortalsSkeleton();

  const seniorityKw = SENIORITY_KEYWORDS[activeFilters.seniority] || '';
  const searchTitle = seniorityKw ? `${seniorityKw} ${title}` : title;

  try {
    const qs = new URLSearchParams({ title: searchTitle, location, portals: 'linkedin,indeed,occ,computrabajo,getonbrd', limit: '2' });
    const res = await fetch(`/api/get-job-listings?${qs}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const vacEl = card.querySelector('.vac-count');
    if (vacEl) {
      const n = data.totalVacancies || 0;
      vacEl.textContent = n > 0 ? `${n} vacante${n!==1?'s':''} encontrada${n!==1?'s':''}` : 'Búsqueda disponible';
      vacEl.classList.remove('text-gray-300'); vacEl.classList.add('text-gray-500');
    }

    const salEl = card.querySelector('.salary-range');
    if (salEl && data.salaryRange) { salEl.textContent = `💰 ${data.salaryRange}`; salEl.classList.remove('hidden'); }

    const modEl = card.querySelector('.modalities-row');
    if (modEl && data.modalities?.length > 0) {
      modEl.innerHTML = data.modalities.map(m => {
        const cfg = MODALITY_CONFIG[m] || { color: 'text-gray-600 bg-gray-50 border-gray-200', icon: '💼' };
        return `<span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${cfg.color}" role="img" aria-label="Modalidad: ${m}">${cfg.icon} ${m}</span>`;
      }).join('');
      applyFilters();
    }

    if (portalsSection && data.portals?.length > 0) {
      const realPortals = data.portals.filter(p => p.jobs.some(j => !j.synthetic));
      const toRender = realPortals.length > 0 ? realPortals : data.portals;
      const firstReal = toRender.flatMap(p => p.jobs).find(j => !j.synthetic && j.url);
      portalsSection.innerHTML = renderPortalTabs(toRender, cardId, firstReal);
      attachTabListeners(cardId);

      const previewEl = card.querySelector('.job-preview');
      if (previewEl) {
        const firstDesc = toRender.flatMap(p => p.jobs).map(j => j.description).find(d => d?.length > 10);
        if (firstDesc) { previewEl.textContent = firstDesc; previewEl.classList.remove('text-gray-400','italic'); previewEl.classList.add('text-gray-600'); }
      }

      const btn = card.querySelector('.btn-apply-main');
      if (btn && firstReal?.url) {
        btn.href = firstReal.url;
        btn.querySelector('.btn-label').textContent = 'POSTULARSE AHORA';
        btn.querySelector('.btn-source').textContent = `vía ${firstReal.source}`;
        btn.classList.add('direct-link-active');
      }
    }
  } catch (err) {
    console.warn(`[KorWork] ${cardId}: fallback.`, err.message);
    if (portalsSection) portalsSection.innerHTML = renderFallbackButtons(buildFallbackLinks(title, lastResult?.location || 'México'));
  }
}

// ═══════════════════════════════════════════════════════════
// RENDER RESULTS
// ═══════════════════════════════════════════════════════════
function renderResults(result) {
  candidateNameLabel.innerText = result.candidateName;
  skillCountLabel.innerText    = result.matches.length;

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    statsBar.innerHTML = `
      <div class="stat-item"><span class="stat-value">${result.matches.length}</span><span class="stat-label">Roles detectados</span></div>
      <div class="stat-item"><span class="stat-value">${result.location}</span><span class="stat-label">Mercado</span></div>`;
  }

  matchesGrid.innerHTML = result.matches.map((m, i) => {
    const jobTitle    = m.jobTitle || m.tech;
    const techStack   = m.name || m.tech;
    const cvPreview   = (m.preview || 'Buscando vacantes activas...').replace(/[<>]/g,'').trim();
    const compatPct   = m.compatPct || 0;
    const compatLevel = COMPAT_LEVELS.find(l => compatPct >= l.min) || COMPAT_LEVELS[COMPAT_LEVELS.length - 1];
    const savedJobs   = JSON.parse(localStorage.getItem('kw_saved') || '[]');
    const isSaved     = savedJobs.includes(jobTitle);

    return `
      <article id="card-${i}"
               data-title="${escHtml(jobTitle)}"
               data-enriched="false"
               data-compat="${compatPct}"
               class="skill-card animate-up flex flex-col gap-4"
               style="animation-delay:${i * 45}ms"
               aria-label="Rol: ${jobTitle}, compatibilidad: ${compatPct}%">

        <button class="card-bookmark ${isSaved?'saved':''}" data-job="${escHtml(jobTitle)}"
                aria-label="${isSaved?'Quitar de guardados':'Guardar rol'}" aria-pressed="${isSaved}">
          ${isSaved?'🔖':'🏷️'}
        </button>

        <div>
          <div class="flex justify-between items-start mb-1" style="padding-right:2.5rem;">
            <div>
              <h3 class="text-xl font-bold leading-tight text-kwText">${jobTitle}</h3>
              <p class="text-[10px] font-bold mt-1 uppercase tracking-widest text-kwAccent">${techStack}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 mb-2 flex-wrap">
            <span class="compat-badge ${compatLevel.color}">${compatLevel.label} · ${compatPct}%</span>
            <div class="seniority-tag-wrapper"></div>
          </div>
          <div class="compat-bar-bg mb-2">
            <div class="compat-bar-fill" style="width:${compatPct}%"></div>
          </div>

          <div class="flex items-center gap-2 mb-2">
            <span class="text-[9px] font-bold py-1 px-3 bg-[#f8f6f4] rounded-full uppercase text-[#6b5d52] border border-kwBorder leading-none">
              📍 ${result.location}
            </span>
            <button class="share-btn" data-job="${escHtml(jobTitle)}">↗ Compartir</button>
          </div>

          <p class="seniority-hint text-[10px] text-blue-500 font-semibold mb-1" style="display:none;"></p>

          <div class="flex flex-wrap items-center gap-2 min-h-[20px] mb-1">
            <span class="vac-count text-[11px] font-semibold text-gray-300 transition-all duration-500" aria-live="polite">Buscando vacantes...</span>
          </div>
          <div class="salary-range hidden text-[12px] font-bold text-emerald-600 mb-1" aria-live="polite"></div>
          <div class="modalities-row flex flex-wrap gap-1 mb-2"></div>

          <p class="job-preview text-[12px] text-gray-400 italic leading-relaxed bg-[#faf9f8] border border-[#f0ece8] rounded-xl p-3 line-clamp-3 transition-all duration-500">
            ${cvPreview}
          </p>
        </div>

        <div class="portals-section mt-auto" aria-label="Portales para ${jobTitle}">
          ${renderPortalsSkeleton()}
        </div>
      </article>`;
  }).join('');

  matchesGrid.querySelectorAll('.card-bookmark').forEach(btn => btn.addEventListener('click', () => toggleSave(btn)));
  matchesGrid.querySelectorAll('.share-btn').forEach(btn => btn.addEventListener('click', () => shareJob(btn.dataset.job, result.location)));

  if (activeFilters.seniority !== 'all') updateSeniorityOnCards();
}

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function renderSeniorityTag(seniority) {
  const labels = { jr: '🔵 Junior', mid: '🟡 Mid-Level', senior: '🟣 Senior' };
  return `<span class="seniority-tag ${seniority}">${labels[seniority]||''}</span>`;
}

function toggleSave(btn) {
  const job = btn.dataset.job;
  const saved = JSON.parse(localStorage.getItem('kw_saved') || '[]');
  const idx = saved.indexOf(job); const isSaved = idx === -1;
  if (isSaved) saved.push(job); else saved.splice(idx, 1);
  localStorage.setItem('kw_saved', JSON.stringify(saved));
  btn.innerHTML = isSaved ? '🔖' : '🏷️';
  btn.classList.toggle('saved', isSaved);
  btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
  showToast(isSaved ? `✔ "${job}" guardado` : `"${job}" eliminado`);
}

async function shareJob(jobTitle, location) {
  const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}&f_TPR=r604800&sortBy=DD`;
  try {
    if (navigator.share) await navigator.share({ title: `Vacantes: ${jobTitle}`, url });
    else { await navigator.clipboard.writeText(url); showToast('🔗 Link copiado','success'); }
  } catch {}
}

function renderPortalsSkeleton() {
  return `<div class="animate-pulse space-y-2" aria-busy="true">
    <div class="flex gap-2"><div class="h-7 w-20 bg-gray-200 rounded-lg"></div><div class="h-7 w-16 bg-gray-100 rounded-lg"></div><div class="h-7 w-14 bg-gray-100 rounded-lg"></div></div>
    <div class="h-12 bg-gray-100 rounded-xl w-full"></div>
    <div class="h-12 bg-gray-50 rounded-xl w-full"></div>
    <div class="h-9 bg-gray-800 rounded-xl w-full opacity-20"></div>
  </div>`;
}

function renderPortalTabs(portals, cardId, firstRealJob) {
  const mainUrl    = firstRealJob?.url    || portals[0]?.jobs[0]?.url || '#';
  const mainSource = firstRealJob?.source || portals[0]?.portal       || 'Portal';
  const tabs = portals.map((p, i) => {
    const count = p.jobs.filter(j => !j.synthetic).length;
    return `<button class="portal-tab text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all ${i===0?'bg-kwAccent text-white':'text-gray-400 hover:bg-gray-100'}"
              data-idx="${i}" role="tab" aria-selected="${i===0}" aria-controls="panel-${cardId}-${i}">
              ${p.portal}${count>0?` (${count})`:''}
            </button>`;
  }).join('');
  const panels = portals.map((p, i) => `
    <div class="portal-panel ${i!==0?'hidden':''}" id="panel-${cardId}-${i}" role="tabpanel" aria-label="Vacantes en ${p.portal}">
      ${p.jobs.map(renderJobRow).join('')}
      <a href="${p.searchUrl}" target="_blank" rel="noopener" class="flex justify-center text-[11px] font-semibold text-kwAccent hover:underline py-1">Ver más en ${p.portal} →</a>
    </div>`).join('');
  return `
    <div role="tablist" class="flex flex-wrap gap-1 mb-2">${tabs}</div>
    ${panels}
    <a href="${mainUrl}" target="_blank" rel="noopener"
       class="btn-apply-main btn-apply btn-postularse w-full mt-2 flex flex-col items-center justify-center gap-0.5">
      <span class="btn-label">POSTULARSE AHORA</span>
      <span class="btn-source text-[9px] opacity-70 font-normal normal-case tracking-normal">vía ${mainSource}</span>
    </a>`;
}

function renderJobRow(job) {
  const modCfg = MODALITY_CONFIG[job.modality] || {};
  const isReal = !job.synthetic;
  return `
    <a href="${job.url}" target="_blank" rel="noopener"
       class="group flex flex-col gap-1 p-3 rounded-xl border border-kwBorder mb-2 hover:border-kwAccent hover:bg-emerald-50/10 transition-all">
      <div class="flex justify-between items-start gap-2">
        <span class="text-[13px] font-bold leading-snug ${isReal?'text-kwText group-hover:text-kwAccent':'text-gray-400'}">
          ${job.title}${!isReal?'<span class="text-[10px] font-normal ml-1 opacity-60">(búsqueda general)</span>':''}
        </span>
        ${job.postedAt?`<time class="text-[10px] text-gray-400 shrink-0">${job.postedAt}</time>`:''}
      </div>
      ${job.company?`<span class="text-[11px] font-semibold text-gray-500">${job.company}</span>`:''}
      ${job.description?`<p class="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mt-0.5">${job.description}</p>`:''}
      <div class="flex flex-wrap gap-2 mt-1">
        ${job.location?`<span class="text-[10px] text-gray-400">📍 ${job.location}</span>`:''}
        ${job.modality?`<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full border ${modCfg.color||'bg-gray-100 text-gray-600 border-gray-200'}">${modCfg.icon||''} ${job.modality}</span>`:''}
        ${job.salary?`<span class="text-[10px] font-bold text-emerald-600">💰 ${job.salary}</span>`:''}
      </div>
      <span class="text-[10px] font-semibold text-kwAccent mt-0.5 group-hover:underline">${isReal?'Ver vacante →':'Buscar en portal →'}</span>
    </a>`;
}

function renderFallbackButtons(links) {
  const portals = Object.entries(PORTAL_META).filter(([k]) => links[k]).map(([k,m]) => ({ key:k,...m }));
  const [main,...secondary] = portals;
  return `<div class="flex flex-col gap-2">
    <a href="${links[main?.key]||'#'}" target="_blank" rel="noopener"
       class="btn-apply-main btn-apply btn-postularse w-full flex flex-col items-center justify-center gap-0.5">
      <span class="btn-label">POSTULARSE AHORA</span>
      <span class="btn-source text-[9px] opacity-60 font-normal normal-case tracking-normal">vía ${main?.label||'LinkedIn'}</span>
    </a>
    <div class="grid grid-cols-2 gap-1.5">
      ${secondary.map(p=>`<a href="${links[p.key]}" target="_blank" rel="noopener"
         class="text-[10px] font-bold text-center py-2 px-1 rounded-xl border border-kwBorder hover:border-kwAccent hover:text-kwAccent transition-all text-gray-500 truncate">${p.label}</a>`).join('')}
    </div>
  </div>`;
}

function attachTabListeners(cardId) {
  const card = document.getElementById(cardId); if (!card) return;
  card.querySelectorAll('.portal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.idx);
      card.querySelectorAll('.portal-tab').forEach((t,i) => { t.classList.toggle('bg-kwAccent',i===idx); t.classList.toggle('text-white',i===idx); t.classList.toggle('text-gray-400',i!==idx); t.setAttribute('aria-selected',i===idx?'true':'false'); });
      card.querySelectorAll('.portal-panel').forEach((p,i) => p.classList.toggle('hidden',i!==idx));
      const applyBtn = card.querySelector('.btn-apply-main');
      const firstJob = card.querySelectorAll('.portal-panel')[idx]?.querySelector('a.group');
      if (applyBtn && firstJob?.href) applyBtn.href = firstJob.href;
    });
    tab.addEventListener('keydown', e => {
      const tabs = [...card.querySelectorAll('.portal-tab')]; const idx = tabs.indexOf(tab);
      if (e.key==='ArrowRight'&&idx<tabs.length-1) { tabs[idx+1].click(); tabs[idx+1].focus(); }
      if (e.key==='ArrowLeft'&&idx>0) { tabs[idx-1].click(); tabs[idx-1].focus(); }
    });
  });
}

function renderLoadingState() {
  candidateNameLabel.innerText = 'Analizando perfil...'; skillCountLabel.innerText = '—';
  matchesGrid.innerHTML = Array(6).fill(0).map(()=>`
    <div class="skill-card flex flex-col gap-4" aria-hidden="true" aria-busy="true">
      <div class="animate-pulse space-y-3"><div class="h-5 bg-gray-200 rounded-lg w-3/4"></div><div class="h-3 bg-gray-100 rounded w-2/5"></div></div>
      <div class="animate-pulse h-3 bg-gray-100 rounded w-full"></div>
      <div class="animate-pulse h-12 bg-gray-100 rounded-xl w-full"></div>
      <div class="animate-pulse space-y-2 mt-auto"><div class="h-9 bg-gray-800 rounded-xl w-full opacity-20"></div><div class="grid grid-cols-2 gap-2"><div class="h-7 bg-gray-200 rounded-xl"></div><div class="h-7 bg-gray-200 rounded-xl"></div></div></div>
    </div>`).join('');
}

function announceToScreenReader(message) {
  const el = document.getElementById('sr-announcer') || (() => {
    const e = document.createElement('div'); e.id='sr-announcer'; e.className='sr-only';
    e.setAttribute('aria-live','assertive'); e.setAttribute('aria-atomic','true');
    document.body.appendChild(e); return e;
  })();
  el.textContent = ''; setTimeout(() => { el.textContent = message; }, 100);
}

function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`; toast.textContent = message; toast.setAttribute('role','alert');
  toastContainer.appendChild(toast); setTimeout(() => toast.remove(), 3500);
}

function buildFallbackLinks(title, location) {
  const q = encodeURIComponent(title); const l = encodeURIComponent(location);
  const sl = title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  return {
    linkedin:     `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}&f_TPR=r604800&sortBy=DD`,
    occ:          `https://www.occ.com.mx/empleos/de-${sl}/`,
    indeed:       `https://mx.indeed.com/jobs?q=${q}&l=${l}&fromage=7&sort=date`,
    computrabajo: `https://www.computrabajo.com.mx/empleos-de-${sl}`,
    googleJobs:   `https://www.google.com/search?q=${q}+${l}+empleos&ibp=htl;jobs`,
  };
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.addEventListener('click', (e) => {
  // Verificamos si se hizo clic en el botón o en cualquiera de sus hijos (como el emoji)
  const btn = e.target.closest('#go-to-ats');
  if (btn) {
    const target = document.getElementById('ats-results-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});