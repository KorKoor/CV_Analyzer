import { WebPdfRepository } from '../data/WebPdfRepository.js';
import { AnalyzeResume }    from '../core/use-cases/AnalyzeResume.js';

const repo    = new WebPdfRepository();
const useCase = new AnalyzeResume(repo);

// === DOM ===
const dropZone           = document.getElementById('drop-zone');
const fileInput          = document.getElementById('file-input');
const locationSelect     = document.getElementById('location-select');
const resultsPanel       = document.getElementById('results-panel');
const emptyState         = document.getElementById('empty-state');
const matchesGrid        = document.getElementById('matches-grid');
const candidateNameLabel = document.getElementById('candidate-name');
const skillCountLabel    = document.getElementById('skill-count');

let lastFile     = null;
let cardObserver = null;

const MODALITY_CONFIG = {
  "Remoto":     { color: "text-emerald-600 bg-emerald-50", icon: "🌐" },
  "Híbrido":    { color: "text-blue-600 bg-blue-50",       icon: "🏢" },
  "Presencial": { color: "text-orange-600 bg-orange-50",   icon: "📍" },
};

const PORTAL_META = {
  linkedin:     { label: "LinkedIn"     },
  occ:          { label: "OCC"          },
  indeed:       { label: "Indeed"       },
  computrabajo: { label: "Computrabajo" },
  googleJobs:   { label: "Google Jobs"  },
};

// ─────────────────────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────────────────────
locationSelect.onchange = () => { if (lastFile) processFile(lastFile); };
dropZone.onclick        = () => fileInput.click();

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('border-kwAccent', 'bg-emerald-50/20');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('border-kwAccent', 'bg-emerald-50/20');
});
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('border-kwAccent', 'bg-emerald-50/20');
  const f = e.dataTransfer.files[0];
  if (f?.type === 'application/pdf') processFile(f);
});
fileInput.onchange = e => { const f = e.target.files[0]; if (f) processFile(f); };

// ─────────────────────────────────────────────────────────────
// CORE
// ─────────────────────────────────────────────────────────────
async function processFile(file) {
  lastFile = file;
  const location = locationSelect.value;

  if (cardObserver) { cardObserver.disconnect(); cardObserver = null; }

  emptyState.classList.add('hidden');
  resultsPanel.classList.remove('hidden');
  renderLoadingState();

  try {
    const result = await useCase.execute(file, location);
    renderResults(result);
    setupLazyEnrich(result.matches, location);
  } catch (err) {
    console.error("Error analizando CV:", err);
    emptyState.classList.remove('hidden');
    resultsPanel.classList.add('hidden');
  }
}

// ─────────────────────────────────────────────────────────────
// LAZY ENRICHMENT
// ─────────────────────────────────────────────────────────────
function setupLazyEnrich(matches, location) {
  const queue      = [];
  let   inFlight   = 0;
  const CONCURRENT = 2;

  function drain() {
    while (queue.length > 0 && inFlight < CONCURRENT) {
      const { cardId, title } = queue.shift();
      inFlight++;
      enrichCard(title, location, cardId).finally(() => {
        inFlight--;
        drain();
      });
    }
  }

  cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      if (card.dataset.enriched === "true") return;
      card.dataset.enriched = "true";
      cardObserver.unobserve(card);
      queue.push({ cardId: card.id, title: card.dataset.title });
      drain();
    });
  }, { rootMargin: "150px", threshold: 0.05 });

  matches.forEach((_, i) => {
    const card = document.getElementById(`card-${i}`);
    if (card) cardObserver.observe(card);
  });
}

