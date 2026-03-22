export const config = { maxDuration: 60 };

const analysisCache = new Map();
const CACHE_TTL_MS  = 10 * 60 * 1000;

function getCacheKey(cvText) {
  let hash = 0;
  for (let i = 0; i < Math.min(cvText.length, 500); i++) {
    hash = ((hash << 5) - hash) + cvText.charCodeAt(i);
    hash |= 0;
  }
  return `ats_${hash}`;
}

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Método no permitido' });

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch { body = {}; }
  }

  const { cvText, fileName, forceRefresh } = body || {};
  if (!cvText?.trim()) return res.status(400).json({ error: 'Falta el texto del CV' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)  return res.status(500).json({ error: 'GEMINI_API_KEY no configurada' });

  const cacheKey = getCacheKey(cvText);
  if (!forceRefresh && analysisCache.has(cacheKey)) {
    const cached = analysisCache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json(cached.data);
    }
    analysisCache.delete(cacheKey);
  }

  const cleanCV = cvText
    .replace(/\s{3,}/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .trim()
    .substring(0, 800);

  let lastError = null;

  for (const model of MODELS) {
    try {
      const result = await callGemini(apiKey, model, cleanCV, fileName);
      if (result._error) {
        if (result._status === 429 || result._status === 404) {
          lastError = result; 
          await sleep(300); 
          continue;
        }
        return res.status(502).json({ error: result._error });
      }

      analysisCache.set(cacheKey, { data: result, timestamp: Date.now() });
      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Model', model);
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(result);

    } catch (err) {
      lastError = { _error: err.message };
      if (err.name === 'AbortError') break;
    }
  }

  return res.status(502).json({ error: lastError?._error || 'No se pudo conectar con Gemini' });
}

async function callGemini(apiKey, model, cvText, fileName) {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), 45000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(cvText) }] }],
          generationConfig: {
            temperature:      0.1,
            maxOutputTokens:  1200,
            candidateCount:   1,
          },
        }),
      }
    );

    clearTimeout(to);

    if (!response.ok) {
      const txt = await response.text().catch(() => '');
      let msg = txt;
      try { msg = JSON.parse(txt)?.error?.message || txt; } catch {}
      const codes = { 401:'API key incorrecta', 403:'Sin permisos para Gemini API', 404:'Modelo no disponible', 429:'Rate limit', 500:'Error Gemini', 503:'Gemini no disponible' };
      return { _error: codes[response.status] || `Error ${response.status}: ${msg}`, _status: response.status };
    }

    const data = await response.json();
    console.log('Model:', model, '| Finish:', data.candidates?.[0]?.finishReason);

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!rawText) {
      const reason = data.candidates?.[0]?.finishReason || 'UNKNOWN';
      return { _error: `Respuesta vacía de Gemini (${reason})` };
    }

    const analysis = parseTextResponse(rawText);
    
    // Validaciones de seguridad para evitar fallos en el frontend
    if (typeof analysis.score !== 'number') analysis.score = 50;
    if (!analysis.scoreLabel)     analysis.scoreLabel = 'Análisis completado';
    if (!analysis.scoreSummary)   analysis.scoreSummary = 'Análisis completado.';
    if (!Array.isArray(analysis.quickWins))   analysis.quickWins = [];
    if (!Array.isArray(analysis.categories))  analysis.categories = [];
    if (!Array.isArray(analysis.suggestions)) analysis.suggestions = [];
    if (!analysis.keywords) analysis.keywords = { present: [], missing: [], suggested: [] };
    if (!analysis.atsCompatibility) analysis.atsCompatibility = { score: 0, issues: [], passed: [] };
    if (!analysis.salaryInsight) analysis.salaryInsight = { estimatedRange: 'No disponible', marketPosition: 'Mid', basis: '' };

    return analysis;

  } catch (err) {
    clearTimeout(to);
    throw err;
  }
}

