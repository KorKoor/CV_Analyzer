// api/ats-analyze.js
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

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Método no permitido' });

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
    .substring(0, 2000); // reducido para dar espacio al output

  let lastError = null;

  for (const model of MODELS) {
    try {
      const result = await callGemini(apiKey, model, cleanCV, fileName);
      if (result._error) {
        if (result._status === 429 || result._status === 404) {
          lastError = result; await sleep(300); continue;
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
          contents: [{ parts: [{ text: buildPrompt(cvText, fileName) }] }],
          generationConfig: {
            temperature:      0.1,
            maxOutputTokens:  4096,
            candidateCount:   1,
            responseMimeType: 'application/json',
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

    console.log('Raw preview:', rawText.substring(0, 100));

    let analysis;
    let jsonStr = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    try { const m = jsonStr.match(/\{[\s\S]*\}/); if (m) analysis = JSON.parse(m[0]); } catch {}
    if (!analysis) { try { const i = jsonStr.lastIndexOf('}'); if (i>0) analysis = JSON.parse(jsonStr.substring(0,i+1)); } catch {} }
    if (!analysis) { try { analysis = JSON.parse(jsonStr); } catch {} }

    if (!analysis) {
      console.error('PARSE FAILED:', rawText.substring(0, 300));
      return { _error: 'JSON inválido de Gemini — intenta de nuevo' };
    }

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

function buildPrompt(cvText, fileName) {
  return `Analiza este CV y responde SOLO con JSON válido. Sin texto extra. Sin backticks. En español.

CV: ${fileName || 'CV.pdf'}
---
${cvText}
---

Responde EXACTAMENTE con este JSON (reemplaza los valores placeholder con análisis real del CV):
{"score":75,"scoreLabel":"Bueno","scoreSummary":"texto honesto","quickWins":["fortaleza1","fortaleza2","fortaleza3"],"categories":[{"name":"Información de Contacto","icon":"📋","score":80,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Perfil Profesional","icon":"👤","score":70,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Experiencia Laboral","icon":"💼","score":75,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Educación y Certificaciones","icon":"🎓","score":80,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Habilidades Técnicas","icon":"🔑","score":70,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Logros y Métricas","icon":"📊","score":60,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]},{"name":"Formato ATS","icon":"🤖","score":75,"items":[{"status":"pass","text":"observación real"},{"status":"warn","text":"observación real"},{"status":"fail","text":"observación real"}]}],"suggestions":[{"priority":"critical","icon":"🚨","title":"título","description":"descripción accionable"},{"priority":"critical","icon":"📝","title":"título","description":"descripción accionable"},{"priority":"critical","icon":"🎯","title":"título","description":"descripción accionable"},{"priority":"important","icon":"⚡","title":"título","description":"descripción accionable"},{"priority":"important","icon":"📈","title":"título","description":"descripción accionable"},{"priority":"important","icon":"💡","title":"título","description":"descripción accionable"},{"priority":"nice","icon":"✨","title":"título","description":"descripción accionable"},{"priority":"nice","icon":"🌟","title":"título","description":"descripción accionable"}],"keywords":{"present":["kw1","kw2","kw3","kw4","kw5"],"missing":["kw1","kw2","kw3","kw4","kw5"],"suggested":["kw1","kw2","kw3","kw4","kw5"]},"atsCompatibility":{"score":75,"issues":["issue1","issue2"],"passed":["pass1","pass2"]},"salaryInsight":{"estimatedRange":"$20,000-$35,000 MXN mensual","marketPosition":"Mid","basis":"justificación basada en el CV"}}

Score honesto: 0-40=graves problemas, 41-60=promedio, 61-75=bueno, 76-90=sólido, 91-100=excepcional.`;
}