// ─────────────────────────────────────────────────────────────
// ENRIQUECIMIENTO DE CARD
// ─────────────────────────────────────────────────────────────
async function enrichCard(title, location, cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  const portalsSection = card.querySelector('.portals-section');
  if (portalsSection) portalsSection.innerHTML = renderPortalsSkeleton();

  try {
    const qs  = new URLSearchParams({ title, location, portals: "linkedin,indeed,occ,computrabajo,getonbrd", limit: "2" });
    const res = await fetch(`/api/get-job-listings?${qs}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // ── 1. Contador ──────────────────────────────────────────
    const vacEl = card.querySelector('.vac-count');
    if (vacEl) {
      const n = data.totalVacancies || 0;
      vacEl.textContent = n > 0
        ? `${n} vacante${n !== 1 ? 's' : ''} encontrada${n !== 1 ? 's' : ''}`
        : 'Búsqueda general disponible';
      vacEl.classList.remove('text-gray-300');
      vacEl.classList.add('text-gray-500');
    }

    // ── 2. Salario ───────────────────────────────────────────
    const salEl = card.querySelector('.salary-range');
    if (salEl && data.salaryRange) {
      salEl.textContent = `💰 ${data.salaryRange}`;
      salEl.classList.remove('hidden');
    }

    // ── 3. Modalidades ───────────────────────────────────────
    const modEl = card.querySelector('.modalities-row');
    if (modEl && data.modalities?.length > 0) {
      modEl.innerHTML = data.modalities.map(m => {
        const cfg = MODALITY_CONFIG[m] || { color: "text-gray-600 bg-gray-50", icon: "💼" };
        return `<span class="inline-flex items-center gap-1 text-[11px] font-semibold
                             px-2 py-0.5 rounded-full ${cfg.color}">${cfg.icon} ${m}</span>`;
      }).join('');
    }

    // ── 4. Portales con vacantes ──────────────────────────────
    if (portalsSection && data.portals?.length > 0) {
      const realPortals = data.portals.filter(p => p.jobs.some(j => !j.synthetic));
      const toRender    = realPortals.length > 0 ? realPortals : data.portals;
      const firstReal   = toRender.flatMap(p => p.jobs).find(j => !j.synthetic && j.url);

      portalsSection.innerHTML = renderPortalTabs(toRender, cardId, firstReal);
      attachTabListeners(cardId);

      // ── 5. CLAVE: reemplazar preview del CV con descripción real ──
      const previewEl = card.querySelector('.job-preview');
      if (previewEl) {
        // Buscar la primera descripción real disponible
        const firstDesc = toRender
          .flatMap(p => p.jobs)
          .map(j => j.description)
          .find(d => d && d.length > 10);

        if (firstDesc) {
          previewEl.textContent = firstDesc;
          previewEl.classList.remove('text-gray-400', 'italic');
          previewEl.classList.add('text-gray-600');
        }
      }

      // ── 6. Botón principal → vacante real ────────────────────
      const btn = card.querySelector('.btn-apply-main');
      if (btn && firstReal?.url) {
        btn.href = firstReal.url;
        btn.querySelector('.btn-label').textContent  = 'POSTULARSE AHORA';
        btn.querySelector('.btn-source').textContent = `vía ${firstReal.source}`;
        btn.classList.add('direct-link-active');
      }
    }

  } catch (err) {
    console.warn(`[KorWork] ${cardId}: fallback.`, err.message);
    if (portalsSection) {
      const links = buildFallbackLinks(title, location);
      portalsSection.innerHTML = renderFallbackButtons(links);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// RENDER PRINCIPAL
// ─────────────────────────────────────────────────────────────
function renderResults(result) {
  candidateNameLabel.innerText = result.candidateName;
  skillCountLabel.innerText    = result.matches.length;

  matchesGrid.innerHTML = result.matches.map((m, i) => {
    const jobTitle  = m.jobTitle || m.tech;
    const techStack = m.name || m.tech;
    // Preview del CV — se reemplazará con descripción real cuando llegue la API
    const cvPreview = (m.preview || "Buscando vacantes activas...")
                        .replace(/[<>]/g, '').trim();
    const links     = m.links || buildFallbackLinks(jobTitle, result.location);

    return `
      <div id="card-${i}"
           data-title="${escHtml(jobTitle)}"
           data-enriched="false"
           class="skill-card animate-up flex flex-col gap-4"
           style="animation-delay:${i * 45}ms">

        <!-- HEADER -->
        <div>
          <div class="flex justify-between items-start mb-2">
            <div class="max-w-[70%]">
              <h3 class="text-xl font-bold leading-tight text-kwText">${jobTitle}</h3>
              <p class="text-[10px] font-bold mt-1 uppercase tracking-widest text-kwAccent">
                ${techStack}
              </p>
            </div>
            <span class="text-[9px] font-bold py-1 px-3 bg-[#f8f6f4] rounded-full uppercase
                         text-[#6b5d52] border border-kwBorder leading-none">
              ${result.location}
            </span>
          </div>

          <!-- Metadatos dinámicos -->
          <div class="flex flex-wrap items-center gap-2 min-h-[20px] mb-1">
            <span class="vac-count text-[11px] font-semibold text-gray-300 transition-all duration-500">
              Buscando vacantes...
            </span>
          </div>
          <div class="salary-range hidden text-[12px] font-bold text-emerald-600 mb-1"></div>
          <div class="modalities-row flex flex-wrap gap-1 mb-2"></div>

          <!-- Descripción: preview del CV → se reemplaza con descripción real de la vacante -->
          <p class="job-preview text-[12px] text-gray-400 italic leading-relaxed
                     bg-[#faf9f8] border border-[#f0ece8] rounded-xl p-3 line-clamp-3
                     transition-all duration-500">
            ${cvPreview}
          </p>
        </div>

        <!-- PORTALES -->
        <div class="portals-section mt-auto">
          ${renderPortalsSkeleton()}
        </div>
      </div>
    `;
  }).join('');
}

// ─────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────
function renderPortalsSkeleton() {
  return `
    <div class="animate-pulse space-y-2">
      <div class="flex gap-2">
        <div class="h-7 w-20 bg-gray-200 rounded-lg"></div>
        <div class="h-7 w-16 bg-gray-100 rounded-lg"></div>
        <div class="h-7 w-14 bg-gray-100 rounded-lg"></div>
      </div>
      <div class="h-12 bg-gray-100 rounded-xl w-full"></div>
      <div class="h-12 bg-gray-50 rounded-xl w-full"></div>
      <div class="h-9 bg-gray-800 rounded-xl w-full opacity-20"></div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// PORTALES CON TABS
// ─────────────────────────────────────────────────────────────
function renderPortalTabs(portals, cardId, firstRealJob) {
  const mainUrl    = firstRealJob?.url    || portals[0]?.jobs[0]?.url || '#';
  const mainSource = firstRealJob?.source || portals[0]?.portal       || 'Portal';

  const tabs = portals.map((p, i) => {
    const count = p.jobs.filter(j => !j.synthetic).length;
    return `
      <button class="portal-tab text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all
                     ${i === 0 ? 'bg-kwAccent text-white' : 'text-gray-400 hover:bg-gray-100'}"
              data-idx="${i}">
        ${p.portal}${count > 0 ? ` (${count})` : ''}
      </button>`;
  }).join('');

  const panels = portals.map((p, i) => `
    <div class="portal-panel ${i !== 0 ? 'hidden' : ''}" data-panel="${i}">
      ${p.jobs.map(renderJobRow).join('')}
      <a href="${p.searchUrl}" target="_blank" rel="noopener noreferrer"
         class="flex justify-center text-[11px] font-semibold text-kwAccent hover:underline py-1">
        Ver más en ${p.portal} →
      </a>
    </div>`).join('');

  return `
    <div class="flex flex-wrap gap-1 mb-2">${tabs}</div>
    ${panels}
    <a href="${mainUrl}" target="_blank" rel="noopener noreferrer"
       class="btn-apply-main btn-apply btn-postularse w-full mt-2
              flex flex-col items-center justify-center gap-0.5">
      <span class="btn-label">POSTULARSE AHORA</span>
      <span class="btn-source text-[9px] opacity-70 font-normal normal-case tracking-normal">
        vía ${mainSource}
      </span>
    </a>`;
}

// ─────────────────────────────────────────────────────────────
// FILA DE VACANTE — ahora con descripción
// ─────────────────────────────────────────────────────────────
function renderJobRow(job) {
  const modCfg = MODALITY_CONFIG[job.modality] || {};
  const isReal = !job.synthetic;

  return `
    <a href="${job.url}" target="_blank" rel="noopener noreferrer"
       class="group flex flex-col gap-1 p-3 rounded-xl border border-kwBorder mb-2
              hover:border-kwAccent hover:bg-emerald-50/10 transition-all">

      <!-- Título + fecha -->
      <div class="flex justify-between items-start gap-2">
        <span class="text-[13px] font-bold leading-snug transition-colors
                     ${isReal ? 'text-kwText group-hover:text-kwAccent' : 'text-gray-400'}">
          ${job.title}
          ${!isReal ? '<span class="text-[10px] font-normal ml-1 opacity-60">(búsqueda general)</span>' : ''}
        </span>
        ${job.postedAt ? `<span class="text-[10px] text-gray-400 shrink-0">${job.postedAt}</span>` : ''}
      </div>

      <!-- Empresa -->
      ${job.company ? `<span class="text-[11px] font-semibold text-gray-500">${job.company}</span>` : ''}

      <!-- Descripción real de la vacante -->
      ${job.description ? `
        <p class="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mt-0.5">
          ${job.description}
        </p>` : ''}

      <!-- Tags: ubicación, modalidad, salario -->
      <div class="flex flex-wrap gap-2 mt-1">
        ${job.location ? `<span class="text-[10px] text-gray-400">📍 ${job.location}</span>` : ''}
        ${job.modality ? `<span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${modCfg.color || 'bg-gray-100 text-gray-600'}">${modCfg.icon || ''} ${job.modality}</span>` : ''}
        ${job.salary   ? `<span class="text-[10px] font-bold text-emerald-600">💰 ${job.salary}</span>` : ''}
      </div>

      <span class="text-[10px] font-semibold text-kwAccent mt-0.5 group-hover:underline">
        ${isReal ? 'Ver vacante →' : 'Buscar en portal →'}
      </span>
    </a>`;
}

// ─────────────────────────────────────────────────────────────
// FALLBACK
// ─────────────────────────────────────────────────────────────
function renderFallbackButtons(links) {
  const portals = Object.entries(PORTAL_META)
    .filter(([key]) => links[key])
    .map(([key, meta]) => ({ key, ...meta }));
  const [main, ...secondary] = portals;

  return `
    <div class="flex flex-col gap-2">
      <a href="${links[main?.key] || '#'}" target="_blank" rel="noopener noreferrer"
         class="btn-apply-main btn-apply btn-postularse w-full
                flex flex-col items-center justify-center gap-0.5">
        <span class="btn-label">POSTULARSE AHORA</span>
        <span class="btn-source text-[9px] opacity-60 font-normal normal-case tracking-normal">
          vía ${main?.label || 'LinkedIn'}
        </span>
      </a>
      <div class="grid grid-cols-2 gap-1.5">
        ${secondary.map(p => `
          <a href="${links[p.key]}" target="_blank" rel="noopener noreferrer"
             class="text-[10px] font-bold text-center py-2 px-1 rounded-xl border border-kwBorder
                    hover:border-kwAccent hover:text-kwAccent transition-all text-gray-500 truncate">
            ${p.label}
          </a>`).join('')}
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// TAB LISTENERS
// ─────────────────────────────────────────────────────────────
function attachTabListeners(cardId) {
  const card = document.getElementById(cardId);
  if (!card) return;

  card.querySelectorAll('.portal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.idx);

      card.querySelectorAll('.portal-tab').forEach((t, i) => {
        t.classList.toggle('bg-kwAccent',   i === idx);
        t.classList.toggle('text-white',    i === idx);
        t.classList.toggle('text-gray-400', i !== idx);
      });
      card.querySelectorAll('.portal-panel').forEach((p, i) => {
        p.classList.toggle('hidden', i !== idx);
      });

      // Actualizar botón y descripción con la primera vacante del tab activo
      const panel    = card.querySelectorAll('.portal-panel')[idx];
      const firstJob = panel?.querySelector('a.group');
      const applyBtn = card.querySelector('.btn-apply-main');
      if (applyBtn && firstJob?.href) applyBtn.href = firstJob.href;

      // Actualizar descripción en la card con la del tab activo
      const firstDesc = panel?.querySelector('p.text-\\[11px\\]')?.textContent;
      const previewEl = card.querySelector('.job-preview');
      if (previewEl && firstDesc) {
        previewEl.textContent = firstDesc;
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// LOADING STATE
// ─────────────────────────────────────────────────────────────
function renderLoadingState() {
  candidateNameLabel.innerText = "Analizando perfil...";
  skillCountLabel.innerText    = "—";
  matchesGrid.innerHTML = Array(6).fill(0).map(() => `
    <div class="skill-card flex flex-col gap-4">
      <div class="animate-pulse space-y-3">
        <div class="h-5 bg-gray-200 rounded-lg w-3/4"></div>
        <div class="h-3 bg-gray-100 rounded w-2/5"></div>
      </div>
      <div class="animate-pulse h-12 bg-gray-100 rounded-xl w-full"></div>
      <div class="animate-pulse space-y-2 mt-auto">
        <div class="h-9 bg-gray-800 rounded-xl w-full opacity-20"></div>
        <div class="grid grid-cols-2 gap-2">
          <div class="h-7 bg-gray-200 rounded-xl"></div>
          <div class="h-7 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>`).join('');
}

// ─────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────
function buildFallbackLinks(title, location) {
  const q  = encodeURIComponent(title);
  const l  = encodeURIComponent(location);
  const sl = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return {
    linkedin:     `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}&f_TPR=r604800&sortBy=DD`,
    occ:          `https://www.occ.com.mx/empleos/de-${sl}/`,
    indeed:       `https://mx.indeed.com/jobs?q=${q}&l=${l}&fromage=7&sort=date`,
    computrabajo: `https://www.computrabajo.com.mx/empleos-de-${sl}`,
    googleJobs:   `https://www.google.com/search?q=${q}+${l}+empleos&ibp=htl;jobs`,
  };
}

function escHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}