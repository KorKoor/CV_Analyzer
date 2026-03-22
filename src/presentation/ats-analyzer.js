// src/presentation/ats-analyzer.js
// Módulo frontend — llama al serverless /api/ats-analyze

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════
export function injectATSStyles() {
  if (document.getElementById('ats-styles')) return;
  const s = document.createElement('style');
  s.id = 'ats-styles';
  s.textContent = `
    #ats-panel {
      display: none; background: white;
      border: 1px solid #e8e2de; border-radius: 2rem;
      overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.06);
      margin-top: 1.5rem;
    }
    #ats-panel.visible { display: block; }

    .ats-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.25rem 1.75rem;
      background: linear-gradient(135deg, #1a1208 0%, #2d241e 100%);
      color: white; flex-wrap: wrap; gap: .75rem;
    }
    .ats-header-left { display: flex; align-items: center; gap: .75rem; }
    .ats-header-icon {
      width: 40px; height: 40px; background: rgba(0,135,94,.3);
      border-radius: 12px; display: flex; align-items: center;
      justify-content: center; font-size: 1.2rem; flex-shrink: 0;
    }
    .ats-header h3 {
      font-size: .85rem; font-weight: 900;
      text-transform: uppercase; letter-spacing: .15em; margin: 0;
    }
    .ats-header p { font-size: .65rem; opacity: .6; margin: 2px 0 0; font-weight: 600; }

    .ats-analyze-btn {
      display: flex; align-items: center; gap: .5rem;
      padding: .6rem 1.25rem; border-radius: 99px;
      background: #00875e; color: white;
      font-size: .72rem; font-weight: 800;
      text-transform: uppercase; letter-spacing: .1em;
      border: none; cursor: pointer; transition: all .2s; white-space: nowrap;
    }
    .ats-analyze-btn:hover { background: #006b4a; transform: translateY(-1px); }
    .ats-analyze-btn:disabled { opacity: .5; cursor: not-allowed; transform: none; background: #6b5d52; }

    /* Score */
    .ats-score-section {
      display: flex; align-items: center; gap: 2rem;
      padding: 1.75rem; border-bottom: 1px solid #f0ece8; flex-wrap: wrap;
    }
    .ats-score-ring { position: relative; width: 110px; height: 110px; flex-shrink: 0; }
    .ats-score-ring svg { transform: rotate(-90deg); }
    .ats-score-ring circle { fill: none; stroke-width: 8; stroke-linecap: round; }
    .ats-score-ring .bg-circle { stroke: #f0ece8; }
    .ats-score-ring .score-circle { stroke: #00875e; stroke-dasharray: 283; stroke-dashoffset: 283; transition: stroke-dashoffset 1.5s cubic-bezier(.4,0,.2,1); }
    .ats-score-ring .score-circle.warn   { stroke: #f59e0b; }
    .ats-score-ring .score-circle.danger { stroke: #ef4444; }
    .ats-score-value { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .ats-score-number { font-size: 1.6rem; font-weight: 900; color: #2d241e; line-height: 1; }
    .ats-score-label  { font-size: .55rem; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: #9b8d84; }
    .ats-score-info   { flex: 1; min-width: 200px; }
    .ats-score-title  { font-size: 1.1rem; font-weight: 900; color: #2d241e; margin-bottom: .25rem; }
    .ats-score-subtitle { font-size: .78rem; color: #6b5d52; line-height: 1.6; margin-bottom: .75rem; }
    .ats-score-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
    .ats-score-tag {
      font-size: .65rem; font-weight: 700; padding: 2px 10px;
      border-radius: 99px; border: 1.5px solid;
    }
    .ats-score-tag.pass   { color: #00875e; border-color: #a7f3d0; background: #f0fdf9; }
    .ats-score-tag.warn   { color: #d97706; border-color: #fde68a; background: #fffbeb; }
    .ats-score-tag.danger { color: #dc2626; border-color: #fecaca; background: #fef2f2; }

    /* Categorías */
    .ats-categories {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    }
    .ats-category {
      padding: 1.25rem 1.75rem;
      border-bottom: 1px solid #f0ece8; border-right: 1px solid #f0ece8;
    }
    .ats-category:last-child { border-right: none; }
    .ats-cat-header { display: flex; align-items: center; gap: .6rem; margin-bottom: .75rem; }
    .ats-cat-icon {
      width: 32px; height: 32px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: .9rem; flex-shrink: 0;
    }
    .ats-cat-icon.pass   { background: #f0fdf9; }
    .ats-cat-icon.warn   { background: #fffbeb; }
    .ats-cat-icon.danger { background: #fef2f2; }
    .ats-cat-title { font-size: .78rem; font-weight: 800; color: #2d241e; }
    .ats-cat-score { margin-left: auto; font-size: .7rem; font-weight: 900; }
    .ats-cat-score.pass   { color: #00875e; }
    .ats-cat-score.warn   { color: #d97706; }
    .ats-cat-score.danger { color: #dc2626; }
    .ats-bar-bg { width: 100%; height: 5px; background: #f0ece8; border-radius: 99px; overflow: hidden; margin-bottom: .75rem; }
    .ats-bar-fill { height: 100%; border-radius: 99px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
    .ats-bar-fill.pass   { background: #00875e; }
    .ats-bar-fill.warn   { background: #f59e0b; }
    .ats-bar-fill.danger { background: #ef4444; }
    .ats-items { display: flex; flex-direction: column; gap: .4rem; }
    .ats-item { display: flex; align-items: flex-start; gap: .5rem; font-size: .75rem; color: #5d4037; line-height: 1.5; }
    .ats-item-icon { flex-shrink: 0; margin-top: 1px; }

    /* Sugerencias */
    .ats-suggestions { padding: 1.5rem 1.75rem; border-bottom: 1px solid #f0ece8; }
    .ats-suggestions h4 {
      font-size: .72rem; font-weight: 900; text-transform: uppercase;
      letter-spacing: .12em; color: #9b8d84; margin-bottom: 1rem;
    }
    .ats-suggestion {
      display: flex; gap: .75rem; padding: .875rem 1rem;
      border-radius: 1rem; border: 1px solid #e8e2de; margin-bottom: .625rem;
      transition: border-color .15s;
    }
    .ats-suggestion:hover { border-color: #00875e; }
    .ats-suggestion-icon {
      width: 32px; height: 32px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    .ats-suggestion-icon.critical  { background: #fef2f2; }
    .ats-suggestion-icon.important { background: #fffbeb; }
    .ats-suggestion-icon.nice      { background: #f0fdf9; }
    .ats-suggestion-body { flex: 1; }
    .ats-suggestion-title { font-size: .78rem; font-weight: 800; color: #2d241e; margin-bottom: 2px; }
    .ats-suggestion-desc  { font-size: .72rem; color: #6b5d52; line-height: 1.55; }
    .ats-suggestion-badge {
      font-size: .6rem; font-weight: 800; padding: 2px 8px;
      border-radius: 99px; white-space: nowrap; align-self: flex-start; margin-top: 2px;
    }
    .ats-suggestion-badge.critical  { background: #fef2f2; color: #dc2626; }
    .ats-suggestion-badge.important { background: #fffbeb; color: #d97706; }
    .ats-suggestion-badge.nice      { background: #f0fdf9; color: #00875e; }

    /* Keywords */
    .ats-keywords { padding: 1.25rem 1.75rem; }
    .ats-keywords h4 {
      font-size: .72rem; font-weight: 900; text-transform: uppercase;
      letter-spacing: .12em; color: #9b8d84; margin-bottom: .75rem;
    }
    .ats-kw-section { margin-bottom: .875rem; }
    .ats-kw-section-label {
      font-size: .65rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .1em; margin-bottom: .4rem;
    }
    .ats-kw-grid { display: flex; flex-wrap: wrap; gap: .4rem; }
    .ats-kw {
      font-size: .7rem; font-weight: 700; padding: 3px 10px;
      border-radius: 99px; border: 1.5px solid;
    }
    .ats-kw.present { color: #00875e; border-color: #a7f3d0; background: #f0fdf9; }
    .ats-kw.missing { color: #9b8d84; border-color: #e8e2de; background: #faf9f8; }
    .ats-kw.suggest { color: #d97706; border-color: #fde68a; background: #fffbeb; }

    /* Loading */
    .ats-loading {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 3rem 1.75rem; gap: 1rem;
    }
    .ats-loading-spinner {
      width: 40px; height: 40px; border: 3px solid #f0ece8;
      border-top-color: #00875e; border-radius: 50%;
      animation: atsSpinner .8s linear infinite;
    }
    @keyframes atsSpinner { to { transform: rotate(360deg); } }
    .ats-loading-steps { display: flex; flex-direction: column; gap: .35rem; align-items: center; }
    .ats-loading-step {
      font-size: .72rem; font-weight: 600; color: #bcaaa4;
      transition: color .3s, font-weight .3s;
    }
    .ats-loading-step.active { color: #2d241e; font-weight: 800; }
    .ats-loading-step.done   { color: #00875e; }
    .ats-loading-step.done::before { content: '✓ '; }
  `;
  document.head.appendChild(s);
}