function buildPrompt(cvText) {
  return `Analiza este CV y responde en formato de pares CLAVE:VALOR, uno por línea, sin explicaciones adicionales. Máximo 10 palabras por valor. En español.

CV:
${cvText}

Responde EXACTAMENTE en este formato (una línea por campo):
SCORE:número del 0 al 100
LABEL:Necesita mejora|Regular|Bueno|Sólido|Excelente
SUMMARY:resumen en máximo 15 palabras
WIN1:fortaleza corta
WIN2:fortaleza corta
WIN3:fortaleza corta
EXP_SCORE:número del 0 al 100
EXP_PASS:observación positiva experiencia
EXP_WARN:área de mejora experiencia
SKILL_SCORE:número del 0 al 100
SKILL_PASS:observación positiva habilidades
SKILL_WARN:área de mejora habilidades
EDU_SCORE:número del 0 al 100
EDU_PASS:observación positiva educación
EDU_WARN:área de mejora educación
ATS_SCORE:número del 0 al 100
ATS_PASS:observación positiva formato
ATS_WARN:problema de formato ATS
SUG1_TITLE:título crítico corto
SUG1_DESC:descripción crítica corta
SUG2_TITLE:título crítico corto
SUG2_DESC:descripción crítica corta
SUG3_TITLE:título importante corto
SUG3_DESC:descripción importante corta
SUG4_TITLE:título mejora corto
SUG4_DESC:descripción mejora corta
KW_PRESENT:kw1,kw2,kw3,kw4
KW_MISSING:kw1,kw2,kw3,kw4
KW_SUGGEST:kw1,kw2,kw3,kw4
SALARY:$XX,000-$XX,000 MXN mensual
LEVEL:Junior|Mid|Senior|Lead
SALARY_BASIS:justificación corta`;
}

function parseTextResponse(text) {
  // Limpieza agresiva de Markdown para evitar fallos de lectura
  const cleanText = text.replace(/\*/g, '').replace(/```json\s*/gi,'').replace(/```\s*/gi,'').trim(); 
  const lines = cleanText.split('\n').filter(l => l.includes(':'));
  
  const get = (key) => {
    const line = lines.find(l => l.trim().toUpperCase().startsWith(key.toUpperCase()));
    if (!line) return '';
    return line.substring(line.indexOf(':') + 1).trim();
  };

  // Función de seguridad para parsear enteros sin devolver NaN
  const parseIntSafe = (val, fallback = 0) => {
    const parsed = parseInt(val, 10);
    return isNaN(parsed) ? fallback : parsed;
  };

  return {
    score:        parseIntSafe(get('SCORE'), 50),
    scoreLabel:   get('LABEL') || 'Análisis completado',
    scoreSummary: get('SUMMARY') || '',
    quickWins:    [get('WIN1'), get('WIN2'), get('WIN3')].filter(Boolean),
    categories: [
      { name:'Experiencia', icon:'💼', score: parseIntSafe(get('EXP_SCORE'), 0), items:[{status:'pass',text:get('EXP_PASS')},{status:'warn',text:get('EXP_WARN')}]},
      { name:'Habilidades', icon:'🔑', score: parseIntSafe(get('SKILL_SCORE'), 0), items:[{status:'pass',text:get('SKILL_PASS')},{status:'warn',text:get('SKILL_WARN')}]},
      { name:'Educacion',   icon:'🎓', score: parseIntSafe(get('EDU_SCORE'), 0), items:[{status:'pass',text:get('EDU_PASS')},{status:'warn',text:get('EDU_WARN')}]},
      { name:'Formato ATS', icon:'🤖', score: parseIntSafe(get('ATS_SCORE'), 0), items:[{status:'pass',text:get('ATS_PASS')},{status:'warn',text:get('ATS_WARN')}]},
    ],
    suggestions: [
      {priority:'critical', icon:'🚨', title:get('SUG1_TITLE'), description:get('SUG1_DESC')},
      {priority:'critical', icon:'📝', title:get('SUG2_TITLE'), description:get('SUG2_DESC')},
      {priority:'important',icon:'⚡', title:get('SUG3_TITLE'), description:get('SUG3_DESC')},
      {priority:'nice',     icon:'✨', title:get('SUG4_TITLE'), description:get('SUG4_DESC')},
    ].filter(s => s.title),
    keywords: {
      present:   get('KW_PRESENT').split(',').map(k=>k.trim()).filter(Boolean),
      missing:   get('KW_MISSING').split(',').map(k=>k.trim()).filter(Boolean),
      suggested: get('KW_SUGGEST').split(',').map(k=>k.trim()).filter(Boolean),
    },
    salaryInsight: { 
      estimatedRange: get('SALARY'), 
      marketPosition: get('LEVEL'), 
      basis: get('SALARY_BASIS') 
    },
    atsCompatibility: { score:0, issues:[], passed:[] },
  };
}