// ═══════════════════════════════════════════════════════════
// CREAR PANEL EN EL DOM
// ═══════════════════════════════════════════════════════════
export function createATSPanel(parentElement) {
  injectATSStyles();
  const panel = document.createElement('div');
  panel.id = 'ats-panel';
  panel.setAttribute('aria-label', 'Análisis ATS del CV');
  panel.innerHTML = `
    <div class="ats-header">
      <div class="ats-header-left">
        <div class="ats-header-icon">🎯</div>
        <div>
          <h3>Detector ATS</h3>
          <p>Análisis con IA · Gemini 1.5 Flash · Optimiza tu CV para sistemas ATS</p>
        </div>
      </div>
      <button id="ats-analyze-btn" class="ats-analyze-btn" disabled>
        <span id="ats-btn-icon">✨</span>
        <span id="ats-btn-text">Analizar CV</span>
      </button>
    </div>
    <div id="ats-content">
      <div style="padding:2rem 1.75rem;text-align:center;color:#9b8d84;font-size:.8rem;">
        <p style="font-size:1.5rem;margin-bottom:.5rem;">🎯</p>
        <p style="font-weight:700;color:#2d241e;margin-bottom:.25rem;">Sube tu CV para activar el análisis</p>
        <p>El detector ATS revisará tu CV con IA y te dará un score con recomendaciones específicas</p>
      </div>
    </div>`;
  parentElement.appendChild(panel);
  return panel;
}

// ═══════════════════════════════════════════════════════════
// ACTIVAR CUANDO SE SUBE EL CV
// ═══════════════════════════════════════════════════════════
export function enableATSPanel(cvText, fileName) {
  const panel = document.getElementById('ats-panel');
  const btn   = document.getElementById('ats-analyze-btn');
  if (!panel || !btn) return;

  panel.classList.add('visible');
  btn.disabled = false;

  document.getElementById('ats-content').innerHTML = `
    <div style="padding:1.5rem 1.75rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
      <div style="flex:1;">
        <p style="font-size:.82rem;font-weight:700;color:#2d241e;">
          📄 <strong>${fileName}</strong> listo para analizar
        </p>
        <p style="font-size:.72rem;color:#9b8d84;margin-top:.25rem;">
          Haz clic en "Analizar CV" para obtener tu score ATS, detectar problemas y recibir recomendaciones personalizadas
        </p>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <span style="font-size:.65rem;font-weight:700;padding:3px 10px;border-radius:99px;background:#f0fdf9;color:#00875e;border:1.5px solid #a7f3d0;">✅ Gratis</span>
        <span style="font-size:.65rem;font-weight:700;padding:3px 10px;border-radius:99px;background:#fffbeb;color:#d97706;border:1.5px solid #fde68a;">⚡ ~5 segundos</span>
        <span style="font-size:.65rem;font-weight:700;padding:3px 10px;border-radius:99px;background:#eff6ff;color:#3b82f6;border:1.5px solid #bfdbfe;">🔒 Tu CV no se guarda</span>
      </div>
    </div>`;

  btn.onclick = () => runATSAnalysis(cvText, fileName);
}

// ═══════════════════════════════════════════════════════════
// EJECUTAR ANÁLISIS
// ═══════════════════════════════════════════════════════════
async function runATSAnalysis(cvText, fileName) {
  const btn     = document.getElementById('ats-analyze-btn');
  const content = document.getElementById('ats-content');
  if (!btn || !content) return;

  btn.disabled = true;
  document.getElementById('ats-btn-text').textContent = 'Analizando...';
  document.getElementById('ats-btn-icon').textContent = '⏳';

  const steps = [
    'Leyendo estructura del CV',
    'Evaluando secciones',
    'Detectando keywords ATS',
    'Calculando score',
    'Preparando recomendaciones',
  ];

  content.innerHTML = `
    <div class="ats-loading">
      <div class="ats-loading-spinner"></div>
      <div class="ats-loading-steps">
        ${steps.map((s, i) => `<div class="ats-loading-step ${i === 0 ? 'active' : ''}" id="ats-step-${i}">${s}</div>`).join('')}
      </div>
    </div>`;

  // Animar pasos
  let stepIdx = 0;
  const stepInterval = setInterval(() => {
    const prev = document.getElementById(`ats-step-${stepIdx}`);
    if (prev) prev.classList.replace('active', 'done');
    stepIdx++;
    const next = document.getElementById(`ats-step-${stepIdx}`);
    if (next) next.classList.add('active');
  }, 900);

  try {
    const response = await fetch('/api/ats-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cvText, fileName }),
      signal: AbortSignal.timeout(30000),
    });

    clearInterval(stepInterval);

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${response.status}`);
    }

    const analysis = await response.json();
    renderATSResults(content, analysis);

  } catch (err) {
    clearInterval(stepInterval);
    content.innerHTML = `
      <div style="padding:2rem 1.75rem;text-align:center;">
        <p style="font-size:1.5rem;margin-bottom:.5rem;">⚠️</p>
        <p style="font-weight:800;color:#2d241e;margin-bottom:.25rem;">Error al analizar</p>
        <p style="font-size:.75rem;color:#9b8d84;margin-bottom:1rem;">${err.message}</p>
        <button id="ats-retry-btn"
                style="padding:.5rem 1.25rem;background:#2d241e;color:white;border:none;border-radius:99px;font-size:.75rem;font-weight:700;cursor:pointer;">
          Reintentar
        </button>
      </div>`;
    document.getElementById('ats-retry-btn')?.addEventListener('click', () => {
      btn.disabled = false;
      document.getElementById('ats-btn-text').textContent = 'Analizar CV';
      document.getElementById('ats-btn-icon').textContent = '✨';
      btn.click();
    });
  }

  btn.disabled = false;
  document.getElementById('ats-btn-text').textContent = 'Re-analizar';
  document.getElementById('ats-btn-icon').textContent = '🔄';
}

// ═══════════════════════════════════════════════════════════
// RENDERIZAR RESULTADOS
// ═══════════════════════════════════════════════════════════
function renderATSResults(container, a) {
  const scoreColor   = a.score >= 75 ? 'pass' : a.score >= 50 ? 'warn' : 'danger';
  const circumference = 283;
  const offset        = circumference - (circumference * a.score / 100);
  const statusIcons   = { pass: '✅', warn: '⚠️', fail: '❌' };
  const priorityLabels = { critical: 'Crítico', important: 'Importante', nice: 'Mejora' };

  container.innerHTML = `
    <!-- Score -->
    <div class="ats-score-section">
      <div class="ats-score-ring">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle class="bg-circle" cx="55" cy="55" r="45"/>
          <circle class="score-circle ${scoreColor}" cx="55" cy="55" r="45"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${circumference}"/>
        </svg>
        <div class="ats-score-value">
          <span class="ats-score-number">${a.score}</span>
          <span class="ats-score-label">/ 100</span>
        </div>
      </div>
      <div class="ats-score-info">
        <div class="ats-score-title">${a.scoreLabel || 'Análisis completado'}</div>
        <div class="ats-score-subtitle">${a.scoreSummary || ''}</div>
        <div class="ats-score-tags">
          ${(a.quickWins || []).map(w => `<span class="ats-score-tag ${scoreColor}">${w}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- Categorías -->
    <div class="ats-categories">
      ${(a.categories || []).map(cat => {
        const cc = cat.score >= 75 ? 'pass' : cat.score >= 50 ? 'warn' : 'danger';
        return `<div class="ats-category">
          <div class="ats-cat-header">
            <div class="ats-cat-icon ${cc}">${cat.icon}</div>
            <span class="ats-cat-title">${cat.name}</span>
            <span class="ats-cat-score ${cc}">${cat.score}%</span>
          </div>
          <div class="ats-bar-bg">
            <div class="ats-bar-fill ${cc}" style="width:0%" data-width="${cat.score}%"></div>
          </div>
          <div class="ats-items">
            ${(cat.items || []).map(item =>
              `<div class="ats-item">
                <span class="ats-item-icon">${statusIcons[item.status] || '•'}</span>
                <span>${item.text}</span>
              </div>`).join('')}
          </div>
        </div>`;
      }).join('')}
    </div>

    <!-- Sugerencias -->
    <div class="ats-suggestions">
      <h4>💡 Recomendaciones para mejorar tu score</h4>
      ${(a.suggestions || []).map(s => `
        <div class="ats-suggestion">
          <div class="ats-suggestion-icon ${s.priority}">${s.icon}</div>
          <div class="ats-suggestion-body">
            <div class="ats-suggestion-title">${s.title}</div>
            <div class="ats-suggestion-desc">${s.description}</div>
          </div>
          <span class="ats-suggestion-badge ${s.priority}">${priorityLabels[s.priority] || s.priority}</span>
        </div>`).join('')}
    </div>

    <!-- Keywords -->
    <div class="ats-keywords">
      <h4>🔑 Análisis de Keywords ATS</h4>
      ${a.keywords?.present?.length ? `
        <div class="ats-kw-section">
          <div class="ats-kw-section-label" style="color:#00875e;">✅ Presentes en tu CV</div>
          <div class="ats-kw-grid">${a.keywords.present.map(k => `<span class="ats-kw present">${k}</span>`).join('')}</div>
        </div>` : ''}
      ${a.keywords?.missing?.length ? `
        <div class="ats-kw-section">
          <div class="ats-kw-section-label" style="color:#dc2626;">❌ Importantes que faltan</div>
          <div class="ats-kw-grid">${a.keywords.missing.map(k => `<span class="ats-kw missing">${k}</span>`).join('')}</div>
        </div>` : ''}
      ${a.keywords?.suggested?.length ? `
        <div class="ats-kw-section">
          <div class="ats-kw-section-label" style="color:#d97706;">💡 Recomendadas para agregar</div>
          <div class="ats-kw-grid">${a.keywords.suggested.map(k => `<span class="ats-kw suggest">${k}</span>`).join('')}</div>
        </div>` : ''}
    </div>
  `;

  // Animar score ring y barras
  requestAnimationFrame(() => {
    setTimeout(() => {
      const circle = container.querySelector('.score-circle');
      if (circle) circle.style.strokeDashoffset = offset;
      container.querySelectorAll('.ats-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width;
      });
    }, 100);
  });
}

// ═══════════════════════════════════════════════════════════
// EXTRAER TEXTO DEL PDF
// ═══════════════════════════════════════════════════════════
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page    = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ') + '\n';
  }
  return text.trim();
}